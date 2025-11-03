const directoryContent = document.querySelector(".directory-content");

async function fetchDirectoryData(container) {
    try {        
        const response = await fetch('https://trrmann.github.io/wdd231/chamber/data/directory.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayDirectory(data.businesses, container);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayDirectory(businesses, container) {
    businesses.forEach(business => {
        const businessCard = document.createElement('section');
        businessCard.classList.add('business-card');
        businessCard.innerHTML = `
            <h2 class="business-name">${business.name}</h2>
            <p class="business-address">${business.address}</p>
            <p class="business-phone">Phone: ${business.phone}</p>
            <p class="business-website"><a href="${business.website}" target="_blank">Website</a></p>
            <img class="business-logo" src="${business['logo-image']}" alt="Logo of ${business.name}" width="200" height="100">
            <p class="business-membership">Membership Level: ${business.membership}</p>
            <p class="business-category">Category: ${business.category}</p>`;
        container.appendChild(businessCard);
    });
}

fetchDirectoryData(directoryContent);