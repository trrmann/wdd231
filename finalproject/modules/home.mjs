export async function DisplayHomeInformation(homeContainerClass, news, weather, data) {
    const homeContainer = document.querySelector(homeContainerClass);
    const heroSection = document.createElement('div');
    const heroPicture = document.createElement('picture');
    const hero96Source = document.createElement('source');
    const hero192Source = document.createElement('source');
    const hero384Source = document.createElement('source');
    const hero682Source = document.createElement('source');
    const heroImage = document.createElement('img');
    const callToAction = document.createElement('button');
    const homeHeader = document.createElement('h1');
    const contentSection = document.createElement('div');
    const currentEventsSection = document.createElement('section');
    const currentEventsSectionHeader = document.createElement('h2');
    const currentEventsSectionContainer = document.createElement('div');
    const weatherSection = document.createElement('section');
    const weatherSectionHeader = document.createElement('h2');
    const weatherSectionContainer = document.createElement('div');
    const forecastSection = document.createElement('section');
    const forecastSectionHeader = document.createElement('h2');
    const forecastSectionContainer = document.createElement('div');
    const siteSpotlightSection = document.createElement('section');
    const siteSpotlightSectionHeader = document.createElement('h2');
    const siteSpotlightSectionContainer = document.createElement('div');
    const foodSpotlightSection = document.createElement('section');
    const foodSpotlightSectionHeader = document.createElement('h2');
    const foodSpotlightSectionContainer = document.createElement('div');
    const attractionSpotlightSection = document.createElement('section');
    const attractionSpotlightSectionHeader = document.createElement('h2');
    const attractionSpotlightSectionContainer = document.createElement('div');

    heroSection.classList.add('heroSection');
    heroPicture.classList.add('heroPicture');
    hero96Source.classList.add('hero96Source');
    hero192Source.classList.add('hero192Source');
    hero384Source.classList.add('hero384Source');
    hero682Source.classList.add('hero682Source');
    heroImage.classList.add('heroImage');
    callToAction.classList.add('callToAction');
    callToAction.classList.add('science-gothic-regular');
    homeHeader.classList.add('homeHeader');
    homeHeader.classList.add('science-gothic-regular');
    contentSection.classList.add('contentSection');
    currentEventsSection.classList.add('currentEventsSection');
    currentEventsSectionHeader.classList.add('currentEventsSectionHeader');
    currentEventsSectionContainer.classList.add('currentEventsSectionContainer');
    weatherSection.classList.add('weatherSection');
    weatherSectionHeader.classList.add('weatherSectionHeader');
    weatherSectionContainer.classList.add('weatherSectionContainer');
    forecastSection.classList.add('forecastSection');
    forecastSectionHeader.classList.add('forecastSectionHeader');
    forecastSectionContainer.classList.add('forecastSectionContainer');
    siteSpotlightSection.classList.add('siteSpotlightSection');
    siteSpotlightSectionHeader.classList.add('siteSpotlightSectionHeader');
    siteSpotlightSectionContainer.classList.add('siteSpotlightSectionContainer');
    foodSpotlightSection.classList.add('foodSpotlightSection');
    foodSpotlightSectionHeader.classList.add('foodSpotlightSectionHeader');
    foodSpotlightSectionContainer.classList.add('foodSpotlightSectionContainer');
    attractionSpotlightSection.classList.add('attractionSpotlightSection');
    attractionSpotlightSectionHeader.classList.add('attractionSpotlightSectionHeader');
    attractionSpotlightSectionContainer.classList.add('attractionSpotlightSectionContainer');

    hero96Source.media = '(max-width:96px)';
    hero96Source.srcset = 'images/MachuPicchu.96.webp';
    hero192Source.media = '(max-width:192px)';
    hero192Source.srcset = 'images/MachuPicchu.192.webp';
    hero384Source.media = '(max-width:384px)';
    hero384Source.srcset = 'images/MachuPicchu.384.webp';
    hero682Source.media = '(max-width:682px)';
    hero682Source.srcset = 'images/MachuPicchu.682.webp';
    heroImage.src = 'images/MachuPicchu.1024.webp';
    heroImage.alt = 'Hero Image';
    callToAction.textContent = 'Explore';
    homeHeader.textContent = 'Home';
    currentEventsSectionHeader.textContent = 'Current Events / News';
    weatherSectionHeader.textContent = 'Weather';
    forecastSectionHeader.textContent = 'Forecast';
    siteSpotlightSectionHeader.textContent = 'Site Spotlight';
    foodSpotlightSectionHeader.textContent = 'Food Spotlight';
    attractionSpotlightSectionHeader.textContent = 'Attraction Spotlight';

    heroPicture.appendChild(hero96Source);
    heroPicture.appendChild(hero192Source);
    heroPicture.appendChild(hero384Source);
    heroPicture.appendChild(hero682Source);
    heroPicture.appendChild(heroImage);
    heroSection.appendChild(heroPicture);
    heroSection.appendChild(callToAction);
    currentEventsSection.appendChild(currentEventsSectionHeader);
    currentEventsSection.appendChild(currentEventsSectionContainer);
    const displayTimeMS = 10000;
    const cycles = -1;
    news.DisplayNewsSpotlightResults(currentEventsSectionContainer, displayTimeMS, cycles);
    contentSection.appendChild(currentEventsSection);
    siteSpotlightSection.appendChild(siteSpotlightSectionHeader);
    siteSpotlightSection.appendChild(siteSpotlightSectionContainer);
    let currentCityId = 'Cusco';
    weatherSection.appendChild(weatherSectionHeader);
    weatherSection.appendChild(weatherSectionContainer);
    contentSection.appendChild(weatherSection);
    forecastSection.appendChild(forecastSectionHeader);
    forecastSection.appendChild(forecastSectionContainer);
    data.DisplaySiteSpotlightResults(siteSpotlightSectionContainer, displayTimeMS, cycles, function(cityId) {
        currentCityId=cityId;
        weather.DisplayWeatherSpotlightResults(weatherSectionContainer, function() {
            return currentCityId;
        });
        weather.DisplayForecastSpotlightResults(forecastSectionContainer, function() {
            return currentCityId;
        });
    });
    weather.DisplayWeatherSpotlightResults(weatherSectionContainer, function() {
        return currentCityId;
    });
    weather.DisplayForecastSpotlightResults(forecastSectionContainer, function() {
        return currentCityId;
    });
    contentSection.appendChild(forecastSection);
    contentSection.appendChild(siteSpotlightSection);
    foodSpotlightSection.appendChild(foodSpotlightSectionHeader);
    foodSpotlightSection.appendChild(foodSpotlightSectionContainer);
    data.DisplayFoodSpotlightResults(foodSpotlightSectionContainer, displayTimeMS, cycles)
    contentSection.appendChild(foodSpotlightSection);
    attractionSpotlightSection.appendChild(attractionSpotlightSectionHeader);
    attractionSpotlightSection.appendChild(attractionSpotlightSectionContainer);
    data.DisplayAttractionSpotlightResults(attractionSpotlightSectionContainer, displayTimeMS, cycles)
    contentSection.appendChild(attractionSpotlightSection);

    homeContainer.appendChild(heroSection);
    homeContainer.appendChild(homeHeader);
    homeContainer.appendChild(contentSection);
}