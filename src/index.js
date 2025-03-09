import { Weather } from "./components/api";
import { Response } from "./components/api";
import { Form, DataContainer } from "./components/ui";
import './css_reset.css'
import './styles.css'

// const weather = new Weather();
// const date1 = weather.setDate("2025","08","19");
// const query = weather.setQuery("budapest", date1);
// const obj = await weather.fetchData(query);

// console.log(Response.getHumidity(obj.days[0]))
// console.log(Response.getCondition(obj.days[0]))
const width = window.innerWidth;
const height = window.innerHeight;
console.log(width, height);

const bodyContainer = document.createElement("div");
bodyContainer.classList.add("body-container");
bodyContainer.style.width = `${width}px`;
bodyContainer.style.height = `${height}px`;

Form.setup(bodyContainer);
DataContainer.setup(bodyContainer);
document.body.append(bodyContainer);
Form.handleSubmit();