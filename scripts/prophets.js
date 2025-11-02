const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    const response = await fetch(url);
    const data = await response.json();
    /*console.table(data.prophets);*/
    displayProphets(data.prophets);
}

getProphetData();

function displayProphets(prophets) {
    prophets.forEach((prophet) => {
        // Create elements to add to the document
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portrait = document.createElement('img');
        let dob = document.createElement('p');
        let pob = document.createElement('p');
        // Change the textContent property of the h2 element to contain the prophet's full name
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dob.textContent = `Date of Birth: ${prophet.birthdate}`;
        pob.textContent = `Place of Birth: ${prophet.birthplace}`;

        card.classList.add('prophet-card');
        fullName.classList.add('prophet-name');
        dob.classList.add('prophet-dob');
        pob.classList.add('prophet-pob');
        portrait.classList.add('prophet-portrait');
    
        // Build the image attributes by using the setAttribute method for the src, alt, and loading attributes.
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Add/append the section(card) with the h2 element
        card.appendChild(fullName); 
        card.appendChild(portrait);
        card.appendChild(dob);
        card.appendChild(pob);

        // Add/append the existing HTML div with the cards class with the section(card)
        cards.appendChild(card);
    });
}
