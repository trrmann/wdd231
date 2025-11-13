import { Weather } from "./weather.mjs";
import { Spotlights } from "./directory.mjs";

export async function DisplayHomeInformation(currentEventsContainerClass, currentWeatherContainerClass, weatherForecastContainerClass, firstBusinessSpotlightTitleClass, firstBusinessSpotlightContainerClass, secondBusinessSpotlightTitleClass, secondBusinessSpotlightContainerClass, thirdBusinessSpotlightTitleClass, thirdBusinessSpotlightContainerClass) {
    const darkModeButton = document.querySelector('.darkMode');
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

    /*localStorage.removeItem('spotlights');/**/
    try {
        const spotlightsString = localStorage.getItem('spotlights'); 
        let spotlightsJSON = JSON.parse(spotlightsString);
        const weighted = false;
        const weight = 1;
        if(spotlightsJSON === null) {
            let spotlights = await Spotlights.Factory(weighted, weight);
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
        } else {
            let spotlights = await Spotlights.CopyFromJSON(spotlightsJSON);
            if(!(spotlights.weighted===weighted && spotlights.GetGoldToSilverRatio()===weight)) {
                spotlights = await Spotlights.Factory(weighted, weight);
            }
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
        }
    } catch(error) {
            let spotlights = await Spotlights.Factory(weighted, weight);
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
    }   
}