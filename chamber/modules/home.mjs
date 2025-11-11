import { Weather } from "./weather.mjs";
import { Spotlights } from "./directory.mjs";

export async function DisplayHomeInformation(currentEventsContainerClass, currentWeatherContainerClass, weatherForecastContainerClass, firstBusinessSpotlightTitleClass, firstBusinessSpotlightContainerClass, secondBusinessSpotlightTitleClass, secondBusinessSpotlightContainerClass, thirdBusinessSpotlightTitleClass, thirdBusinessSpotlightContainerClass) {
    const currentEventsContainer = document.querySelector(currentEventsContainerClass);
    const firstBusinessSpotlightTitle = document.querySelector(firstBusinessSpotlightTitleClass);
    const firstBusinessSpotlightContainer = document.querySelector(firstBusinessSpotlightContainerClass);
    const secondBusinessSpotlightTitle = document.querySelector(secondBusinessSpotlightTitleClass);
    const secondBusinessSpotlightContainer = document.querySelector(secondBusinessSpotlightContainerClass);
    const thirdBusinessSpotlightTitle = document.querySelector(thirdBusinessSpotlightTitleClass);
    const thirdBusinessSpotlightContainer = document.querySelector(thirdBusinessSpotlightContainerClass);

    currentEventsContainer.textContent = 'current event';

    /*localStorage.removeItem('weather')*/
    const lat = 34.736955034682396;
    const long = -82.25368937266042;
    try {
        const weatherString = localStorage.getItem('weather'); 
        let weatherJSON = JSON.parse(weatherString);
        if(weatherJSON === null) {
            let weather = new Weather(lat, long);
            await weather.DisplayCurrentWeatherResults(currentWeatherContainerClass, weather);
            await weather.DisplayWeatherForecastResults(weatherForecastContainerClass, weather);
            localStorage.setItem('weather', JSON.stringify(weather));
        } else {
            let weather = Weather.CopyFromJSON(weatherJSON);
            await weather.DisplayCurrentWeatherResults(currentWeatherContainerClass, weather);
            await weather.DisplayWeatherForecastResults(weatherForecastContainerClass, weather);
            localStorage.setItem('weather', JSON.stringify(weather));
        }
    } catch(error) {
        let weather = new Weather(lat, long);
        await weather.DisplayCurrentWeatherResults(currentWeatherContainerClass, weather);
        await weather.DisplayWeatherForecastResults(weatherForecastContainerClass, weather);
        localStorage.setItem('weather', JSON.stringify(weather));
    }

    firstBusinessSpotlightTitle.textContent = 'business one';
    firstBusinessSpotlightContainer.textContent = 'first business';
    secondBusinessSpotlightTitle.textContent = 'business two';
    secondBusinessSpotlightContainer.textContent = 'second business';
    thirdBusinessSpotlightTitle.textContent = 'business three';
    thirdBusinessSpotlightContainer.textContent = 'third business';

    localStorage.removeItem('spotlights');
    try {
        const spotlightsString = localStorage.getItem('spotlights'); 
        let spotlightsJSON = JSON.parse(spotlightsString);
        if(spotlightsJSON === null) {
            let spotlights = await Spotlights.Factory(false, 1);
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, spotlights);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, spotlights);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, spotlights);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
        } else {
            let spotlights = await Spotlights.CopyFromJSON(spotlightsJSON);
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, spotlights);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, spotlights);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, spotlights);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
        }
    } catch(error) {
            let spotlights = await Spotlights.Factory(false, 1);
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, spotlights);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, spotlights);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, spotlights);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
    }   
}