const completeFormat =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY";

export class WeatherAPI {
  #apiKeyVisualCrossing = "JN9KW5H3RUM2E9KWBBJ4CHCQM";
  #baseTimelineUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";


  async fetchData(query) {
    try {
      const response = await fetch(query, {
        mode: "cors",
        method: "GET",
        "headers" : {}
      });

      const obj = await response.json();
			return obj;

    } catch (err) {
      throw Error(err);
    }
  }

  setQuery(location, date1, date2) {
    let query;
		let base = this.#baseTimelineUrl;

    if (!date1) query = base + `/${location}`;
    if (!!date1 && !date2) query = base + `/${location}/${date1}`;
    if (!!date1 && !!date2) query = base + `/${location}/${date1}/${date2}`;

    query = query + `?key=${this.#apiKeyVisualCrossing}&contentType=json`;
    return query;
  }

  setDate(year, month, day) {
    // date cannot have month or day input without year
    // if year is undefined, so si month and day
    if (!year) return;
    return `${year}-${month}-${day}`;
  }
};

export class Response {

	static getHumidity(day){
			return day.humidity
	}

	static getCondition(day){
			return day.conditions
	}
}