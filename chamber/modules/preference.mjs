export function IsDarkModeButtonLight(darkModeButtonClass) {
    let drkButton = document.querySelector(darkModeButtonClass);
    return drkButton.classList.contains('light');
}
export function SyncDarkModeButton(darkModeButtonClass) {
    let drkButton = document.querySelector(darkModeButtonClass);
    if(IsDarkModeButtonLight(darkModeButtonClass)) {
        if(IsDarkModeDark) {
            drkButton.classList.remove('light');
        }
    } else {
        if(IsDarkModeLight()) {
            drkButton.classList.add('light');
        }
    }
}
export function IsDarkModeDark() {
    return !IsDarkModeLight();
}
export function IsDarkModeLight() {
    const darkMode = localStorage.getItem('darkMode');
    if(darkMode) return (darkMode === 'light');
    else return true;
}
export function SetDarkModeLight() {
    localStorage.setItem('darkMode','light');
}
export function SetDarkModeDark() {
    localStorage.setItem('darkMode','dark');
}
export function RegisterDarkModeButton(darkModeButtonClass, elementConfiguration) {
    SyncDarkModeButton(darkModeButtonClass);
    let drkButton = document.querySelector(darkModeButtonClass);
    if(IsDarkModeLight()) {
        AddLightMode(elementConfiguration);
    } else {
        AddLightMode(elementConfiguration);
        RemoveLightMode(elementConfiguration);
    }
    drkButton.addEventListener('click', () => {
        if (IsDarkModeLight()) {
            RemoveLightMode(elementConfiguration);
            drkButton.classList.toggle('light');
        } else {
            AddLightMode(elementConfiguration);
            drkButton.classList.toggle('light');
        }
    });
}
export function AddLightMode(elementConfiguration) {
    elementConfiguration.classList.forEach(className => {
        const elements = document.querySelectorAll(className);
        if(elements) elements.forEach(element => element.classList.add('light'));
    });
    elementConfiguration.images.forEach(image => {
        const element = document.querySelector(image.class)
        if(element) {
             element.src = image.lightImage;
             element.height = image.height;
             element.width = image.width;
        }
    });
    SetDarkModeLight();
}
export function RemoveLightMode(elementConfiguration) {
    elementConfiguration.classList.forEach(className => {
        const elements = document.querySelectorAll(className);
        if(elements) elements.forEach(element => element.classList.remove('light'));
    });
    elementConfiguration.images.forEach(image => {
        const element = document.querySelector(image.class)
        if(element) {
             element.src = image.darkImage;
             element.height = image.height;
             element.width = image.width;
        }
    });
    SetDarkModeDark();
}
export function IsHamburgerMenuShow() {
    return !IsHamburgerMenuHide();
}
export function IsHamburgerMenuHide() {
    const hamburgerMenu = localStorage.getItem('hamburgerMenu');
    if(hamburgerMenu) return (hamburgerMenu === 'hide');
    else return true;
}
export function SetHamburgerMenuShow() {
    localStorage.setItem('hamburgerMenu','show');
}
export function SetHamburgerMenuHide() {
    localStorage.setItem('hamburgerMenu','hide');
}
export function IsDirDisplayGrid() {
    return !IsDirDisplayList();
}
export function IsDirDisplayList() {
    const dirDisplay = localStorage.getItem('dirDisplay');
    if(dirDisplay) return (dirDisplay === 'list');
    else return false;
}
export function SetDirDisplayGrid() {
    localStorage.setItem('dirDisplay','grid');
}
export function SetDirDisplayList() {
    localStorage.setItem('dirDisplay','list');
}
export function LastVisitedDays() {
    // milliseconds to days constant = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
    const msToDays = 86400000;
    const now = Date.now();
    if(IsLastVisited()) {
        return Math.trunc((now - GetLastVisited()) / msToDays);
    } else {
        return -1;
    }
}
export function IsLastVisitedUnderOneDay() {
    if(IsLastVisited && (LastVisitedDays()===0)) {
        return true;
    }
    else
    {
        return false;
    }
}
export function IsLastVisited() {
    return (GetLastVisited() !== null);
}
export function GetLastVisited() {
    const lastVisited = localStorage.getItem('lastVisited');
    if(lastVisited) return lastVisited;
    else return null;
}
export function SetLastVisited() {
    SetLastVisitedDateTime(Date.now());
}
export function SetLastVisitedDateTime(dateTime) {
    localStorage.setItem('lastVisited',dateTime);
}
export function updateURLParameter(url, key, value) {
    const urlObject = new URL(url);
    urlObject.searchParams.set(key, value);
    return urlObject.toString();
}
export function updateCurrentURLParameter(key, value) {
    window.history.pushState(null, '', updateURLParameter(window.location.href, key, value));
}
function GetURLParameters() {
    const url = window.location;
    const srch = url.search;
    return new URLSearchParams(srch);
}
function isNotArrayOrObject(value) {
  return typeof value !== 'object' || value === null || Array.isArray(value);
}
export function GetURLParametersJSON() {
    const result = {};
    const parameters = GetURLParameters();
    const keys = parameters.keys();
    let key = keys.next();
    while(!key.done) {
        const values = parameters.getAll(key.value);
        if(values.length===1) {
            result[key.value] = parameters.get(key.value);
        } else {
            const resultArray = [];
            values.forEach(element => resultArray.push(element));
            result[key.value] = resultArray;
        }
        key = keys.next();
    }
    return result;
}
export function GetURLParameterString(json) {
    let result = '?';
    let and = '';
    for(const key in json) {
        if(Array.isArray(json[key])) {
            json[key].forEach(value => {
                if(isNotArrayOrObject(value)) {
                    result += `${and}${key}=${value}`;
                } else {
                    throw new Error('Invalid json to create the URL paramter string!');
                }
                and = '&';
            });
        } else {
            if(isNotArrayOrObject(json[key])) {
                result += `${and}${key}=${json[key]}`;
            } else {
                throw new Error('Invalid json to create the URL paramter string!');
            }
            and = '&';
        }
    }
    return result;
}
export function HasParameter(parm) {
    return GetURLParameters().has(parm);
}
export function GetParameter(parm,notFoundResult='',throwError=false) {
    if(HasParameter(parm)) {
        return GetURLParameters().get(parm);
    } else {
        if(throwError) {
            throw new Error(`${parm} is not in the URL string!`)
        } else {
            return notFoundResult;
        }
    }
}
export function SyncCurrentParameters(urls) {
    const currentParameters = GetURLParametersJSON();
    urls.forEach(url => {
        const elements = document.querySelectorAll(url);
        if(elements) {
            elements.forEach(element => {
                for(const key in currentParameters) {
                    if(Array.isArray(currentParameters[key])) {
                        currentParameters[key].forEach(value => {
                            element.href = updateURLParameter(element.href, key, value);
                        });
                    } else {
                        element.href = updateURLParameter(element.href, key, currentParameters[key]);
                    }
                };
            });
        }
    });
}