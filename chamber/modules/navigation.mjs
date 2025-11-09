import { GetParameter, updateURLParameter, updateCurrentURLParameter, GetURLParametersJSON } from "./preference.mjs";
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
export function RegisterNavButton(navButtonClass, navBarClass, urls) {
    const navButton = document.querySelector(navButtonClass);
    const navLinks = document.querySelector(navBarClass);
    if(GetParameter('ham')==='show') {
        navButton.classList.add('show');
        navLinks.classList.add('show');
        urls.forEach(url => {
            const elements = document.querySelectorAll(url);
            if(elements) {
                elements.forEach(element => {
                    element.href = updateURLParameter(element.href, 'ham', 'show');
                });
            }
        });
    }
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navLinks.classList.toggle('show');
        urls.forEach(url => {
            const elements = document.querySelectorAll(url);
            if(elements) {
                elements.forEach(element => {
                    if(GetParameter('ham')==='show') {
                        element.href = updateURLParameter(element.href, 'ham', 'hide');
                    } else {
                        element.href = updateURLParameter(element.href, 'ham', 'show');
                    }
                });
            }
        });
        if(GetParameter('ham')==='show') {
            updateCurrentURLParameter('ham', 'hide');
        } else {
            updateCurrentURLParameter('ham', 'show');                        
        }
    });
}