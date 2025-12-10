import { GetNow } from "./date.mjs";
import { SetPreferenceObject, GetPreferenceObject, HasPreference } from "./preference.mjs";
import { Data } from "./data.mjs"

export class MultiWeather {
    static debug = {
        active: true,
        functionList: [
            "//Factory()",
            "//IsLastBuiltExpired()",
            "//SetLastBuilt()",
            "//GetData()",
            "//GetCurrentData()",
            "//SetLocationsAsCapitals()",
            "//SetLocationsByCityIds()",
            "//SetLocationsByCities()",
            "//SetLocationsByDepartamentoIds()",
            "//SetLocationsByDepartamentos()"
        ],
        valueList: [
            "functionCalled",
            "data",
            "currentData",
            "capitalIds",
            "//cityids",
            "//cityData",
            "//filterCalled",
            "//city",
            "//cityId",
            "//match",
            "//filterCityData",
            "//cities",
            "//forEachCalled",
            "//cityLatitude",
            "//cityLongitude",
            "//cityKey",
            "//cityKeyString",
            "//mapKeys",
            "//keyNotMatch",
            "//cityName",
            "//index",
            "//indexKey",
            "//indexKeyString",
            "//weather",
            "//locations",
            "//locationMap",
            "//departamentoIdsIn",
            "//departamentos",
            "//filterDepartamentors",
            "//departamento",
            "//departamentoId",
            "//departamentosIn",
            "//departamentoLatitude",
            "//departamentoLongitude",
            "//departamentoKey",
            "//departamentoName",
            "hasPreference",
            "key",
            "isLastBuiltExpired",
            "lastBuilt"
        ]
    }
    static debugMessage(message, functionName, valueName, messageNextLine=true) {
        if(MultiWeather.debug.active) {
            if(MultiWeather.debug.functionList.includes(functionName)) {
                if(MultiWeather.debug.valueList.includes(valueName)) {
                    if(messageNextLine) {
                        console.log(`${functionName} - ${valueName}`);
                        console.log(message);
                    } else {
                        console.log(`${functionName} - ${valueName} - ${message}`);
                    }
                }
            }
        }
    }
    constructor() {
        this.data = null;
        this.locationMap = {}
        this.locations = [];
        this.lastBuilt = null
        this.disabled = true;
    }
    IsLastBuiltExpired(){
        Data.debugMessage("IsLastBuiltExpired()", "IsLastBuiltExpired()", "functionCalled", false);
        const lastBuiltMS = this.GetLastBuilt();
        Data.debugMessage(lastBuiltMS, "IsLastBuiltExpired()", "lastBuilt");
        const lastBuilt = Date(lastBuiltMS);
        Data.debugMessage(lastBuilt, "IsLastBuiltExpired()", "lastBuilt");
        if(lastBuilt==null) {
            return true;
        } else {
            const expireMS = this.GetBuildExpireMS();
            Data.debugMessage(expireMS, "IsLastBuiltExpired()", "expireMS");
            const buildExpireMS = lastBuiltMS + expireMS;
            Data.debugMessage(buildExpireMS, "IsLastBuiltExpired()", "buildExpire");
            const buildExpire = Date(buildExpireMS);
            Data.debugMessage(buildExpire, "IsLastBuiltExpired()", "buildExpire");
            const nowMS = Date.now();
            Data.debugMessage(nowMS, "IsLastBuiltExpired()", "now");
            const now = Date(nowMS);
            Data.debugMessage(now, "IsLastBuiltExpired()", "now");
            const match = (nowMS >= buildExpireMS);
            Data.debugMessage(match, "IsLastBuiltExpired()", "match");
            return match;
        }
    }
    GetLastBuilt(){
        Data.debugMessage("GetLastBuilt()", "GetLastBuilt()", "functionCalled", false);
        const lastBuilt = this.lastBuilt;
        Data.debugMessage(lastBuilt, "GetLastBuilt()", "lastBuilt");
        return lastBuilt;
    }
    SetLastBuilt(builtDatetime){
        Data.debugMessage("SetLastBuilt()", "SetLastBuilt()", "functionCalled", false);
        const builtDatetimeIn = builtDatetime;
        Data.debugMessage(builtDatetimeIn, "SetLastBuilt()", "builtDatetimeIn");
        this.lastBuilt = builtDatetimeIn;
    }
    GetBuildExpireMS(){
        Data.debugMessage("GetBuildExpireMS()", "GetBuildExpireMS()", "functionCalled", false);
        const expireTime = 1000 * 60 * 60 * 24; // 1 day
        Data.debugMessage(expireTime, "GetBuildExpireMS()", "expireTime");
        return expireTime;
    }
    static async Factory() {
        MultiWeather.debugMessage("Factory()", "Factory()", "functionCalled", false);
        const mw = new MultiWeather();
        const key = "PeruMultiWeather";
        MultiWeather.debugMessage(key, "Factory()", "key");
        const hasPreference = HasPreference(key);
        MultiWeather.debugMessage(hasPreference, "Factory()", "hasPreference");
        if(hasPreference) {
            const preferenceData = GetPreferenceObject(key);
            MultiWeather.CopyFromObject(mw, preferenceData);
            MultiWeather.debugMessage(mw, "Factory()", "data");
        }
        const isLastBuiltExpired = mw.IsLastBuiltExpired();
        MultiWeather.debugMessage(isLastBuiltExpired, "Factory()", "isLastBuiltExpired");
        if(isLastBuiltExpired){
            mw.data = await Data.Factory();
            const newLastBuildDate = Date.now();
            MultiWeather.debugMessage(newLastBuildDate, "Factory()", "lastBuilt");
            mw.SetLastBuilt(newLastBuildDate);
        }
        MultiWeather.debugMessage("SetPreferenceObject()", "Factory()", "functionCalled", false);
        SetPreferenceObject(key, mw);
        return mw;
    }
    static CopyFromJSON(multiWeatherJSON) {
        const multiWeather = new MultiWeather();
        multiWeather.data = JSON.data;
        multiWeather.locationMap = JSON.parse(multiWeatherJSON).locationMap;
        multiWeather.locations = JSON.parse(multiWeatherJSON).locations;
        multiWeather.lastBuilt = multiWeatherJSON.lastBuilt;
        return multiWeather;
    }
    static CopyFromObject(newObject, oldObject) {
      newObject.data = oldObject.data;
      newObject.locationMap = oldObject.locationMap;
      newObject.locations = oldObject.locations;
      newObject.lastBuilt = oldObject.lastBuilt
      return newObject;
    }
    async GetData() {
        MultiWeather.debugMessage("GetData()", "GetData()", "functionCalled", false);
        let data = new Data();
        Data.CopyFromObject(data, await this.data);
        MultiWeather.debugMessage(data, "GetData()", "data")
        return data;
    }
    async GetCurrentData() {
        MultiWeather.debugMessage("GetCurrentData()", "GetCurrentData()", "functionCalled", false);
        const data = await this.GetData();
        MultiWeather.debugMessage(data, "GetCurrentData()", "data")
        const currentData = await data.currentData;
        MultiWeather.debugMessage(currentData, "GetCurrentData()", "currentData")
        return await currentData;
    }
    async SetLocationsAsCapitals(units=this.GetUnits()) {
        MultiWeather.debugMessage("SetLocationsAsCapitals()", "SetLocationsAsCapitals()", "functionCalled", false);
        const data = await this.GetData();
        MultiWeather.debugMessage(data, "SetLocationsAsCapitals()", "data");
        const capitalIds = await data.GetCapitalIds();
        MultiWeather.debugMessage(capitalIds, "SetLocationsAsCapitals()", "capitalIds");
        await this.SetLocationsByCityIds(capitalIds, units);
    }
    async SetLocationsByCityIds(cityIds, units=this.GetUnits()) {
        MultiWeather.debugMessage("SetLocationsByCityIds()", "SetLocationsByCityIds()", "functionCalled", false);
        const cityids = await cityIds;
        MultiWeather.debugMessage(cityids, "SetLocationsByCityIds()", "cityids")
        const data = await this.GetData();
        MultiWeather.debugMessage(data, "SetLocationsByCityIds()", "data")
        const cityData = await data.GetCityData();
        MultiWeather.debugMessage(cityData, "SetLocationsByCityIds()", "cityData")
        MultiWeather.debugMessage("filter cityData", "SetLocationsByCityIds()", "filterCalled", false);
        const filterCityData = await cityData.filter(
                async function(city) {
                    const cityIn = await city;
                    MultiWeather.debugMessage(cityIn, "SetLocationsByCityIds()", "city")
                    const cityId = await cityIn.id;
                    MultiWeather.debugMessage(cityId, "SetLocationsByCityIds()", "cityId")
                    const match = await cityIds.includes(await cityId);
                    MultiWeather.debugMessage(match, "SetLocationsByCityIds()", "match")
                    return match;
                }
            );
        MultiWeather.debugMessage(filterCityData, "SetLocationsByCityIds()", "filterCityData")
        await this.SetLocationsByCities(filterCityData, units);
    }
    async SetLocationsByCities(cities, units=this.GetUnits()) {
        MultiWeather.debugMessage("SetLocationsByCities()", "SetLocationsByCities()", "functionCalled", false);
        const citiesIn = await cities
        MultiWeather.debugMessage(citiesIn, "SetLocationsByCities()", "cities")
        this.locationMap = {}
        this.locations = [];
        const outer = this;
        MultiWeather.debugMessage("foreEach cities cityData", "SetLocationsByCities()", "forEachCalled", false);
        await citiesIn.forEach(function(city) {
            const cityIn = city;
            MultiWeather.debugMessage(cityIn, "SetLocationsByCities()", "city")
            const cityLatitude = cityIn.latitude;
            MultiWeather.debugMessage(cityLatitude, "SetLocationsByCities()", "cityLatitude")
            const cityLongitude = cityIn.longitude;
            MultiWeather.debugMessage(cityLongitude, "SetLocationsByCities()", "cityLongitude")
            const cityKey = {"lat":cityLatitude,"long":cityLongitude};
            MultiWeather.debugMessage(cityKey, "SetLocationsByCities()", "cityKey")
            const cityKeyString = JSON.stringify(cityKey);
            MultiWeather.debugMessage(cityKeyString, "SetLocationsByCities()", "cityKeyString")
            const mapKeys = Object.keys(outer.locationMap);
            MultiWeather.debugMessage(mapKeys, "SetLocationsByCities()", "mapKeys")
            const keyNotMatch = !mapKeys.includes(cityKeyString);
            MultiWeather.debugMessage(keyNotMatch, "SetLocationsByCities()", "keyNotMatch")
            const cityName = cityIn.name;
            MultiWeather.debugMessage(cityName, "SetLocationsByCities()", "cityName")
            if(keyNotMatch){
                const index = outer.locations.length;
                MultiWeather.debugMessage(index, "SetLocationsByCities()", "index")
                const indexKey = {"idx":index};
                MultiWeather.debugMessage(indexKey, "SetLocationsByCities()", "indexKey")
                const indexKeyString = JSON.stringify(indexKey);
                MultiWeather.debugMessage(indexKeyString, "SetLocationsByCities()", "indexKeyString")
                const weather = new Weather(cityLatitude, cityLongitude);
                weather.disabled = outer.disabled;
                weather.units = units;
                MultiWeather.debugMessage(weather, "SetLocationsByCities()", "weather")
                outer.locations.push(weather);
                outer.locationMap[cityName] = index;
                outer.locationMap[cityKeyString] = index;
                outer.locationMap[indexKeyString] = cityName;
                MultiWeather.debugMessage(outer.locations, "SetLocationsByCities()", "locations")
                MultiWeather.debugMessage(outer.locationMap, "SetLocationsByCities()", "locationMap")
            }
            else {
                outer.locationMap[cityName] = outer.locationMap[cityKey];
                MultiWeather.debugMessage(outer.locationMap, "SetLocationsByCities()", "locationMap")
            }
        });
        const newLastBuildDate = Date.now();
        MultiWeather.debugMessage(newLastBuildDate, "SetLocationsAsCapitals()", "lastBuilt");
        this.SetLastBuilt(newLastBuildDate);
        const key = "PeruMultiWeather";
        MultiWeather.debugMessage(key, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(key, this);
    }
    async SetLocationsByDepartamentoIds(departamentoIds) {
        MultiWeather.debugMessage("SetLocationsByDepartamentoIds()", "SetLocationsByDepartamentoIds()", "functionCalled", false);
        const departamentoIdsIn = await departamentoIds;
        MultiWeather.debugMessage(departamentoIdsIn, "SetLocationsByDepartamentoIds()", "departamentoIdsIn")
        const currentData = await this.GetCurrentData();
        MultiWeather.debugMessage(currentData, "SetLocationsByDepartamentoIds()", "currentData")
        const departamentos = await currentData.GetDepartamentos();
        MultiWeather.debugMessage(departamentos, "SetLocationsByDepartamentoIds()", "departamentos")
        MultiWeather.debugMessage("filter departamentos", "SetLocationsByDepartamentoIds()", "filterCalled", false);
        const filterDepartamentors = await departamentos.filter(
            async function(departamento) {
                const departamentoIn = await departamento;
                MultiWeather.debugMessage(departamentoIn, "SetLocationsByDepartamentoIds()", "departamento")
                const departamentoId = await departamentoIn.id;
                MultiWeather.debugMessage(departamentoId, "SetLocationsByDepartamentoIds()", "departamentoId")
                const match = await departamentoIdsIn.contains(await departamentoId)
                MultiWeather.debugMessage(match, "SetLocationsByDepartamentoIds()", "match")
                return match;
            }
        );
        MultiWeather.debugMessage(filterDepartamentors, "SetLocationsByDepartamentoIds()", "filterDepartamentors")
        await this.SetLocationsByDepartamentos(filterDepartamentors);
    }
    async SetLocationsByDepartamentos(departamentos) {
        MultiWeather.debugMessage("SetLocationsByDepartamentos()", "SetLocationsByDepartamentos()", "functionCalled", false);
        const departamentosIn = await departamentos;
        MultiWeather.debugMessage(departamentosIn, "SetLocationsByDepartamentoIds()", "departamentosIn")
        this.locationMap = {}
        this.locations = [];
        const outer = this;
        MultiWeather.debugMessage("foreEach departamentos", "SetLocationsByDepartamentos()", "forEachCalled", false);
        await departamentos.forEach(
            async function(departamento) {
                const departamentoIn = await departamento;
                MultiWeather.debugMessage(departamentoIn, "SetLocationsByDepartamentos()", "departamento");
                const departamentoLatitude = await departamentoIn.latitude;
                MultiWeather.debugMessage(departamentoLatitude, "SetLocationsByDepartamentos()", "departamentoLatitude");
                const departamentoLongitude = await departamentoIn.longitude;
                MultiWeather.debugMessage(departamentoLongitude, "SetLocationsByDepartamentos()", "departamentoLongitude");
                const departamentoKey = {"lat":await departamentoLatitude,"long":await departamentoLongitude};
                MultiWeather.debugMessage(departamentoKey, "SetLocationsByDepartamentos()", "departamentoKey");
                const mapKeys = Object.keys(outer.locationMap);
                MultiWeather.debugMessage(mapKeys, "SetLocationsByDepartamentos()", "mapKeys");
                const keyNotMatch = !mapKeys.includes(cityKey);
                MultiWeather.debugMessage(keyNotMatch, "SetLocationsByDepartamentos()", "keyNotMatch");
                const departamentoName = await departamentoIn.name;
                MultiWeather.debugMessage(departamentoName, "SetLocationsByDepartamentos()", "departamentoName");
                if(keyNotMatch){
                    const index = outer.locations.length;
                    MultiWeather.debugMessage(index, "SetLocationsByDepartamentos()", "index")
                    const indexKey = {"idx":index};
                    MultiWeather.debugMessage(indexKey, "SetLocationsByDepartamentos()", "indexKey")
                    const weather = new Weather(departamentoLatitude, departamentoLongitude);
                    weather.disabled = this.disabled;
                    MultiWeather.debugMessage(weather, "SetLocationsByDepartamentos()", "weather")
                    outer.locations.push(weather);
                    outer.locationMap[departamentoName] = index;
                    outer.locationMap[departamentoKey] = index;
                    outer.locationMap[indexKey] = await departamentoName;
                    MultiWeather.debugMessage(outer.locations, "SetLocationsByDepartamentos()", "locations")
                    MultiWeather.debugMessage(outer.locationMap, "SetLocationsByDepartamentos()", "locationMap")
                }
                else {
                    outer.locationMap[departamento.name] = outer.locationMap[departamentoKey];
                    MultiWeather.debugMessage(outer.locationMap, "SetLocationsByDepartamentos()", "locationMap")
                }
        });
        const newLastBuildDate = Date.now();
        MultiWeather.debugMessage(newLastBuildDate, "SetLocationsAsCapitals()", "lastBuilt");
        this.SetLastBuilt(newLastBuildDate);
        const key = "PeruMultiWeather";
        MultiWeather.debugMessage(key, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(key, this);
    }
    SetLocationsBySiteIds(siteIds) {
        this.SetLocationsBySites(this.GetCurrentData().GetSites().filter(function(site) { return siteIds.contains(site.id); }));
    }
    SetLocationsBySites(sites) {
        this.locationMap = {}
        this.locations = [];
        sites.forEach(function(site) {
            if(!Object.keys(locationMap).contains({"lat":site.latitude,"long":site.longitude})){
                index = this.locations.length;
                this.locations.push(new Weather(site.latitude, site.longitude));
                this.locations[index].disabled = this.disabled;
                this.locationMap[site.name] = index;
                this.locationMap[{"lat":site.latitude,"long":site.longitude}] = index;
                this.locationMap[{"idx":index}] = site.name;
            }
            else {
                this.locationMap[site.name] = this.locationMap[{"lat":site.latitude,"long":site.longitude}];
            }
        });
        const newLastBuildDate = Date.now();
        MultiWeather.debugMessage(newLastBuildDate, "SetLocationsAsCapitals()", "lastBuilt");
        this.SetLastBuilt(newLastBuildDate);
        const key = "PeruMultiWeather";
        MultiWeather.debugMessage(key, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(key, this);
    }
    FetchAllForAllLocations() {
        this.FetchCurrentWeatherForAllLocations();
        this.FetchForecastForAllLocations();
    }
    FetchCurrentWeatherForAllLocations() {
        const outer = this;
        Object.keys(this.locations).forEach(function(key) {
            outer.FetchCurrentWeatherForLocationIndex(key);
        })
        const peruKey = "PeruMultiWeather";
        MultiWeather.debugMessage(peruKey, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(peruKey, this);
    }
    FetchForecastForAllLocations() {
        const outer = this;
        Object.keys(this.locations).forEach(function(key) {
            outer.FetchForecastForLocationIndex(key);
        })
        const peruKey = "PeruMultiWeather";
        MultiWeather.debugMessage(peruKey, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(peruKey, this);
    }
    FetchAllForLocationIndex(index) {
        this.FetchCurrentWeatherForLocationIndex(index);
        this.FetchForecastForLocationIndex(index);
    }
    FetchAllForLocationMap(key) {
        this.FetchCurrentWeatherForLocationMap(key);
        this.FetchForecastForLocationMap(key);
    }
    async FetchCurrentWeatherForLocationIndex(index) {
        await this.GetLocationByIndex(index).FetchCurrentWeather();
        const peruKey = "PeruMultiWeather";
        MultiWeather.debugMessage(peruKey, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(peruKey, this);
    }
    async FetchCurrentWeatherForLocationMap(key) {
        await this.GetLocationByMap(key).FetchCurrentWeather();
        const peruKey = "PeruMultiWeather";
        MultiWeather.debugMessage(peruKey, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(peruKey, this);
    }
    async FetchForecastForLocationIndex(index) {
        await this.GetLocationByIndex(index).FetchWeatherForcast();
        const peruKey = "PeruMultiWeather";
        MultiWeather.debugMessage(peruKey, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(peruKey, this);
    }
    async FetchForecastForLocationMap(key) {
        await this.GetLocationByMap(key).FetchWeatherForcast();
        const peruKey = "PeruMultiWeather";
        MultiWeather.debugMessage(peruKey, "SetLocationsAsCapitals()", "key");
        MultiWeather.debugMessage("SetPreferenceObject()", "SetLocationsAsCapitals()", "functionCalled", false);
        SetPreferenceObject(peruKey, this);
    }
    GetLocationByIndex(index) {
        return this.locations[index];
    }
    GetLocationByMap(key) {
        return GetLocationByIndex(this.locationMap[key]);        
    }
    async DisplayWeatherSpotlightResults(weatherContainer, currentCityId){
        weatherContainer.classList.add('weatherContainer');
        const cityId = await currentCityId();
        const city = await this.locations[await this.locationMap[cityId]];
        const currentData = await city.currentData ?? {message:null};
        const message = await currentData.message;
        const data = await this.GetData();
        const cityEntry = await data.GetCityEntries()[this.locationMap[cityId]];
        const cityName = document.createElement('h3');
        cityName.classList.add('weatherCityName');
        cityName.textContent = cityEntry.name;
        if(message==null) {
            weatherContainer.textContent = "";
            const currentTempLabel = document.createElement('span');
            currentTempLabel.classList.add('currentTempLabel');
            currentTempLabel.textContent = "current temperature: "
            const currentTempSpan = document.createElement('span');
            currentTempSpan.classList.add('currentTempSpan');
            currentTempSpan.textContent = await Weather.GetWeatherCurrentTemp(city);
            const currentTemp = document.createElement('p');
            currentTemp.appendChild(currentTempLabel);
            currentTemp.appendChild(currentTempSpan);
            const weatherDescriptionLabel = document.createElement('span');
            weatherDescriptionLabel.classList.add('weatherDescriptionLabel');
            weatherDescriptionLabel.textContent = ""
            const weatherDescriptionSpan = document.createElement('span');
            weatherDescriptionSpan.classList.add('weatherDescriptionSpan');
            weatherDescriptionSpan.textContent = await Weather.GetWeatherCurrentDescription(city);
            const weatherDescription = document.createElement('p');
            weatherDescription.appendChild(weatherDescriptionLabel);
            weatherDescription.appendChild(weatherDescriptionSpan);
            const weatherIconURL = await Weather.GetWeatherCurrentIconURL(city);
            const weatherIconImage = document.createElement('img');
            weatherIconImage.classList.add('weatherIconImage');
            weatherIconImage.src = weatherIconURL;
            weatherIconImage.alt = `${await Weather.GetWeatherCurrentDescription(city)} icon`;
            const feelsLikeTempLabel = document.createElement('span');
            feelsLikeTempLabel.classList.add('feelsLikeTempLabel');
            feelsLikeTempLabel.textContent = "feels like temperature: "
            const feelsLikeTempSpan = document.createElement('span');
            feelsLikeTempSpan.classList.add('feelsLikeTempSpan');
            feelsLikeTempSpan.textContent = await Weather.GetWeatherCurrentFeelsLike(city);
            const feelsLikeTemp = document.createElement('p');
            feelsLikeTemp.appendChild(feelsLikeTempLabel);
            feelsLikeTemp.appendChild(feelsLikeTempSpan);
            const humidityLabel = document.createElement('span');
            humidityLabel.classList.add('humidityLabel');
            humidityLabel.textContent = "humidity: "
            const humiditySpan = document.createElement('span');
            humiditySpan.classList.add('humiditySpan');
            humiditySpan.textContent = await Weather.GetWeatherCurrentHumidity(city);
            const humidity = document.createElement('p');
            humidity.appendChild(humidityLabel);
            humidity.appendChild(humiditySpan);
            const windSpeedLabel = document.createElement('span');
            windSpeedLabel.classList.add('windSpeedLabel');
            windSpeedLabel.textContent = "wind speed: "
            const windSpeedSpan = document.createElement('span');
            windSpeedSpan.classList.add('windSpeedSpan');
            windSpeedSpan.textContent = await Weather.GetWeatherCurrentWindSpeed(city);
            const windSpeed = document.createElement('p');
            windSpeed.appendChild(windSpeedLabel);
            windSpeed.appendChild(windSpeedSpan);
            const windDirLabel = document.createElement('span');
            windDirLabel.classList.add('windDirLabel');
            windDirLabel.textContent = "wind direction: "
            const windDirSpan = document.createElement('span');
            windDirSpan.classList.add('windDirSpan');
            windDirSpan.textContent = await Weather.GetWeatherCurrentWindDir(city);
            const windDir = document.createElement('p');
            windDir.appendChild(windDirLabel);
            windDir.appendChild(windDirSpan);
            const sunriseLabel = document.createElement('span');
            sunriseLabel.classList.add('sunriseLabel');
            sunriseLabel.textContent = "sunrise: "
            const sunriseSpan = document.createElement('span');
            sunriseSpan.classList.add('sunriseSpan');
            sunriseSpan.textContent = await Weather.GetWeatherCurrentSunrise(city);
            const sunrise = document.createElement('p');
            sunrise.appendChild(sunriseLabel);
            sunrise.appendChild(sunriseSpan);
            const sunsetLabel = document.createElement('span');
            sunsetLabel.classList.add('sunsetLabel');
            sunsetLabel.textContent = "sunset: "
            const sunsetSpan = document.createElement('span');
            sunsetSpan.classList.add('sunsetSpan');
            sunsetSpan.textContent = await Weather.GetWeatherCurrentSunset(city);
            const sunset = document.createElement('p');
            sunset.appendChild(sunsetLabel);
            sunset.appendChild(sunsetSpan);
            weatherContainer.appendChild(cityName);
            weatherContainer.appendChild(currentTemp);
            weatherContainer.appendChild(weatherDescription);
            weatherContainer.appendChild(weatherIconImage);
            weatherContainer.appendChild(feelsLikeTemp);
            weatherContainer.appendChild(humidity);
            weatherContainer.appendChild(windSpeed);
            weatherContainer.appendChild(windDir);
            weatherContainer.appendChild(sunrise);
            weatherContainer.appendChild(sunset);
        } else {
            const messageContainer = document.createElement('p');
            messageContainer.classList.add('weatherMessage');
            messageContainer.textContent = message;
            weatherContainer.textContent="";
            weatherContainer.appendChild(cityName);
            weatherContainer.appendChild(messageContainer);
        }
    }
    async DisplayForecastSpotlightResults(forecastContainer, currentCityId){
        const cityId = currentCityId();
        const city = this.locations[this.locationMap[cityId]];
        const currentData = city.currentData ?? {message:null};
        const message = currentData.message;
        if(message==null) {
            forecastContainer.textContent = `${cityId} - ${JSON.stringify(this.locations[this.locationMap[cityId]])}`;
        //TODO: complete build

        } else {
            const data = await this.GetData();
            const cityEntry = await data.GetCityEntries()[this.locationMap[cityId]];
            const cityName = document.createElement('h3');
            cityName.classList.add('forecastCityName');
            cityName.textContent = cityEntry.name;
            const messageContainer = document.createElement('p');
            messageContainer.classList.add('forecastMessage');
            messageContainer.textContent = message;
            forecastContainer.textContent="";
            forecastContainer.appendChild(cityName);
            forecastContainer.appendChild(messageContainer);
        }
    }
}
export class Weather {
    constructor(lat, long, currentMaxAgeMS=this.GetCurrentMaxAgeMS(), forecastMaxAgeMS=this.GetForecastMaxAgeMS(), units=this.GetUnits(), APIKey=this.GetAPIKey(), disabled=false) {
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
        this.disabled = disabled;
    }
    static CopyFromJSON(weatherJSON) {
        const weather = new Weather(weatherJSON.lat, weatherJSON.long, weatherJSON.currentMaxAgeMS, weatherJSON.forecastMaxAgeMS, weatherJSON.units, weatherJSON.APIKey);
        weather.currentChanged = weatherJSON.currentChanged;
        weather.currentData = weatherJSON.currentData;
        weather.lastCurrentFetch = weatherJSON.lastCurrentFetch;
        weather.forecastChanged = weatherJSON.forecastChanged;
        weather.forecastData = weatherJSON.forecastData;
        weather.lastForecastFetch = weatherJSON.lastForecastFetch;
        weather.disabled = weatherJSON.disabled;
        return weather;
    }
    static CopyFromObject(newObject, oldObject) {
        newObject.lat = oldObject.lat;
        newObject.long = oldObject.long;
        newObject.currentMaxAgeMS = oldObject.currentMaxAgeMS;
        newObject.forecastMaxAgeMS = oldObject.forecastMaxAgeMS;
        newObject.units = oldObject.units;
        newObject.APIKey = oldObject.APIKey;
        newObject.currentChanged = oldObject.currentChanged;
        newObject.currentData = oldObject.currentData;
        newObject.lastCurrentFetch = oldObject.lastCurrentFetch;
        newObject.forecastChanged = oldObject.forecastChanged;
        newObject.forecastData = oldObject.forecastData;
        newObject.lastForecastFetch = oldObject.lastForecastFetch;
        newObject.disabled = oldObject.disabled;
        return newObject;
    }
    static GetWeatherAPIKey(weather) {
        if(weather.APIKey == null) {
            return '10ef9792635c3a6ce4e14945789be45e';
        } else {
            return weather.APIKey;
        }
    }
    GetAPIKey() {
        return Weather.GetWeatherAPIKey(this);
    }
    static GetWeatherCurrentMaxAgeMS(weather) {
        if(weather.currentMaxAgeMS == null) {
            return 1000 * 60 * 60 * 24;//1000*60*15;
        } else {
            return weather.currentMaxAgeMS;
        }
    }
    GetCurrentMaxAgeMS() {
        return Weather.GetWeatherCurrentMaxAgeMS(this);
    }
    static GetWeatherForecastMaxAgeMS(weather) {
        if(weather.forecastMaxAgeMS == null) {
            return 1000*60*60*24;//1000*60*60*3;
        } else {
            return weather.forecastMaxAgeMS;
        }
    }
    GetForecastMaxAgeMS() {
        return Weather.GetWeatherForecastMaxAgeMS(this);
    }
    static GetWeatherUnits(weather) {
        if(weather.units == null) {
            return 'imperial';
        } else {
            return weather.units;
        }
    }
    GetUnits() {
        return Weather.GetWeatherUnits(this);
    }
    static GetWeatherUnitSymbol(weather) {
        if(weather.GetUnits()==='imperial') {
            return '\u00B0F';
        } else {
            return '\u00B0C';
        }
    }
    GetUnitSymbol() {
        return Weather.GetWeatherUnitSymbol(this);
    }
    static GetWeatherSpeedUnits(weather) {
        if(weather.GetUnits()==='imperial') {
            return 'mph';
        } else {
            return 'kph';
        }
    }
    GetSpeedUnits() {
        return Weather.GetWeatherSpeedUnits(this);
    }
    GetCurrentWeatherAPIURL(lat, long, units=GetUnits(), APIKey=GetAPIKey())
    {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${APIKey}`;
    }
    GetForecastWeatherAPIURL(lat, long, units=GetUnits(), APIKey=GetAPIKey())
    {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=${units}&appid=${APIKey}`;
    }
    static IsWeatherLatDefined(weather) {
        return !(weather.lat == null);
    }
    IsLatDefined() {
        return Weather.IsWeatherLatDefined(this);
    }
    static IsWeatherLongDefined(weather) {
        return !(weather.long == null);
    }
    IsLongDefined() {
        return Weather.IsWeatherLongDefined(this);
    }
    static IsWeatherAPIKeyDefined(weather) {
        return !(weather.GetAPIKey() == null);
    }
    IsAPIKeyDefined() {
        return Weather.IsWeatherAPIKeyDefined(this);
    }
    static IsWeatherUnitsDefined(weather) {
        return ((weather.GetUnits() === 'imperial') | (weather.GetUnits() === 'metric'));
    }
    IsUnitsDefined() {
        return Weather.IsWeatherUnitsDefined(this);
    }
    static IsWeatherDefined(weather) {
        return weather.IsLatDefined() & weather.IsLongDefined() & weather.IsUnitsDefined() & weather.IsAPIKeyDefined();
    }
    IsDefined() {
        return Weather.IsWeatherDefined(this);
    }
    static SetWeatherImperial(weather) {
        if(!(weather.units === 'imperial')) {
            weather.units = 'imperial';
            weather.lastCurrentFetch = null;
            weather.currentChanged = true;
            weather.forecastChanged = true;
        }
    }
    SetImperial() {
        return Weather.SetWeatherImperial(this);
    }
    static SetWeatherMetric(weather) {
        if(!(weather.units === 'metric')) {
            weather.units = 'metric';
            weather.lastCurrentFetch = null;
            weather.currentChanged = true;
            weather.forecastChanged = true;
        }
    }
    SetMetric() {
        return Weather.SetWeatherMetric(this);
    }
    static async FetchWeatherCurrentWeather(weather) {
        if(!weather.disabled) {
            if(weather.IsDefined()) {
                try {
                    const currentURL = weather.GetCurrentWeatherAPIURL(weather.lat, weather.long, weather.GetUnits(), weather.GetAPIKey());
                    const currentResponse = await fetch(currentURL);
                    if(currentResponse.ok) {
                        weather.currentData = await currentResponse.json();
                        //console.log(this.GetCurrentData()); // testing only
                        weather.currentChanged = false;
                        weather.lastCurrentFetch = GetNow();
                    } else {
                        if((currentResponse.status===429)&&(currentResponse.statusText==="Too Many Requests")) {
                            weather.currentData = {
                                message: "Weather service is temporarily unavailble, please try again later."
                            }
                        } else {
                            throw Error(await currentResponse.text());
                        }
                    }
                } catch(error) {
                    console.error(error);
                    throw error;
                }
            } else {
                console.error('Fetch current attempted without defining required parameters!');
                throw Error('Fetch current attempted without defining required parameters!');
            }
        } else {
            weather.currentData = {
                message: "Weather service is temporarily unavailble, please try again later."
            }
        }
    }
    async FetchCurrentWeather() {
        return await Weather.FetchWeatherCurrentWeather(this);
    }
    static GetWeatherCurrentFetchMSAge(weather) {
        if(!(weather.lastCurrentFetch == null)) {
            return GetNow() - weather.lastCurrentFetch;
        } else {
            return null;
        }
    }
    GetCurrentFetchMSAge() {
        return Weather.GetWeatherCurrentFetchMSAge(this);
    }
    static GetWeatherCurrentFetchExpired(weather) {
        if(weather.GetCurrentFetchMSAge() == null) {
            return true;
        } else {
            return weather.GetCurrentFetchMSAge() > weather.currentMaxAgeMS;
        }
    }
    GetCurrentFetchExpired() {
        return Weather.GetWeatherCurrentFetchExpired(this);
    }
    static async GetWeatherCurrentTempNumeric(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.main.temp;
        } else {
            return null;
        }
    }
    async GetCurrentTempNumeric() {
        return await Weather.GetWeatherCurrentTempNumeric(this);
    }
    static async GetWeatherCurrentTemp(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return `${Math.round(await weather.GetCurrentTempNumeric())}${weather.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetCurrentTemp() {
        return await Weather.GetWeatherCurrentTemp(this);
    }
    static async GetWeatherCurrentDescription(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.weather[0].description;
        } else {
            return null;
        }
    }
    async GetCurrentDescription() {
        return await Weather.GetWeatherCurrentDescription(this);
    }
    static async GetWeatherCurrentIconName(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.weather[0].icon;
        } else {
            return null;
        }
    }
    async GetCurrentIconName() {
        return await Weather.GetWeatherCurrentIconName(this);
    }
    static async GetWeatherCurrentIconURL(weather) {
        return `https://openweathermap.org/img/w/${await weather.GetCurrentIconName()}.png`;
    }
    async GetCurrentIconURL() {
        return await Weather.GetWeatherCurrentIconURL(this);
    }
    static async GetWeatherCurrentFeelsLikeNumeric(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.main.feels_like;
        } else {
            return null;
        }
    }
    async GetCurrentFeelsLikeNumeric() {
        return await Weather.GetWeatherCurrentFeelsLikeNumeric(this);
    }
    static async GetWeatherCurrentFeelsLike(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return `${Math.round(await weather.GetCurrentFeelsLikeNumeric())}${weather.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetCurrentFeelsLike() {
        return await Weather.GetWeatherCurrentFeelsLike(this);
    }
    static async GetWeatherCurrentHighTempNumeric(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.main.temp_max;
        } else {
            return null;
        }
    }
    async GetCurrentHighTempNumeric() {
        return await Weather.GetWeatherCurrentHighTempNumeric(this);
    }
    static async GetWeatherCurrentHighTemp(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return `${Math.round(await weather.GetCurrentHighTempNumeric())}${weather.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetCurrentHighTemp() {
        return await Weather.GetWeatherCurrentHighTemp(this);
    }
    static async GetWeatherCurrentLowTempNumeric(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.main.temp_min;
        } else {
            return null;
        }
    }
    async GetCurrentLowTempNumeric() {
        return await Weather.GetWeatherCurrentLowTempNumeric(this);
    }
    static async GetWeatherCurrentLowTemp(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return `${Math.round(await weather.GetCurrentLowTempNumeric())}${weather.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetCurrentLowTemp() {
        return await Weather.GetWeatherCurrentLowTemp(this);
    }
    static async GetWeatherCurrentHumidityNumeric(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.main.humidity;
        } else {
            return null;
        }
    }
    async GetCurrentHumidityNumeric() {
        return await Weather.GetWeatherCurrentHumidityNumeric(this);
    }
    static async GetWeatherCurrentHumidity(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return `${Math.round(await weather.GetCurrentHumidityNumeric())}%`;
        } else {
            return null;
        }
    }
    async GetCurrentHumidity() {
        return await Weather.GetWeatherCurrentHumidity(this);
    }
    static async GetWeatherCurrentWindSpeedNumeric(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.wind.speed;
        } else {
            return null;
        }
    }
    async GetCurrentWindSpeedNumeric() {
        return await Weather.GetWeatherCurrentWindSpeedNumeric(this);
    }
    static async GetWeatherCurrentWindSpeed(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return `${Math.round(await weather.GetCurrentWindSpeedNumeric())}${weather.GetSpeedUnits()}`;
        } else {
            return null;
        }
    }
    async GetCurrentWindSpeed() {
        return await Weather.GetWeatherCurrentWindSpeed(this);
    }
    static async GetWeatherCurrentWindDirNumeric(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return await weather.currentData.wind.deg;
        } else {
            return null;
        }
    }
    async GetCurrentWindDirNumeric() {
        return await Weather.GetWeatherCurrentWindDirNumeric(this);
    }
    static async GetWeatherCurrentWindDir(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            return `${Math.round(await weather.GetCurrentWindDirNumeric())}${'\u00B0'}`;
        } else {
            return null;
        }
    }
    async GetCurrentWindDir() {
        return await Weather.GetWeatherCurrentWindDir(this);
    }
    static async GetWeatherCurrentSunrise(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            const sunriseMS = await weather.currentData.sys.sunrise;
            const sunrise = new Date();
            sunrise.setTime(sunriseMS*1000);
            return sunrise.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true});
        } else {
            return null;
        }
    }
    async GetCurrentSunrise() {
        return await Weather.GetWeatherCurrentSunrise(this);
    }
    static async GetWeatherCurrentSunset(weather) {
        if(weather.IsDefined()) {
            if(weather.GetCurrentFetchExpired()) {
                await weather.FetchCurrentWeather();
            }
            const sunsetMS = await weather.currentData.sys.sunset;
            const sunset = new Date();
            sunset.setTime(sunsetMS*1000);
            return sunset.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true});
        } else {
            return null;
        }
    }
    async GetCurrentSunset() {
        return await Weather.GetWeatherCurrentSunset(this);
    }
    static async WeatherFetchWeatherForcast(weather) {
        if(!weather.disabled) {
            if(weather.IsDefined()) {
                try {
                    const forecastURL = weather.GetForecastWeatherAPIURL(weather.lat, weather.long, weather.GetUnits(), weather.GetAPIKey());
                    const forecastResponse = await fetch(forecastURL);
                    if(forecastResponse.ok) {
                        weather.forecastData = await forecastResponse.json();
                        //console.log(this.forecastData); // testing only
                        weather.forecastChanged = false;
                        weather.lastForecastFetch = GetNow();
                    } else {
                        throw Error(await forecastResponse.text());
                    }
                } catch(error) {
                    if(error.message === "{\"cod\":429, \"message\": \"Your account is temporary blocked due to exceeding of requests limitation of your subscription type. Please choose the proper subscription https://openweathermap.org/price\"}") {
                        weather.currentData = {
                            message: "Weather service is temporarily unavailble, please try again later."
                        }
                    } else {
                        console.error(error);
                        throw error;
                    }
                }
            } else {
                console.error('Fetch forecast attempted without defining required parameters!');
                throw Error('Fetch forecast attempted without defining required parameters!');
            }

        } else {
            weather.currentData = {
                message: "Weather service is temporarily unavailble, please try again later."
            }
        }
    }
    async FetchWeatherForcast() {
        return await Weather.WeatherFetchWeatherForcast(this);
    }
    static GetWeatherForecastFetchMSAge(weather) {
        if(!(weather.lastForecastFetch == null)) {
            return GetNow() - weather.lastForecastFetch;
        } else {
            return null;
        }
    }
    GetForecastFetchMSAge() {
        return Weather.GetWeatherForecastFetchMSAge(this);
    }
    static GetWeatherForecastFetchExpired(weather) {
        if(weather.GetForecastFetchMSAge() == null) {
            return true;
        } else {
            return weather.GetForecastFetchMSAge() > weather.forecastMaxAgeMS;
        }
    }
    GetForecastFetchExpired() {
        return Weather.GetWeatherForecastFetchExpired(this);
    }
    static async GetWeatherForecaseArrayIndexForSpecifiedHours(weather, hours) {
        const current = GetNow();
        const start = (new Date(current));
        start.setHours(start.getHours()+hours);
        const end = new Date(start);
        let range = 0;
        end.setHours(end.getHours()+range);
        let forecasts = weather.forecastData.list.filter((element)=>{return ((new Date(element.dt_txt))>=start)&((new Date(element.dt_txt))<end)});
        let resultCount = forecasts.length;
        while(resultCount<1){
            range++;
            end.setHours(end.getHours()+range);
            forecasts = weather.forecastData.list.filter((element)=>{return ((new Date(element.dt_txt))>=start)&((new Date(element.dt_txt))<end)});
            resultCount = forecasts.length;
        }
        return weather.forecastData.list.indexOf(forecasts[0]);
    }
    async GetForecaseArrayIndexForSpecifiedHours(hours) {
        return await Weather.GetWeatherForecaseArrayIndexForSpecifiedHours(this, hours);
    }
    static async GetWeatherForecastTempNumeric(weather, hours) {
        if(weather.IsDefined()) {
            if(weather.GetForecastFetchExpired()) {
                await weather.FetchWeatherForcast();
            }
            return await weather.forecastData.list[await weather.GetForecaseArrayIndexForSpecifiedHours(hours)].main.temp;
        } else {
            return null;
        }
    }
    async GetForecastTempNumeric(hours) {
        return await Weather.GetWeatherForecastTempNumeric(this, hours);
    }
    static async GetWeatherForecastTemp(weather, hours) {
        if(weather.IsDefined()) {
            if(weather.GetForecastFetchExpired()) {
                await weather.FetchWeatherForcast();
            }
            return `${Math.round(await weather.GetForecastTempNumeric(hours))}${weather.GetUnitSymbol()}`;
        } else {
            return null;
        }
    }
    async GetForecastTemp(hours) {
        return await Weather.GetWeatherForecastTemp(this, hours);
    }
    static async GetWeatherTodayForecastTemp(weather) {
        if(weather.IsDefined()) {
            if(weather.GetForecastFetchExpired()) {
                await weather.FetchWeatherForcast();
            }
            return await weather.GetForecastTemp(1);
        } else {
            return null;
        }
    }
    async GetTodayForecastTemp() {
        return await Weather.GetWeatherTodayForecastTemp(this);
    }
    static async GetWeatherTomorrowForecastTemp(weather) {
        if(weather.IsDefined()) {
            if(weather.GetForecastFetchExpired()) {
                await weather.FetchWeatherForcast();
            }
            return await weather.GetForecastTemp(24);
        } else {
            return null;
        }
    }
    async GetTomorrowForecastTemp() {
        return await Weather.GetWeatherTomorrowForecastTemp(this);
    }
    static async GetWeatherAfterTomorrowForecastTemp(weather) {
        if(weather.IsDefined()) {
            if(weather.GetForecastFetchExpired()) {
                await weather.FetchWeatherForcast();
            }
            return await weather.GetForecastTemp(48);
        } else {
            return null;
        }
    }
    async GetAfterTomorrowForecastTemp() {
        return await Weather.GetWeatherAfterTomorrowForecastTemp(this);
    }
    static async GetWeatherForecastDescription(weather, hours) {
        if(weather.IsDefined()) {
            if(weather.GetForecastFetchExpired()) {
                await weather.FetchWeatherForcast();
            }
            const index = await weather.GetForecaseArrayIndexForSpecifiedHours(hours);
            return await weather.forecastData.list[index].weather[0].description;
        } else {
            return null;
        }
    }
    async GetForecastDescription(hours) {
        return await Weather.GetWeatherForecastDescription(this, hours);
    }
    static async GetWeatherForecastIconName(weather, hours) {
        if(weather.IsDefined()) {
            if(weather.GetForecastFetchExpired()) {
                await weather.FetchWeatherForcast();
            }
            return await weather.forecastData.list[weather.GetForecaseArrayIndexForSpecifiedHours(hours)].weather[0].icon;
        } else {
            return null;
        }
    }
    async GetForecastIconName(hours) {
        return await Weather.GetWeatherForecastIconName(this, hours);
    }
    static async GetWeatherForecastIconURL(weather, hours) {
        return `https://openweathermap.org/img/w/${await weather.GetForecastIconName(hours)}.png`;
    }
    async GetForecastIconURL(hours) {
        return await Weather.GetWeatherForecastIconURL(this, hours);
    }
}