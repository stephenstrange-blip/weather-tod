import { WeatherAPI, Response } from "./api";
import { Form, DataContainer } from "./ui";

export class Session {
  constructor() {
    const weather = new WeatherAPI();

    const width = window.innerWidth;
    const height = window.innerHeight;

    const bodyContainer = document.createElement("div");
    bodyContainer.classList.add("body-container");
    bodyContainer.style.width = `${width}px`;
    bodyContainer.style.height = `${height}px`;

    console.warn("Setting up form");
    Form.setup(bodyContainer);
    console.warn("Setting up data container");
    DataContainer.setup(bodyContainer);
    console.warn("Finalizing html...");
    document.body.append(bodyContainer);
    console.warn("Form handleValidate evaluating...");
    Form.handleValidate();
    this.handleSubmit();
  }

  handleSubmit() {
    const searchInput = document.querySelector("input[type=image]");

    searchInput.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.warn("Starting Weather API");
      const weather = new WeatherAPI();
      const input = this.getInput();
      const initialDate = weather.setDate(
        input.initial.year,
        input.initial.month,
        input.initial.date,
      );
      const endDate = weather.setDate(
        input.end.year,
        input.end.month,
        input.end.date,
      );
      console.warn(
        "Inputs are finalized and are as follows",
        input.location,
        initialDate,
        endDate,
      );
      try {
        const query = weather.setQuery(input.location, initialDate, endDate);
        console.warn("Finalizing query...", query);

        console.warn("Fetching Data...");
        const obj = await weather.fetchData(query);

        console.warn("Data Fetched. Filtering data...", obj);
        const data = this.filterData(obj);

        console.warn("Updating container...");
        this.updateContainer(data);

      } catch (err) {
        alert(err);
      }
    });
  }

  updateContainer(data) {
    const dataContainer = document.querySelector(".data-container");
    const dataSection = document.querySelector(".data-container > section");
    const averageCondition = document.querySelector(".average-condition");
    const dailyForeCast = data.days;

    // reset the data section and hide the container
    dataSection.textContent = "";
    dataContainer.classList.remove("is-open");

    // add headline condition or update its text content
    if (!averageCondition) {
      const aveCondition = document.createElement("div");
      aveCondition.classList.add("average-condition");
      aveCondition.textContent = data["averageCondition"];
      dataContainer.insertBefore(aveCondition, dataSection);

    } else {
      averageCondition.textContent = data["averageCondition"];
    }
    
    // add daily forecast
    dailyForeCast.forEach((day) => {
      const element = document.createElement("div");

      for (const key in day) {
        const label = document.createElement("label");
        const p = document.createElement("p");

        p.id = `${key}-data`;
        label.for = p.id;

        label.textContent = `${key}: `;
        p.textContent = day[key];

        element.append(label, p);
      }
      dataSection.append(element);
    })

    // show the container with slide transition
    dataContainer.classList.add("is-open");
  }

  getInput() {
    const inputs = Array.from(
      document.querySelectorAll("input:not([type=image])"),
    );
    const location = inputs.filter((input) => input.id === "location-input")[0]
      .value;
    const initial = this.getDateInput(inputs, "date1-input");
    const end = this.getDateInput(inputs, "date2-input");

    console.warn("Getting all inputs", location, initial, end);
    return { location, initial, end };
  }

  getDateInput(array, id) {
    const dateValue = array.filter((item) => item.id === id)[0].value;

    if (!dateValue) {
      console.warn("Date inputs are empty");
      return {
        year: "",
        month: "",
        date: "",
      };
    } else {
      const [year, month, date] = dateValue.split("-");
      console.warn("Getting date inputs", year, month, date);
      return { year, month, date };
    }
  }

  filterData(obj) {
    console.warn(obj);
    const data = {};
    const dailyForecast = [...obj.days];
    console.warn(dailyForecast);
    data["averageCondition"] = Response.getAveCondition(obj);
    data["days"] = Response.getDailyForecast(dailyForecast);

    console.warn(data);
    return data;
  }
}
