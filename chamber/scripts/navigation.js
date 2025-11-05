const drkButton = document.querySelector('#drk-btn');
const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const bodyElement = document.querySelector('.body');
const headerElement = document.querySelector('.header');
const darkElement = document.querySelector('.darkModeImage');
const hamburgerElement = document.querySelector('.hamburger');
const navItemElements = document.querySelectorAll('.nav-itm');
const currentNavItemElement = document.querySelector('.nav-itm.current');
const navLinkElements = document.querySelectorAll('.nav-lnk');
const gridButtonImageElement = document.querySelector('.gridImage');
const listButtonImageElement = document.querySelector('.listImage');
const footerElement = document.querySelector('.footer');
let businessCardElements = document.querySelectorAll('.business-card');
const facebookIcon = document.querySelector('.facebook-icon');
const instagramIcon = document.querySelector('.instagram-icon');
const twitterIcon = document.querySelector('.twitter-icon');
const linkedInIcon = document.querySelector('.linked-in-icon');
let businessWebsiteAnchors = document.querySelectorAll('.business-website-anchor');
let tableBusinessWebsiteAnchors = document.querySelectorAll('.table-business-website-anchor');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');
});

darkElement.classList.add('light');
darkElement.attributes['src'].value = 'images/dark-mode.svg';
gridButtonImageElement.attributes['src'].value = 'images/grid.svg';
listButtonImageElement.attributes['src'].value = 'images/list.svg';
bodyElement.classList.add('light');
headerElement.classList.add('light');
hamburgerElement.classList.add('light');
navItemElements.forEach(item => item.classList.add('light'));
currentNavItemElement.classList.add('light');
navLinkElements.forEach(link => link.classList.add('light'));
footerElement.classList.add('light');
businessWebsiteAnchors.forEach(anchor => anchor.classList.add('light'));
tableBusinessWebsiteAnchors.forEach(anchor => anchor.classList.add('light'));
if(businessCardElements) {
    businessCardElements.forEach(card => card.classList.add('light'));
}

drkButton.addEventListener('click', () => {
    let businessCardElements = document.querySelectorAll('.business-card');
    let businessWebsiteAnchors = document.querySelectorAll('.business-website-anchor');
    let tableBusinessWebsiteAnchors = document.querySelectorAll('.table-business-website-anchor');
    if (darkElement.classList.contains('light')) {
        darkElement.attributes['src'].value = 'images/light-mode.svg';
        gridButtonImageElement.attributes['src'].value = 'images/light-grid.svg';
        listButtonImageElement.attributes['src'].value = 'images/light-list.svg';
        darkElement.classList.remove('light');
        bodyElement.classList.remove('light');
        headerElement.classList.remove('light');
        hamburgerElement.classList.remove('light');
        navItemElements.forEach(item => item.classList.remove('light'));
        currentNavItemElement.classList.remove('light');
        navLinkElements.forEach(link => link.classList.remove('light'));
        footerElement.classList.remove('light');
        businessWebsiteAnchors.forEach(anchor => anchor.classList.remove('light'));
        tableBusinessWebsiteAnchors.forEach(anchor => anchor.classList.remove('light'));
        if(businessCardElements) {
            businessCardElements.forEach(card => card.classList.remove('light'));
        }
        facebookIcon.attributes['src'].value = 'images/light-facebook.svg';
        facebookIcon.attributes['height'].value = '50';
        facebookIcon.attributes['width'].value = '50';
        instagramIcon.attributes['src'].value = 'images/light-instagram.svg';
        instagramIcon.attributes['height'].value = '50';
        instagramIcon.attributes['width'].value = '50';
        twitterIcon.attributes['src'].value = 'images/light-twitter.svg';
        twitterIcon.attributes['height'].value = '50';
        twitterIcon.attributes['width'].value = '50';
        linkedInIcon.attributes['src'].value = 'images/light-linkedin.svg';
        linkedInIcon.attributes['height'].value = '50';
        linkedInIcon.attributes['width'].value = '50';
    } else {
        darkElement.attributes['src'].value = 'images/dark-mode.svg';
        gridButtonImageElement.attributes['src'].value = 'images/grid.svg';
        listButtonImageElement.attributes['src'].value = 'images/list.svg';
        darkElement.classList.add('light');
        bodyElement.classList.add('light');
        headerElement.classList.add('light');
        hamburgerElement.classList.add('light');
        navItemElements.forEach(item => item.classList.add('light'));
        currentNavItemElement.classList.add('light');
        navLinkElements.forEach(link => link.classList.add('light'));
        footerElement.classList.add('light');
        businessWebsiteAnchors.forEach(anchor => anchor.classList.add('light'));
        tableBusinessWebsiteAnchors.forEach(anchor => anchor.classList.add('light'));
        if(businessCardElements) {
            businessCardElements.forEach(card => card.classList.add('light'));
        }
        facebookIcon.attributes['src'].value = 'images/facebook.svg';
        facebookIcon.attributes['height'].value = '50';
        facebookIcon.attributes['width'].value = '50';
        instagramIcon.attributes['src'].value = 'images/instagram.svg';
        instagramIcon.attributes['height'].value = '50';
        instagramIcon.attributes['width'].value = '50';
        twitterIcon.attributes['src'].value = 'images/twitter.svg';
        twitterIcon.attributes['height'].value = '50';
        twitterIcon.attributes['width'].value = '50';
        linkedInIcon.attributes['src'].value = 'images/linkedin.svg';
        linkedInIcon.attributes['height'].value = '50';
        linkedInIcon.attributes['width'].value = '50';
    }
});

