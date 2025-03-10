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

    console.warn("Setting up form")
    Form.setup(bodyContainer);
    console.warn("Setting up data container")
    DataContainer.setup(bodyContainer);
    console.warn("Finalizing html...")
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
      console.warn("Starting Weather API")
      const weather = new WeatherAPI();
      const input = this.getInput();
      console.log(input)
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
      console.warn("Inputs are finalized and are as follows", input.location, initialDate, endDate)
      try {
        const query = weather.setQuery(input.location, initialDate, endDate);
        console.warn("Finalizing query...", query)
        console.warn("Fetching Data...")
        const obj = await weather.fetchData(query);
        console.warn("Data Fetched. Filtering data...", obj)
        const data = this.filterData(obj);
        console.warn("Updating container...")
        this.updateContainer(data);
      } catch (err) {
        throw new Error(err);
      }
    });
  }

  updateContainer(data) {
    const dataContainer = document.querySelector(".data-container");
    const humidityHolder = document.querySelector(".humidity > p");
    const conditionHolder = document.querySelector(".condition");

    humidityHolder.textContent = data["humidity"];
    conditionHolder.textContent = data["condition"];
    dataContainer.classList.add("is-open");
  }

  filterData(obj) {
    console.log(obj)
    const data = {};
    data["humidity"] = Response.getHumidity(obj.days[0]);
    data["condition"] = Response.getCondition(obj.days[0]);
    console.warn(data);
    return data;
  }

  getInput() {
    const inputs = Array.from(document.querySelectorAll("input:not([type=image])"));
    console.warn(inputs)
    const location = inputs.filter((input) => input.id === "location-input")[0].value
    const initial = this.getDateInput(inputs, "date1-input");
    const end = this.getDateInput(inputs, "date2-input");

    console.warn("Getting all inputs", location, initial, end);    
    return { location, initial, end };
  }

  getDateInput(array, id) {
    const dateValue = array.filter((item) => item.id === id)[0].value
    if (!dateValue) {
      console.warn("Date inputs are empty");
      return { 
        "year": "",
        "month": "",
        "date": ""
      }
    }
    else {
      console.warn("Getting date inputs", year, month, date);
      const [year, month, date] = dateValue.split("-");
      return { year, month, date };
    } 
  }
}
