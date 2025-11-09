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
export function IsDarkModeLight(darkModeButtonClass) {
    let drkButton = document.querySelector(darkModeButtonClass);
    return drkButton.classList.contains('light');
}
export function RegisterDarkModeButton(darkModeButtonClass, elementConfiguration) {
    let drkButton = document.querySelector(darkModeButtonClass);
    if(GetParameter('mode')==='dark') {
        AddLightMode(elementConfiguration);
        RemoveLightMode(elementConfiguration);
    } else {
        AddLightMode(elementConfiguration);
    }
    drkButton.addEventListener('click', () => {
        if (IsDarkModeLight(darkModeButtonClass)) {
            RemoveLightMode(elementConfiguration);
        } else {
            AddLightMode(elementConfiguration);
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
    elementConfiguration.urls.forEach(url => {
        const elements = document.querySelectorAll(url);
        if(elements) {
            elements.forEach(element => {
                element.href = updateURLParameter(element.href, 'mode', 'light');
            });
        }
    });
    updateCurrentURLParameter('mode', 'light');
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
     elementConfiguration.urls.forEach(url => {
        const elements = document.querySelectorAll(url);
        if(elements) {
            elements.forEach(element => {
                element.href = updateURLParameter(element.href, 'mode', 'dark');
            });
        }
    });
   updateCurrentURLParameter('mode', 'dark');
}