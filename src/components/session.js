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

    Form.setup(bodyContainer);
    DataContainer.setup(bodyContainer);
    document.body.append(bodyContainer);
   
    Form.handleValidate();
    this.handleSubmit();
  }

  handleSubmit() {
    const searchInput = document.querySelector("input[type=image]");

    searchInput.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
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
      
      try {
        // Hide the data container ASAP
        // calling the method inside updateContainer causes the class
        // to update too fast for the animation to occur
        DataContainer.toggleClassList();

        const query = weather.setQuery(input.location, initialDate, endDate);
        const obj = await weather.fetchData(query);
        const data = this.filterData(obj);
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

    // reset the data section and hide the container
    dataSection.textContent = "";
    // double-check to see if the target class isn't removed yet
    dataContainer.classList.remove("is-open");
    
    // add headline condition or update its text content
    if (!averageCondition) {
      const aveCondition = document.createElement("div");
      aveCondition.textContent = data["averageCondition"];
      aveCondition.classList.add("average-condition");
      dataContainer.insertBefore(aveCondition, dataSection);
    } else {
      averageCondition.textContent = data["averageCondition"];
    }

    const table = DataContainer.setTable(data);
    dataSection.append(table);

    // show the container with slide transition
    DataContainer.toggleClassList();
  }

  getInput() {
    const inputs = Array.from(
      document.querySelectorAll("input:not([type=image])"),
    );

    const location = inputs.filter((input) => input.id === "location-input")[0]
      .value;

    const initial = this.getDateInput(inputs, "date1-input");
    const end = this.getDateInput(inputs, "date2-input");

    return { location, initial, end };
  }

  getDateInput(array, id) {
    const dateValue = array.filter((item) => item.id === id)[0].value;

    if (!dateValue) {
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
    const data = {};
    const dailyForecast = [...obj.days];
    data["resolvedAddress"] = Response.getResolvedAddress(obj);
    data["averageCondition"] = Response.getAveCondition(obj);
    data["days"] = Response.getDailyForecast(dailyForecast);

    return data;
  }
}
