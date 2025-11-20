import { SetCopyWriteDate, SetLastModifiedDate } from "../modules/date.mjs";
import { RegisterNavButton } from "../modules/navigation.mjs";
import { RegisterDarkModeButton } from "../modules/preference.mjs";
import { RegisterDirectoryButtons } from "../modules/directory.mjs";
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
        '.directory-button',
        '.gridImage',
        '.listImage',
        '.footer',
        '.business-card',
        '.facebook-icon',
        '.instagram-icon',
        '.twitter-icon',
        '.linked-in-icon',
        '.business-website-anchor',
        '.table-business-website-anchor'
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
        },
        {
            class: '.gridImage',
            lightImage:'images/grid.svg',
            darkImage: 'images/light-grid.svg',
            height:'44',
            width:'44'
        },
        {
            class: '.listImage',
            lightImage:'images/list.svg',
            darkImage: 'images/light-list.svg',
            height:'44',
            width:'44'
        }
    ]
}

RegisterDarkModeButton('#drk-btn', darkModeElementConfiguration);
RegisterNavButton('#ham-btn','#nav-bar',['.nav-lnk']);
SetCopyWriteDate('.currentyear');
SetLastModifiedDate('.lastModified');
RegisterDirectoryButtons('#grid-btn', '#list-btn', '.directory-list', '40rem', '42rem', ['.nav-lnk']);