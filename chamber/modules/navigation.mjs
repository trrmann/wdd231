import { IsHamburgerMenuShow, IsHamburgerMenuHide, SetHamburgerMenuShow, SetHamburgerMenuHide } from "./preference.mjs";

export function RegisterNavButton(navButtonClass, navBarClass, urls) {
    const navButton = document.querySelector(navButtonClass);
    const navLinks = document.querySelector(navBarClass);
    if(IsHamburgerMenuShow()) {
        navButton.classList.add('show');
        navLinks.classList.add('show');
    }
    navButton.addEventListener('click', () => {
        navButton.classList.toggle('show');
        navLinks.classList.toggle('show');
        if(IsHamburgerMenuHide()) {
            SetHamburgerMenuShow();
        } else {
            SetHamburgerMenuHide();                        
        }
    });
}