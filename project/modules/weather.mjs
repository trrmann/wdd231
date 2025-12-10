import { GetNow, GetAdjDOW } from "./date.mjs";
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
        this.simulated = true;
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
                weather.simulated = outer.simulated;
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
                    weather.simulated = this.simulated;
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
                this.locations[index].simulated = this.simulated;
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
            currentTemp.classList.add('currentTemp');
            currentTemp.appendChild(currentTempLabel);
            currentTemp.appendChild(currentTempSpan);
            const weatherDescriptionLabel = document.createElement('span');
            weatherDescriptionLabel.classList.add('weatherDescriptionLabel');
            weatherDescriptionLabel.textContent = ""
            const weatherDescriptionSpan = document.createElement('span');
            weatherDescriptionSpan.classList.add('weatherDescriptionSpan');
            weatherDescriptionSpan.textContent = await Weather.GetWeatherCurrentDescription(city);
            const weatherDescription = document.createElement('p');
            weatherDescription.classList.add('weatherDescription');
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
            feelsLikeTemp.classList.add('currentFeelsLikeTemp');
            feelsLikeTemp.appendChild(feelsLikeTempLabel);
            feelsLikeTemp.appendChild(feelsLikeTempSpan);
            const humidityLabel = document.createElement('span');
            humidityLabel.classList.add('humidityLabel');
            humidityLabel.textContent = "humidity: "
            const humiditySpan = document.createElement('span');
            humiditySpan.classList.add('humiditySpan');
            humiditySpan.textContent = await Weather.GetWeatherCurrentHumidity(city);
            const humidity = document.createElement('p');
            humidity.classList.add('currentHumidity');
            humidity.appendChild(humidityLabel);
            humidity.appendChild(humiditySpan);
            const windSpeedLabel = document.createElement('span');
            windSpeedLabel.classList.add('windSpeedLabel');
            windSpeedLabel.textContent = "wind speed: "
            const windSpeedSpan = document.createElement('span');
            windSpeedSpan.classList.add('windSpeedSpan');
            windSpeedSpan.textContent = await Weather.GetWeatherCurrentWindSpeed(city);
            const windSpeed = document.createElement('p');
            windSpeed.classList.add('currentWindSpeed');
            windSpeed.appendChild(windSpeedLabel);
            windSpeed.appendChild(windSpeedSpan);
            const windDirLabel = document.createElement('span');
            windDirLabel.classList.add('windDirLabel');
            windDirLabel.textContent = "wind direction: "
            const windDirSpan = document.createElement('span');
            windDirSpan.classList.add('windDirSpan');
            windDirSpan.textContent = await Weather.GetWeatherCurrentWindDir(city);
            const windDir = document.createElement('p');
            windDir.classList.add('currentWindDir');
            windDir.appendChild(windDirLabel);
            windDir.appendChild(windDirSpan);
            const sunriseLabel = document.createElement('span');
            sunriseLabel.classList.add('sunriseLabel');
            sunriseLabel.textContent = "sunrise: "
            const sunriseSpan = document.createElement('span');
            sunriseSpan.classList.add('sunriseSpan');
            sunriseSpan.textContent = await Weather.GetWeatherCurrentSunrise(city);
            const sunrise = document.createElement('p');
            sunrise.classList.add('currentSunrise');
            sunrise.appendChild(sunriseLabel);
            sunrise.appendChild(sunriseSpan);
            const sunsetLabel = document.createElement('span');
            sunsetLabel.classList.add('sunsetLabel');
            sunsetLabel.textContent = "sunset: "
            const sunsetSpan = document.createElement('span');
            sunsetSpan.classList.add('sunsetSpan');
            sunsetSpan.textContent = await Weather.GetWeatherCurrentSunset(city);
            const sunset = document.createElement('p');
            sunset.classList.add('currentSunset');
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
        const data = await this.GetData();
        const cityEntry = await data.GetCityEntries()[this.locationMap[cityId]];
        const cityName = document.createElement('h3');
        cityName.classList.add('forecastCityName');
        cityName.textContent = cityEntry.name;
        if(message==null) {
            forecastContainer.textContent = "";
            const tomorrow = document.createElement('section');
            tomorrow.classList.add('tomorrowSection');
            const tomorrowLabel = document.createElement('h3');
            tomorrowLabel.classList.add('tomorrowSectionLabel');
            tomorrowLabel.textContent = "Tomorrow"
            const tomorrowTempLabel = document.createElement('span');
            tomorrowTempLabel.classList.add('tomorrowTempLabel');
            tomorrowTempLabel.textContent = "temperature: "
            const tomorrowTempSpan = document.createElement('span');
            tomorrowTempSpan.classList.add('tomorrowTempSpan');
            tomorrowTempSpan.textContent = await Weather.GetWeatherForecastTemp(city,24);
            const tomorrowTemp = document.createElement('p');
            tomorrowTemp.classList.add('tomorrowTemp');
            tomorrowTemp.appendChild(tomorrowTempLabel);
            tomorrowTemp.appendChild(tomorrowTempSpan);
            const tomorrowWeatherDescriptionLabel = document.createElement('span');
            tomorrowWeatherDescriptionLabel.classList.add('tomorrowWeatherDescriptionLabel');
            tomorrowWeatherDescriptionLabel.textContent = ""
            const tomorrowWeatherDescriptionSpan = document.createElement('span');
            tomorrowWeatherDescriptionSpan.classList.add('tomorrowWeatherDescriptionSpan');
            tomorrowWeatherDescriptionSpan.textContent = await Weather.GetWeatherForecastDescription(city,24);
            const tomorrowWeatherDescription = document.createElement('p');
            tomorrowWeatherDescription.classList.add('tomorrowWeatherDescription');
            tomorrowWeatherDescription.appendChild(tomorrowWeatherDescriptionLabel);
            tomorrowWeatherDescription.appendChild(tomorrowWeatherDescriptionSpan);
            const tomorrowWeatherIconURL = await Weather.GetWeatherForecastIconURL(city,24);
            const tomorrowWeatherIconImage = document.createElement('img');
            tomorrowWeatherIconImage.classList.add('tomorrowWeatherIconImage');
            tomorrowWeatherIconImage.src = tomorrowWeatherIconURL;
            tomorrowWeatherIconImage.alt = `${await Weather.GetWeatherForecastDescription(city,24)} icon`;
            const tomorrowFeelsLikeTempLabel = document.createElement('span');
            tomorrowFeelsLikeTempLabel.classList.add('tomorrowFeelsLikeTempLabel');
            tomorrowFeelsLikeTempLabel.textContent = "feels like temperature: "
            const tomorrowFeelsLikeTempSpan = document.createElement('span');
            tomorrowFeelsLikeTempSpan.classList.add('tomorrowFeelsLikeTempSpan');
            //TODO: complete build
            tomorrowFeelsLikeTempSpan.textContent = await Weather.GetWeatherCurrentFeelsLike(city);
            const tomorrowFeelsLikeTemp = document.createElement('p');
            tomorrowFeelsLikeTemp.classList.add('tomorrowFeelsLikeTemp');
            tomorrowFeelsLikeTemp.appendChild(tomorrowFeelsLikeTempLabel);
            tomorrowFeelsLikeTemp.appendChild(tomorrowFeelsLikeTempSpan);
            const tomorrowHumidityLabel = document.createElement('span');
            tomorrowHumidityLabel.classList.add('tomorrowHumidityLabel');
            tomorrowHumidityLabel.textContent = "humidity: "
            const tomorrowHumiditySpan = document.createElement('span');
            tomorrowHumiditySpan.classList.add('tomorrowHumiditySpan');
            //TODO: complete build
            tomorrowHumiditySpan.textContent = await Weather.GetWeatherCurrentHumidity(city);
            const tomorrowHumidity = document.createElement('p');
            tomorrowHumidity.classList.add('tomorrowHumidity');
            tomorrowHumidity.appendChild(tomorrowHumidityLabel);
            tomorrowHumidity.appendChild(tomorrowHumiditySpan);
            const tomorrowWindSpeedLabel = document.createElement('span');
            tomorrowWindSpeedLabel.classList.add('tomorrowWindSpeedLabel');
            tomorrowWindSpeedLabel.textContent = "wind speed: "
            const tomorrowWindSpeedSpan = document.createElement('span');
            tomorrowWindSpeedSpan.classList.add('tomorrowWindSpeedSpan');
            //TODO: complete build
            tomorrowWindSpeedSpan.textContent = await Weather.GetWeatherCurrentWindSpeed(city);
            const tomorrowWindSpeed = document.createElement('p');
            tomorrowWindSpeed.classList.add('tomorrowWindSpeed');
            tomorrowWindSpeed.appendChild(tomorrowWindSpeedLabel);
            tomorrowWindSpeed.appendChild(tomorrowWindSpeedSpan);
            const tomorrowWindDirLabel = document.createElement('span');
            tomorrowWindDirLabel.classList.add('tomorrowWindDirLabel');
            tomorrowWindDirLabel.textContent = "wind direction: "
            const tomorrowWindDirSpan = document.createElement('span');
            tomorrowWindDirSpan.classList.add('tomorrowWindDirSpan');
            //TODO: complete build
            tomorrowWindDirSpan.textContent = await Weather.GetWeatherCurrentWindDir(city);
            const tomorrowWindDir = document.createElement('p');
            tomorrowWindDir.classList.add('tomorrowWindDir');
            tomorrowWindDir.appendChild(tomorrowWindDirLabel);
            tomorrowWindDir.appendChild(tomorrowWindDirSpan);
            const tomorrowSunriseLabel = document.createElement('span');
            tomorrowSunriseLabel.classList.add('tomorrowSunriseLabel');
            tomorrowSunriseLabel.textContent = "sunrise: "
            const tomorrowSunriseSpan = document.createElement('span');
            tomorrowSunriseSpan.classList.add('tomorrowSunriseSpan');
            //TODO: complete build
            tomorrowSunriseSpan.textContent = await Weather.GetWeatherCurrentSunrise(city);
            const tomorrowSunrise = document.createElement('p');
            tomorrowSunrise.classList.add('tomorrowSunrise');
            tomorrowSunrise.appendChild(tomorrowSunriseLabel);
            tomorrowSunrise.appendChild(tomorrowSunriseSpan);
            const tomorrowSunsetLabel = document.createElement('span');
            tomorrowSunsetLabel.classList.add('tomorrowSunsetLabel');
            tomorrowSunsetLabel.textContent = "sunset: "
            const tomorrowSunsetSpan = document.createElement('span');
            tomorrowSunsetSpan.classList.add('tomorrowSunsetSpan');
            //TODO: complete build
            tomorrowSunsetSpan.textContent = await Weather.GetWeatherCurrentSunset(city);
            const tomorrowSunset = document.createElement('p');
            tomorrowSunset.classList.add('tomorrowSunset');
            tomorrowSunset.appendChild(tomorrowSunsetLabel);
            tomorrowSunset.appendChild(tomorrowSunsetSpan);
            tomorrow.appendChild(tomorrowLabel);
            tomorrow.appendChild(tomorrowTemp);
            tomorrow.appendChild(tomorrowWeatherDescription);
            tomorrow.appendChild(tomorrowWeatherIconImage);
            tomorrow.appendChild(tomorrowFeelsLikeTemp);
            tomorrow.appendChild(tomorrowHumidity);
            tomorrow.appendChild(tomorrowWindSpeed);
            tomorrow.appendChild(tomorrowWindDir);
            tomorrow.appendChild(tomorrowSunrise);
            tomorrow.appendChild(tomorrowSunset);
            const dayAfterTomorrow = document.createElement('section');
            dayAfterTomorrow.classList.add('dayAfterTomorrowSection');
            const dayAfterTomorrowLabel = document.createElement('h3');
            dayAfterTomorrowLabel.classList.add('dayAfterTomorrowSectionLabel');
            //TODO: complete build - add dow label
            dayAfterTomorrowLabel.textContent = GetAdjDOW(Date.now(),48);
            const dayAfterTomorrowTempLabel = document.createElement('span');
            dayAfterTomorrowTempLabel.classList.add('dayAfterTomorrowTempLabel');
            dayAfterTomorrowTempLabel.textContent = "temperature: "
            const dayAfterTomorrowTempSpan = document.createElement('span');
            dayAfterTomorrowTempSpan.classList.add('dayAfterTomorrowTempSpan');
            dayAfterTomorrowTempSpan.textContent = await Weather.GetWeatherForecastTemp(city,48);
            const dayAfterTomorrowTemp = document.createElement('p');
            dayAfterTomorrowTemp.classList.add('dayAfterTomorrowTemp');
            dayAfterTomorrowTemp.appendChild(dayAfterTomorrowTempLabel);
            dayAfterTomorrowTemp.appendChild(dayAfterTomorrowTempSpan);
            const dayAfterTomorrowWeatherDescriptionLabel = document.createElement('span');
            dayAfterTomorrowWeatherDescriptionLabel.classList.add('dayAfterTomorrowWeatherDescriptionLabel');
            dayAfterTomorrowWeatherDescriptionLabel.textContent = ""
            const dayAfterTomorrowWeatherDescriptionSpan = document.createElement('span');
            dayAfterTomorrowWeatherDescriptionSpan.classList.add('dayAfterTomorrowWeatherDescriptionSpan');
            dayAfterTomorrowWeatherDescriptionSpan.textContent = await Weather.GetWeatherForecastDescription(city,48);
            const dayAfterTomorrowWeatherDescription = document.createElement('p');
            dayAfterTomorrowWeatherDescription.classList.add('dayAfterTomorrowWeatherDescription');
            dayAfterTomorrowWeatherDescription.appendChild(dayAfterTomorrowWeatherDescriptionLabel);
            dayAfterTomorrowWeatherDescription.appendChild(dayAfterTomorrowWeatherDescriptionSpan);
            const dayAfterTomorrowWeatherIconURL = await Weather.GetWeatherForecastIconURL(city,48);
            const dayAfterTomorrowWeatherIconImage = document.createElement('img');
            dayAfterTomorrowWeatherIconImage.classList.add('dayAfterTomorrowWeatherIconImage');
            dayAfterTomorrowWeatherIconImage.src = dayAfterTomorrowWeatherIconURL;
            dayAfterTomorrowWeatherIconImage.alt = `${await Weather.GetWeatherForecastDescription(city,48)} icon`;
            const dayAfterTomorrowFeelsLikeTempLabel = document.createElement('span');
            dayAfterTomorrowFeelsLikeTempLabel.classList.add('dayAfterTomorrowFeelsLikeTempLabel');
            dayAfterTomorrowFeelsLikeTempLabel.textContent = "feels like temperature: "
            const dayAfterTomorrowFeelsLikeTempSpan = document.createElement('span');
            dayAfterTomorrowFeelsLikeTempSpan.classList.add('dayAfterTomorrowFeelsLikeTempSpan');
            //TODO: complete build
            dayAfterTomorrowFeelsLikeTempSpan.textContent = await Weather.GetWeatherCurrentFeelsLike(city);
            const dayAfterTomorrowFeelsLikeTemp = document.createElement('p');
            dayAfterTomorrowFeelsLikeTemp.classList.add('dayAfterTomorrowFeelsLikeTemp');
            dayAfterTomorrowFeelsLikeTemp.appendChild(dayAfterTomorrowFeelsLikeTempLabel);
            dayAfterTomorrowFeelsLikeTemp.appendChild(dayAfterTomorrowFeelsLikeTempSpan);
            const dayAfterTomorrowHumidityLabel = document.createElement('span');
            dayAfterTomorrowHumidityLabel.classList.add('dayAfterTomorrowHumidityLabel');
            dayAfterTomorrowHumidityLabel.textContent = "humidity: "
            const dayAfterTomorrowHumiditySpan = document.createElement('span');
            dayAfterTomorrowHumiditySpan.classList.add('dayAfterTomorrowHumiditySpan');
            //TODO: complete build
            dayAfterTomorrowHumiditySpan.textContent = await Weather.GetWeatherCurrentHumidity(city);
            const dayAfterTomorrowHumidity = document.createElement('p');
            dayAfterTomorrowHumidity.classList.add('dayAfterTomorrowHumidity');
            dayAfterTomorrowHumidity.appendChild(dayAfterTomorrowHumidityLabel);
            dayAfterTomorrowHumidity.appendChild(dayAfterTomorrowHumiditySpan);
            const dayAfterTomorrowWindSpeedLabel = document.createElement('span');
            dayAfterTomorrowWindSpeedLabel.classList.add('dayAfterTomorrowWindSpeedLabel');
            dayAfterTomorrowWindSpeedLabel.textContent = "wind speed: "
            const dayAfterTomorrowWindSpeedSpan = document.createElement('span');
            dayAfterTomorrowWindSpeedSpan.classList.add('dayAfterTomorrowWindSpeedSpan');
            //TODO: complete build
            dayAfterTomorrowWindSpeedSpan.textContent = await Weather.GetWeatherCurrentWindSpeed(city);
            const dayAfterTomorrowWindSpeed = document.createElement('p');
            dayAfterTomorrowWindSpeed.classList.add('dayAfterTomorrowWindSpeed');
            dayAfterTomorrowWindSpeed.appendChild(dayAfterTomorrowWindSpeedLabel);
            dayAfterTomorrowWindSpeed.appendChild(dayAfterTomorrowWindSpeedSpan);
            const dayAfterTomorrowWindDirLabel = document.createElement('span');
            dayAfterTomorrowWindDirLabel.classList.add('dayAfterTomorrowWindDirLabel');
            dayAfterTomorrowWindDirLabel.textContent = "wind direction: "
            const dayAfterTomorrowWindDirSpan = document.createElement('span');
            dayAfterTomorrowWindDirSpan.classList.add('dayAfterTomorrowWindDirSpan');
            //TODO: complete build
            dayAfterTomorrowWindDirSpan.textContent = await Weather.GetWeatherCurrentWindDir(city);
            const dayAfterTomorrowWindDir = document.createElement('p');
            dayAfterTomorrowWindDir.classList.add('dayAfterTomorrowWindDir');
            dayAfterTomorrowWindDir.appendChild(dayAfterTomorrowWindDirLabel);
            dayAfterTomorrowWindDir.appendChild(dayAfterTomorrowWindDirSpan);
            const dayAfterTomorrowSunriseLabel = document.createElement('span');
            dayAfterTomorrowSunriseLabel.classList.add('dayAfterTomorrowSunriseLabel');
            dayAfterTomorrowSunriseLabel.textContent = "sunrise: "
            const dayAfterTomorrowSunriseSpan = document.createElement('span');
            dayAfterTomorrowSunriseSpan.classList.add('dayAfterTomorrowSunriseSpan');
            //TODO: complete build
            dayAfterTomorrowSunriseSpan.textContent = await Weather.GetWeatherCurrentSunrise(city);
            const dayAfterTomorrowSunrise = document.createElement('p');
            dayAfterTomorrowSunrise.classList.add('dayAfterTomorrowSunrise');
            dayAfterTomorrowSunrise.appendChild(dayAfterTomorrowSunriseLabel);
            dayAfterTomorrowSunrise.appendChild(dayAfterTomorrowSunriseSpan);
            const dayAfterTomorrowSunsetLabel = document.createElement('span');
            dayAfterTomorrowSunsetLabel.classList.add('dayAfterTomorrowSunsetLabel');
            dayAfterTomorrowSunsetLabel.textContent = "sunset: "
            const dayAfterTomorrowSunsetSpan = document.createElement('span');
            dayAfterTomorrowSunsetSpan.classList.add('dayAfterTomorrowSunsetSpan');
            //TODO: complete build
            dayAfterTomorrowSunsetSpan.textContent = await Weather.GetWeatherCurrentSunset(city);
            const dayAfterTomorrowSunset = document.createElement('p');
            dayAfterTomorrowSunset.classList.add('dayAfterTomorrowSunset');
            dayAfterTomorrowSunset.appendChild(dayAfterTomorrowSunsetLabel);
            dayAfterTomorrowSunset.appendChild(dayAfterTomorrowSunsetSpan);
            dayAfterTomorrow.appendChild(dayAfterTomorrowLabel);
            dayAfterTomorrow.appendChild(dayAfterTomorrowTemp);
            dayAfterTomorrow.appendChild(dayAfterTomorrowWeatherDescription);
            dayAfterTomorrow.appendChild(dayAfterTomorrowWeatherIconImage);
            dayAfterTomorrow.appendChild(dayAfterTomorrowFeelsLikeTemp);
            dayAfterTomorrow.appendChild(dayAfterTomorrowHumidity);
            dayAfterTomorrow.appendChild(dayAfterTomorrowWindSpeed);
            dayAfterTomorrow.appendChild(dayAfterTomorrowWindDir);
            dayAfterTomorrow.appendChild(dayAfterTomorrowSunrise);
            dayAfterTomorrow.appendChild(dayAfterTomorrowSunset);
            const dayAfterTheDayAfterTomorrow = document.createElement('section');
            dayAfterTheDayAfterTomorrow.classList.add('dayAfterTheDayAfterTomorrowSection');
            const dayAfterTheDayAfterTomorrowLabel = document.createElement('h3');
            dayAfterTheDayAfterTomorrowLabel.classList.add('dayAfterTheDayAfterTomorrowSectionLabel');
            //TODO: complete build - add dow label
            dayAfterTheDayAfterTomorrowLabel.textContent = GetAdjDOW(Date.now(),72);
            const dayAfterTheDayAfterTomorrowTempLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowTempLabel.classList.add('dayAfterTheDayAfterTomorrowTempLabel');
            dayAfterTheDayAfterTomorrowTempLabel.textContent = "temperature: "
            const dayAfterTheDayAfterTomorrowTempSpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowTempSpan.classList.add('dayAfterTheDayAfterTomorrowTempSpan');
            dayAfterTheDayAfterTomorrowTempSpan.textContent = await Weather.GetWeatherForecastTemp(city,72);
            const dayAfterTheDayAfterTomorrowTemp = document.createElement('p');
            dayAfterTheDayAfterTomorrowTemp.classList.add('dayAfterTheDayAfterTomorrowTemp');
            dayAfterTheDayAfterTomorrowTemp.appendChild(dayAfterTheDayAfterTomorrowTempLabel);
            dayAfterTheDayAfterTomorrowTemp.appendChild(dayAfterTheDayAfterTomorrowTempSpan);
            const dayAfterTheDayAfterTomorrowWeatherDescriptionLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowWeatherDescriptionLabel.classList.add('dayAfterTheDayAfterTomorrowWeatherDescriptionLabel');
            dayAfterTheDayAfterTomorrowWeatherDescriptionLabel.textContent = ""
            const dayAfterTheDayAfterTomorrowWeatherDescriptionSpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowWeatherDescriptionSpan.classList.add('dayAfterTheDayAfterTomorrowWeatherDescriptionSpan');
            dayAfterTheDayAfterTomorrowWeatherDescriptionSpan.textContent = await Weather.GetWeatherForecastDescription(city,72);
            const dayAfterTheDayAfterTomorrowWeatherDescription = document.createElement('p');
            dayAfterTheDayAfterTomorrowWeatherDescription.classList.add('dayAfterTheDayAfterTomorrowWeatherDescription');
            dayAfterTheDayAfterTomorrowWeatherDescription.appendChild(dayAfterTheDayAfterTomorrowWeatherDescriptionLabel);
            dayAfterTheDayAfterTomorrowWeatherDescription.appendChild(dayAfterTheDayAfterTomorrowWeatherDescriptionSpan);
            const dayAfterTheDayAfterTomorrowWeatherIconURL = await Weather.GetWeatherForecastIconURL(city,72);
            const dayAfterTheDayAfterTomorrowWeatherIconImage = document.createElement('img');
            dayAfterTheDayAfterTomorrowWeatherIconImage.classList.add('dayAfterTheDayAfterTomorrowWeatherIconImage');
            dayAfterTheDayAfterTomorrowWeatherIconImage.src = dayAfterTheDayAfterTomorrowWeatherIconURL;
            dayAfterTheDayAfterTomorrowWeatherIconImage.alt = `${await Weather.GetWeatherForecastDescription(city,72)} icon`;
            const dayAfterTheDayAfterTomorrowFeelsLikeTempLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowFeelsLikeTempLabel.classList.add('dayAfterTheDayAfterTomorrowFeelsLikeTempLabel');
            dayAfterTheDayAfterTomorrowFeelsLikeTempLabel.textContent = "feels like temperature: "
            const dayAfterTheDayAfterTomorrowFeelsLikeTempSpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowFeelsLikeTempSpan.classList.add('dayAfterTheDayAfterTomorrowFeelsLikeTempSpan');
            //TODO: complete build
            dayAfterTheDayAfterTomorrowFeelsLikeTempSpan.textContent = await Weather.GetWeatherCurrentFeelsLike(city);
            const dayAfterTheDayAfterTomorrowFeelsLikeTemp = document.createElement('p');
            dayAfterTheDayAfterTomorrowFeelsLikeTemp.classList.add('dayAfterTheDayAfterTomorrowFeelsLikeTemp');
            dayAfterTheDayAfterTomorrowFeelsLikeTemp.appendChild(dayAfterTheDayAfterTomorrowFeelsLikeTempLabel);
            dayAfterTheDayAfterTomorrowFeelsLikeTemp.appendChild(dayAfterTheDayAfterTomorrowFeelsLikeTempSpan);
            const dayAfterTheDayAfterTomorrowHumidityLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowHumidityLabel.classList.add('dayAfterTheDayAfterTomorrowHumidityLabel');
            dayAfterTheDayAfterTomorrowHumidityLabel.textContent = "humidity: "
            const dayAfterTheDayAfterTomorrowHumiditySpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowHumiditySpan.classList.add('dayAfterTheDayAfterTomorrowHumiditySpan');
            //TODO: complete build
            dayAfterTheDayAfterTomorrowHumiditySpan.textContent = await Weather.GetWeatherCurrentHumidity(city);
            const dayAfterTheDayAfterTomorrowHumidity = document.createElement('p');
            dayAfterTheDayAfterTomorrowHumidity.classList.add('dayAfterTheDayAfterTomorrowHumidity');
            dayAfterTheDayAfterTomorrowHumidity.appendChild(dayAfterTheDayAfterTomorrowHumidityLabel);
            dayAfterTheDayAfterTomorrowHumidity.appendChild(dayAfterTheDayAfterTomorrowHumiditySpan);
            const dayAfterTheDayAfterTomorrowWindSpeedLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowWindSpeedLabel.classList.add('dayAfterTheDayAfterTomorrowWindSpeedLabel');
            dayAfterTheDayAfterTomorrowWindSpeedLabel.textContent = "wind speed: "
            const dayAfterTheDayAfterTomorrowWindSpeedSpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowWindSpeedSpan.classList.add('dayAfterTheDayAfterTomorrowWindSpeedSpan');
            //TODO: complete build
            dayAfterTheDayAfterTomorrowWindSpeedSpan.textContent = await Weather.GetWeatherCurrentWindSpeed(city);
            const dayAfterTheDayAfterTomorrowWindSpeed = document.createElement('p');
            dayAfterTheDayAfterTomorrowWindSpeed.classList.add('dayAfterTheDayAfterTomorrowWindSpeed');
            dayAfterTheDayAfterTomorrowWindSpeed.appendChild(dayAfterTheDayAfterTomorrowWindSpeedLabel);
            dayAfterTheDayAfterTomorrowWindSpeed.appendChild(dayAfterTheDayAfterTomorrowWindSpeedSpan);
            const dayAfterTheDayAfterTomorrowWindDirLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowWindDirLabel.classList.add('dayAfterTheDayAfterTomorrowWindDirLabel');
            dayAfterTheDayAfterTomorrowWindDirLabel.textContent = "wind direction: "
            const dayAfterTheDayAfterTomorrowWindDirSpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowWindDirSpan.classList.add('dayAfterTheDayAfterTomorrowWindDirSpan');
            //TODO: complete build
            dayAfterTheDayAfterTomorrowWindDirSpan.textContent = await Weather.GetWeatherCurrentWindDir(city);
            const dayAfterTheDayAfterTomorrowWindDir = document.createElement('p');
            dayAfterTheDayAfterTomorrowWindDir.classList.add('dayAfterTheDayAfterTomorrowWindDir');
            dayAfterTheDayAfterTomorrowWindDir.appendChild(dayAfterTheDayAfterTomorrowWindDirLabel);
            dayAfterTheDayAfterTomorrowWindDir.appendChild(dayAfterTheDayAfterTomorrowWindDirSpan);
            const dayAfterTheDayAfterTomorrowSunriseLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowSunriseLabel.classList.add('dayAfterTheDayAfterTomorrowSunriseLabel');
            dayAfterTheDayAfterTomorrowSunriseLabel.textContent = "sunrise: "
            const dayAfterTheDayAfterTomorrowSunriseSpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowSunriseSpan.classList.add('dayAfterTheDayAfterTomorrowSunriseSpan');
            //TODO: complete build
            dayAfterTheDayAfterTomorrowSunriseSpan.textContent = await Weather.GetWeatherCurrentSunrise(city);
            const dayAfterTheDayAfterTomorrowSunrise = document.createElement('p');
            dayAfterTheDayAfterTomorrowSunrise.classList.add('dayAfterTheDayAfterTomorrowSunrise');
            dayAfterTheDayAfterTomorrowSunrise.appendChild(dayAfterTheDayAfterTomorrowSunriseLabel);
            dayAfterTheDayAfterTomorrowSunrise.appendChild(dayAfterTheDayAfterTomorrowSunriseSpan);
            const dayAfterTheDayAfterTomorrowSunsetLabel = document.createElement('span');
            dayAfterTheDayAfterTomorrowSunsetLabel.classList.add('dayAfterTheDayAfterTomorrowSunsetLabel');
            dayAfterTheDayAfterTomorrowSunsetLabel.textContent = "sunset: "
            const dayAfterTheDayAfterTomorrowSunsetSpan = document.createElement('span');
            dayAfterTheDayAfterTomorrowSunsetSpan.classList.add('dayAfterTheDayAfterTomorrowSunsetSpan');
            //TODO: complete build
            dayAfterTheDayAfterTomorrowSunsetSpan.textContent = await Weather.GetWeatherCurrentSunset(city);
            const dayAfterTheDayAfterTomorrowSunset = document.createElement('p');
            dayAfterTheDayAfterTomorrowSunset.classList.add('dayAfterTheDayAfterTomorrowSunset');
            dayAfterTheDayAfterTomorrowSunset.appendChild(dayAfterTheDayAfterTomorrowSunsetLabel);
            dayAfterTheDayAfterTomorrowSunset.appendChild(dayAfterTheDayAfterTomorrowSunsetSpan);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowLabel);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowTemp);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowWeatherDescription);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowWeatherIconImage);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowFeelsLikeTemp);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowHumidity);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowWindSpeed);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowWindDir);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowSunrise);
            dayAfterTheDayAfterTomorrow.appendChild(dayAfterTheDayAfterTomorrowSunset);
            forecastContainer.appendChild(cityName);
            forecastContainer.appendChild(tomorrow);
            forecastContainer.appendChild(dayAfterTomorrow);
            forecastContainer.appendChild(dayAfterTheDayAfterTomorrow);
        } else {
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
    constructor(lat, long, currentMaxAgeMS=this.GetCurrentMaxAgeMS(), forecastMaxAgeMS=this.GetForecastMaxAgeMS(), units=this.GetUnits(), APIKey=this.GetAPIKey(), disabled=false, simulated=false) {
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
        this.simulated = simulated;
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
        weather.simulated = weatherJSON.simulated;
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
        newObject.simulated = oldObject.simulated;
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
            if(weather.simulated) {
                weather.currentData = {
                    "coord": {
                        "lon": -71.967,
                        "lat": -13.532
                    },
                    "weather": [
                        {
                            "id": 803,
                            "main": "Clouds",
                            "description": "broken clouds",
                            "icon": "04d"
                        }
                    ],
                    "base": "stations",
                    "main": {
                        "temp": 14.67,
                        "feels_like": 13.63,
                        "temp_min": 14.67,
                        "temp_max": 14.67,
                        "pressure": 1015,
                        "humidity": 55,
                        "sea_level": 1015,
                        "grnd_level": 651
                    },
                    "visibility": 10000,
                    "wind": {
                        "speed": 1.03,
                        "deg": 0
                    },
                    "clouds": {
                        "all": 75
                    },
                    "dt": 1765370441,
                    "sys": {
                        "type": 1,
                        "id": 8708,
                        "country": "PE",
                        "sunrise": 1765361628,
                        "sunset": 1765408082
                    },
                    "timezone": -18000,
                    "id": 3941584,
                    "name": "Cusco",
                    "cod": 200
                }
            } else {
                weather.currentData = {
                    message: "Weather service is temporarily unavailble, please try again later."
                }
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
            if(weather.simulated) {
                weather.forecastData = {
                    "cod": "200",
                    "message": 0,
                    "cnt": 40,
                    "list": [
                        {
                            "dt": 1765378800,
                            "main": {
                                "temp": 15.02,
                                "feels_like": 13.96,
                                "temp_min": 15.02,
                                "temp_max": 15.71,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 651,
                                "humidity": 53,
                                "temp_kf": -0.69
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 56
                            },
                            "wind": {
                                "speed": 1.16,
                                "deg": 325,
                                "gust": 1.72
                            },
                            "visibility": 10000,
                            "pop": 0.66,
                            "rain": {
                                "3h": 0.32
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-10 15:00:00"
                        },
                        {
                            "dt": 1765389600,
                            "main": {
                                "temp": 17.22,
                                "feels_like": 16.17,
                                "temp_min": 17.22,
                                "temp_max": 18.49,
                                "pressure": 1010,
                                "sea_level": 1010,
                                "grnd_level": 649,
                                "humidity": 45,
                                "temp_kf": -1.27
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 56
                            },
                            "wind": {
                                "speed": 3.05,
                                "deg": 344,
                                "gust": 2.73
                            },
                            "visibility": 10000,
                            "pop": 0.97,
                            "rain": {
                                "3h": 0.63
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-10 18:00:00"
                        },
                        {
                            "dt": 1765400400,
                            "main": {
                                "temp": 24.7,
                                "feels_like": 24.35,
                                "temp_min": 24.7,
                                "temp_max": 24.7,
                                "pressure": 1004,
                                "sea_level": 1004,
                                "grnd_level": 647,
                                "humidity": 43,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04d"
                                }
                            ],
                            "clouds": {
                                "all": 96
                            },
                            "wind": {
                                "speed": 2.89,
                                "deg": 337,
                                "gust": 3.31
                            },
                            "visibility": 10000,
                            "pop": 0.15,
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-10 21:00:00"
                        },
                        {
                            "dt": 1765411200,
                            "main": {
                                "temp": 12.31,
                                "feels_like": 11.42,
                                "temp_min": 12.31,
                                "temp_max": 12.31,
                                "pressure": 1010,
                                "sea_level": 1010,
                                "grnd_level": 649,
                                "humidity": 70,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 97
                            },
                            "wind": {
                                "speed": 2.77,
                                "deg": 28,
                                "gust": 3.46
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 1.02
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-11 00:00:00"
                        },
                        {
                            "dt": 1765422000,
                            "main": {
                                "temp": 11.05,
                                "feels_like": 10.06,
                                "temp_min": 11.05,
                                "temp_max": 11.05,
                                "pressure": 1014,
                                "sea_level": 1014,
                                "grnd_level": 651,
                                "humidity": 71,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 91
                            },
                            "wind": {
                                "speed": 2.05,
                                "deg": 40,
                                "gust": 2.21
                            },
                            "visibility": 10000,
                            "pop": 0.39,
                            "rain": {
                                "3h": 0.25
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-11 03:00:00"
                        },
                        {
                            "dt": 1765432800,
                            "main": {
                                "temp": 10.52,
                                "feels_like": 9.48,
                                "temp_min": 10.52,
                                "temp_max": 10.52,
                                "pressure": 1013,
                                "sea_level": 1013,
                                "grnd_level": 650,
                                "humidity": 71,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 96
                            },
                            "wind": {
                                "speed": 1.2,
                                "deg": 46,
                                "gust": 1.32
                            },
                            "visibility": 10000,
                            "pop": 0.27,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-11 06:00:00"
                        },
                        {
                            "dt": 1765443600,
                            "main": {
                                "temp": 10.39,
                                "feels_like": 9.39,
                                "temp_min": 10.39,
                                "temp_max": 10.39,
                                "pressure": 1012,
                                "sea_level": 1012,
                                "grnd_level": 649,
                                "humidity": 73,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 0.39,
                                "deg": 69,
                                "gust": 0.72
                            },
                            "visibility": 10000,
                            "pop": 0.4,
                            "rain": {
                                "3h": 0.28
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-11 09:00:00"
                        },
                        {
                            "dt": 1765454400,
                            "main": {
                                "temp": 9.95,
                                "feels_like": 9.63,
                                "temp_min": 9.95,
                                "temp_max": 9.95,
                                "pressure": 1016,
                                "sea_level": 1016,
                                "grnd_level": 651,
                                "humidity": 78,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.46,
                                "deg": 218,
                                "gust": 1.37
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 1.08
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-11 12:00:00"
                        },
                        {
                            "dt": 1765465200,
                            "main": {
                                "temp": 9.31,
                                "feels_like": 8.08,
                                "temp_min": 9.31,
                                "temp_max": 9.31,
                                "pressure": 1017,
                                "sea_level": 1017,
                                "grnd_level": 652,
                                "humidity": 85,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 2.39,
                                "deg": 243,
                                "gust": 2.59
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 1.86
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-11 15:00:00"
                        },
                        {
                            "dt": 1765476000,
                            "main": {
                                "temp": 10.21,
                                "feels_like": 9.32,
                                "temp_min": 10.21,
                                "temp_max": 10.21,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 651,
                                "humidity": 78,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 2.35,
                                "deg": 232,
                                "gust": 2.72
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 1.23
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-11 18:00:00"
                        },
                        {
                            "dt": 1765486800,
                            "main": {
                                "temp": 11.46,
                                "feels_like": 10.46,
                                "temp_min": 11.46,
                                "temp_max": 11.46,
                                "pressure": 1011,
                                "sea_level": 1011,
                                "grnd_level": 649,
                                "humidity": 69,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.45,
                                "deg": 261,
                                "gust": 1.76
                            },
                            "visibility": 10000,
                            "pop": 0.43,
                            "rain": {
                                "3h": 0.2
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-11 21:00:00"
                        },
                        {
                            "dt": 1765497600,
                            "main": {
                                "temp": 10.77,
                                "feels_like": 9.7,
                                "temp_min": 10.77,
                                "temp_max": 10.77,
                                "pressure": 1013,
                                "sea_level": 1013,
                                "grnd_level": 650,
                                "humidity": 69,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 91
                            },
                            "wind": {
                                "speed": 0.93,
                                "deg": 254,
                                "gust": 1.01
                            },
                            "visibility": 10000,
                            "pop": 0.16,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-12 00:00:00"
                        },
                        {
                            "dt": 1765508400,
                            "main": {
                                "temp": 9.85,
                                "feels_like": 9.85,
                                "temp_min": 9.85,
                                "temp_max": 9.85,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 651,
                                "humidity": 74,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 99
                            },
                            "wind": {
                                "speed": 1.09,
                                "deg": 215,
                                "gust": 1.07
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-12 03:00:00"
                        },
                        {
                            "dt": 1765519200,
                            "main": {
                                "temp": 8.69,
                                "feels_like": 8.19,
                                "temp_min": 8.69,
                                "temp_max": 8.69,
                                "pressure": 1014,
                                "sea_level": 1014,
                                "grnd_level": 650,
                                "humidity": 82,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 99
                            },
                            "wind": {
                                "speed": 1.47,
                                "deg": 276,
                                "gust": 1.43
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-12 06:00:00"
                        },
                        {
                            "dt": 1765530000,
                            "main": {
                                "temp": 7.33,
                                "feels_like": 7.33,
                                "temp_min": 7.33,
                                "temp_max": 7.33,
                                "pressure": 1014,
                                "sea_level": 1014,
                                "grnd_level": 649,
                                "humidity": 87,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 89
                            },
                            "wind": {
                                "speed": 1.16,
                                "deg": 258,
                                "gust": 1.17
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-12 09:00:00"
                        },
                        {
                            "dt": 1765540800,
                            "main": {
                                "temp": 9.61,
                                "feels_like": 9.61,
                                "temp_min": 9.61,
                                "temp_max": 9.61,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 650,
                                "humidity": 78,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 803,
                                    "main": "Clouds",
                                    "description": "broken clouds",
                                    "icon": "04d"
                                }
                            ],
                            "clouds": {
                                "all": 55
                            },
                            "wind": {
                                "speed": 1.09,
                                "deg": 235,
                                "gust": 1.08
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-12 12:00:00"
                        },
                        {
                            "dt": 1765551600,
                            "main": {
                                "temp": 14.61,
                                "feels_like": 13.54,
                                "temp_min": 14.61,
                                "temp_max": 14.61,
                                "pressure": 1012,
                                "sea_level": 1012,
                                "grnd_level": 650,
                                "humidity": 54,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 71
                            },
                            "wind": {
                                "speed": 1.54,
                                "deg": 249,
                                "gust": 1.36
                            },
                            "visibility": 10000,
                            "pop": 0.86,
                            "rain": {
                                "3h": 0.36
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-12 15:00:00"
                        },
                        {
                            "dt": 1765562400,
                            "main": {
                                "temp": 18.19,
                                "feels_like": 17.08,
                                "temp_min": 18.19,
                                "temp_max": 18.19,
                                "pressure": 1006,
                                "sea_level": 1006,
                                "grnd_level": 648,
                                "humidity": 39,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 71
                            },
                            "wind": {
                                "speed": 3.22,
                                "deg": 301,
                                "gust": 3.11
                            },
                            "visibility": 10000,
                            "pop": 0.85,
                            "rain": {
                                "3h": 0.75
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-12 18:00:00"
                        },
                        {
                            "dt": 1765573200,
                            "main": {
                                "temp": 16.71,
                                "feels_like": 15.61,
                                "temp_min": 16.71,
                                "temp_max": 16.71,
                                "pressure": 1005,
                                "sea_level": 1005,
                                "grnd_level": 647,
                                "humidity": 45,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 3.94,
                                "deg": 325,
                                "gust": 3.72
                            },
                            "visibility": 10000,
                            "pop": 0.66,
                            "rain": {
                                "3h": 0.47
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-12 21:00:00"
                        },
                        {
                            "dt": 1765584000,
                            "main": {
                                "temp": 11.15,
                                "feels_like": 10.31,
                                "temp_min": 11.15,
                                "temp_max": 11.15,
                                "pressure": 1011,
                                "sea_level": 1011,
                                "grnd_level": 649,
                                "humidity": 76,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 501,
                                    "main": "Rain",
                                    "description": "moderate rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 2.47,
                                "deg": 79,
                                "gust": 2.89
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 3.23
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-13 00:00:00"
                        },
                        {
                            "dt": 1765594800,
                            "main": {
                                "temp": 10.12,
                                "feels_like": 9.33,
                                "temp_min": 10.12,
                                "temp_max": 10.12,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 651,
                                "humidity": 82,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 0.82,
                                "deg": 269,
                                "gust": 1.19
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 1.48
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-13 03:00:00"
                        },
                        {
                            "dt": 1765605600,
                            "main": {
                                "temp": 8.86,
                                "feels_like": 7.95,
                                "temp_min": 8.86,
                                "temp_max": 8.86,
                                "pressure": 1014,
                                "sea_level": 1014,
                                "grnd_level": 650,
                                "humidity": 88,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.9,
                                "deg": 285,
                                "gust": 2.74
                            },
                            "visibility": 9509,
                            "pop": 1,
                            "rain": {
                                "3h": 1.96
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-13 06:00:00"
                        },
                        {
                            "dt": 1765616400,
                            "main": {
                                "temp": 8.82,
                                "feels_like": 8.48,
                                "temp_min": 8.82,
                                "temp_max": 8.82,
                                "pressure": 1013,
                                "sea_level": 1013,
                                "grnd_level": 649,
                                "humidity": 88,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.35,
                                "deg": 241,
                                "gust": 1.4
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 1.49
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-13 09:00:00"
                        },
                        {
                            "dt": 1765627200,
                            "main": {
                                "temp": 9.58,
                                "feels_like": 9.3,
                                "temp_min": 9.58,
                                "temp_max": 9.58,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 650,
                                "humidity": 81,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.38,
                                "deg": 238,
                                "gust": 1.35
                            },
                            "visibility": 10000,
                            "pop": 0.97,
                            "rain": {
                                "3h": 0.11
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-13 12:00:00"
                        },
                        {
                            "dt": 1765638000,
                            "main": {
                                "temp": 13.69,
                                "feels_like": 12.6,
                                "temp_min": 13.69,
                                "temp_max": 13.69,
                                "pressure": 1013,
                                "sea_level": 1013,
                                "grnd_level": 651,
                                "humidity": 57,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.15,
                                "deg": 280,
                                "gust": 1.24
                            },
                            "visibility": 10000,
                            "pop": 0.56,
                            "rain": {
                                "3h": 0.28
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-13 15:00:00"
                        },
                        {
                            "dt": 1765648800,
                            "main": {
                                "temp": 16.96,
                                "feels_like": 15.86,
                                "temp_min": 16.96,
                                "temp_max": 16.96,
                                "pressure": 1008,
                                "sea_level": 1008,
                                "grnd_level": 649,
                                "humidity": 44,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.95,
                                "deg": 345,
                                "gust": 1.55
                            },
                            "visibility": 10000,
                            "pop": 0.63,
                            "rain": {
                                "3h": 0.52
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-13 18:00:00"
                        },
                        {
                            "dt": 1765659600,
                            "main": {
                                "temp": 13.82,
                                "feels_like": 12.82,
                                "temp_min": 13.82,
                                "temp_max": 13.82,
                                "pressure": 1009,
                                "sea_level": 1009,
                                "grnd_level": 648,
                                "humidity": 60,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 2.89,
                                "deg": 34,
                                "gust": 3.48
                            },
                            "visibility": 10000,
                            "pop": 1,
                            "rain": {
                                "3h": 1.98
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-13 21:00:00"
                        },
                        {
                            "dt": 1765670400,
                            "main": {
                                "temp": 10.59,
                                "feels_like": 9.74,
                                "temp_min": 10.59,
                                "temp_max": 10.59,
                                "pressure": 1014,
                                "sea_level": 1014,
                                "grnd_level": 650,
                                "humidity": 78,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.91,
                                "deg": 145,
                                "gust": 2.08
                            },
                            "visibility": 8927,
                            "pop": 1,
                            "rain": {
                                "3h": 2.47
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-14 00:00:00"
                        },
                        {
                            "dt": 1765681200,
                            "main": {
                                "temp": 8.48,
                                "feels_like": 7.27,
                                "temp_min": 8.48,
                                "temp_max": 8.48,
                                "pressure": 1018,
                                "sea_level": 1018,
                                "grnd_level": 652,
                                "humidity": 88,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 2.18,
                                "deg": 206,
                                "gust": 2.38
                            },
                            "visibility": 10000,
                            "pop": 0.96,
                            "rain": {
                                "3h": 1.01
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-14 03:00:00"
                        },
                        {
                            "dt": 1765692000,
                            "main": {
                                "temp": 8.18,
                                "feels_like": 7.43,
                                "temp_min": 8.18,
                                "temp_max": 8.18,
                                "pressure": 1016,
                                "sea_level": 1016,
                                "grnd_level": 650,
                                "humidity": 86,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.63,
                                "deg": 200,
                                "gust": 1.84
                            },
                            "visibility": 10000,
                            "pop": 0.85,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-14 06:00:00"
                        },
                        {
                            "dt": 1765702800,
                            "main": {
                                "temp": 7.35,
                                "feels_like": 7.35,
                                "temp_min": 7.35,
                                "temp_max": 7.35,
                                "pressure": 1016,
                                "sea_level": 1016,
                                "grnd_level": 650,
                                "humidity": 89,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 0.74,
                                "deg": 229,
                                "gust": 0.86
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-14 09:00:00"
                        },
                        {
                            "dt": 1765713600,
                            "main": {
                                "temp": 9.01,
                                "feels_like": 9.01,
                                "temp_min": 9.01,
                                "temp_max": 9.01,
                                "pressure": 1017,
                                "sea_level": 1017,
                                "grnd_level": 651,
                                "humidity": 75,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 0.88,
                                "deg": 129,
                                "gust": 0.99
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-14 12:00:00"
                        },
                        {
                            "dt": 1765724400,
                            "main": {
                                "temp": 12.6,
                                "feels_like": 11.46,
                                "temp_min": 12.6,
                                "temp_max": 12.6,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 652,
                                "humidity": 59,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 0.21,
                                "deg": 331,
                                "gust": 0.3
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-14 15:00:00"
                        },
                        {
                            "dt": 1765735200,
                            "main": {
                                "temp": 14.44,
                                "feels_like": 13.3,
                                "temp_min": 14.44,
                                "temp_max": 14.44,
                                "pressure": 1012,
                                "sea_level": 1012,
                                "grnd_level": 650,
                                "humidity": 52,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 2.87,
                                "deg": 30,
                                "gust": 2.52
                            },
                            "visibility": 10000,
                            "pop": 0.73,
                            "rain": {
                                "3h": 0.74
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-14 18:00:00"
                        },
                        {
                            "dt": 1765746000,
                            "main": {
                                "temp": 12.66,
                                "feels_like": 11.37,
                                "temp_min": 12.66,
                                "temp_max": 12.66,
                                "pressure": 1012,
                                "sea_level": 1012,
                                "grnd_level": 650,
                                "humidity": 53,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.11,
                                "deg": 29,
                                "gust": 2.03
                            },
                            "visibility": 10000,
                            "pop": 0.35,
                            "rain": {
                                "3h": 0.24
                            },
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-14 21:00:00"
                        },
                        {
                            "dt": 1765756800,
                            "main": {
                                "temp": 10.89,
                                "feels_like": 9.73,
                                "temp_min": 10.89,
                                "temp_max": 10.89,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 651,
                                "humidity": 65,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 2.18,
                                "deg": 164,
                                "gust": 2.47
                            },
                            "visibility": 10000,
                            "pop": 0.15,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-15 00:00:00"
                        },
                        {
                            "dt": 1765767600,
                            "main": {
                                "temp": 9.86,
                                "feels_like": 9.06,
                                "temp_min": 9.86,
                                "temp_max": 9.86,
                                "pressure": 1017,
                                "sea_level": 1017,
                                "grnd_level": 652,
                                "humidity": 73,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 500,
                                    "main": "Rain",
                                    "description": "light rain",
                                    "icon": "10n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.96,
                                "deg": 232,
                                "gust": 2.07
                            },
                            "visibility": 10000,
                            "pop": 0.2,
                            "rain": {
                                "3h": 0.24
                            },
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-15 03:00:00"
                        },
                        {
                            "dt": 1765778400,
                            "main": {
                                "temp": 8.41,
                                "feels_like": 8.41,
                                "temp_min": 8.41,
                                "temp_max": 8.41,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 650,
                                "humidity": 81,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 1.22,
                                "deg": 227,
                                "gust": 1.36
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-15 06:00:00"
                        },
                        {
                            "dt": 1765789200,
                            "main": {
                                "temp": 8.34,
                                "feels_like": 8.34,
                                "temp_min": 8.34,
                                "temp_max": 8.34,
                                "pressure": 1015,
                                "sea_level": 1015,
                                "grnd_level": 650,
                                "humidity": 81,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04n"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 0.6,
                                "deg": 206,
                                "gust": 0.72
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "n"
                            },
                            "dt_txt": "2025-12-15 09:00:00"
                        },
                        {
                            "dt": 1765800000,
                            "main": {
                                "temp": 9.73,
                                "feels_like": 9.73,
                                "temp_min": 9.73,
                                "temp_max": 9.73,
                                "pressure": 1017,
                                "sea_level": 1017,
                                "grnd_level": 651,
                                "humidity": 73,
                                "temp_kf": 0
                            },
                            "weather": [
                                {
                                    "id": 804,
                                    "main": "Clouds",
                                    "description": "overcast clouds",
                                    "icon": "04d"
                                }
                            ],
                            "clouds": {
                                "all": 100
                            },
                            "wind": {
                                "speed": 0.39,
                                "deg": 117,
                                "gust": 0.84
                            },
                            "visibility": 10000,
                            "pop": 0,
                            "sys": {
                                "pod": "d"
                            },
                            "dt_txt": "2025-12-15 12:00:00"
                        }
                    ],
                    "city": {
                        "id": 3941584,
                        "name": "Cusco",
                        "coord": {
                            "lat": -13.532,
                            "lon": -71.967
                        },
                        "country": "PE",
                        "population": 312140,
                        "timezone": -18000,
                        "sunrise": 1765361628,
                        "sunset": 1765408082
                    }
                }
            } else {
                weather.currentData = {
                    message: "Weather service is temporarily unavailble, please try again later."
                }
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
            return await (await weather.forecastData.list[await weather.GetForecaseArrayIndexForSpecifiedHours(hours)]).weather[0].icon;
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