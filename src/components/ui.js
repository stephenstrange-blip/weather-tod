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
        } else {
          searchBtn.setAttribute("disabled", "true");
        }
      });
    });
  }
}

export class DataContainer {
  static setup(container) {
    const dataSection = document.createElement("section");
    const dataContainer = document.createElement("div");

    dataContainer.classList.add("data-container");
    dataContainer.append(dataSection);

    container.append(dataContainer);
  }

  static setTable(data) {
    const dailyForeCast = data.days;
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const headerRow = document.createElement("tr");

    const caption = document.createElement("caption");
    caption.textContent = data.resolvedAddress;

    let maxPropertyLength = 0;

    // add daily forecast
    dailyForeCast.forEach((day, index) => {
      const dataRow = document.createElement("tr");
      let currentPropertyLength, hasMoreKey;

      // avoid arr[-1]
      if (index > 0) {
        currentPropertyLength = Object.keys(day).length;
        console.warn(currentPropertyLength, maxPropertyLength);
      }

      // to capture all keys because some 'day' item might have
      // snow or precip key, indicating a snow/rain probability
      if (currentPropertyLength > maxPropertyLength) {
        maxPropertyLength = currentPropertyLength;
        console.warn("resetting the headerRow");
        headerRow.textContent = "";
        hasMoreKey = true;
      } else {
        hasMoreKey = false;
      }

      for (const key in day) {
        // if headerRow is cleared, it means current 'day' item
        // has more key properties than the last one
        if (hasMoreKey) {
          const header = document.createElement("th");
          console.log(key);
          header.textContent = key;
          headerRow.append(header);
        }

        const td = document.createElement("td");
        td.id = `${key}-data`;
        td.textContent = day[key];
        dataRow.append(td);
      }
      thead.append(headerRow);
      tbody.append(dataRow);
    });

    table.append(caption, thead, tbody);
    return table;
  }
}
