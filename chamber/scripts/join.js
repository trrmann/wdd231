import { SetCopyWriteDate, SetLastModifiedDate } from "../modules/date.mjs";
import { RegisterNavButton, SyncCurrentParameters } from "../modules/navigation.mjs";
import { RegisterDarkModeButton } from "../modules/preference.mjs";
/*import { DisplayHomeInformation } from "../modules/home.mjs";*/
const darkModeElementConfiguration = {
    classList: [
        '.body',
        '.header',
        '#drk-btn',
        '.darkModeImage',
        '.hamburger',
        '.nav-itm',
        '.nav-itm.current',
        '.nav-lnk',
        /*'.home-current-events-title',
        '.home-current-weather-title',
        '.home-weather-forecast-title',
        '.home-current-events-body',
        '.home-current-weather-body',
        '.home-weather-forecast-body',
        '.home-business-spotlight-title',
        '.home-business-spotlight-body',*/
        '.label',
        '.radio-label',
        '.h3',
        '.input',
        '.textarea',
        '.footer',
        '.facebook-icon',
        '.instagram-icon',
        '.twitter-icon',
        '.linked-in-icon',
        '.website-link'
    ],
    images: [
        {
            class: '.darkModeImage',
            lightImage: 'images/dark-mode.svg',
            darkImage:'images/light-mode.svg',
            height:'44',
            width:'44'
        },
        {
            class: '.facebook-icon',
            lightImage: 'images/facebook.svg',
            darkImage:'images/light-facebook.svg',
            height:'50',
            width:'50'
        },
        {
            class: '.instagram-icon',
            lightImage: 'images/instagram.svg',
            darkImage:'images/light-instagram.svg',
            height:'50',
            width:'50'
        },
        {
            class: '.twitter-icon',
            lightImage: 'images/twitter.svg',
            darkImage:'images/light-twitter.svg',
            height:'50',
            width:'50'
        },
        {
            class: '.linked-in-icon',
            lightImage: 'images/linkedin.svg',
            darkImage:'images/light-linkedin.svg',
            height:'50',
            width:'50'
        }
    ],
    urls: ['.nav-lnk','.join-form']
}

/*SyncCurrentParameters(['.nav-lnk']);*/
RegisterDarkModeButton('#drk-btn', darkModeElementConfiguration);
RegisterNavButton('#ham-btn','#nav-bar',['.nav-lnk']);
SetCopyWriteDate('.currentyear');
SetLastModifiedDate('.lastModified');
/*DisplayHomeInformation('.home-current-events-body', '.home-current-weather-body', '.home-weather-forecast-body', '.home-business-spotlight-first-title', '.home-business-spotlight-first-body', '.home-business-spotlight-second-title', '.home-business-spotlight-second-body', '.home-business-spotlight-third-title', '.home-business-spotlight-third-body');*/

/*const actionButton = document.querySelector('.call-to-action');
actionButton.addEventListener('click', () => {
    actionButton.classList.toggle('selected');
});*/
