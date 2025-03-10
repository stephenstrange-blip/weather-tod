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
    formDiv.classList.add("form-div");
    locationInput.id = "location-input";
    date1Input.id = "date1-input";
    date2Input.id = "date2-input";

    locationInput.type = "text";
    locationInput.setAttribute("required", "true");

    date1Input.type = "date";
    date1Input.min = "2000-01-01";
    date1Input.max = "2050-12-30";
    date1Input.value = "0000-00-00";
    
    date2Para.textContent = "-";
    date2Input.type = "date";
    date2Input.min = date1Input.value;
    date2Input.max = "2050-12-31";
    date2Input.value = "0000-00-00";

    searchInput.type = "image";
    searchInput.src = searchIcon;
    searchInput.alt = "O";
    searchInput.setAttribute("disabled", "true");

    locationPara.append(locationInput);
    date1Para.append(date1Input);
    date2Para.append(date2Input);
    searchPara.append(searchInput);
    form.append(locationPara, date1Para, date2Para, searchPara);
    formDiv.append(form);
    container.append(formDiv);
  }

  static handleValidate() {
    const searchBtn = document.querySelector("input[type=image]");
    const [location, initalDate, endDate] =
      document.querySelectorAll("input[id$=input]");
    const inputs = [location, initalDate, endDate];

    const validate = (input) => {
      // console.warn(input.validity);
      if (input.validity.rangeUnderflow)
        input.setCustomValidity("Date too early or invalid input!");
      else if (input.validity.rangeOverflow)
        input.setCustomValidity("Date too far or invalid input!");
      else if (input.validity.valueMissing)
        input.setCustomValidity("Invalid or missing input!");
      else input.setCustomValidity("");
    };

    inputs.forEach((input) => {
      input.addEventListener("invalid", (event) => event.preventDefault());

      input.addEventListener("input", () => {
        validate(input);
        // console.log(input.reportValidity());

        if (
          location.validity.valid &&
          initalDate.validity.valid &&
          endDate.validity.valid
        ) {
          searchBtn.removeAttribute("disabled");
          // console.warn("Button is now clickable!");
        } else {
          searchBtn.setAttribute("disabled", "true");
          // console.warn("Button not clickable!");
          // console.warn(input.validationMessage, input);
        }
      });
    });
  }
}

export class DataContainer {

  static setup(container) {
    const dataSection = document.createElement("section");
    const dataContainer = document.createElement("div");

    const condition = document.createElement("div");
    const humidity = document.createElement("div");

    const humidityLabel = document.createElement("label");
    const humidityData = document.createElement("p");

    humidityData.id = "humidity-data";
    humidityLabel.for = humidityData.id;

    humidityLabel.textContent = "Humidity: ";
    condition.classList.add("condition");
    humidity.classList.add("humidity");
    dataContainer.classList.add("data-container");

    humidity.append(humidityLabel, humidityData);
    dataSection.append(humidity);
    dataContainer.append(condition, dataSection);
    container.append(dataContainer);
  }
}
