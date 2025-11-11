import { IsDarkModeLight, AddLightMode } from "../modules/preference.mjs";
import { GetParameter, updateURLParameter, updateCurrentURLParameter } from "../modules/preference.mjs";

export class Spotlights {
    constructor(weightedRandom=true, goldToSilverRatio=this.GetGoldToSilverRatio()) {
        // Enforce the use of the static Factory to instantiate this object.
        if (!Spotlights._fromFactorySemephore) {
            throw new Error("Connot directly instantiate Spotlights.  Use Spotlights.Factory();");
        }
        if(weightedRandom==null) {
            weightedRandom=true;
        }
        if(goldToSilverRatio==null) {
            goldToSilverRatio=this.GetGoldToSilverRatio();
        }
        this.weighted = weightedRandom;
        this.goldToSilverRatio = goldToSilverRatio;
        this.history = {};
        delete Spotlights._fromFactorySemephore;
    }
    static CopyFromJSON(spotlightsJSON) {
        const spotlights = new Spotlights(spotlightsJSON.weightedRandom, spotlightsJSON.goldToSilverRatio);
        spotlights.history = spotlightsJSON.history;
        return spotlights;
    }
    static async Factory(weightedRandom, goldToSilverRatio) {
        Spotlights._fromFactorySemephore = true;
        const instance = new Spotlights(weightedRandom, goldToSilverRatio);
        await instance.FetchData();
        return instance;        
    }
    async FetchData(){
        try {        
            const url = 'https://trrmann.github.io/wdd231/chamber/data/members.json';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            this.data = await json.members.filter((business)=>{return (business.membership === "Gold")|(business.membership === "Silver")});
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
    GetGoldToSilverRatio() {
        if(this.goldToSilverRatio == null) {
            return 2;
        } else {
            return this.goldToSilverRatio;
        }
    }
    async DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer){
        const index = await this.SelectSpotlightIndex(1, []);
        await this.DisplaySpotlight(index, firstBusinessSpotlightTitle, firstBusinessSpotlightContainer);
        this.history[index]++;
        return index;
    }
    async DisplaySecondSpotlight(firstIndex, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer){
        const index = await this.SelectSpotlightIndex(2, [firstIndex]);
        await this.DisplaySpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer);
        this.history[index]++;
        return [firstIndex, index];
    }
    async DisplayThirdSpotlight(firstAndSecondIndexes, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer){
        const index = await this.SelectSpotlightIndex(3, firstAndSecondIndexes);
        await this.DisplaySpotlight(index, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer);
        this.history[index]++;
    }
    async SelectSpotlightIndex(iteration, previousArray) {
        await this.data;
        return iteration-1;
    }
    async DisplaySpotlight(index, titleContainer, bodyContainer) {
        titleContainer.textContent = `${await this.data[index].name} - ${await this.data[index]['tag-line']}`;
        bodyContainer.textContent = `${await this.data[index]['logo-image']} - ${await this.data[index].height} - ${await this.data[index].width} - ${await this.data[index].email} - ${await this.data[index].phone} - ${await this.data[index].website}`;
    }
}

async function fetchDirectoryData(container, button, minLargeScreenSize, minLargestScreenSize) {
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
            displayDirectoryList(data.members, container, minLargeScreenSize, minLargestScreenSize);
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

function displayDirectoryList(businesses, container, minLargeScreenSize, minLargestScreenSize) {
    const mediaQueryMid = `only screen and (min-width: 38rem) and (width > ${minLargeScreenSize})`;
    const mediaQueryLarge = `only screen and (min-width: ${minLargeScreenSize}) and (width > ${minLargestScreenSize})`;
    const mediaQueryLargest = `only screen and (min-width: ${minLargestScreenSize})`;
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
    if(headers.includes('Website')) {
        if(IsDarkModeLight('#drk-btn'))
        {
            AddLightMode({classList: ['.table-business-website-anchor'], images: [], urls:[]});
        }
    }
}

export function RegisterDirectoryButtons(gridModeButtonClass, listModeButtonClass, listContainerClass, minLargeScreenSize, minLargestScreenSize, urls) {
    const gridButton = document.querySelector(gridModeButtonClass);
    const listButton = document.querySelector(listModeButtonClass);
    const directoryContent = document.querySelector(listContainerClass);
    if(GetParameter('dir')==='list') {
        listButton.classList.add('selected');
        if(gridButton.classList.contains('selected')) gridButton.classList.remove('selected');
        urls.forEach(url => {
            const elements = document.querySelectorAll(url);
            if(elements) {
                elements.forEach(element => {
                    element.href = updateURLParameter(element.href, 'dir', 'list');
                });
            }
        });
    } else {
        gridButton.classList.add('selected');
        if(listButton.classList.contains('selected')) listButton.classList.remove('selected');
        urls.forEach(url => {
            const elements = document.querySelectorAll(url);
            if(elements) {
                elements.forEach(element => {
                    element.href = updateURLParameter(element.href, 'dir', 'grid');
                });
            }
        });
    }
    gridButton.addEventListener('click', () => {
        gridButton.classList.toggle('selected');
        listButton.classList.toggle('selected');
        urls.forEach(url => {
            const elements = document.querySelectorAll(url);
            if(elements) {
                elements.forEach(element => {
                    if(GetParameter('dir')==='grid') {
                        element.href = updateURLParameter(element.href, 'dir', 'list');
                    } else {
                        element.href = updateURLParameter(element.href, 'dir', 'grid');
                    }
                });
            }
        });
        if(GetParameter('dir')==='grid') {
            updateCurrentURLParameter('dir', 'list');
        } else {
            updateCurrentURLParameter('dir', 'grid');                        
        }
        fetchDirectoryData(directoryContent, gridButton);
    });
    listButton.addEventListener('click', () => {
        gridButton.classList.toggle('selected');
        listButton.classList.toggle('selected');
        urls.forEach(url => {
            const elements = document.querySelectorAll(url);
            if(elements) {
                elements.forEach(element => {
                    if(GetParameter('dir')==='grid') {
                        element.href = updateURLParameter(element.href, 'dir', 'list');
                    } else {
                        element.href = updateURLParameter(element.href, 'dir', 'grid');
                    }
                });
            }
        });
        if(GetParameter('dir')==='grid') {
            updateCurrentURLParameter('dir', 'list');
        } else {
            updateCurrentURLParameter('dir', 'grid');                        
        }
        fetchDirectoryData(directoryContent, gridButton);
    });
    fetchDirectoryData(directoryContent, gridButton, minLargeScreenSize, minLargestScreenSize);
}