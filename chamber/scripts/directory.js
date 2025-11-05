const dirDrkButton = document.querySelector('.darkModeImage');
const gridButton = document.querySelector('#grid-btn');
const listButton = document.querySelector('#list-btn');
const directoryContent = document.querySelector(".directory-list");
const mediaQueryMid = 'only screen and (min-width: 38rem) and (width > 40rem)';
const mediaQueryLarge = 'only screen and (min-width: 40rem) and (width > 42rem)';
const mediaQueryLargest = 'only screen and (min-width: 42rem)';

gridButton.addEventListener('click', () => {
    gridButton.classList.toggle('selected');
    listButton.classList.toggle('selected');
    fetchDirectoryData(directoryContent, gridButton);
});

listButton.addEventListener('click', () => {
    gridButton.classList.toggle('selected');
    listButton.classList.toggle('selected');
    fetchDirectoryData(directoryContent, gridButton);
});

async function fetchDirectoryData(container, button) {
    try {        
        const url = 'https://trrmann.github.io/wdd231/chamber/data/members.json';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if(button.classList.contains('selected')) {
            displayDirectoryGrid(data.members, container);
        } else {
            displayDirectoryList(data.members, container);
        }
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayDirectoryGrid(businesses, container) {
    container.innerHTML = '';
    businesses.forEach(business => {
        const businessCard = document.createElement('section');
        businessCard.classList.add('business-card');
        businessCard.innerHTML = `
            <h2 class="business-name">${business.name}</h2>
            <p class="business-address">${business.address}</p>
            <p class="business-phone">Phone: ${business.phone}</p>
            <p class="business-website"><a class="business-website-anchor" href="${business.website}" target="_blank">Website</a></p>
            <img class="business-logo" src="${business['logo-image']}" alt="Logo of ${business.name}" width="${business.width}" height="${business.height}">
            <p class="business-membership">Membership Level: ${business.membership}</p>
            <p class="business-category">Category: ${business.category}</p>`;
        container.appendChild(businessCard);
    });
}
function displayDirectoryList(businesses, container) {
    container.innerHTML = '';
    const businessCard = document.createElement('section');
    const table = document.createElement('table');
    table.classList.add('business-table');
    const headerRow = document.createElement('tr');
    headerRow.classList.add('business-table-header-row');
    let mqlm = window.matchMedia(mediaQueryMid);
    let mqll = window.matchMedia(mediaQueryLarge);
    let mqllst = window.matchMedia(mediaQueryLargest);
    let headers = [];
    if (mqlm.matches) {
        headers = ['Name', 'Address', 'Phone', 'Website', 'Membership Level'];
    } else if (mqll.matches) {
        headers = ['Name', 'Address', 'Phone', 'Website', 'Membership Level', 'Category'];
    } else if (mqllst.matches) {
        headers = ['Name', 'Address', 'Phone', 'Website', 'Membership Level', 'Category', 'Logo'];
    } else {
        headers = ['Name', 'Address', 'Phone', 'Website'];
    }
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        header.classList.add('business-table-column-header');
        header.classList.add(`business-table-${headerText.toLowerCase().replace(/\s/g, '')}-column-header`);
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    businesses.forEach(business => {
        const row = document.createElement('tr');
        row.classList.add('business-table-row');
        if(headers.includes('Name')) {
            const nameCell = document.createElement('td');
            nameCell.textContent = business.name;
            nameCell.classList.add('table-business-name');
            row.appendChild(nameCell);
        }
        if(headers.includes('Address')) {
            const addressCell = document.createElement('td');
            addressCell.textContent = business.address;
            addressCell.classList.add('table-business-address');
            row.appendChild(addressCell);
        }
        if(headers.includes('Phone')) {
            const phoneCell = document.createElement('td');
            phoneCell.textContent = business.phone;
            phoneCell.classList.add('table-business-phone');
            row.appendChild(phoneCell);
        }
        if(headers.includes('Website')) {
            const websiteCell = document.createElement('td');
            const websiteAnchor = document.createElement('a');
            websiteAnchor.href = business.website;
            websiteAnchor.target = '_blank';
            websiteAnchor.textContent = 'Website';
            websiteAnchor.classList.add('table-business-website-anchor');
            if(dirDrkButton.classList.contains('light')) {
                if(!websiteAnchor.classList.contains('light')) {
                    websiteAnchor.classList.add('light');
                }
            }
            websiteCell.appendChild(websiteAnchor);
            websiteCell.classList.add('table-business-website');
            row.appendChild(websiteCell);
        }
        if(headers.includes('Membership Level')) {
            const membershipCell = document.createElement('td');
            membershipCell.textContent = business.membership;
            membershipCell.classList.add('table-business-membership');
            row.appendChild(membershipCell);
        }
        if(headers.includes('Category')) {
            const categoryCell = document.createElement('td');
            categoryCell.textContent = business.category;
            categoryCell.classList.add('table-business-category');
            row.appendChild(categoryCell);
        }
        if(headers.includes('Logo')) {
            const categoryCell = document.createElement('td');
            categoryCell.classList.add('table-business-logo');
            const image = document.createElement('img');
            image.src = business['logo-image'];
            image.classList.add('table-business-logo-image');
            image.alt = `Logo of ${business.name}`;
            image.height = business.height;
            image.width = business.width;
            image.width = '100';
            image.height = '50';
            categoryCell.appendChild(image);
            categoryCell.classList.add('table-business-logo');
            row.appendChild(categoryCell);
        }
        table.appendChild(row);
    });
    businessCard.appendChild(table);
    container.appendChild(businessCard);
}
fetchDirectoryData(directoryContent, gridButton);