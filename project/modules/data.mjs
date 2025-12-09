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
            "//GetSiteEntries()",
            "//GetCitySiteCount()",
            "//GetCitySiteEntries()",
            "//GetCitySiteIds()",
            "//GetDepartamentoSiteCount()",
            "//GetDepartamentoSiteEntries()",
            "//GetDepartamentoSiteIds()",
            "//GetSiteData()",
            "//GetSite()",
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
        this.siteRotation = setInterval(async() => await this.processInterval(currentCityId), this.siteDisplayTimeMS);
    }
    async processInterval(currentCityId) {
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
        tempsSpan.textContent = JSON.stringify(site.avgTemps);


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
    DisplayFoodSpotlightResults(foodContainer, foodDisplayTimeMS, foodCycles){
        const cityId = 0;
        foodContainer.textContent = cityId;
    }
    DisplayAttractionSpotlightResults(attractionContainer, attractionDisplayTimeMS, attractionCycles){
        const cityId = 0;
        attractionContainer.textContent = cityId;
    }
}