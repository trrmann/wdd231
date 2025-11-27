import { places } from "../data/places.mjs"
import { GetLastVisitedMessage } from "../modules/date.mjs"

export async function DisplayDiscoverInformation(discoverMainContainerClass) {
    const discoverMainContainer = document.querySelector(discoverMainContainerClass);
    const discoverMainHeader = document.createElement('h1');
    const discoverMainHeaderTitle = document.createElement('span');
    const discoverMainContent = document.createElement('div');
    const discoverGreeting = document.createElement('p');
    discoverMainHeaderTitle.classList.add('page-title');
    discoverMainHeaderTitle.classList.add('discoverMainHeaderTitle');
    discoverMainHeader.classList.add('page-title-header');
    discoverMainHeader.classList.add('discoverMainHeader');
    discoverMainContent.classList.add('discover-content');
    discoverMainContent.classList.add('discoverMainContent');
    discoverGreeting.classList.add('discoverGreeting');
    discoverMainHeaderTitle.textContent = 'Discover';
    discoverGreeting.textContent = GetLastVisitedMessage();
    discoverMainContent.appendChild(discoverGreeting);
    places.forEach(place => {
        const card = document.createElement('section');
        card.classList.add('discover-card');
        const name = document.createElement('h2');
        name.classList.add('discover-card-name');
        name.textContent = place.name;
        card.appendChild(name);
        const description = document.createElement('p');
        description.classList.add('discover-card-description');
        description.textContent = place.description;
        card.appendChild(description);
        const cost = document.createElement('p');
        cost.classList.add('discover-card-cost');
        cost.textContent = place.cost;
        card.appendChild(cost);
        const address = document.createElement('p');
        address.classList.add('discover-card-address');
        address.textContent = place.address;
        card.appendChild(address);
        const image = document.createElement('img');
        image.classList.add('discover-card-image');
        image.src = `images/${place.image_url}`;
        image.alt = place.name;
        image.loading = "lazy";
        card.appendChild(image);
        discoverMainContent.appendChild(card);
    });
    discoverMainHeader.appendChild(discoverMainHeaderTitle);
    discoverMainContainer.textContent = '';
    discoverMainContainer.appendChild(discoverMainHeader);
    discoverMainContainer.appendChild(discoverMainContent);
}