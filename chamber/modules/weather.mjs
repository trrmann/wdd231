export class Weather {
    constructor(lat, long, currentMaxAgeMS=this.GetCurrentMaxAgeMS(), forecastMaxAgeMS=this.GetForecastMaxAgeMS(), units=this.GetUnits(), APIKey=this.GetAPIKey()) {
        this.lat = lat;
        this.long = long;
        this.units = units;
        this.APIKey = APIKey;
        this.currentMaxAgeMS = currentMaxAgeMS;
        this.forecastMaxAgeMS = forecastMaxAgeMS;
        this.lastCurrentFetch = null;
        this.lastForecastFetch = null;
        this.currentChanged = true;
        this.forecastChanged = true;
    }
    static CopyFromJSON(weatherJSON) {
        const weather = new Weather(weatherJSON.lat, weatherJSON.long, weatherJSON.currentMaxAgeMS, weatherJSON.forecastMaxAgeMS, weatherJSON.units, weatherJSON.APIKey);
        weather.currentChanged = weatherJSON.currentChanged;
        weather.currentData = weatherJSON.currentData;
        weather.lastCurrentFetch = weatherJSON.lastCurrentFetch;
        weather.forecastChanged = weatherJSON.forecastChanged;
        weather.forecastData = weatherJSON.forecastData;
        weather.lastForecastFetch = weatherJSON.lastForecastFetch;
        return weather;
    }
    GetAPIKey() {
        if(this.APIKey == null) {
            return '10ef9792635c3a6ce4e14945789be45e';
        } else {
            return this.APIKey;
        }
    }
    GetCurrentMaxAgeMS() {
        if(this.currentMaxAgeMS == null) {
            return 1000*60*15;
        } else {
            return this.currentMaxAgeMS;
        }
    }
    GetForecastMaxAgeMS() {
        if(this.forecastMaxAgeMS == null) {
            return 1000*60*60*3;
        } else {
            return this.forecastMaxAgeMS;
        }
    }
    GetUnits() {
        if(this.units == null) {
            return 'imperial';
        } else {
            return this.units;
        }
    }
    GetUnitSymbol() {
        if(this.GetUnits()==='imperial') {
            return '\u00B0F';
        } else {
            return '\u00B0C';
        }
    }
    GetCurrentWeatherAPIURL(lat, long, units=GetUnits(), APIKey=GetAPIKey())
    {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${APIKey}`;
    }
    GetForecastWeatherAPIURL(lat, long, units=GetUnits(), APIKey=GetAPIKey())
    {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${APIKey}`;
    }
    IsLatDefined() {
        return !(this.lat == null);
    }
    IsLongDefined() {
        return !(this.long == null);
    }
    IsAPIKeyDefined() {
        return !(this.GetAPIKey() == null);
    }
    IsUnitsDefined() {
        return ((this.GetUnits() === 'imperial') | (this.GetUnits() === 'metric'));
    }
    IsDefined() {
        return this.IsLatDefined() & this.IsLongDefined() & this.IsUnitsDefined() & this.IsAPIKeyDefined();
    }
    SetImperial() {
        if(!(this.units === 'imperial')) {
            this.units = 'imperial';
            this.lastCurrentFetch = null;
            this.currentChanged = true;
            this.forecastChanged = true;
        }
    }
    SetMetric() {
        if(!(this.units === 'metric')) {
            this.units = 'metric';
            this.lastCurrentFetch = null;
            this.currentChanged = true;
            this.forecastChanged = true;
        }
    }
    async FetchCurrentWeather() {
        if(this.IsDefined()) {
            try {
                const currentURL = this.GetCurrentWeatherAPIURL(this.lat, this.long, this.GetUnits(), this.GetAPIKey());
                const currentResponse = await fetch(currentURL);
                if(currentResponse.ok) {
                    this.currentData = await currentResponse.json();
                    //console.log(this.data); // testing only
                    this.currentChanged = false;
                    this.lastCurrentFetch = Date.now();
                } else {
                    throw Error(await currentResponse.text());
                }
            } catch(error) {
                console.error(error);
                throw error;
            }
        } else {
            console.error('Fetch current attempted without defining required parameters!');
            throw Error('Fetch current attempted without defining required parameters!');
        }
    }
    GetCurrentFetchMSAge() {
        if(!(this.lastCurrentFetch == null)) {
            return Date.now() - this.lastCurrentFetch;
        } else {
            return null;
        }
    }
    GetCurrentFetchExpired() {
        if(this.GetCurrentFetchMSAge() == null) {
            return true;
        } else {
            return this.GetCurrentFetchMSAge() > this.currentMaxAgeMS;
        }
    }
    async GetCurrentTempNumeric() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return await this.currentData.main.temp;
        } else {
            return null;
        }
    }
    async GetCurrentTemp() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return `${Math.round(await this.GetCurrentTempNumeric())}${this.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetCurrentDescription() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return await this.currentData.weather[0].description;
        } else {
            return null;
        }
    }
    async GetCurrentIconName() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return await this.currentData.weather[0].icon;
        } else {
            return null;
        }
    }
    async GetCurrentIconURL() {
        return `https://openweathermap.org/img/w/${await this.GetCurrentIconName()}.png`;
    }
    async GetCurrentHighTempNumeric() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return await this.currentData.main.temp_max;
        } else {
            return null;
        }
    }
    async GetCurrentHighTemp() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return `${Math.round(await this.GetCurrentHighTempNumeric())}${this.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetCurrentLowTempNumeric() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return await this.currentData.main.temp_min;
        } else {
            return null;
        }
    }
    async GetCurrentLowTemp() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return `${Math.round(await this.GetCurrentLowTempNumeric())}${this.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetCurrentHumidity() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            return await this.currentData.main.humidity;
        } else {
            return null;
        }
    }
    async GetCurrentSunrise() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            const sunriseMS = await this.currentData.sys.sunrise;
            const sunrise = new Date();
            sunrise.setTime(sunriseMS*1000);
            return sunrise.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true});
        } else {
            return null;
        }
    }
    async GetCurrentSunset() {
        if(this.IsDefined()) {
            if(this.GetCurrentFetchExpired()) {
                await this.FetchCurrentWeather();
            }
            const sunsetMS = await this.currentData.sys.sunset;
            const sunset = new Date();
            sunset.setTime(sunsetMS*1000);
            return sunset.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true});
        } else {
            return null;
        }
    }
    async FetchWeatherForcast() {
        if(this.IsDefined()) {
            try {
                const forecastURL = this.GetForecastWeatherAPIURL(this.lat, this.long, this.GetUnits(), this.GetAPIKey());
                const forecastResponse = await fetch(forecastURL);
                if(forecastResponse.ok) {
                    this.forecastData = await forecastResponse.json();
                    console.log(this.forecastData); // testing only
                    this.forecastChanged = false;
                    this.lastForecastFetch = Date.now();
                } else {
                    throw Error(await forecastResponse.text());
                }
            } catch(error) {
                console.error(error);
                throw error;
            }
        } else {
            console.error('Fetch forecast attempted without defining required parameters!');
            throw Error('Fetch forecast attempted without defining required parameters!');
        }
    }
    GetForecastFetchMSAge() {
        if(!(this.lastForecastFetch == null)) {
            return Date.now() - this.lastForecastFetch;
        } else {
            return null;
        }
    }
    GetForecastFetchExpired() {
        if(this.GetForecastFetchMSAge() == null) {
            return true;
        } else {
            return this.GetForecastFetchMSAge() > this.forecastMaxAgeMS;
        }
    }
    async GetForecaseArrayIndexForSpecifiedHours(hours) {
        const current = Date.now();
        const start = (new Date(current));
        start.setHours(start.getHours()+hours);
        const end = new Date(start);
        let range = 0;
        end.setHours(end.getHours()+range);
        let forecasts = this.forecastData.list.filter((element)=>{return ((new Date(element.dt_txt))>=start)&((new Date(element.dt_txt))<end)});
        let resultCount = forecasts.length;
        while(resultCount<1){
            range++;
            end.setHours(end.getHours()+range);
            forecasts = this.forecastData.list.filter((element)=>{return ((new Date(element.dt_txt))>=start)&((new Date(element.dt_txt))<end)});
            resultCount = forecasts.length;
        }
        return this.forecastData.list.indexOf(forecasts[0]);
    }
    async GetForecastTempNumeric(hours) {
        if(this.IsDefined()) {
            if(this.GetForecastFetchExpired()) {
                await this.FetchWeatherForcast();
            }
            return await this.forecastData.list[await this.GetForecaseArrayIndexForSpecifiedHours(hours)].main.temp;
        } else {
            return null;
        }
    }
    async GetForecastTemp(hours) {
        if(this.IsDefined()) {
            if(this.GetForecastFetchExpired()) {
                await this.FetchWeatherForcast();
            }
            return `${Math.round(await this.GetForecastTempNumeric(hours))}${this.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetTodayForecastTemp() {
        if(this.IsDefined()) {
            if(this.GetForecastFetchExpired()) {
                await this.FetchWeatherForcast();
            }
            return await this.GetForecastTemp(1);
        } else {
            return null;
        }
    }
    async GetTomorrowForecastTemp() {
        if(this.IsDefined()) {
            if(this.GetForecastFetchExpired()) {
                await this.FetchWeatherForcast();
            }
            return await this.GetForecastTemp(24);
        } else {
            return null;
        }
    }
    async GetAfterTomorrowForecastTemp() {
        if(this.IsDefined()) {
            if(this.GetForecastFetchExpired()) {
                await this.FetchWeatherForcast();
            }
            return await this.GetForecastTemp(48);
        } else {
            return null;
        }
    }
    async GetForecastDescription(hours) {
        if(this.IsDefined()) {
            if(this.GetForecastFetchExpired()) {
                await this.FetchWeatherForcast();
            }
            const index = await this.GetForecaseArrayIndexForSpecifiedHours(hours);
            return await this.forecastData.list[index].weather[0].description;
        } else {
            return null;
        }
    }
    async GetForecastIconName(hours) {
        if(this.IsDefined()) {
            if(this.GetForecastFetchExpired()) {
                await this.FetchWeatherForcast();
            }
            return await this.forecastData.list[this.GetForecaseArrayIndexForSpecifiedHours(hours)].weather[0].icon;
        } else {
            return null;
        }
    }
    async GetForecastIconURL(hours) {
        return await `https://openweathermap.org/img/w/${this.GetForecastIconName(hours)}.png`;
    }
    async DisplayCurrentWeatherResults(currentWeatherContainerClass, weather) {
        const currentWeatherContainer = document.querySelector(currentWeatherContainerClass);

        const icon = document.createElement('img');
        const iconURL = await weather.GetCurrentIconURL();
        const desc = await weather.GetCurrentDescription();
        icon.src = iconURL;
        icon.alt = `${desc} icon`;
        icon.classList.add('current-weather-icon');
        currentWeatherContainer.appendChild(icon);

        const curTempContainer = document.createElement('p');
        const curTemp = await weather.GetCurrentTemp();
        curTempContainer.textContent = curTemp;
        curTempContainer.classList.add('current-temp');
        currentWeatherContainer.appendChild(curTempContainer);

        const curDescContainer = document.createElement('p');
        curDescContainer.textContent = desc;
        curDescContainer.classList.add('current-weather-desc');
        currentWeatherContainer.appendChild(curDescContainer);

        const curHighTempContainer = document.createElement('p');
        const high = await weather.GetCurrentHighTemp();
        curHighTempContainer.textContent = `High: ${high}`;
        curHighTempContainer.classList.add('current-hight-temp');
        currentWeatherContainer.appendChild(curHighTempContainer);

        const curLowTempContainer = document.createElement('p');
        const low = await weather.GetCurrentLowTemp();
        curLowTempContainer.textContent = `Low: ${low}`;
        curLowTempContainer.classList.add('current-low-temp');
        currentWeatherContainer.appendChild(curLowTempContainer);

        const curHumidityContainer = document.createElement('p');
        const humidity = await weather.GetCurrentHumidity();
        curHumidityContainer.textContent = `Humidity: ${humidity}%`;
        curHumidityContainer.classList.add('current-humidity');
        currentWeatherContainer.appendChild(curHumidityContainer);

        const curSunriseContainer = document.createElement('p');
        const sunrise = await weather.GetCurrentSunrise();
        curSunriseContainer.textContent = `Sunrise: ${sunrise}`;
        curSunriseContainer.classList.add('current-sunrise');
        currentWeatherContainer.appendChild(curSunriseContainer);

        const curSunsetContainer = document.createElement('p');
        const sunset = await weather.GetCurrentSunset();
        curSunsetContainer.textContent = `Sunset: ${sunset}`;
        curSunsetContainer.classList.add('current-sunset');
        currentWeatherContainer.appendChild(curSunsetContainer);
    }
    async DisplayWeatherForecastResults(weatherForecastContainerClass, weather) {
        const weatherForecastContainer = document.querySelector(weatherForecastContainerClass);
        const date = new Date(Date.now());
        date.setDate(date.getDate()+1);
        const tomorrowDay = date.toLocaleDateString('en-US',{weekday:'long'});
        date.setDate(date.getDate()+1);
        const afterTomorrowDay = date.toLocaleDateString('en-US',{weekday:'long'});

        const forecastTodayContainer = document.createElement('p');
        const forecastTodayValueContainer = document.createElement('span');
        const today = await weather.GetTodayForecastTemp();
        forecastTodayValueContainer.textContent = today;
        forecastTodayValueContainer.classList.add('current-forecast-today-value');
        forecastTodayContainer.textContent = 'Today: ';
        forecastTodayContainer.appendChild(forecastTodayValueContainer);
        forecastTodayContainer.classList.add('current-forecast-today');
        weatherForecastContainer.appendChild(forecastTodayContainer);

        const forecastTomorrowContainer = document.createElement('p');
        const forecastTomorrowValueContainer = document.createElement('span');
        const tomorrow = await weather.GetTomorrowForecastTemp();
        forecastTomorrowValueContainer.textContent = tomorrow;
        forecastTomorrowValueContainer.classList.add('current-forecast-tomorrow-value');
        forecastTomorrowContainer.textContent = `${tomorrowDay}: `;
        forecastTomorrowContainer.appendChild(forecastTomorrowValueContainer);
        forecastTomorrowContainer.classList.add('current-forecast-tomorrow');
        weatherForecastContainer.appendChild(forecastTomorrowContainer);

        const forecastAfterTomorrowContainer = document.createElement('p');
        const forecastAfterTomorrowValueContainer = document.createElement('span');
        const afterTomorrow = await weather.GetAfterTomorrowForecastTemp();
        forecastAfterTomorrowValueContainer.textContent = afterTomorrow;
        forecastAfterTomorrowValueContainer.classList.add('current-forecast-afterTomorrow-value');
        forecastAfterTomorrowContainer.textContent = `${afterTomorrowDay}: `;
        forecastAfterTomorrowContainer.appendChild(forecastAfterTomorrowValueContainer);
        forecastAfterTomorrowContainer.classList.add('current-forecast-afterTomorrow');
        weatherForecastContainer.appendChild(forecastAfterTomorrowContainer);
    }
}