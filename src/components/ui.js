import searchIcon from "/home/jmpi/vscode_repos/weather-tod/src/assets/searchIcon.svg";

export class Form {
  static setup(container) {
    const formDiv = document.createElement("div");
    const form = document.createElement("form");

    const locationInput = document.createElement("input");
    const date1Input = document.createElement("input");
    const date2Input = document.createElement("input");
    const searchInput = document.createElement("input");

    const locationPara = document.createElement("p");
    const date1Para = document.createElement("p");
    const date2Para = document.createElement("p");
    const searchPara = document.createElement("p");

    form.classList.add("form");
    formDiv.classList.add("form-div")
    locationInput.id = "location-input";
    date1Input.id = "date1-input";
    date2Input.id = "date2-input";

    locationInput.type = "text";
    date1Input.type = "date";
    date1Input.min = "2000-01-01";
    date1Input.max = "2050-12-30";
    date1Input.value = "2000-01-01";

    date2Input.type = "date";
    date2Input.min = date1Input.value;
    date2Input.max = "2050-12-31";
    date2Input.value = "2000-01-01";

    searchInput.type = "image";
    searchInput.src = searchIcon;
    searchInput.alt = "O";

    locationPara.append(locationInput);
    date1Para.append(date1Input);
    date2Para.append(date2Input);
    searchPara.append(searchInput)
    form.append(locationPara, date1Para, date2Para, searchPara);
    formDiv.append(form);
    container.append(formDiv);
  }
}

export class DataContainer {
  static setup(container) {
    const dataContainer = document.createElement("div");
    const dataSection = document.createElement("section");
    
    const condition = document.createElement("div");
    const humidity = document.createElement("div");

    const humidityLabel = document.createElement("label");
    const humidityData = document.createElement("p");

    humidityData.id = "humidity-data";
    humidityLabel.for = humidityData.id;

    humidityLabel.textContent = "Humidity: ";
    humidityData.textContent = "60.5";
    condition.textContent = "Partially Cloudy";

    condition.classList.add("condition");
    humidity.classList.add("humidity");
    dataContainer.classList.add("data-container");

    humidity.append(humidityLabel, humidityData);
    dataSection.append(humidity);
    dataContainer.append(condition, dataSection);
    container.append(dataContainer);
  } 
}
