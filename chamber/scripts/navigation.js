const drkButton = document.querySelector('#drk-btn');
const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const bodyElement = document.querySelector('.body');
const headerElement = document.querySelector('.header');
const hamburgerElement = document.querySelector('.hamburger');
const navItemElements = document.querySelectorAll('.nav-itm');
const currentNavItemElement = document.querySelector('.nav-itm.current');
const navLinkElements = document.querySelectorAll('.nav-lnk');
const footerElement = document.querySelector('.footer');
let businessCardElements = document.querySelectorAll('.business-card');
const facebookIcon = document.querySelector('.facebook-icon');
const instagramIcon = document.querySelector('.instagram-icon');
const twitterIcon = document.querySelector('.twitter-icon');
const linkedInIcon = document.querySelector('.linked-in-icon');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');
});

drkButton.classList.add('light');
drkButton.attributes['src'].value = 'images/dark-mode.svg';
drkButton.attributes['height'].value = '44';
drkButton.attributes['width'].value = '44';
bodyElement.classList.add('light');
headerElement.classList.add('light');
hamburgerElement.classList.add('light');
navItemElements.forEach(item => item.classList.add('light'));
currentNavItemElement.classList.add('light');
navLinkElements.forEach(link => link.classList.add('light'));
footerElement.classList.add('light');
if(businessCardElements) {
    businessCardElements.forEach(card => card.classList.add('light'));
}

drkButton.addEventListener('click', () => {
    let businessCardElements = document.querySelectorAll('.business-card');
    if (drkButton.classList.contains('light')) {
        drkButton.attributes['src'].value = 'images/light-mode.svg';
        drkButton.attributes['height'].value = '44';
        drkButton.attributes['width'].value = '44';
        drkButton.classList.remove('light');
        bodyElement.classList.remove('light');
        headerElement.classList.remove('light');
        hamburgerElement.classList.remove('light');
        navItemElements.forEach(item => item.classList.remove('light'));
        currentNavItemElement.classList.remove('light');
        navLinkElements.forEach(link => link.classList.remove('light'));
        footerElement.classList.remove('light');
        if(businessCardElements) {
            businessCardElements.forEach(card => card.classList.remove('light'));
        }
        facebookIcon.attributes['src'].value = 'images/light-facebook.svg';
        instagramIcon.attributes['src'].value = 'images/light-instagram.svg';
        twitterIcon.attributes['src'].value = 'images/light-twitter.svg';
        linkedInIcon.attributes['src'].value = 'images/light-linkedin.svg';
    } else {
        drkButton.attributes['src'].value = 'images/dark-mode.svg';
        drkButton.attributes['height'].value = '44';
        drkButton.attributes['width'].value = '44';
        drkButton.classList.add('light');
        bodyElement.classList.add('light');
        headerElement.classList.add('light');
        hamburgerElement.classList.add('light');
        navItemElements.forEach(item => item.classList.add('light'));
        currentNavItemElement.classList.add('light');
        navLinkElements.forEach(link => link.classList.add('light'));
        footerElement.classList.add('light');
        if(businessCardElements) {
            businessCardElements.forEach(card => card.classList.add('light'));
        }
        facebookIcon.attributes['src'].value = 'images/facebook.svg';
        instagramIcon.attributes['src'].value = 'images/instagram.svg';
        twitterIcon.attributes['src'].value = 'images/twitter.svg';
        linkedInIcon.attributes['src'].value = 'images/linkedin.svg';
    }
});

