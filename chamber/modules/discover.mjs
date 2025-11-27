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
    const modals = [];
    places.forEach(place => {
        const card = document.createElement('section');
        card.classList.add('discover-card');
        const name = document.createElement('h2');
        name.classList.add('discover-card-name');
        name.textContent = place.name;
        const description = document.createElement('p');
        description.classList.add('discover-card-description');
        description.textContent = place.description;
        const learnMoreButton = document.createElement('button');
        learnMoreButton.classList.add('discover-card-learn');
        learnMoreButton.textContent = 'Learn More';
        const address = document.createElement('p');
        address.classList.add('discover-card-address');
        address.textContent = place.address;
        const image = document.createElement('img');
        image.classList.add('discover-card-image');
        image.src = `images/${place.image_url}`;
        image.alt = place.name;
        image.loading = "lazy";
        const learnMoreDialog = document.createElement('dialog');
        learnMoreDialog.classList.add('learn-more-dialog');
        const learnMoreDialogHeader = document.createElement('h2');
        learnMoreDialogHeader.classList.add('learn-more-name');
        const learnMoreDialogCloseButton = document.createElement('button');
        learnMoreDialogCloseButton.classList.add('learn-more-close');
        learnMoreDialogCloseButton.textContent = '❌';
        learnMoreDialogHeader.innerText = place.name;
        learnMoreDialogCloseButton.addEventListener('click',() => {
            learnMoreDialog.close();
        });
        learnMoreDialogHeader.appendChild(learnMoreDialogCloseButton);
        const learnMoreDialogDescription = document.createElement('p');
        learnMoreDialogDescription.classList.add('learn-more-description');
        learnMoreDialogDescription.textContent = place.description;
        const learnMoreDialogCost = document.createElement('p');
        learnMoreDialogCost.classList.add('learn-more-cost');
        learnMoreDialogCost.textContent = place.cost;
        const learnMoreDialogAddress = document.createElement('p');
        learnMoreDialogAddress.classList.add('learn-more-address');
        learnMoreDialogAddress.textContent = place.address;
        const learnMoreDialogImage = document.createElement('img');
        learnMoreDialogImage.classList.add('learn-more-image');
        learnMoreDialogImage.src = `images/${place.image_url}`;
        learnMoreDialogImage.alt = place.name;
        learnMoreDialogImage.loading = "lazy";
        learnMoreButton.addEventListener('click',() => {
            learnMoreDialog.showModal();
        });
        learnMoreDialog.appendChild(learnMoreDialogHeader);
        learnMoreDialog.appendChild(learnMoreDialogDescription);
        learnMoreDialog.appendChild(learnMoreDialogCost);
        learnMoreDialog.appendChild(learnMoreDialogAddress);
        learnMoreDialog.appendChild(learnMoreDialogImage);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(learnMoreButton);
        card.appendChild(address);
        card.appendChild(image);
        modals.push(learnMoreDialog);
        card.appendChild(learnMoreDialog);
        discoverMainContent.appendChild(card);
    });
    discoverMainHeader.appendChild(discoverMainHeaderTitle);
    discoverMainContainer.textContent = '';
    discoverMainContainer.appendChild(discoverMainHeader);
    discoverMainContainer.appendChild(discoverMainContent);
    modals.forEach(modal => {
        modal.close();
    });
}