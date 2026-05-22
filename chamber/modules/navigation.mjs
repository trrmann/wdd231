import { IsHamburgerMenuOpened, IsHamburgerMenuClosed, SetHamburgerMenuOpened, SetHamburgerMenuClosed } from "./preference.mjs";

export function RegisterNavButton(navButtonClass, navBarClass, urls) {
    const navButton = document.querySelector(navButtonClass);
    const navLinks = document.querySelector(navBarClass);
    if(IsHamburgerMenuOpened()) {
        if(!navButton.classList.contains('opened')){
             navButton.classList.add('opened');
        }
        if(navButton.classList.contains('closed')){
             navButton.classList.remove('closed');
        }
        if(!navLinks.classList.contains('show')) {
            navLinks.classList.add('show');
        }
    } else if(IsHamburgerMenuClosed()) {
        if(navButton.classList.contains('opened')){
             navButton.classList.remove('opened');
        }
        if(!navButton.classList.contains('closed')){
             navButton.classList.add('closed');
        }
        if(navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
        }
    }
    navButton.addEventListener('click', () => {
        if(IsHamburgerMenuOpened()) {
            SetHamburgerMenuClosed();
        } else {
            SetHamburgerMenuOpened();                        
        }
        if(IsHamburgerMenuOpened()) {
            if(!navButton.classList.contains('opened')){
                navButton.classList.add('opened');
            }
            if(navButton.classList.contains('closed')){
                navButton.classList.remove('closed');
            }
            if(!navLinks.classList.contains('show')) {
                navLinks.classList.add('show');
            }
        } else if(IsHamburgerMenuClosed()) {
            if(navButton.classList.contains('opened')){
                navButton.classList.remove('opened');
            }
            if(!navButton.classList.contains('closed')){
                navButton.classList.add('closed');
            }
            if(navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
            }
        }
    });
}