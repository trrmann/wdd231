import { HasPreference, GetPreferenceObject, SetPreferenceObject } from "./preference.mjs";

export class Data{
    static debug = {
        active: true,
        functionList: [
            "//Factory()",
            "//IsFetched()",
            "//Fetch()",
            "//GetDepartamentoCount()",
            "//GetDepartamentoEntries()",
            "//GetFoodEntries()",
            "//GetAttractionEntries()",
            "//GetCapitalIds()",
            "//GetDepartamentoData()",
            "//GetDepartamentoEntry()",
            "//GetDepartamento()",
            "//GetCityCount()",
            "//GetDepartamentoCityCount()",
            "//GetCityEntries()",
            "//GetCityEntryNames()",
            "//GetCityEntryLatitudes()",
            "//GetCityEntryLongitudes()",
            "//GetCapitalEntries()",
            "//GetDepartamentoCityEntries()",
            "//GetDepartamentoCityIds()",
            "//GetCityData()",
            "//GetCapitalData()",
            "//GetDepartamentoCityData()",
            "//GetCityEntry()",
            "//GetCapitalEntry()",
            "//GetCity()",
            "//GetCapital()",
            "//GetSiteCount()",
            "//GetFoodCount()",
            "//GetAttractionCount()",
            "//GetSiteEntries()",
            "//GetCitySiteCount()",
            "//GetCitySiteEntries()",
            "//GetCitySiteIds()",
            "//GetDepartamentoSiteCount()",
            "//GetDepartamentoSiteEntries()",
            "//GetDepartamentoSiteIds()",
            "//GetSiteData()",
            "//GetSite()",
            "//GetFood()",
            "//GetAttraction()",
            "//GetCitySites()",
            "//GetDepartamentoSites()",
            "//IsLastFetchedExpired()",
            "//GetLastFetched()",
            "//SetLastFetched()",
            "//GetFetchExpireMS()"
        ],
        valueList: [
            "functionCalled",
            "data",
            "currentData",
            "isFetched",
            "url",
            "response",
            "responseOk",
            "entries",
            "count",
            "filterCalled",
            "dataFilter",
            "dataElement",
            "dataElementType",
            "match",
            "mapCalled",
            "mappedData",
            "departamento",
            "capitalId",
            "departamentoId",
            "departamentoType",
            "departamentoName",
            "departamentoEntry",
            "entry",
            "capital",
            "capitalName",
            "capitalLatitude",
            "capitalLongitude",
            "cityIds",
            "entryFilter",
            "cityEntry",
            "cityEntryId",
            "city",
            "cityName",
            "cityLatitude",
            "cityLongitude",
            "cityId",
            "capitalIds",
            "cityType",
            "cityDepartamento",
            "cityData",
            "siteId",
            "sites",
            "key",
            "hasPreference",
            "setPreferenceCalled",
            "isLastFetchedExpired",
            "expireTime",
            "lastFetched",
            "now",
            "expireMS",
            "fetchExpire",
            "fetchedDatetimeIn"
        ]
    }
    static debugMessage(message, functionName, valueName, messageNextLine=true) {
        if(Data.debug.active) {
            if(Data.debug.functionList.includes(functionName)) {
                if(Data.debug.valueList.includes(valueName)) {
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
        this.currentData = null;
        this.lastFetched = null;
    }
    static CopyFromJSON(dataJSON) {
        const data = new Data();
        data.currentData = dataJSON.currentData;
        data.lastFetched = dataJSON.lastFetched;
        return data;
    }
    static CopyFromObject(destination, source) {
        destination.currentData = source.currentData;
        destination.lastFetched = source.lastFetched;
    }
    static async Factory() {
        Data.debugMessage("Factory()", "Factory()", "functionCalled", false);
        const data = new Data();
        await data.Fetch();
        Data.debugMessage(data, "Factory()", "data")
        return data;
    }
    GetDataURL() {
        Data.debugMessage("GetDataURL()", "GetDataURL()", "functionCalled", false);
        const url = "https://trrmann.github.io/wdd231/project/data/data.json";
        Data.debugMessage(url, "GetDataURL()", "url")
        return url;
    }
    IsFetched(){
        Data.debugMessage("IsFetched()", "IsFetched()", "functionCalled", false);
        const currentData = this.currentData;
        Data.debugMessage(currentData, "Factory()", "currentData")
        const isFetched = currentData != null;
        Data.debugMessage(isFetched, "Factory()", "isFetched")
        return isFetched;
    }
    IsLastFetchedExpired(){
        Data.debugMessage("IsLastFetchedExpired()", "IsLastFetchedExpired()", "functionCalled", false);
        const lastFetchedMS = this.GetLastFetched();
        Data.debugMessage(lastFetchedMS, "IsLastFetchedExpired()", "lastFetched");
        const lastFetched = Date(lastFetchedMS);
        Data.debugMessage(lastFetched, "IsLastFetchedExpired()", "lastFetched");
        if(lastFetched==null) {
            return true;
        } else {
            const expireMS = this.GetFetchExpireMS();
            Data.debugMessage(expireMS, "IsLastFetchedExpired()", "expireMS");
            const fetchExpireMS = lastFetchedMS + expireMS;
            Data.debugMessage(fetchExpireMS, "IsLastFetchedExpired()", "fetchExpire");
            const fetchExpire = Date(fetchExpireMS);
            Data.debugMessage(fetchExpire, "IsLastFetchedExpired()", "fetchExpire");
            const nowMS = Date.now();
            Data.debugMessage(nowMS, "IsLastFetchedExpired()", "now");
            const now = Date(nowMS);
            Data.debugMessage(now, "IsLastFetchedExpired()", "now");
            const match = (nowMS >= fetchExpireMS);
            Data.debugMessage(match, "IsLastFetchedExpired()", "match");
            return match;
        }
    }
    GetLastFetched(){
        Data.debugMessage("GetLastFetched()", "GetLastFetched()", "functionCalled", false);
        const lastFetched = this.lastFetched;
        Data.debugMessage(lastFetched, "GetLastFetched()", "lastFetched");
        return lastFetched;
    }
    SetLastFetched(fetchedDatetime){
        Data.debugMessage("SetLastFetched()", "SetLastFetched()", "functionCalled", false);
        const fetchedDatetimeIn = fetchedDatetime;
        Data.debugMessage(fetchedDatetimeIn, "SetLastFetched()", "fetchedDatetimeIn");
        this.lastFetched = fetchedDatetimeIn;
    }
    GetFetchExpireMS(){
        Data.debugMessage("GetFetchExpireMS()", "GetFetchExpireMS()", "functionCalled", false);
        const expireTime = 1000 * 60 * 60 * 24; // 1 day
        Data.debugMessage(expireTime, "GetFetchExpireMS()", "expireTime");
        return expireTime;
    }
    async Fetch() {
        Data.debugMessage("Fetch()", "Fetch()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "Fetch()", "isFetched");
        if(!isFetched) {
            const key = "PeruData";
            Data.debugMessage(key, "Fetch()", "key");
            const hasPreference = HasPreference(key);
            Data.debugMessage(hasPreference, "Fetch()", "hasPreference");
            if(hasPreference) {
                const preferenceData = GetPreferenceObject(key);
                Data.CopyFromObject(this, preferenceData);
                Data.debugMessage(this, "Fetch()", "data");
            }
            const isLastFetchedExpired = this.IsLastFetchedExpired();
            Data.debugMessage(isLastFetchedExpired, "Fetch()", "isLastFetchedExpired");
            if(isLastFetchedExpired){
                try {
                    const url = this.GetDataURL();
                    Data.debugMessage(url, "Fetch()", "url");
                    const response = await fetch(url);
                    Data.debugMessage(response, "Fetch()", "response");
                    const responseOk = response.ok;
                    Data.debugMessage(responseOk, "Fetch()", "responseOk");
                    if (!responseOk) {
                        throw new Error('Network response was not ok');
                    }
                    this.currentData = await response.json();
                    Data.debugMessage(this.currentData, "Fetch()", "currentData");
                    const newLastFetchDate = Date.now();
                    Data.debugMessage(newLastFetchDate, "Fetch()", "lastFetched");
                    this.SetLastFetched(newLastFetchDate);
                } catch (error) {
                    console.error('There has been a problem with your fetch operation:', error);
                }
            }
            Data.debugMessage("SetPreference()", "Fetch()", "setPreferenceCalled", false);
            SetPreferenceObject(key, this);
        }
    }
    GetDepartamentoCount() {
        Data.debugMessage("GetDepartamentoCount()", "GetDepartamentoCount()", "functionCalled", false);
        const entries = this.GetDepartamentoEntries(); 
        Data.debugMessage(entries, "GetDepartamentoCount()", "entries");
        const count = entries.length;
        Data.debugMessage(count, "GetDepartamentoCount()", "count");
        return count;
    }
    GetDepartamentoEntries() {
        Data.debugMessage("GetDepartamentoEntries()", "GetDepartamentoEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoEntries()", "isFetched");
        if(isFetched) {
            const currentData = this.currentData;
            Data.debugMessage(currentData, "GetDepartamentoEntries()", "currentData");
            const data = currentData.data;
            Data.debugMessage(data, "GetDepartamentoEntries()", "data");
            Data.debugMessage("filter data", "GetDepartamentoEntries()", "filterCalled", false);
            const dataFilter = data.filter(
                function(dataElement) {
                    const dataElementIn = dataElement;
                    Data.debugMessage(dataElementIn, "GetDepartamentoEntries()", "dataElement");
                    const dataElementType = dataElementIn.type;
                    Data.debugMessage(dataElementType, "GetDepartamentoEntries()", "dataElementType");
                    const match = (dataElementType === "departamento");
                    Data.debugMessage(match, "GetDepartamentoEntries()", "match");
                    return match;
                }
            );
            Data.debugMessage(dataFilter, "GetDepartamentoEntries()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
    }
    GetCapitalIds() {
        Data.debugMessage("GetCapitalIds()", "GetCapitalIds()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCapitalIds()", "isFetched");
        if(isFetched) {
            const entries = this.GetDepartamentoEntries();
            Data.debugMessage(entries, "GetCapitalIds()", "entries");
            Data.debugMessage("map data", "GetCapitalIds()", "mapCalled", false);
            const mappedData = (entries).map(
                function(departamento) {
                    Data.debugMessage(departamento, "GetCapitalIds()", "departamento");
                    const capitalId = departamento.capital;
                    Data.debugMessage(capitalId, "GetCapitalIds()", "capitalId");
                    return capitalId;
            });
            Data.debugMessage(mappedData, "GetCapitalIds()", "mappedData");
            return mappedData;
        } else {
            return null;
        }
    }
    GetDepartamentoData() {
        Data.debugMessage("GetDepartamentoData()", "GetDepartamentoData()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoData()", "isFetched");
        if(isFetched) {
            const entries = this.GetDepartamentoEntries();
            Data.debugMessage(entries, "GetDepartamentoData()", "entries");
            const outer = this;
            Data.debugMessage("map data", "GetDepartamentoData()", "mapCalled", false);
            const mappedData = entries.map(
                function(departamento) {
                    Data.debugMessage(departamento, "GetDepartamentoData()", "departamento");
                    const departamentoId = departamento.id;
                    Data.debugMessage(departamentoId, "GetDepartamentoData()", "departamentoId");
                    const departamentoType = departamento.type;
                    Data.debugMessage(departamentoType, "GetDepartamentoData()", "departamentoType");
                    const departamentoName = departamento.name;
                    Data.debugMessage(departamentoName, "GetDepartamentoData()", "departamentoName");
                    const capitalId = departamento.capital;
                    Data.debugMessage(capitalId, "GetDepartamentoData()", "capitalId");
                    const capital = outer.GetCityEntry(capitalId);
                    Data.debugMessage(capital, "GetDepartamentoData()", "capital");
                    const capitalName = capital.name
                    Data.debugMessage(capitalName, "GetDepartamentoData()", "capitalName");
                    const capitalLatitude = capital.latitude
                    Data.debugMessage(capitalLatitude, "GetDepartamentoData()", "capitalLatitude");
                    const capitalLongitude = capital.longitude
                    Data.debugMessage(capitalLongitude, "GetDepartamentoData()", "capitalLongitude");
                    const entry = {
                        id: departamentoId,
                        type: departamentoType,
                        name : departamentoName,
                        capitalId: capitalId,
                        capitalName: capitalName,
                        latitude: capitalLatitude,
                        longitude: capitalLongitude
                    }
                    Data.debugMessage(entry, "GetDepartamentoData()", "entry");
                    return entry;
            });
            Data.debugMessage(mappedData, "GetDepartamentoData()", "mappedData");
            return mappedData;
        } else {
            return null;
        }
    }
    GetDepartamentoEntry(departamentoId) {
        Data.debugMessage("GetDepartamentoEntry()", "GetDepartamentoEntry()", "functionCalled", false);
        const departamentoIdIn = departamentoId;
        Data.debugMessage(departamentoIdIn, "GetDepartamentoEntry()", "departamentoId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoEntry()", "isFetched");
        if(isFetched) {
            const entries = this.GetDepartamentoEntries();
            Data.debugMessage(entries, "GetDepartamentoEntry()", "entries");
            Data.debugMessage("filter entries", "GetDepartamentoEntry()", "filterCalled", false);
            const entryFilter = entries.filter((entry) => {
                const entryIn = entry;
                Data.debugMessage(entryIn, "GetDepartamentoEntry()", "entry");
                const entryId = entry.id;
                Data.debugMessage(entryId, "GetDepartamentoEntry()", "entryId");
                const match = (entryId === departamentoIdIn);
                Data.debugMessage(match, "GetDepartamentoEntry()", "match");
                return match;
            });
            Data.debugMessage(entryFilter, "GetDepartamentoEntry()", "entryFilter");
            let entry = null;
            if(entryFilter.length>0) {
                entry = entryFilter[0];
            }
            Data.debugMessage(entry, "GetDepartamentoEntry()", "entry");
            return entry;
        } else {
            return null;
        }
    }
    GetDepartamento(departamentoId) {
        Data.debugMessage("GetDepartamento()", "GetDepartamento()", "functionCalled", false);
        const departamentoIdIn = departamentoId;
        Data.debugMessage(departamentoIdIn, "GetDepartamento()", "departamentoId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamento()", "isFetched");
        if(isFetched) {
            const entries = this.GetDepartamentoData();
            Data.debugMessage(entries, "GetDepartamento()", "entries");
            Data.debugMessage("filter entries", "GetDepartamento()", "filterCalled", false);
            const entryFilter = entries.filter((entry) => {
                const entryIn = entry;
                Data.debugMessage(entryIn, "GetDepartamento()", "entry");
                const entryId = entry.id;
                Data.debugMessage(entryId, "GetDepartamento()", "entryId");
                const match = (entryId === departamentoIdIn);
                Data.debugMessage(match, "GetDepartamento()", "match");
                return match;                
            });
            Data.debugMessage(entryFilter, "GetDepartamento()", "entryFilter");
            let entry = null;
            if(entryFilter.length>0) {
                entry = entryFilter[0];
            }
            Data.debugMessage(entry, "GetDepartamento()", "entry");
            return entry;
        } else {
            return null;
        }
    }
    GetCityCount() {
        Data.debugMessage("GetCityCount()", "GetCityCount()", "functionCalled", false);
        const entries = this.GetCityEntries(); 
        Data.debugMessage(entries, "GetCityCount()", "entries");
        const count = entries.length;
        Data.debugMessage(count, "GetCityCount()", "count");
        return count;
    }
    GetDepartamentoCityCount(departamentoId) {
        Data.debugMessage("GetDepartamentoCityCount()", "GetDepartamentoCityCount()", "functionCalled", false);
        const departamentoIdIn = departamentoId;
        Data.debugMessage(departamentoIdIn, "GetDepartamentoCityCount()", "departamentoId");
        const entries = this.GetDepartamentoCityEntries(departamentoIdIn);
        Data.debugMessage(entries, "GetDepartamentoCityCount()", "entries");
        const count = entries.length;
        Data.debugMessage(count, "GetDepartamentoCityCount()", "count");
        return count;
    }
    GetCityEntries() {
        Data.debugMessage("GetCityEntries()", "GetCityEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCityEntries()", "isFetched");
        if(isFetched) {
            const currentData = this.currentData;
            Data.debugMessage(currentData, "GetCityEntries()", "currentData");
            const data = currentData.data;
            Data.debugMessage(data, "GetCityEntries()", "data");
            Data.debugMessage("filter data", "GetCityEntries()", "filterCalled", false);
            const dataFilter = (data).filter(
                function(dataElement) {
                    const dataElementIn = dataElement;
                    Data.debugMessage(dataElementIn, "GetCityEntries()", "dataElement");
                    const dataElementType = dataElementIn.type;
                    Data.debugMessage(dataElementType, "GetCityEntries()", "dataElementType");
                    const match = (dataElementType === "city");
                    Data.debugMessage(match, "GetCityEntries()", "match");
                    return match;
                }
            );
            Data.debugMessage(dataFilter, "GetCityEntries()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
    }
    GetCityEntryNames(cityIds) {
        Data.debugMessage("GetCityEntryNames()", "GetCityEntryNames()", "functionCalled", false);
        const cityIdsIn = cityIds;
        Data.debugMessage(cityIdsIn, "GetCityEntryNames()", "cityIds");
        const entries = this.GetCityEntries();
        Data.debugMessage(entries, "GetCityEntryNames()", "entries");
        Data.debugMessage("filter entries", "GetCityEntryNames()", "filterCalled", false);
        Data.debugMessage("map filtered entries", "GetCityEntryNames()", "mapCalled", false);
        const entryFilter = ((entries).filter(
            function(cityEntry){
                const cityEntryIn = cityEntry;
                Data.debugMessage(cityEntryIn, "GetCityEntryNames()", "cityEntry");
                const cityEntryId = cityEntryIn.id;
                Data.debugMessage(cityEntryId, "GetCityEntryNames()", "cityEntryId");
                let match = false;
                if((typeof cityIdsIn) === "number") {
                    match = (cityIdsIn === cityEntryId);
                } else {
                    match = cityIdsIn.includes(cityEntryId);
                }
                Data.debugMessage(match, "GetCityEntryNames()", "match");
                return match;
            }
        )).map(
            function(city) {
                const cityIn = city;
                Data.debugMessage(cityIn, "GetCityEntryNames()", "city");
                const cityName = cityIn.name;
                Data.debugMessage(cityName, "GetCityEntryNames()", "cityName");
                return cityName;
            }
        );
        Data.debugMessage(entryFilter, "GetCityEntryNames()", "entryFilter");
        return entryFilter;
    }
    GetCityEntryLatitudes(cityIds) {
        Data.debugMessage("GetCityEntryLatitudes()", "GetCityEntryLatitudes()", "functionCalled", false);
        const cityIdsIn = cityIds;
        Data.debugMessage(cityIdsIn, "GetCityEntryLatitudes()", "cityIds");
        const entries = this.GetCityEntries();
        Data.debugMessage(entries, "GetCityEntryLatitudes()", "entries");
        Data.debugMessage("filter entries", "GetCityEntryLatitudes()", "filterCalled", false);
        Data.debugMessage("map filtered entries", "GetCityEntryLatitudes()", "mapCalled", false);
        const entryFilter = ((entries).filter(
            function(cityEntry){
                const cityEntryIn = cityEntry;
                Data.debugMessage(cityEntryIn, "GetCityEntryLatitudes()", "cityEntry");
                const cityEntryId = cityEntryIn.id;
                Data.debugMessage(cityEntryId, "GetCityEntryLatitudes()", "cityEntryId");
                let match = false;
                if((typeof cityIdsIn) === "number") {
                    match = (cityIdsIn === cityEntryId);
                } else {
                    match = cityIdsIn.includes(cityEntryId);
                }
                Data.debugMessage(match, "GetCityEntryLatitudes()", "match");
                return match;
            }
        )).map(
            function(city) {
                const cityIn = city;
                Data.debugMessage(cityIn, "GetCityEntryLatitudes()", "city");
                const cityLatitude = cityIn.latitude;
                Data.debugMessage(cityLatitude, "GetCityEntryLatitudes()", "cityLatitude");
                return cityLatitude;
            }
        );
        Data.debugMessage(entryFilter, "GetCityEntryLatitudes()", "entryFilter");
        return entryFilter;
    }
    GetCityEntryLongitudes(cityIds) {
        Data.debugMessage("GetCityEntryLongitudes()", "GetCityEntryLongitudes()", "functionCalled", false);
        const cityIdsIn = cityIds;
        Data.debugMessage(cityIdsIn, "GetCityEntryLongitudes()", "cityIds");
        const entries = this.GetCityEntries();
        Data.debugMessage(entries, "GetCityEntryLongitudes()", "entries");
        Data.debugMessage("filter entries", "GetCityEntryLongitudes()", "filterCalled", false);
        Data.debugMessage("map filtered entries", "GetCityEntryLongitudes()", "mapCalled", false);
        const entryFilter = ((entries).filter(
            function(cityEntry){
                const cityEntryIn = cityEntry;
                Data.debugMessage(cityEntryIn, "GetCityEntryLongitudes()", "cityEntry");
                const cityEntryId = cityEntryIn.id;
                Data.debugMessage(cityEntryId, "GetCityEntryLongitudes()", "cityEntryId");
                let match = false;
                if((typeof cityIdsIn) === "number") {
                    match = (cityIdsIn === cityEntryId);
                } else {
                    match = cityIdsIn.includes(cityEntryId);
                }
                Data.debugMessage(match, "GetCityEntryLongitudes()", "match");
                return match;
            }
        )).map(
            function(city) {
                const cityIn = city;
                Data.debugMessage(cityIn, "GetCityEntryLongitudes()", "city");
                const cityLongitude = cityIn.longitude;
                Data.debugMessage(cityLongitude, "GetCityEntryLongitudes()", "cityLongitude");
                return cityLongitude;
            }
        );
        Data.debugMessage(entryFilter, "GetCityEntryLongitudes()", "entryFilter");
        return entryFilter;
    }
    GetCapitalEntries() {
        Data.debugMessage("GetCapitalEntries()", "GetCapitalEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCapitalEntries()", "isFetched");
        if(isFetched) {
            const entries = this.GetCityEntries();
            Data.debugMessage(entries, "GetCapitalEntries()", "entries");
            Data.debugMessage("filter entries", "GetCapitalEntries()", "filterCalled", false);
            const entryFilter = (entries).filter(
                function(city) {
                    const cityIn = city;
                    Data.debugMessage(cityIn, "GetCapitalEntries()", "city");
                    const cityId = cityIn.id;
                    Data.debugMessage(cityId, "GetCapitalEntries()", "cityId");
                    const capitalIds = this.GetCapitalIds();
                    Data.debugMessage(capitalIds, "GetCapitalEntries()", "capitalIds");
                    const match = capitalIds.includes(cityId);
                    Data.debugMessage(match, "GetCapitalEntries()", "match");
                    return match;
                }
            );
            Data.debugMessage(entryFilter, "GetCapitalEntries()", "entryFilter");
            return entryFilter;
        } else {
            return null;
        }
    }
    GetDepartamentoCityEntries(departamentoId) {
        Data.debugMessage("GetDepartamentoCityEntries()", "GetDepartamentoCityEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoCityEntries()", "isFetched");
        if(isFetched) {
            const entries = this.GetCityEntries();
            Data.debugMessage(entries, "GetDepartamentoCityEntries()", "entries");
            Data.debugMessage("filter entries", "GetDepartamentoCityEntries()", "filterCalled", false);
            const entryFilter = (entries).filter(
                function(city) {
                    const cityIn = city;
                    Data.debugMessage(cityIn, "GetDepartamentoCityEntries()", "city");
                    const departamentoId = cityIn.departamento;
                    Data.debugMessage(departamentoId, "GetDepartamentoCityEntries()", "departamentoId");
                    const match = departamentoId === departamentoId;
                    Data.debugMessage(match, "GetDepartamentoCityEntries()", "match");
                    return match;
                }
            );
            Data.debugMessage(entryFilter, "GetDepartamentoCityEntries()", "entryFilter");
            return entryFilter;
        } else {
            return null;
        }
    }
    GetDepartamentoCityIds(departamentoId) {
        Data.debugMessage("GetDepartamentoCityIds()", "GetDepartamentoCityIds()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoCityIds()", "isFetched");
        if(isFetched) {
            const entries = this.GetDepartamentoCityEntries(departamentoId);
            Data.debugMessage(entries, "GetDepartamentoCityIds()", "entries");
            Data.debugMessage("map entries", "GetDepartamentoCityIds()", "mapCalled", false);
            const mappedData = (entries).map(
                function(city) {
                    const cityIn = city;
                    Data.debugMessage(cityIn, "GetDepartamentoCityIds()", "city");
                    const cityId = cityIn.id;
                    Data.debugMessage(cityId, "GetDepartamentoCityIds()", "cityId");
                    return cityId;
                }
            );
            Data.debugMessage(mappedData, "GetDepartamentoCityIds()", "mappedData");
            return mappedData;
        } else {
            return null;
        }
    }
    GetCityData() {
        Data.debugMessage("GetCityData()", "GetCityData()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCityData()", "isFetched");
        if(isFetched) {
            const outer = this;
            const entries = this.GetCityEntries();
            Data.debugMessage(entries, "GetCityData()", "entries");
            Data.debugMessage("map entries", "GetCityData()", "mapCalled", false);
            const mappedData = (entries).map(
                function(city) {
                    const cityIn = city;
                    Data.debugMessage(cityIn, "GetCityData()", "city");
                    const cityId = cityIn.id;
                    Data.debugMessage(cityId, "GetCityData()", "cityId");
                    const cityType = cityIn.type;
                    Data.debugMessage(cityType, "GetCityData()", "cityType");
                    const departamentoId = cityIn.departamento;
                    Data.debugMessage(departamentoId, "GetCityData()", "departamentoId");
                    const departamentoEntry = outer.GetDepartamentoEntry(departamentoId);
                    Data.debugMessage(departamentoEntry, "GetCityData()", "departamentoEntry");
                    let departamentoName = "";
                    if(departamentoEntry != null) {
                        departamentoName = departamentoEntry.name ;
                    }
                    Data.debugMessage(departamentoName, "GetCityData()", "departamentoName");
                    const cityName = cityIn.name;
                    Data.debugMessage(cityName, "GetCityData()", "cityName");
                    const cityLatitude = cityIn.latitude;
                    Data.debugMessage(cityLatitude, "GetCityData()", "cityLatitude");
                    const cityLongitude = cityIn.longitude;
                    Data.debugMessage(cityLongitude, "GetCityData()", "cityLongitude");
                    const entry = {
                        id: cityId,
                        type: cityType,
                        departamentoId: departamentoId,
                        departamentoName: departamentoName,
                        name : cityName,
                        latitude: cityLatitude,
                        longitude: cityLongitude
                    };
                    Data.debugMessage(entry, "GetCityData()", "entry");
                    return entry;
                }
            );
            Data.debugMessage(mappedData, "GetCityData()", "mappedData");
            return mappedData;
        } else {
            return null;
        }
    }
    GetCapitalData() {
        Data.debugMessage("GetCapitalData()", "GetCapitalData()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCapitalData()", "isFetched");
        if(isFetched) {
            const data = this.GetCityData();
            Data.debugMessage(data, "GetCapitalData()", "data");
            Data.debugMessage("filter data", "GetCapitalData()", "filterCalled", false);
            const dataFilter = (data).filter(
                function(city) {
                    const cityIn = city;
                    Data.debugMessage(cityIn, "GetCapitalData()", "city");
                    const cityId = cityIn.id;
                    Data.debugMessage(cityId, "GetCapitalData()", "cityId");
                    const capitalIds = this.GetCapitalIds();
                    Data.debugMessage(capitalIds, "GetCapitalData()", "capitalIds");
                    const match = capitalIds.includes(cityId);
                    Data.debugMessage(match, "GetCapitalData()", "match");
                    return match;
                }
            );
            Data.debugMessage(dataFilter, "GetCapitalData()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
    }
    GetDepartamentoCityData(departamentoId) {
        Data.debugMessage("GetDepartamentoCityData()", "GetDepartamentoCityData()", "functionCalled", false);
        const departamentoIdIn = departamentoId;
        Data.debugMessage(departamentoId, "GetDepartamentoCityData()", "departamentoId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoCityData()", "isFetched");
        if(isFetched) {
            const data = this.GetCityData();
            Data.debugMessage(data, "GetDepartamentoCityData()", "data");
            Data.debugMessage("filter data", "GetDepartamentoCityData()", "filterCalled", false);
            const dataFilter = (data).filter(
                function(city) {
                    const cityIn = city;
                    Data.debugMessage(cityIn, "GetDepartamentoCityData()", "city");
                    const cityDepartamento = cityIn.departamento;
                    Data.debugMessage(cityDepartamento, "GetDepartamentoCityData()", "cityDepartamento");                    const match = (cityDepartamento === departamentoIdIn);
                    Data.debugMessage(match, "GetDepartamentoCityData()", "match");
                    return match;
                }
            );
            Data.debugMessage(dataFilter, "GetDepartamentoCityData()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
    }
    GetCityEntry(cityId) {
        Data.debugMessage("GetCityEntry()", "GetCityEntry()", "functionCalled", false);
        const cityIdIn = cityId;
        Data.debugMessage(cityIdIn, "GetCityEntry()", "cityId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCityEntry()", "isFetched");
        if(isFetched) {
            const entries = this.GetCityEntries();
            Data.debugMessage(entries, "GetCityEntry()", "entries");
            Data.debugMessage("filter entries", "GetCityEntry()", "filterCalled", false);
            const entryFilter = entries.filter((entry) => {
                const entryIn = entry;
                Data.debugMessage(entryIn, "GetCityEntry()", "entry");
                const entryId = entry.id;
                Data.debugMessage(entryId, "GetCityEntry()", "entryId");
                const match = (entryId === cityIdIn);
                Data.debugMessage(match, "GetCityEntry()", "match");
                return match;
            });
            Data.debugMessage(entryFilter, "GetCityEntry()", "entryFilter");
            let entry = null;
            if(entryFilter.length>0) {
                entry = entryFilter[0];
            }
            Data.debugMessage(entry, "GetCityEntry()", "entry");
            return entry;
        } else {
            return null;
        }
    }
    GetCapitalEntry(departamentoId) {
        Data.debugMessage("GetCapitalEntry()", "GetCapitalEntry()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCapitalEntry()", "isFetched");
        if(isFetched) {
            return this.GetCityEntry(this.GetDepartamentoEntry(departamentoId).capital);
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetCity(cityId) {
        Data.debugMessage("GetCity()", "GetCity()", "functionCalled", false);
        const cityIdIn = cityId;
        Data.debugMessage(cityIdIn, "GetCity()", "cityId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCity()", "isFetched");
        if(isFetched) {
            const cityData = this.GetCityData();
            Data.debugMessage(cityData, "GetCity()", "cityData");
            Data.debugMessage("filter data", "GetCity()", "filterCalled", false);
            const dataFilter = cityData.filter((city) => {
                const cityIn = city;
                Data.debugMessage(cityIn, "GetCity()", "city");
                const cityId = city.id;
                Data.debugMessage(cityId, "GetCity()", "cityId");
                const match = (cityId === cityIdIn);
                Data.debugMessage(match, "GetCity()", "match");
                return match;                
            });
            Data.debugMessage(dataFilter, "GetCity()", "dataFilter");            
            let city = null;
            if(dataFilter.length>0) {
                city = dataFilter[0];
            }
            Data.debugMessage(city, "GetCity()", "city");
            return city;
        } else {
            return null;
        }
    }
    GetCapital(departamentoId) {
        Data.debugMessage("GetCapital()", "GetCapital()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCapital()", "isFetched");
        if(isFetched) {
            return this.GetCity(this.GetDepartamentoEntry(departamentoId).capital);
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }

    GetSiteCount() {
        Data.debugMessage("GetSiteCount()", "GetSiteCount()", "functionCalled", false);
        const entries = this.GetSiteEntries();
        Data.debugMessage(entries, "GetSiteCount()", "entries");
        return entries.length;
    }
    GetFoodCount() {
        Data.debugMessage("GetFoodCount()", "GetFoodCount()", "functionCalled", false);
        const entries = this.GetFoodEntries();
        Data.debugMessage(entries, "GetFoodCount()", "entries");
        return entries.length;
    }
    GetAttractionCount() {
        Data.debugMessage("GetAttractionCount()", "GetAttractionCount()", "functionCalled", false);
        const entries = this.GetAttractionEntries();
        Data.debugMessage(entries, "GetAttractionCount()", "entries");
        return entries.length;
    }
    GetSiteEntries() {
        Data.debugMessage("GetSiteEntries()", "GetSiteEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetSiteEntries()", "isFetched");
        if(isFetched) {
            const data = this.currentData.data;
            Data.debugMessage(data, "GetSiteEntries()", "data");
            Data.debugMessage("filter data", "GetSiteEntries()", "filterCalled", false);
            const dataFilter = (data).filter(
                function(dataElement) {
                    const dataElementIn = dataElement;
                    Data.debugMessage(dataElementIn, "GetSiteEntries()", "dataElement");
                    const isSite = (dataElementIn.type === "site");
                    const cityIsArray = Array.isArray(dataElementIn.city);
                    let cityArrayIsRef = false;
                    if(cityIsArray) {
                        cityArrayIsRef = ((typeof dataElementIn.city[0]) === "number");
                    }
                    const cityIsRef = ((typeof dataElementIn.city) === "number") || cityArrayIsRef;
                    const images = dataElementIn.images ?? { webp: { sizes: null }};
                    const refNotDefined = (images.ref == null);
                    const webp = images.webp ?? {sizes: null};
                    const sizesDefined = (webp.sizes != null);
                    const result = isSite && cityIsRef && refNotDefined && sizesDefined;
                    return result;
                }
            );
            Data.debugMessage(dataFilter, "GetSiteEntries()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetCitySiteCount(cityId) {
        Data.debugMessage("GetCitySiteCount()", "GetCitySiteCount()", "functionCalled", false);
        const entries = this.GetCitySiteEntries(cityId);
        Data.debugMessage(entries, "GetCitySiteCount()", "entries");
        return entries.length;
        /*TODO:  complete messaging for this function*/
    }
    GetCitySiteEntries(cityId) {
        Data.debugMessage("GetCitySiteEntries()", "GetCitySiteEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCitySiteEntries()", "isFetched");
        if(isFetched) {
            const entries = this.GetSiteEntries();
            Data.debugMessage(entries, "GetCitySiteEntries()", "entries");
            Data.debugMessage("filter entries", "GetCitySiteEntries()", "filterCalled", false);
            const entryFilter = (entries).filter(
                function(site) {
                    const siteIn = site;
                    Data.debugMessage(siteIn, "GetCitySiteEntries()", "site");
                    return siteIn.city.includes(cityId);
                }
            );
            Data.debugMessage(entryFilter, "GetCitySiteEntries()", "entryFilter");
            return entryFilter;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetCitySiteIds(cityId) {
        Data.debugMessage("GetCitySiteIds()", "GetCitySiteIds()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCitySiteIds()", "isFetched");
        if(isFetched) {
            const entries = this.GetCitySiteEntries(cityId);
            Data.debugMessage(entries, "GetCitySiteIds()", "entries");
            Data.debugMessage("map entries", "GetCitySiteIds()", "mapCalled", false);
            const mappedData = (entries).map(
                function(site) {
                    return site.id;
                }
            );
            Data.debugMessage(mappedData, "GetCitySiteIds()", "mappedData");
            return mappedData;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetDepartamentoSiteCount(departamentoId) {
        Data.debugMessage("GetDepartamentoSiteCount()", "GetDepartamentoSiteCount()", "functionCalled", false);
        const entries = this.GetDepartamentoSiteEntries(departamentoId);
        Data.debugMessage(entries, "GetDepartamentoSiteCount()", "entries");
        return entries.length;
        /*TODO:  complete messaging for this function*/
    }
    GetDepartamentoSiteEntries(departamentoId) {
        Data.debugMessage("GetDepartamentoSiteEntries()", "GetDepartamentoSiteEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoSiteEntries()", "isFetched");
        if(isFetched) {
            const entries = this.GetSiteEntries();
            Data.debugMessage(entries, "GetDepartamentoSiteEntries()", "entries");
            Data.debugMessage("filter entries", "GetDepartamentoSiteEntries()", "filterCalled", false);
            const entryFilter = (entries).filter(
                function(site) {
                    const siteIn = site;
                    Data.debugMessage(siteIn, "GetDepartamentoSiteEntries()", "site");
                    return (site.cityId.reduce(
                        (state, cityId) => {
                            return this.GetDepartamentoCityIds(departamentoId).includes(cityId)||state;
                        },false)
                    );
                }
            );
            Data.debugMessage(entryFilter, "GetDepartamentoSiteEntries()", "entryFilter");
            return entryFilter;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetDepartamentoSiteIds(departamentoId) {
        Data.debugMessage("GetDepartamentoSiteIds()", "GetDepartamentoSiteIds()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoSiteIds()", "isFetched");
        if(isFetched) {
            const entries = this.GetDepartamentoSiteEntries(departamentoId);
            Data.debugMessage(entries, "GetDepartamentoSiteIds()", "entries");
            Data.debugMessage("map entries", "GetDepartamentoSiteEntries()", "mapCalled", false);
            const mappedData = (entries).map(
                function(site) {
                    return site.id;
                }
            );
            Data.debugMessage(mappedData, "GetCitySiteIds()", "mappedData");
            return mappedData;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetSiteData() {
        Data.debugMessage("GetSiteData()", "GetSiteData()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetSiteData()", "isFetched");
        if(isFetched) {
            const entries = this.GetSiteEntries();
            Data.debugMessage(entries, "GetSiteData()", "entries");
            const outer = this;
            Data.debugMessage("map entries", "GetSiteData()", "mapCalled", false);
            const mappedData = entries.map(function(site) {
                const siteIn = site;
                Data.debugMessage(siteIn, "GetSiteData()", "siteIn");
                const siteId = site.id;
                Data.debugMessage(siteId, "GetSiteData()", "siteId");
                const siteStringId = site.nameId;
                Data.debugMessage(siteStringId, "GetSiteData()", "siteStringId");
                const sitePair = site.pair;
                Data.debugMessage(sitePair, "GetSiteData()", "sitePair");
                const siteBatch = site.batch;
                Data.debugMessage(siteBatch, "GetSiteData()", "siteBatch");
                const siteSet = site.set;
                Data.debugMessage(siteSet, "GetSiteData()", "siteSet");
                const siteType = site.type;
                Data.debugMessage(siteType, "GetSiteData()", "siteType");
                const siteName = site.name;
                Data.debugMessage(siteName, "GetSiteData()", "siteName");
                const siteCityIds = site.city ?? [];
                Data.debugMessage(siteCityIds, "GetSiteData()", "siteCityIds");
                const siteCityNames = outer.GetCityEntryNames(siteCityIds);
                Data.debugMessage(siteCityNames, "GetSiteData()", "siteCityNames");
                const siteCityLatitudes = outer.GetCityEntryLatitudes(siteCityIds);
                Data.debugMessage(siteCityLatitudes, "GetSiteData()", "siteCityLatitudes");
                const siteCityLongitudes = outer.GetCityEntryLongitudes(siteCityIds);
                Data.debugMessage(siteCityLongitudes, "GetSiteData()", "siteCityLongitudes");
                const siteSourceURL = site.sourceURL ?? "";
                Data.debugMessage(siteSourceURL, "GetSiteData()", "siteSourceURL");
                const siteImages = site.images ?? {original:null, webp:null};
                const siteOriginalImage = siteImages.original ?? {dimension:null, name:null};
                const siteOriginalImageDimensions = siteOriginalImage.dimension ?? [];
                const siteOriginalImageWidth = siteOriginalImageDimensions[0] ?? -1;
                Data.debugMessage(siteOriginalImageWidth, "GetSiteData()", "siteOriginalImageWidth");
                const siteOriginalImageHeight = siteOriginalImageDimensions[1] ?? -1;
                Data.debugMessage(siteOriginalImageHeight, "GetSiteData()", "siteOriginalImageHeight");
                const siteOriginalImagePath = siteOriginalImage.name ?? "";
                Data.debugMessage(siteOriginalImagePath, "GetSiteData()", "siteOriginalImagePath");
                const siteImageSizes = siteImages.webp ?? [];
                Data.debugMessage(siteImageSizes, "GetSiteData()", "siteImageSizes");
                const siteDescription = site.description ?? "";
                Data.debugMessage(siteDescription, "GetSiteData()", "siteDescription");
                const siteHistorical = site.historical_significance ?? "";
                Data.debugMessage(siteHistorical, "GetSiteData()", "siteHistorical");
                const siteAge = site.approximate_age ?? "";
                Data.debugMessage(siteAge, "GetSiteData()", "siteAge");
                const siteCost = site.cost_soles ?? {};
                Data.debugMessage(siteCost, "GetSiteData()", "siteCost");
                const siteTransport = site.estimated_transportation_cost_from_Lima_soles ?? {};
                Data.debugMessage(siteTransport, "GetSiteData()", "siteTransport");
                const siteAvgTemps = site.average_temperatures ?? {};
                Data.debugMessage(siteAvgTemps, "GetSiteData()", "siteAvgTemps");
                const siteRecommend = site.recommended_dates_to_visit ?? "";
                Data.debugMessage(siteRecommend, "GetSiteData()", "siteRecommend");
                return {
                    id: siteId,
                    stringId: siteStringId,
                    pair: sitePair,
                    batch: siteBatch,
                    set: siteSet,
                    type: siteType,
                    name : siteName,
                    cityIds: siteCityIds,
                    cityNames: siteCityNames,
                    latitudes: siteCityLatitudes,
                    longitudes: siteCityLongitudes,
                    sourceURL: siteSourceURL,
                    originalImageWidth:  siteOriginalImageWidth,
                    originalImageHeight:  siteOriginalImageHeight,
                    originalImagePath:  siteOriginalImagePath,
                    imageSizes: siteImageSizes,
                    description: siteDescription,
                    historical: siteHistorical,
                    age: siteAge,
                    cost:  siteCost,
                    transport:  siteTransport,
                    avgTemps:  siteAvgTemps,
                    recommend:  siteRecommend
                };
            });
            Data.debugMessage(mappedData, "GetCitySiteIds()", "mappedData");
            return mappedData;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetSite(siteId) {
        Data.debugMessage("GetSite()", "GetSite()", "functionCalled", false);
        const siteIdIn = siteId;
        Data.debugMessage(siteIdIn, "GetSite()", "siteId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetSite()", "isFetched");
        if(isFetched) {
            const sites = this.GetSiteData();
            Data.debugMessage(sites, "GetSite()", "sites");
            Data.debugMessage("filter data", "GetSite()", "filterCalled", false);
            const dataFilter = sites.filter((site) => {
                const siteIn = site;
                Data.debugMessage(siteIn, "GetSite()", "site");
                const siteId = site.id;
                Data.debugMessage(siteId, "GetSite()", "siteId");
                const match = (siteId === siteIdIn);
                Data.debugMessage(match, "GetSite()", "match");
                return match;                
            });
            Data.debugMessage(dataFilter, "GetSite()", "dataFilter");
            let site = null;
            if(dataFilter.length>0) {
                site = dataFilter[0];
            }
            Data.debugMessage(site, "GetSite()", "site");
            return site;
        } else {
            return null;
        }
    }
    GetFood(foodId) {
        Data.debugMessage("GetFood()", "GetFood()", "functionCalled", false);
        const foodIdIn = foodId;
        Data.debugMessage(foodIdIn, "GetFood()", "foodId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetFood()", "isFetched");
        if(isFetched) {
            const foods = this.GetFoodEntries();
            Data.debugMessage(foods, "GetFood()", "foods");
            Data.debugMessage("filter data", "GetFood()", "filterCalled", false);
            const dataFilter = foods.filter((food) => {
                const foodIn = food;
                Data.debugMessage(foodIn, "GetFood()", "food");
                const foodId = food.id;
                Data.debugMessage(foodId, "GetFood()", "foodId");
                const match = (foodId === foodIdIn);
                Data.debugMessage(match, "GetFood()", "match");
                return match;                
            });
            Data.debugMessage(dataFilter, "GetFood()", "dataFilter");
            let food = null;
            if(dataFilter.length>0) {
                food = dataFilter[0];
            }
            Data.debugMessage(food, "GetFood()", "food");
            return food;
        } else {
            return null;
        }
    }
    GetAttraction(attractionId) {
        Data.debugMessage("GetAttraction()", "GetAttraction()", "functionCalled", false);
        const attractionIdIn = attractionId;
        Data.debugMessage(attractionIdIn, "GetAttraction()", "attractionId");
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetAttraction()", "isFetched");
        if(isFetched) {
            const attractions = this.GetAttractionEntries();
            Data.debugMessage(attractions, "GetAttraction()", "attractions");
            Data.debugMessage("filter data", "GetAttraction()", "filterCalled", false);
            const dataFilter = attractions.filter((attraction) => {
                const attractionIn = attraction;
                Data.debugMessage(attractionIn, "GetAttraction()", "attraction");
                const attractionId = attraction.id;
                Data.debugMessage(attractionId, "GetAttraction()", "attractionId");
                const match = (attractionId === attractionIdIn);
                Data.debugMessage(match, "GetAttraction()", "match");
                return match;                
            });
            Data.debugMessage(dataFilter, "GetAttraction()", "dataFilter");
            let attraction = null;
            if(dataFilter.length>0) {
                attraction = dataFilter[0];
            }
            Data.debugMessage(attraction, "GetAttraction()", "attraction");
            return attraction;
        } else {
            return null;
        }
    }
    GetCitySites(cityId) {
        Data.debugMessage("GetCitySites()", "GetCitySites()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetCitySites()", "isFetched");
        if(isFetched) {
            const data = this.GetSiteData();
            Data.debugMessage(data, "GetCitySites()", "data");
            Data.debugMessage("filter data", "GetCitySites()", "filterCalled", false);
            const dataFilter = (data).filter(
                function(site) {
                    const siteIn = site;
                    Data.debugMessage(siteIn, "GetCitySites()", "site");
                    return (siteIn.cityId.reduce(
                        (state, city) => {
                            return state || this.GetCitySiteIds(cityId).contains(city);
                        },false)
                    );
                }
            );
            Data.debugMessage(dataFilter, "GetCitySites()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    GetDepartamentoSites(departamentoId) {
        Data.debugMessage("GetDepartamentoSites()", "GetDepartamentoSites()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetDepartamentoSites()", "isFetched");
        if(isFetched) {
            const data = this.GetSiteData();
            Data.debugMessage(data, "GetCitySites()", "data");
            Data.debugMessage("filter data", "GetDepartamentoSites()", "filterCalled", false);
            const dataFilter = (data).filter(
                function(site) {
                    const siteIn = site;
                    Data.debugMessage(siteIn, "GetDepartamentoSites()", "site");
                    return (siteIn.cityId.reduce(
                        (state, city) => {
                            return state || this.GetDepartamentoCityIds(departamentoId).contains(city);
                        },false)
                    );
                }
            );
            Data.debugMessage(dataFilter, "GetCitySites()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
        /*TODO:  complete messaging for this function*/
    }
    async DisplaySiteSpotlightResults(siteContainer, siteDisplayTimeMS, siteCycles, currentCityId){
        this.siteContainer = siteContainer;
        this.siteCycles = siteCycles;
        this.siteDisplayTimeMS = siteDisplayTimeMS;
        this.siteRotationIndex = 1;
        this.siteRotationCycles = 0;
        await this.DisplaySiteSpotlightContainerResults();
        this.siteRotation = setInterval(async() => await this.processSiteInterval(currentCityId), this.siteDisplayTimeMS);
    }
    async processSiteInterval(currentCityId) {
        this.siteRotationIndex++;
        //console.log(`${this.siteRotationIndex} - ${await this.GetSiteCount()}`);//debug only
        if(this.siteRotationIndex>=(await this.GetSiteCount())) {
            this.siteRotationIndex=1;
            this.siteRotationCycles++;
        }
        //console.log(`${this.siteRotationIndex} - ${await this.GetSiteCount()}`);//debug only
        let siteData = this.GetSite(this.siteRotationIndex);
        while((siteData==null)||(siteData.id!==this.siteRotationIndex)) {
            this.siteRotationIndex++;
            //console.log(`${this.siteRotationIndex} - ${await this.GetSiteCount()}`);//debug only
            if(this.siteRotationIndex>=(await this.GetSiteCount())) {
                this.siteRotationIndex=1;
                this.siteRotationCycles++;
            }
            siteData = this.GetSite(this.siteRotationIndex);
        }
        let cityId = siteData.cityIds;
        if((typeof siteData.cityIds)!=="number"){
            cityId = siteData.cityIds[0];
        }
        const departamentoId = this.GetCity(cityId).departamentoId;
        const captialId = this.GetDepartamento(departamentoId).capitalId;
        this.siteCityId = this.GetCity(captialId).name;
        currentCityId(this.siteCityId);
        await this.DisplaySiteSpotlightContainerResults();
        if(this.siteCycles>=0 && this.siteRotationCycles>this.siteCycles) {
            clearInterval(this.siteRotation);
        }
    } 
    async DisplaySiteSpotlightContainerResults() {
        const site = this.GetSite(this.siteRotationIndex);
        const name = document.createElement('h3');
        name.classList.add('siteName')
        name.textContent = site.name;
        const cityNamesLabel = document.createElement('span');
        cityNamesLabel.classList.add('siteCityNamesLabel')
        cityNamesLabel.textContent = "City: ";
        const cityNamesSpan = document.createElement('span');
        cityNamesSpan.classList.add('siteCityNamesSpan')
        cityNamesSpan.textContent = site.cityNames;
        const descriptionLabel = document.createElement('span');
        descriptionLabel.classList.add('siteDescriptionLabel')
        descriptionLabel.textContent = "Description: ";
        const descriptionSpan = document.createElement('span');
        descriptionSpan.classList.add('siteDescriptionSpan')
        descriptionSpan.textContent = site.description;
        const historicalLabel = document.createElement('span');
        historicalLabel.classList.add('siteHistoricalLabel')
        historicalLabel.textContent = "Historical: ";
        const historicalSpan = document.createElement('span');
        historicalSpan.classList.add('siteHistoricalSpan')
        historicalSpan.textContent = site.historical;
        const ageLabel = document.createElement('span');
        ageLabel.classList.add('siteAgeLabel')
        ageLabel.textContent = "Approximate Age: ";
        const ageSpan = document.createElement('span');
        ageSpan.classList.add('siteAgeSpan')
        ageSpan.textContent = site.age;

        const tempsLabel = document.createElement('span');
        tempsLabel.classList.add('siteTempsLabel')
        tempsLabel.textContent = "Approximate Average Tempuratures: ";
        const tempsSpan = document.createElement('span');
        tempsSpan.classList.add('siteTempsSpan')
        if((typeof site.avgTemps)==="object") {
            if('high' in site.avgTemps) {
                const siteHighTemp = document.createElement('p');
                siteHighTemp.classList.add('siteHighTemp');
                const siteHighTempLabel = document.createElement('span');
                siteHighTempLabel.classList.add('siteHighTempLabel');
                siteHighTempLabel.textContent = "high: "
                const siteHighTempValue = document.createElement('span');
                siteHighTempValue.classList.add('siteHighTempValue');
                siteHighTempValue.textContent = site.avgTemps.high;
                siteHighTemp.appendChild(siteHighTempLabel);
                siteHighTemp.appendChild(siteHighTempValue);
                tempsSpan.appendChild(siteHighTemp);
            }
            if('low' in site.avgTemps) {
                const siteLowTemp = document.createElement('p');
                siteLowTemp.classList.add('siteLowTemp');
                const siteLowTempLabel = document.createElement('span');
                siteLowTempLabel.classList.add('siteLowTempLabel');
                siteLowTempLabel.textContent = "low: "
                const siteLowTempValue = document.createElement('span');
                siteLowTempValue.classList.add('siteLowTempValue');
                siteLowTempValue.textContent = site.avgTemps.low;
                siteLowTemp.appendChild(siteLowTempLabel);
                siteLowTemp.appendChild(siteLowTempValue);
                tempsSpan.appendChild(siteLowTemp);
            }
            if('mean' in site.avgTemps) {
                const siteMeanTemp = document.createElement('p');
                siteMeanTemp.classList.add('siteMeanTemp');
                const siteMeanTempLabel = document.createElement('span');
                siteMeanTempLabel.classList.add('siteMeanTempLabel');
                siteMeanTempLabel.textContent = "mean avg: "
                const siteMeanTempValue = document.createElement('span');
                siteMeanTempValue.classList.add('siteMeanTempValue');
                siteMeanTempValue.textContent = site.avgTemps.mean;
                siteMeanTemp.appendChild(siteMeanTempLabel);
                siteMeanTemp.appendChild(siteMeanTempValue);
                tempsSpan.appendChild(siteMeanTemp);
            }
            const keys = Object.keys(site.avgTemps);
            keys.forEach((key) => {
                if(key!=='high'&&key!=='low'&&key!=='mean') {
                    const entry = site.avgTemps[key];
                    const siteTempLabel = document.createElement('p');
                    siteTempLabel.classList.add('siteTempLabel');
                    siteTempLabel.textContent = `${key}: `;
                    tempsSpan.appendChild(siteTempLabel);
                    if('high' in entry) {
                        const siteHighTemp = document.createElement('p');
                        siteHighTemp.classList.add('siteHighTemp');
                        const siteHighTempLabel = document.createElement('span');
                        siteHighTempLabel.classList.add('siteHighTempLabel');
                        siteHighTempLabel.textContent = "high: "
                        const siteHighTempValue = document.createElement('span');
                        siteHighTempValue.classList.add('siteHighTempValue');
                        siteHighTempValue.textContent = entry.high;
                        siteHighTemp.appendChild(siteHighTempLabel);
                        siteHighTemp.appendChild(siteHighTempValue);
                        tempsSpan.appendChild(siteHighTemp);
                    }
                    if('low' in entry) {
                        const siteLowTemp = document.createElement('p');
                        siteLowTemp.classList.add('siteLowTemp');
                        const siteLowTempLabel = document.createElement('span');
                        siteLowTempLabel.classList.add('siteLowTempLabel');
                        siteLowTempLabel.textContent = "low: "
                        const siteLowTempValue = document.createElement('span');
                        siteLowTempValue.classList.add('siteLowTempValue');
                        siteLowTempValue.textContent = entry.low;
                        siteLowTemp.appendChild(siteLowTempLabel);
                        siteLowTemp.appendChild(siteLowTempValue);
                        tempsSpan.appendChild(siteLowTemp);
                    }
                    if('mean' in entry) {
                        const siteMeanTemp = document.createElement('p');
                        siteMeanTemp.classList.add('siteMeanTemp');
                        const siteMeanTempLabel = document.createElement('span');
                        siteMeanTempLabel.classList.add('siteMeanTempLabel');
                        siteMeanTempLabel.textContent = "mean avg: "
                        const siteMeanTempValue = document.createElement('span');
                        siteMeanTempValue.classList.add('siteMeanTempValue');
                        siteMeanTempValue.textContent = entry.mean;
                        siteMeanTemp.appendChild(siteMeanTempLabel);
                        siteMeanTemp.appendChild(siteMeanTempValue);
                        tempsSpan.appendChild(siteMeanTemp);
                    }
                }
            });
        } else {
            tempsSpan.textContent = site.avgTemps;
        }
        const recommendLabel = document.createElement('span');
        recommendLabel.classList.add('siteRecommendLabel')
        recommendLabel.textContent = "Recommended times to visit:  ";
        const recommendSpan = document.createElement('span');
        recommendSpan.classList.add('siteRecommendSpan')
        if((typeof site.recommend) == 'object') {
            recommendSpan.textContent = JSON.stringify(site.recommend);
        } else {
            recommendSpan.textContent = site.recommend;
        }
        const costLabel = document.createElement('span');
        costLabel.classList.add('siteCostLabel')
        costLabel.textContent = "Approximate Cost in Soles: ";
        const costSpan = document.createElement('span');
        costSpan.classList.add('siteCostSpan')
        costSpan.textContent = JSON.stringify(site.cost);
        const transportLabel = document.createElement('span');
        transportLabel.classList.add('siteTransportLabel')
        transportLabel.textContent = "Approximate Transportation Cost in Soles from Lima: ";
        const transportSpan = document.createElement('span');
        transportSpan.classList.add('siteTransportSpan');
        const transportIsArray = Array.isArray(site.transport);
        if(transportIsArray) {
            const lowTransport = document.createElement('span');
            lowTransport.classList.add('siteLowTransport');
            const lowTransportSpanLabel = document.createElement('span');
            lowTransportSpanLabel.classList.add('siteLowTransportSpanLabel');
            lowTransportSpanLabel.textContent = "low: ";
            const lowTransportSpan = document.createElement('span');
            lowTransportSpan.classList.add('siteLowTransportSpan');
            lowTransportSpan.textContent = site.transport[0];
            lowTransport.appendChild(lowTransportSpanLabel);
            lowTransport.appendChild(lowTransportSpan);
            const highTransport = document.createElement('span');
            highTransport.classList.add('siteHighTransport');
            const highTransportSpanLabel = document.createElement('span');
            highTransportSpanLabel.classList.add('siteHighTransportSpanLabel');
            highTransportSpanLabel.textContent = "high: ";
            const highTransportSpan = document.createElement('span');
            highTransportSpan.classList.add('siteHighTransportSpan');
            highTransportSpan.textContent = site.transport[1];
            highTransport.appendChild(highTransportSpanLabel);
            highTransport.appendChild(highTransportSpan);
            const delimiterSpan = document.createElement('span');
            delimiterSpan.classList.add('siteTransportDelimiterSpan');
            delimiterSpan.textContent = " -- ";
            transportSpan.appendChild(lowTransport);
            transportSpan.appendChild(delimiterSpan);
            transportSpan.appendChild(highTransport);
        } else {
            const transportSpanLabel = document.createElement('span');
            transportSpanLabel.classList.add('siteTransportSpanLabel');
            transportSpanLabel.textContent = "~";
            const transportContentSpan = document.createElement('span');
            transportContentSpan.classList.add('siteTransportContentSpan');
            transportContentSpan.textContent = site.transport;
            transportSpan.appendChild(transportSpanLabel);
            transportSpan.appendChild(transportContentSpan);
        }

        const picture = document.createElement('picture');
        picture.classList.add('sitePicture')
        let filename = "";
        for(let count = (site.imageSizes.sizes.length-1); count>=0; count--){
            const size = site.imageSizes.sizes[count];
            const source = document.createElement('source');
            source.classList.add('siteSource')
            filename = `images\\${site.stringId}.${size}.webp`;
            source.srcset = filename;
            let media = "";
            if(count===0) {
                media = `(width >= ${size}px)`

            } else {
                media = `(width < ${site.imageSizes.sizes[count-1]}px)`
            }
            source.media = media;
            picture.appendChild(source);
        }
        const image = document.createElement('img');
        image.classList.add('siteImage')
        image.src=filename;
        image.alt=`image of ${site.name}`;
        image.width = site.originalImageWidth;
        image.height = site.originalImageHeight;
        picture.appendChild(image);

        const cityNames = document.createElement('p');
        cityNames.classList.add('siteCityNames')
        const description = document.createElement('p');
        description.classList.add('siteDescription')
        const historical = document.createElement('p');
        historical.classList.add('siteHistorical')
        const age = document.createElement('p');
        age.classList.add('siteAge')
        const temps = document.createElement('p');
        temps.classList.add('siteTemps')
        const recommend = document.createElement('p');
        recommend.classList.add('siteRecommend')
        const cost = document.createElement('p');
        cost.classList.add('siteCost')
        const transport = document.createElement('p');
        transport.classList.add('siteTransport')
        cityNames.appendChild(cityNamesLabel);
        cityNames.appendChild(cityNamesSpan);
        description.appendChild(descriptionLabel);
        description.appendChild(descriptionSpan);
        historical.appendChild(historicalLabel);
        historical.appendChild(historicalSpan);
        age.appendChild(ageLabel);
        age.appendChild(ageSpan);
        temps.appendChild(tempsLabel);
        temps.appendChild(tempsSpan);
        recommend.appendChild(recommendLabel);
        recommend.appendChild(recommendSpan);
        cost.appendChild(costLabel);
        cost.appendChild(costSpan);
        transport.appendChild(transportLabel);
        transport.appendChild(transportSpan);

        this.siteContainer.textContent="";
        this.siteContainer.appendChild(name);
        this.siteContainer.appendChild(picture);
        this.siteContainer.appendChild(cityNames);
        this.siteContainer.appendChild(description);
        this.siteContainer.appendChild(historical);
        if(site.age!=null && site.age!=="") {
            this.siteContainer.appendChild(age);
        }
        if(JSON.stringify(site.avgTemps)!='{}'&&JSON.stringify(site.avgTemps)!=null) {
            this.siteContainer.appendChild(temps);
        }
        if(JSON.stringify(site.recommend)!='{}'&&JSON.stringify(site.recommend)!=null&&site.recommend!=="") {
            this.siteContainer.appendChild(recommend);
        }
        if(JSON.stringify(site.cost)!='{}'&&JSON.stringify(site.cost)!=null) {
            this.siteContainer.appendChild(cost);
        }
        if(JSON.stringify(site.transport)!='{}'&&JSON.stringify(site.transport)!=null) {
            this.siteContainer.appendChild(transport);
        }
        this.siteContainer.classList.add('siteContainer')
        //TODO:  complete build
    }
    GetFoodEntries() {
        Data.debugMessage("GetFoodEntries()", "GetFoodEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetFoodEntries()", "isFetched");
        if(isFetched) {
            const currentData = this.currentData;
            Data.debugMessage(currentData, "GetFoodEntries()", "currentData");
            const data = currentData.data;
            Data.debugMessage(data, "GetFoodEntries()", "data");
            Data.debugMessage("filter data", "GetFoodEntries()", "filterCalled", false);
            const dataFilter = data.filter(
                function(dataElement) {
                    const dataElementIn = dataElement;
                    Data.debugMessage(dataElementIn, "GetFoodEntries()", "dataElement");
                    const dataElementType = dataElementIn.type;
                    Data.debugMessage(dataElementType, "GetFoodEntries()", "dataElementType");
                    const match = (dataElementType === "food");
                    Data.debugMessage(match, "GetFoodEntries()", "match");
                    return match;
                }
            );
            Data.debugMessage(dataFilter, "GetFoodEntries()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
    }
    async DisplayFoodSpotlightResults(foodContainer, foodDisplayTimeMS, foodCycles){
        this.foodContainer = foodContainer;
        this.foodCycles = foodCycles;
        this.foodDisplayTimeMS = foodDisplayTimeMS;
        this.foodRotationIndex = 1;
        this.foodRotationCycles = 0;
        await this.DisplayFoodSpotlightContainerResults();
        this.foodRotation = setInterval(async() => await this.processFoodInterval(), this.foodDisplayTimeMS);
    }
    async processFoodInterval() {
        this.foodRotationIndex++;
        //console.log(`${this.foodRotationIndex} - ${await this.GetFoodCount()}`);//debug only
        if(this.foodRotationIndex>=(await this.GetFoodCount())) {
            this.foodRotationIndex=1;
            this.foodRotationCycles++;
        }
        //console.log(`${this.foodRotationIndex} - ${await this.GetFoodCount()}`);//debug only
        let foodData = this.GetFood(this.foodRotationIndex);
        while((foodData==null)||(foodData.id!==this.foodRotationIndex)) {
            this.foodRotationIndex++;
            //console.log(`${this.foodRotationIndex} - ${await this.GetFoodCount()}`);//debug only
            if(this.foodRotationIndex>=(await this.GetFoodCount())) {
                this.foodRotationIndex=1;
                this.foodRotationCycles++;
            }
            foodData = this.GetFood(this.foodRotationIndex);
        }
        let cityId = foodData.cityIds;
        if((typeof foodData.cityIds)!=="number"){
            cityId = foodData.cityIds[0];
        }
        const departamentoId = this.GetCity(cityId).departamentoId;
        const captialId = this.GetDepartamento(departamentoId).capitalId;
        this.foodCityId = this.GetCity(captialId).name;
        currentCityId(this.foodCityId);
        await this.DisplayFoodSpotlightContainerResults();
        if(this.foodCycles>=0 && this.foodRotationCycles>this.foodCycles) {
            clearInterval(this.foodRotation);
        }
    }
    async DisplayFoodSpotlightContainerResults() {
        const food = this.GetFood(this.foodRotationIndex);
        const name = document.createElement('h3');
        name.classList.add('foodName')
        name.textContent = food.name;
        const cityNamesLabel = document.createElement('span');
        cityNamesLabel.classList.add('foodCityNamesLabel')
        cityNamesLabel.textContent = "City: ";
        const cityNamesSpan = document.createElement('span');
        cityNamesSpan.classList.add('foodCityNamesSpan')
        cityNamesSpan.textContent = food.cityNames;
        const descriptionLabel = document.createElement('span');
        descriptionLabel.classList.add('foodDescriptionLabel')
        descriptionLabel.textContent = "Description: ";
        const descriptionSpan = document.createElement('span');
        descriptionSpan.classList.add('foodDescriptionSpan')
        descriptionSpan.textContent = food.description;
        const historicalLabel = document.createElement('span');
        historicalLabel.classList.add('foodHistoricalLabel')
        historicalLabel.textContent = "Historical: ";
        const historicalSpan = document.createElement('span');
        historicalSpan.classList.add('foodHistoricalSpan')
        historicalSpan.textContent = food.historical;
        const ageLabel = document.createElement('span');
        ageLabel.classList.add('foodAgeLabel')
        ageLabel.textContent = "Approximate Age: ";
        const ageSpan = document.createElement('span');
        ageSpan.classList.add('foodAgeSpan')
        ageSpan.textContent = food.age;

        const tempsLabel = document.createElement('span');
        tempsLabel.classList.add('foodTempsLabel')
        tempsLabel.textContent = "Approximate Average Tempuratures: ";
        const tempsSpan = document.createElement('span');
        tempsSpan.classList.add('foodTempsSpan')
        if((typeof food.avgTemps)==="object") {
            if('high' in food.avgTemps) {
                const foodHighTemp = document.createElement('p');
                foodHighTemp.classList.add('foodHighTemp');
                const foodHighTempLabel = document.createElement('span');
                foodHighTempLabel.classList.add('foodHighTempLabel');
                foodHighTempLabel.textContent = "high: "
                const foodHighTempValue = document.createElement('span');
                foodHighTempValue.classList.add('foodHighTempValue');
                foodHighTempValue.textContent = food.avgTemps.high;
                foodHighTemp.appendChild(foodHighTempLabel);
                foodHighTemp.appendChild(foodHighTempValue);
                tempsSpan.appendChild(foodHighTemp);
            }
            if('low' in food.avgTemps) {
                const foodLowTemp = document.createElement('p');
                foodLowTemp.classList.add('foodLowTemp');
                const foodLowTempLabel = document.createElement('span');
                foodLowTempLabel.classList.add('foodLowTempLabel');
                foodLowTempLabel.textContent = "low: "
                const foodLowTempValue = document.createElement('span');
                foodLowTempValue.classList.add('foodLowTempValue');
                foodLowTempValue.textContent = food.avgTemps.low;
                foodLowTemp.appendChild(foodLowTempLabel);
                foodLowTemp.appendChild(foodLowTempValue);
                tempsSpan.appendChild(foodLowTemp);
            }
            if('mean' in food.avgTemps) {
                const foodMeanTemp = document.createElement('p');
                foodMeanTemp.classList.add('foodMeanTemp');
                const foodMeanTempLabel = document.createElement('span');
                foodMeanTempLabel.classList.add('foodMeanTempLabel');
                foodMeanTempLabel.textContent = "mean avg: "
                const foodMeanTempValue = document.createElement('span');
                foodMeanTempValue.classList.add('foodMeanTempValue');
                foodMeanTempValue.textContent = food.avgTemps.mean;
                foodMeanTemp.appendChild(foodMeanTempLabel);
                foodMeanTemp.appendChild(foodMeanTempValue);
                tempsSpan.appendChild(foodMeanTemp);
            }
            const keys = Object.keys(food.avgTemps);
            keys.forEach((key) => {
                if(key!=='high'&&key!=='low'&&key!=='mean') {
                    const entry = food.avgTemps[key];
                    const foodTempLabel = document.createElement('p');
                    foodTempLabel.classList.add('foodTempLabel');
                    foodTempLabel.textContent = `${key}: `;
                    tempsSpan.appendChild(foodTempLabel);
                    if('high' in entry) {
                        const foodHighTemp = document.createElement('p');
                        foodHighTemp.classList.add('foodHighTemp');
                        const foodHighTempLabel = document.createElement('span');
                        foodHighTempLabel.classList.add('foodHighTempLabel');
                        foodHighTempLabel.textContent = "high: "
                        const foodHighTempValue = document.createElement('span');
                        foodHighTempValue.classList.add('foodHighTempValue');
                        foodHighTempValue.textContent = entry.high;
                        foodHighTemp.appendChild(foodHighTempLabel);
                        foodHighTemp.appendChild(foodHighTempValue);
                        tempsSpan.appendChild(foodHighTemp);
                    }
                    if('low' in entry) {
                        const foodLowTemp = document.createElement('p');
                        foodLowTemp.classList.add('foodLowTemp');
                        const foodLowTempLabel = document.createElement('span');
                        foodLowTempLabel.classList.add('foodLowTempLabel');
                        foodLowTempLabel.textContent = "low: "
                        const foodLowTempValue = document.createElement('span');
                        foodLowTempValue.classList.add('foodLowTempValue');
                        foodLowTempValue.textContent = entry.low;
                        foodLowTemp.appendChild(foodLowTempLabel);
                        foodLowTemp.appendChild(foodLowTempValue);
                        tempsSpan.appendChild(foodLowTemp);
                    }
                    if('mean' in entry) {
                        const foodMeanTemp = document.createElement('p');
                        foodMeanTemp.classList.add('foodMeanTemp');
                        const foodMeanTempLabel = document.createElement('span');
                        foodMeanTempLabel.classList.add('foodMeanTempLabel');
                        foodMeanTempLabel.textContent = "mean avg: "
                        const foodMeanTempValue = document.createElement('span');
                        foodMeanTempValue.classList.add('foodMeanTempValue');
                        foodMeanTempValue.textContent = entry.mean;
                        foodMeanTemp.appendChild(foodMeanTempLabel);
                        foodMeanTemp.appendChild(foodMeanTempValue);
                        tempsSpan.appendChild(foodMeanTemp);
                    }
                }
            });
        } else {
            tempsSpan.textContent = food.avgTemps;
        }
        const recommendLabel = document.createElement('span');
        recommendLabel.classList.add('foodRecommendLabel')
        recommendLabel.textContent = "Recommended times to visit:  ";
        const recommendSpan = document.createElement('span');
        recommendSpan.classList.add('foodRecommendSpan')
        if((typeof food.recommend) == 'object') {
            recommendSpan.textContent = JSON.stringify(food.recommend);
        } else {
            recommendSpan.textContent = food.recommend;
        }
        const costLabel = document.createElement('span');
        costLabel.classList.add('foodCostLabel')
        costLabel.textContent = "Approximate Cost in Soles: ";
        const costSpan = document.createElement('span');
        costSpan.classList.add('foodCostSpan')
        costSpan.textContent = JSON.stringify(food.cost);
        const transportLabel = document.createElement('span');
        transportLabel.classList.add('foodTransportLabel')
        transportLabel.textContent = "Approximate Transportation Cost in Soles from Lima: ";
        const transportSpan = document.createElement('span');
        transportSpan.classList.add('foodTransportSpan');
        const transportIsArray = Array.isArray(food.transport);
        if(transportIsArray) {
            const lowTransport = document.createElement('span');
            lowTransport.classList.add('foodLowTransport');
            const lowTransportSpanLabel = document.createElement('span');
            lowTransportSpanLabel.classList.add('foodLowTransportSpanLabel');
            lowTransportSpanLabel.textContent = "low: ";
            const lowTransportSpan = document.createElement('span');
            lowTransportSpan.classList.add('foodLowTransportSpan');
            lowTransportSpan.textContent = food.transport[0];
            lowTransport.appendChild(lowTransportSpanLabel);
            lowTransport.appendChild(lowTransportSpan);
            const highTransport = document.createElement('span');
            highTransport.classList.add('foodHighTransport');
            const highTransportSpanLabel = document.createElement('span');
            highTransportSpanLabel.classList.add('foodHighTransportSpanLabel');
            highTransportSpanLabel.textContent = "high: ";
            const highTransportSpan = document.createElement('span');
            highTransportSpan.classList.add('foodHighTransportSpan');
            highTransportSpan.textContent = food.transport[1];
            highTransport.appendChild(highTransportSpanLabel);
            highTransport.appendChild(highTransportSpan);
            const delimiterSpan = document.createElement('span');
            delimiterSpan.classList.add('foodTransportDelimiterSpan');
            delimiterSpan.textContent = " -- ";
            transportSpan.appendChild(lowTransport);
            transportSpan.appendChild(delimiterSpan);
            transportSpan.appendChild(highTransport);
        } else {
            const transportSpanLabel = document.createElement('span');
            transportSpanLabel.classList.add('foodTransportSpanLabel');
            transportSpanLabel.textContent = "~";
            const transportContentSpan = document.createElement('span');
            transportContentSpan.classList.add('foodTransportContentSpan');
            transportContentSpan.textContent = food.transport;
            transportSpan.appendChild(transportSpanLabel);
            transportSpan.appendChild(transportContentSpan);
        }

        const picture = document.createElement('picture');
        picture.classList.add('foodPicture')
        let filename = "";
        for(let count = (food.imageSizes.sizes.length-1); count>=0; count--){
            const size = food.imageSizes.sizes[count];
            const source = document.createElement('source');
            source.classList.add('foodSource')
            filename = `images\\${food.stringId}.${size}.webp`;
            source.srcset = filename;
            let media = "";
            if(count===0) {
                media = `(width >= ${size}px)`

            } else {
                media = `(width < ${food.imageSizes.sizes[count-1]}px)`
            }
            source.media = media;
            picture.appendChild(source);
        }
        const image = document.createElement('img');
        image.classList.add('foodImage')
        image.src=filename;
        image.alt=`image of ${food.name}`;
        image.width = food.originalImageWidth;
        image.height = food.originalImageHeight;
        picture.appendChild(image);

        const cityNames = document.createElement('p');
        cityNames.classList.add('foodCityNames')
        const description = document.createElement('p');
        description.classList.add('foodDescription')
        const historical = document.createElement('p');
        historical.classList.add('foodHistorical')
        const age = document.createElement('p');
        age.classList.add('foodAge')
        const temps = document.createElement('p');
        temps.classList.add('foodTemps')
        const recommend = document.createElement('p');
        recommend.classList.add('foodRecommend')
        const cost = document.createElement('p');
        cost.classList.add('foodCost')
        const transport = document.createElement('p');
        transport.classList.add('foodTransport')
        cityNames.appendChild(cityNamesLabel);
        cityNames.appendChild(cityNamesSpan);
        description.appendChild(descriptionLabel);
        description.appendChild(descriptionSpan);
        historical.appendChild(historicalLabel);
        historical.appendChild(historicalSpan);
        age.appendChild(ageLabel);
        age.appendChild(ageSpan);
        temps.appendChild(tempsLabel);
        temps.appendChild(tempsSpan);
        recommend.appendChild(recommendLabel);
        recommend.appendChild(recommendSpan);
        cost.appendChild(costLabel);
        cost.appendChild(costSpan);
        transport.appendChild(transportLabel);
        transport.appendChild(transportSpan);

        this.foodContainer.textContent="";
        this.foodContainer.appendChild(name);
        this.foodContainer.appendChild(picture);
        this.foodContainer.appendChild(cityNames);
        this.foodContainer.appendChild(description);
        this.foodContainer.appendChild(historical);
        if(food.age!=null && food.age!=="") {
            this.foodContainer.appendChild(age);
        }
        if(JSON.stringify(food.avgTemps)!='{}'&&JSON.stringify(food.avgTemps)!=null) {
            this.foodContainer.appendChild(temps);
        }
        if(JSON.stringify(food.recommend)!='{}'&&JSON.stringify(food.recommend)!=null&&food.recommend!=="") {
            this.foodContainer.appendChild(recommend);
        }
        if(JSON.stringify(food.cost)!='{}'&&JSON.stringify(food.cost)!=null) {
            this.foodContainer.appendChild(cost);
        }
        if(JSON.stringify(food.transport)!='{}'&&JSON.stringify(food.transport)!=null) {
            this.foodContainer.appendChild(transport);
        }
        this.foodContainer.classList.add('foodContainer')
        //TODO:  complete build
    }
    GetAttractionEntries() {
        Data.debugMessage("GetAttractionEntries()", "GetAttractionEntries()", "functionCalled", false);
        const isFetched = this.IsFetched();
        Data.debugMessage(isFetched, "GetAttractionEntries()", "isFetched");
        if(isFetched) {
            const currentData = this.currentData;
            Data.debugMessage(currentData, "GetAttractionEntries()", "currentData");
            const data = currentData.data;
            Data.debugMessage(data, "GetAttractionEntries()", "data");
            Data.debugMessage("filter data", "GetAttractionEntries()", "filterCalled", false);
            const dataFilter = data.filter(
                function(dataElement) {
                    const dataElementIn = dataElement;
                    Data.debugMessage(dataElementIn, "GetAttractionEntries()", "dataElement");
                    const dataElementType = dataElementIn.type;
                    Data.debugMessage(dataElementType, "GetAttractionEntries()", "dataElementType");
                    const match = (dataElementType === "attraction");
                    Data.debugMessage(match, "GetAttractionEntries()", "match");
                    return match;
                }
            );
            Data.debugMessage(dataFilter, "GetAttractionEntries()", "dataFilter");
            return dataFilter;
        } else {
            return null;
        }
    }
    async DisplayAttractionSpotlightResults(attractionContainer, attractionDisplayTimeMS, attractionCycles){
        this.attractionContainer = attractionContainer;
        this.attractionCycles = attractionCycles;
        this.attractionDisplayTimeMS = attractionDisplayTimeMS;
        this.attractionRotationIndex = 1;
        this.attractionRotationCycles = 0;
        await this.DisplayAttractionSpotlightContainerResults();
        this.attractionRotation = setInterval(async() => await this.processAttractionInterval(currentCityId), this.attractionDisplayTimeMS);
    }
    async processAttractionInterval(currentCityId) {
        this.attractionRotationIndex++;
        //console.log(`${this.attractionRotationIndex} - ${await this.GetAttractionCount()}`);//debug only
        if(this.attractionRotationIndex>=(await this.GetAttractionCount())) {
            this.attractionRotationIndex=1;
            this.attractionRotationCycles++;
        }
        //console.log(`${this.attractionRotationIndex} - ${await this.GetAttractionCount()}`);//debug only
        let attractionData = this.GetAttraction(this.attractionRotationIndex);
        while((attractionData==null)||(attractionData.id!==this.attractionRotationIndex)) {
            this.attractionRotationIndex++;
            //console.log(`${this.attractionRotationIndex} - ${await this.GetAttractionCount()}`);//debug only
            if(this.attractionRotationIndex>=(await this.GetAttractionCount())) {
                this.attractionRotationIndex=1;
                this.attractionRotationCycles++;
            }
            attractionData = this.GetAttraction(this.attractionRotationIndex);
        }
        let cityId = attractionData.cityIds;
        if((typeof attractionData.cityIds)!=="number"){
            cityId = attractionData.cityIds[0];
        }
        const departamentoId = this.GetCity(cityId).departamentoId;
        const captialId = this.GetDepartamento(departamentoId).capitalId;
        this.attractionCityId = this.GetCity(captialId).name;
        currentCityId(this.attractionCityId);
        await this.DisplayAttractionSpotlightContainerResults();
        if(this.attractionCycles>=0 && this.attractionRotationCycles>this.attractionCycles) {
            clearInterval(this.attractionRotation);
        }
    } 
    async DisplayAttractionSpotlightContainerResults() {
        const attraction = this.GetAttraction(this.attractionRotationIndex);
        const name = document.createElement('h3');
        name.classList.add('attractionName')
        name.textContent = attraction.name;
        const cityNamesLabel = document.createElement('span');
        cityNamesLabel.classList.add('attractionCityNamesLabel')
        cityNamesLabel.textContent = "City: ";
        const cityNamesSpan = document.createElement('span');
        cityNamesSpan.classList.add('attractionCityNamesSpan')
        cityNamesSpan.textContent = attraction.cityNames;
        const descriptionLabel = document.createElement('span');
        descriptionLabel.classList.add('attractionDescriptionLabel')
        descriptionLabel.textContent = "Description: ";
        const descriptionSpan = document.createElement('span');
        descriptionSpan.classList.add('attractionDescriptionSpan')
        descriptionSpan.textContent = attraction.description;
        const historicalLabel = document.createElement('span');
        historicalLabel.classList.add('attractionHistoricalLabel')
        historicalLabel.textContent = "Historical: ";
        const historicalSpan = document.createElement('span');
        historicalSpan.classList.add('attractionHistoricalSpan')
        historicalSpan.textContent = attraction.historical;
        const ageLabel = document.createElement('span');
        ageLabel.classList.add('attractionAgeLabel')
        ageLabel.textContent = "Approximate Age: ";
        const ageSpan = document.createElement('span');
        ageSpan.classList.add('attractionAgeSpan')
        ageSpan.textContent = attraction.age;

        const tempsLabel = document.createElement('span');
        tempsLabel.classList.add('attractionTempsLabel')
        tempsLabel.textContent = "Approximate Average Tempuratures: ";
        const tempsSpan = document.createElement('span');
        tempsSpan.classList.add('attractionTempsSpan')
        if((typeof attraction.avgTemps)==="object") {
            if('high' in attraction.avgTemps) {
                const attractionHighTemp = document.createElement('p');
                attractionHighTemp.classList.add('attractionHighTemp');
                const attractionHighTempLabel = document.createElement('span');
                attractionHighTempLabel.classList.add('attractionHighTempLabel');
                attractionHighTempLabel.textContent = "high: "
                const attractionHighTempValue = document.createElement('span');
                attractionHighTempValue.classList.add('attractionHighTempValue');
                attractionHighTempValue.textContent = attraction.avgTemps.high;
                attractionHighTemp.appendChild(attractionHighTempLabel);
                attractionHighTemp.appendChild(attractionHighTempValue);
                tempsSpan.appendChild(attractionHighTemp);
            }
            if('low' in attraction.avgTemps) {
                const attractionLowTemp = document.createElement('p');
                attractionLowTemp.classList.add('attractionLowTemp');
                const attractionLowTempLabel = document.createElement('span');
                attractionLowTempLabel.classList.add('attractionLowTempLabel');
                attractionLowTempLabel.textContent = "low: "
                const attractionLowTempValue = document.createElement('span');
                attractionLowTempValue.classList.add('attractionLowTempValue');
                attractionLowTempValue.textContent = attraction.avgTemps.low;
                attractionLowTemp.appendChild(attractionLowTempLabel);
                attractionLowTemp.appendChild(attractionLowTempValue);
                tempsSpan.appendChild(attractionLowTemp);
            }
            if('mean' in attraction.avgTemps) {
                const attractionMeanTemp = document.createElement('p');
                attractionMeanTemp.classList.add('attractionMeanTemp');
                const attractionMeanTempLabel = document.createElement('span');
                attractionMeanTempLabel.classList.add('attractionMeanTempLabel');
                attractionMeanTempLabel.textContent = "mean avg: "
                const attractionMeanTempValue = document.createElement('span');
                attractionMeanTempValue.classList.add('attractionMeanTempValue');
                attractionMeanTempValue.textContent = attraction.avgTemps.mean;
                attractionMeanTemp.appendChild(attractionMeanTempLabel);
                attractionMeanTemp.appendChild(attractionMeanTempValue);
                tempsSpan.appendChild(attractionMeanTemp);
            }
            const keys = Object.keys(attraction.avgTemps);
            keys.forEach((key) => {
                if(key!=='high'&&key!=='low'&&key!=='mean') {
                    const entry = attraction.avgTemps[key];
                    const attractionTempLabel = document.createElement('p');
                    attractionTempLabel.classList.add('attractionTempLabel');
                    attractionTempLabel.textContent = `${key}: `;
                    tempsSpan.appendChild(attractionTempLabel);
                    if('high' in entry) {
                        const attractionHighTemp = document.createElement('p');
                        attractionHighTemp.classList.add('attractionHighTemp');
                        const attractionHighTempLabel = document.createElement('span');
                        attractionHighTempLabel.classList.add('attractionHighTempLabel');
                        attractionHighTempLabel.textContent = "high: "
                        const attractionHighTempValue = document.createElement('span');
                        attractionHighTempValue.classList.add('attractionHighTempValue');
                        attractionHighTempValue.textContent = entry.high;
                        attractionHighTemp.appendChild(attractionHighTempLabel);
                        attractionHighTemp.appendChild(attractionHighTempValue);
                        tempsSpan.appendChild(attractionHighTemp);
                    }
                    if('low' in entry) {
                        const attractionLowTemp = document.createElement('p');
                        attractionLowTemp.classList.add('attractionLowTemp');
                        const attractionLowTempLabel = document.createElement('span');
                        attractionLowTempLabel.classList.add('attractionLowTempLabel');
                        attractionLowTempLabel.textContent = "low: "
                        const attractionLowTempValue = document.createElement('span');
                        attractionLowTempValue.classList.add('attractionLowTempValue');
                        attractionLowTempValue.textContent = entry.low;
                        attractionLowTemp.appendChild(attractionLowTempLabel);
                        attractionLowTemp.appendChild(attractionLowTempValue);
                        tempsSpan.appendChild(attractionLowTemp);
                    }
                    if('mean' in entry) {
                        const attractionMeanTemp = document.createElement('p');
                        attractionMeanTemp.classList.add('attractionMeanTemp');
                        const attractionMeanTempLabel = document.createElement('span');
                        attractionMeanTempLabel.classList.add('attractionMeanTempLabel');
                        attractionMeanTempLabel.textContent = "mean avg: "
                        const attractionMeanTempValue = document.createElement('span');
                        attractionMeanTempValue.classList.add('attractionMeanTempValue');
                        attractionMeanTempValue.textContent = entry.mean;
                        attractionMeanTemp.appendChild(attractionMeanTempLabel);
                        attractionMeanTemp.appendChild(attractionMeanTempValue);
                        tempsSpan.appendChild(attractionMeanTemp);
                    }
                }
            });
        } else {
            tempsSpan.textContent = attraction.avgTemps;
        }
        const recommendLabel = document.createElement('span');
        recommendLabel.classList.add('attractionRecommendLabel')
        recommendLabel.textContent = "Recommended times to visit:  ";
        const recommendSpan = document.createElement('span');
        recommendSpan.classList.add('attractionRecommendSpan')
        if((typeof attraction.recommend) == 'object') {
            recommendSpan.textContent = JSON.stringify(attraction.recommend);
        } else {
            recommendSpan.textContent = attraction.recommend;
        }
        const costLabel = document.createElement('span');
        costLabel.classList.add('attractionCostLabel')
        costLabel.textContent = "Approximate Cost in Soles: ";
        const costSpan = document.createElement('span');
        costSpan.classList.add('attractionCostSpan')
        costSpan.textContent = JSON.stringify(attraction.cost);
        const transportLabel = document.createElement('span');
        transportLabel.classList.add('attractionTransportLabel')
        transportLabel.textContent = "Approximate Transportation Cost in Soles from Lima: ";
        const transportSpan = document.createElement('span');
        transportSpan.classList.add('attractionTransportSpan');
        const transportIsArray = Array.isArray(attraction.transport);
        if(transportIsArray) {
            const lowTransport = document.createElement('span');
            lowTransport.classList.add('attractionLowTransport');
            const lowTransportSpanLabel = document.createElement('span');
            lowTransportSpanLabel.classList.add('attractionLowTransportSpanLabel');
            lowTransportSpanLabel.textContent = "low: ";
            const lowTransportSpan = document.createElement('span');
            lowTransportSpan.classList.add('attractionLowTransportSpan');
            lowTransportSpan.textContent = attraction.transport[0];
            lowTransport.appendChild(lowTransportSpanLabel);
            lowTransport.appendChild(lowTransportSpan);
            const highTransport = document.createElement('span');
            highTransport.classList.add('attractionHighTransport');
            const highTransportSpanLabel = document.createElement('span');
            highTransportSpanLabel.classList.add('attractionHighTransportSpanLabel');
            highTransportSpanLabel.textContent = "high: ";
            const highTransportSpan = document.createElement('span');
            highTransportSpan.classList.add('attractionHighTransportSpan');
            highTransportSpan.textContent = attraction.transport[1];
            highTransport.appendChild(highTransportSpanLabel);
            highTransport.appendChild(highTransportSpan);
            const delimiterSpan = document.createElement('span');
            delimiterSpan.classList.add('attractionTransportDelimiterSpan');
            delimiterSpan.textContent = " -- ";
            transportSpan.appendChild(lowTransport);
            transportSpan.appendChild(delimiterSpan);
            transportSpan.appendChild(highTransport);
        } else {
            const transportSpanLabel = document.createElement('span');
            transportSpanLabel.classList.add('attractionTransportSpanLabel');
            transportSpanLabel.textContent = "~";
            const transportContentSpan = document.createElement('span');
            transportContentSpan.classList.add('attractionTransportContentSpan');
            transportContentSpan.textContent = attraction.transport;
            transportSpan.appendChild(transportSpanLabel);
            transportSpan.appendChild(transportContentSpan);
        }

        const picture = document.createElement('picture');
        picture.classList.add('attractionPicture')
        let filename = "";
        for(let count = (attraction.imageSizes.sizes.length-1); count>=0; count--){
            const size = attraction.imageSizes.sizes[count];
            const source = document.createElement('source');
            source.classList.add('attractionSource')
            filename = `images\\${attraction.stringId}.${size}.webp`;
            source.srcset = filename;
            let media = "";
            if(count===0) {
                media = `(width >= ${size}px)`

            } else {
                media = `(width < ${attraction.imageSizes.sizes[count-1]}px)`
            }
            source.media = media;
            picture.appendChild(source);
        }
        const image = document.createElement('img');
        image.classList.add('attractionImage')
        image.src=filename;
        image.alt=`image of ${attraction.name}`;
        image.width = attraction.originalImageWidth;
        image.height = attraction.originalImageHeight;
        picture.appendChild(image);

        const cityNames = document.createElement('p');
        cityNames.classList.add('attractionCityNames')
        const description = document.createElement('p');
        description.classList.add('attractionDescription')
        const historical = document.createElement('p');
        historical.classList.add('attractionHistorical')
        const age = document.createElement('p');
        age.classList.add('attractionAge')
        const temps = document.createElement('p');
        temps.classList.add('attractionTemps')
        const recommend = document.createElement('p');
        recommend.classList.add('attractionRecommend')
        const cost = document.createElement('p');
        cost.classList.add('attractionCost')
        const transport = document.createElement('p');
        transport.classList.add('attractionTransport')
        cityNames.appendChild(cityNamesLabel);
        cityNames.appendChild(cityNamesSpan);
        description.appendChild(descriptionLabel);
        description.appendChild(descriptionSpan);
        historical.appendChild(historicalLabel);
        historical.appendChild(historicalSpan);
        age.appendChild(ageLabel);
        age.appendChild(ageSpan);
        temps.appendChild(tempsLabel);
        temps.appendChild(tempsSpan);
        recommend.appendChild(recommendLabel);
        recommend.appendChild(recommendSpan);
        cost.appendChild(costLabel);
        cost.appendChild(costSpan);
        transport.appendChild(transportLabel);
        transport.appendChild(transportSpan);

        this.attractionContainer.textContent="";
        this.attractionContainer.appendChild(name);
        this.attractionContainer.appendChild(picture);
        this.attractionContainer.appendChild(cityNames);
        this.attractionContainer.appendChild(description);
        this.attractionContainer.appendChild(historical);
        if(attraction.age!=null && attraction.age!=="") {
            this.attractionContainer.appendChild(age);
        }
        if(JSON.stringify(attraction.avgTemps)!='{}'&&JSON.stringify(attraction.avgTemps)!=null) {
            this.attractionContainer.appendChild(temps);
        }
        if(JSON.stringify(attraction.recommend)!='{}'&&JSON.stringify(attraction.recommend)!=null&&attraction.recommend!=="") {
            this.attractionContainer.appendChild(recommend);
        }
        if(JSON.stringify(attraction.cost)!='{}'&&JSON.stringify(attraction.cost)!=null) {
            this.attractionContainer.appendChild(cost);
        }
        if(JSON.stringify(attraction.transport)!='{}'&&JSON.stringify(attraction.transport)!=null) {
            this.attractionContainer.appendChild(transport);
        }
        this.attractionContainer.classList.add('attractionContainer')
        //TODO:  complete build
    }
}
