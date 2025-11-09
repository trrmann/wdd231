import { Weather } from "./weather.mjs";

export async function DisplayHomeInformation(currentEventsContainerClass, currentWeatherContainerClass, weatherForecastContainerClass, firstBusinessSpotlightTitleClass, firstBusinessSpotlightContainerClass, secondBusinessSpotlightTitleClass, secondBusinessSpotlightContainerClass, thirdBusinessSpotlightTitleClass, thirdBusinessSpotlightContainerClass) {
    const currentEventsContainer = document.querySelector(currentEventsContainerClass);
    const firstBusinessSpotlightTitle = document.querySelector(firstBusinessSpotlightTitleClass);
    const firstBusinessSpotlightContainer = document.querySelector(firstBusinessSpotlightContainerClass);
    const secondBusinessSpotlightTitle = document.querySelector(secondBusinessSpotlightTitleClass);
    const secondBusinessSpotlightContainer = document.querySelector(secondBusinessSpotlightContainerClass);
    const thirdBusinessSpotlightTitle = document.querySelector(thirdBusinessSpotlightTitleClass);
    const thirdBusinessSpotlightContainer = document.querySelector(thirdBusinessSpotlightContainerClass);

    const lat = 34.736955034682396;
    const long = -82.25368937266042;
    const weather = new Weather(lat, long);

    currentEventsContainer.textContent = 'current event';

    await weather.DisplayCurrentWeatherResults(currentWeatherContainerClass, weather);
    await weather.DisplayWeatherForecastResults(weatherForecastContainerClass, weather);

    firstBusinessSpotlightTitle.textContent = 'business one';
    firstBusinessSpotlightContainer.textContent = 'first business';
    secondBusinessSpotlightTitle.textContent = 'business two';
    secondBusinessSpotlightContainer.textContent = 'second business';
    thirdBusinessSpotlightTitle.textContent = 'business three';
    thirdBusinessSpotlightContainer.textContent = 'third business';
}
