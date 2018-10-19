const fetch = require("node-fetch");

console.log("Hubspot Coding Challenge Solution");
const requestUrl =
  "https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=3fa5c37becc42e9ff81b9ac40782";
const submitUrl =
  "https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=3fa5c37becc42e9ff81b9ac40782";

const countryExistInArray = (countryName, attendeeList) => {
  let countryExist = false;
  attendeeList.map(data => {
    if (data.name === countryName) {
      countryExist = true;
    }
  });
  return countryExist;
};

const getIncrementedCount = (countryName, attendeeList) => {
  attendeeList.find(data => data.name === countryName).countryRepCount++;
  return attendeeList;
};

const appendCountriesToMap = (country, attendeeList) => {
  countryExistInArray(country, attendeeList)
    ? (attendeeList = getIncrementedCount(country, attendeeList))
    : attendeeList.push({ name: country, countryRepCount: 1, dates: [] });
  return attendeeList;
};

const getDaysDifference = (date1, date2) => {
  var date1 = new Date(date1);
  var date2 = new Date(date2);
  var timeDiff = Math.abs(date2.getTime() - date1.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
};
const isEmptyArray = array => !Array.isArray(array) || !array.length;

const addorUpdateDates = (attendeeList, email, country) => {
  const curCountryDates = attendeeList.find(data => data.name === country)
    .dates;
  const currDateinDateArr = curCountryDates.find(data => data.date == date1);
  (!isEmptyArray(curCountryDates) && currDateinDateArr === undefined) ||
  isEmptyArray(curCountryDates)
    ? curCountryDates.push({
        date: date1,
        attendeeCount: 1,
        attendees: [email]
      })
    : currDateinDateArr.attendeeCount++ &&
      currDateinDateArr.attendees.push(email);
  return attendeeList;
};

const appendDatesToMap = (attendeeList, country, availableDates, email) => {
  for (var i = 0; i < availableDates.length; i++) {
    date1 = availableDates[i];
    date2 = availableDates[i + 1];
    diffDays = getDaysDifference(date1, date2);
    if (diffDays === 1) {
      attendeeList = addorUpdateDates(attendeeList, email, country);
    }
  }
  return attendeeList;
};

const attendeeListSortFn = (x, y) => {
  if (x.attendeeCount === y.attendeeCount) {
    if (x.date < y.date) {
      return 1;
    }
    return -1;
  }
  if (x.attendeeCount > y.attendeeCount) {
    return 1;
  } else {
    return -1;
  }
};
const sortAttendeeList = attendeeList => {
  attendeeList.map(countryData =>
    countryData.dates.sort((x, y) => attendeeListSortFn(x, y)).reverse()
  );
  return attendeeList;
};

const formatAttendeeListOutput = attendeeList => {
  let outputAttendeeList = [];
  outputAttendeeList = attendeeList.map(({ dates, name }) => {
    let attendeeCount = 0;
    let startDate = null;
    let attendees = [];
    if (dates[0] !== undefined) {
      attendeeCount = dates[0].attendeeCount;
      attendees = dates[0].attendees;
      startDate = dates[0].date;
    }
    return {
      attendeeCount,
      attendees,
      name,
      startDate
    };
  });
  return outputAttendeeList;
};

const fetchdata = async requestUrl => {
  let data = [];
  await fetch(requestUrl)
    .then(res => res.json())
    .then(res => (data = res.partners))
    .catch(error =>
      console.log(error + " Error occurred while requesting data")
    );
  return data;
};

const processData = data => {
  let attendeeList = [];
  data.map(({ country, availableDates, email }) => {
    //Adding, countries in attendeeList Map
    attendeeList = appendCountriesToMap(country, attendeeList);
    availableDates.sort();
    //mapping though dates and maintaing counts
    attendeeList = appendDatesToMap(
      attendeeList,
      country,
      availableDates,
      email
    );
  });
  attendeeList = sortAttendeeList(attendeeList);
  //console.log(JSON.stringify(attendeeList, null, 3));
  attendeeListOutput = formatAttendeeListOutput(attendeeList);
  return attendeeListOutput;
};

const submitData = async (submitUrl, countries) => {
  let response = [];
  await fetch(submitUrl, {
    body: JSON.stringify({ countries: countries }),
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    referrer: "no-referrer"
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => (response = res))
    .catch(error =>
      console.log(error + "Error Occurred while Submitting Output")
    );
  return response;
};

const main = async () => {
  const data = await fetchdata(requestUrl);
  const countries = processData(data);
  const response = await submitData(submitUrl, countries);
  console.log(
    "The response from server is " + JSON.stringify(response, null, 3)
  );
  const str = JSON.stringify(countries, null, 3);
  console.log(str);
};

main();
