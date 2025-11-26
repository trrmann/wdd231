import { SetCopyWriteDate, SetLastModifiedDate } from "../modules/date.mjs";
import { RegisterNavButton } from "../modules/navigation.mjs";
import { RegisterDarkModeButton } from "../modules/preference.mjs";
import { DisplayJoinInformation } from "../modules/join.mjs";

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
        '.class-home-link',
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
    ]
}

RegisterDarkModeButton('#drk-btn', darkModeElementConfiguration);
RegisterNavButton('#ham-btn','#nav-bar',['.nav-lnk']);
SetCopyWriteDate('.currentyear');
SetLastModifiedDate('.lastModified');
DisplayJoinInformation('.join-content', '.join-form', '.timestamp', '.thankyou-content');
