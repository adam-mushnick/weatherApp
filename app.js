const form = document.querySelector('#searchForm');
const cardContainer = document.querySelector('.cardContainer');
const weatherCard = document.querySelector('.weatherCard');
const cityName = document.querySelector('#city-name');
const temperature = document.querySelectorAll('#temperature');
const dayOfWeek = document.querySelector('#day-of-week');
const todaysDate = document.querySelector('#todays-date');
const forecastDay = document.querySelectorAll('#forecastDay');
const condition = document.querySelector('#condition');
const conditionIcon = document.querySelectorAll('#condition-icon');
const precipitation = document.querySelector('#precipitation');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const changeBtn = document.querySelector('.changeBtn');
const key = 'd6594d58a8454f2aa25193302231203';

const splashPage = document.querySelector('.splash-page');
const secondDiv = document.querySelector('.second-div');
const thirdDiv = document.querySelector('.third-div');

// splashPage.addEventListener('click', () => {
//   secondDiv.classList.toggle('show');
//   splashPage.classList.toggle('clicked');
//   thirdDiv.classList.toggle('show-me');
// });

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  //show cards
  secondDiv.classList.toggle('show');
  splashPage.classList.toggle('clicked');
  thirdDiv.classList.toggle('show-me');

  const location = form.elements.query.value;
  const config = { params: { key: key, q: location, days: 10 } };
  //axios makes api fetch requests
  const res = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json`,
    config
  );
  console.log(res.data);
  dayOfWeek.innerHTML = getDayOfWeek(res.data.current.last_updated_epoch);
  todaysDate.innerHTML = getDate(res.data.current.last_updated_epoch);
  forecastDay[0].innerHTML = getForecastDay(
    res.data.forecast.forecastday[0].date
  );
  forecastDay[1].innerHTML = getForecastDay(
    res.data.forecast.forecastday[1].date
  );
  forecastDay[2].innerHTML = getForecastDay(
    res.data.forecast.forecastday[2].date
  );
  cityName.innerHTML = res.data.location.name;
  temperature[0].innerHTML = `${res.data.current.temp_f} °F`;
  temperature[1].innerHTML = `${res.data.current.temp_f} °F`;
  temperature[2].innerHTML = `${res.data.forecast.forecastday[1].day.maxtemp_f} °F`;
  temperature[3].innerHTML = `${res.data.forecast.forecastday[2].day.maxtemp_f} °F`;
  condition.innerHTML = res.data.current.condition.text;
  conditionIcon[0].src = res.data.current.condition.icon;
  conditionIcon[1].src = res.data.current.condition.icon;
  conditionIcon[2].src = res.data.forecast.forecastday[1].day.condition.icon;
  conditionIcon[3].src = res.data.forecast.forecastday[2].day.condition.icon;
  precipitation.innerHTML = `${res.data.current.precip_in} in`;
  humidity.innerHTML = `${res.data.current.humidity}%`;
  wind.innerHTML = `${res.data.current.wind_mph} mi/hr`;
  //day or night
  if (res.data.current.is_day) {
    weatherCard.classList.add('gradient-day');
    weatherCard.classList.remove('gradient-night', 'text-white');
  } else {
    weatherCard.classList.remove('gradient-day');
    weatherCard.classList.add('gradient-night', 'text-white');
  }

  form.elements.query.value = '';
  // form.style.display = 'none';
});

//get date from epoch (# of seconds since Jan 1st 1970)
const getDate = (epoch) => {
  //javascript uses ms not sec
  const date = new Date(epoch * 1000);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return (dateString = date.toLocaleDateString('en-US', options)); // "March 24, 2022"
};

const getDayOfWeek = (epoch) => {
  const date = new Date(epoch * 1000);
  const options = { weekday: 'long' };
  let dayOfWeek = date.toLocaleDateString('en-US', options); // "Thursday"
  return dayOfWeek;
};

const getForecastDay = (dateString) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const date = new Date(dateString);
  const dayOfWeekIndex = date.getDay();
  const dayOfWeek = weekdays[dayOfWeekIndex + 1];
  return dayOfWeek;
};

changeBtn.addEventListener('click', () => {
  //show cards
  secondDiv.classList.toggle('show');
  splashPage.classList.toggle('clicked');
  thirdDiv.classList.toggle('show-me');
});
