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
    async SetLocationsAsCapitals() {
        MultiWeather.debugMessage("SetLocationsAsCapitals()", "SetLocationsAsCapitals()", "functionCalled", false);
        const data = await this.GetData();
        MultiWeather.debugMessage(data, "SetLocationsAsCapitals()", "data");
        const capitalIds = await data.GetCapitalIds();
        MultiWeather.debugMessage(capitalIds, "SetLocationsAsCapitals()", "capitalIds");
        await this.SetLocationsByCityIds(capitalIds);
    }
    async SetLocationsByCityIds(cityIds) {
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
        await this.SetLocationsByCities(filterCityData);
    }
    async SetLocationsByCities(cities) {
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
    DisplayWeatherSpotlightResults(weatherContainer, currentCityId){
        const cityId = currentCityId();
        weatherContainer.textContent = `${cityId} - ${JSON.stringify(this.locations[this.locationMap[cityId]])}`;
        //TODO: complete build
    }
    DisplayForecastSpotlightResults(forecastContainer, currentCityId){
        const cityId = currentCityId();        
        forecastContainer.textContent = `${cityId} - ${JSON.stringify(this.locations[this.locationMap[cityId]])}`;
        //TODO: complete build
    }
}
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
        return newObject;
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
            return 1000 * 60 * 60 * 24;//1000*60*15;
        } else {
            return this.currentMaxAgeMS;
        }
    }
    GetForecastMaxAgeMS() {
        if(this.forecastMaxAgeMS == null) {
            return 1000*60*60*24;//1000*60*60*3;
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
                    //console.log(this.GetCurrentData()); // testing only
                    this.currentChanged = false;
                    this.lastCurrentFetch = GetNow();
                } else {
                    if((currentResponse.status===429)&&(currentResponse.statusText==="Too Many Requests")) {
                        this.currentData = {
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
    }
    GetCurrentFetchMSAge() {
        if(!(this.lastCurrentFetch == null)) {
            return GetNow() - this.lastCurrentFetch;
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
                    //console.log(this.forecastData); // testing only
                    this.forecastChanged = false;
                    this.lastForecastFetch = GetNow();
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
            return GetNow() - this.lastForecastFetch;
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
        const current = GetNow();
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
    /*async DisplayCurrentWeatherResults(currentWeatherContainerClass, weather) {
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
        currentWeatherContainer.appendChild(curSunsetContainer);/**/

        /*const Empty1Container = document.createElement('p');
        const Empty1ValueContainer = document.createElement('span');
        Empty1Container.appendChild(Empty1ValueContainer);
        currentWeatherContainer.appendChild(Empty1Container);

        const Empty2Container = document.createElement('p');
        const Empty2ValueContainer = document.createElement('span');
        Empty2Container.appendChild(Empty2ValueContainer);
        currentWeatherContainer.appendChild(Empty2Container);/**/
    /*}/**/
    /*async DisplayWeatherForecastResults(weatherForecastContainerClass, weather) {
        const weatherForecastContainer = document.querySelector(weatherForecastContainerClass);
        const date = new Date(GetNow());
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
        weatherForecastContainer.appendChild(forecastAfterTomorrowContainer);/**/

        /*const Empty1Container = document.createElement('p');
        const Empty1ValueContainer = document.createElement('span');
        Empty1Container.appendChild(Empty1ValueContainer);
        weatherForecastContainer.appendChild(Empty1Container);

        const Empty2Container = document.createElement('p');
        const Empty2ValueContainer = document.createElement('span');
        Empty2Container.appendChild(Empty2ValueContainer);
        weatherForecastContainer.appendChild(Empty2Container);

        const Empty3Container = document.createElement('p');
        const Empty3ValueContainer = document.createElement('span');
        Empty3Container.appendChild(Empty3ValueContainer);
        weatherForecastContainer.appendChild(Empty3Container);

        const Empty4Container = document.createElement('p');
        const Empty4ValueContainer = document.createElement('span');
        Empty4Container.appendChild(Empty4ValueContainer);
        weatherForecastContainer.appendChild(Empty4Container);

        const Empty5Container = document.createElement('p');
        const Empty5ValueContainer = document.createElement('span');
        Empty5Container.appendChild(Empty5ValueContainer);
        weatherForecastContainer.appendChild(Empty5Container);

        const Empty6Container = document.createElement('p');
        const Empty6ValueContainer = document.createElement('span');
        Empty6Container.appendChild(Empty6ValueContainer);
        weatherForecastContainer.appendChild(Empty6Container);

        const Empty7Container = document.createElement('p');
        const Empty7ValueContainer = document.createElement('span');
        Empty7Container.appendChild(Empty7ValueContainer);
        weatherForecastContainer.appendChild(Empty7Container);/**/
    /*}/**/
}