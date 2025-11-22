import { IsDarkModeLight, AddLightMode } from "../modules/preference.mjs";
import { IsDirDisplayGrid, IsDirDisplayList, SetDirDisplayGrid, SetDirDisplayList } from "../modules/preference.mjs";

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
    static async CopyFromJSON(spotlightsJSON) {
        const spotlights = await Spotlights.Factory(spotlightsJSON.weighted, spotlightsJSON.goldToSilverRatio);
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
        if((this.goldToSilverRatio == null) || (this.goldToSilverRatio <1) ) {
            return 2;
        } else {
            return this.goldToSilverRatio;
        }
    }
    async DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton){
        const index = await this.SelectSpotlightIndex([]);
        await this.DisplaySpotlight(index, firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton);
        return index;
    }
    async DisplaySecondSpotlight(firstIndex, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton){
        const index = await this.SelectSpotlightIndex([firstIndex]);
        await this.DisplaySpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton);
        return [firstIndex, index];
    }
    async DisplayThirdSpotlight(firstAndSecondIndexes, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton){
        let index = await this.SelectSpotlightIndex(firstAndSecondIndexes);
        await this.DisplaySpotlight(index, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton);
        if(this.history[index]==null) {
            this.history[index] = 1;
        } else {
            this.history[index]++;           
        }
        firstAndSecondIndexes.forEach((index)=>{
            if(this.history[index]==null) {
                this.history[index] = 1;
            } else {
                this.history[index]++;           
            }
        });
    }
    async SelectSpotlightIndex(previousArray) {
        if(this.weighted) {
            const max = Object.values(this.history).reduce((previousValue, currentValue) => {
                return Math.max(previousValue, currentValue);
            }, 0);
            const min = Object.values(this.history).reduce((previousValue, currentValue) => {
                return Math.min(previousValue, currentValue);
            }, max);
            const counts = {};
            for(let count=min;count<=max;count++) {
                counts[count] = Object.values(this.history).filter((value) => { return (value === count);}).length;
            }
            const decimals = precision(this.GetGoldToSilverRatio());
            const denominator = Math.pow(10,decimals);
            const numerator = this.GetGoldToSilverRatio()*denominator;
            const divisor = greatestCommonDivisor(numerator, denominator);
            const goldRatioCount = numerator / divisor;
            const silverRatioCount = denominator / divisor;
            let availableIndexes = [];
            const silverIndexes = [];
            const silverData = (await this.data).filter((business)=>{return business.membership==="Silver"});
            silverData.forEach((business) => { silverIndexes.push(this.data.indexOf(business));});
            silverIndexes.forEach((index)=>{
                const count = this.history[index];
                let offset = 0;
                if(count!=null) {
                    offset = count-min+1;
                }
                for(let counter = 0; counter < (silverRatioCount-offset); counter++) {
                    availableIndexes.push(index);
                }
            });
            const goldIndexes = [];
            const goldData = (await this.data).filter((business)=>{return business.membership==="Gold"});
            goldData.forEach((business) => { goldIndexes.push(this.data.indexOf(business));});
            goldIndexes.forEach((index)=>{
                const count = this.history[index];
                let offset = 0;
                if(count!=null) {
                    offset = count-min+1;
                }
                for(let counter = 0; counter < (goldRatioCount-offset); counter++) {
                    availableIndexes.push(index);
                }
            });
            previousArray.forEach((index) => {
                availableIndexes = availableIndexes.filter((availableIndex) => {
                    return availableIndex !== index;
                });
            });
            if(availableIndexes.length===0) {
                silverIndexes.forEach((index)=>{
                    for(let counter = 0; counter < silverRatioCount; counter++) {
                        availableIndexes.push(index);
                    }
                });
                goldIndexes.forEach((index)=>{
                    for(let counter = 0; counter < goldRatioCount; counter++) {
                        availableIndexes.push(index);
                    }
                });                    
                previousArray.forEach((index) => {
                    availableIndexes = availableIndexes.filter((availableIndex) => {
                        return availableIndex !== index;
                    });
                });
            }
            if(availableIndexes.length===0) {
                silverIndexes.forEach((index)=>{
                    for(let counter = 0; counter < silverRatioCount; counter++) {
                        availableIndexes.push(index);
                    }
                });
                goldIndexes.forEach((index)=>{
                    for(let counter = 0; counter < goldRatioCount; counter++) {
                        availableIndexes.push(index);
                    }
                });                    
            }
            return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        } else {
            const availableIndexes = Array.from(Array(await this.data.length).keys()).filter((index)=>{return !previousArray.includes(index);});
            return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        }
    }
    async DisplaySpotlight(index, titleContainer, bodyContainer, darkModeButton) {
        titleContainer.innerHTML = '';
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('title-span');
        titleSpan.textContent = `${await this.data[index].name}`;
        const titleParagraph = document.createElement('p');
        titleParagraph.classList.add('title-p');
        titleParagraph.appendChild(titleSpan);
        titleContainer.appendChild(titleParagraph);

        const tagLineSpan = document.createElement('span');
        tagLineSpan.classList.add('tagLine-span');
        tagLineSpan.textContent = `${await this.data[index]['tag-line']}`;
        const tagLineParagraph = document.createElement('p');
        tagLineParagraph.classList.add('tagLine-p');
        tagLineParagraph.appendChild(tagLineSpan);
        titleContainer.appendChild(tagLineParagraph);

        bodyContainer.innerHTML = '';

        const logoImg = document.createElement('img');
        logoImg.classList.add('logo-img');
        logoImg.src = `${await this.data[index]['logo-image']}`;
        logoImg.height = `${await this.data[index].height}`;
        logoImg.width = `${await this.data[index].width}`;
        bodyContainer.appendChild(logoImg);

        const emailSpan = document.createElement('span');
        emailSpan.classList.add('email-span');
        emailSpan.textContent = `${await this.data[index].email}`;
        const emailParagraph = document.createElement('p');
        emailParagraph.textContent = 'E-mail: ';
        emailParagraph.classList.add('email-p');
        emailParagraph.appendChild(emailSpan);
        bodyContainer.appendChild(emailParagraph);

        const phoneSpan = document.createElement('span');
        phoneSpan.classList.add('phone-span');
        phoneSpan.textContent = `${await this.data[index].phone}`;
        const phoneParagraph = document.createElement('p');
        phoneParagraph.textContent = 'Phone: ';
        phoneParagraph.classList.add('phone-p');
        phoneParagraph.appendChild(phoneSpan);
        bodyContainer.appendChild(phoneParagraph);

        const websiteLink = document.createElement('a');
        websiteLink.classList.add('website-link');
        if(darkModeButton.classList.contains('light')) { websiteLink.classList.add('light'); }
        websiteLink.textContent = `${await this.data[index].website}`;
        websiteLink.href = `${await this.data[index].website}`;
        const websiteParagraph = document.createElement('p');
        websiteParagraph.textContent = 'Website: ';
        websiteParagraph.classList.add('website-p');
        websiteParagraph.appendChild(websiteLink);
        bodyContainer.appendChild(websiteParagraph);
    }
}

function precision(value) {
    if (!isFinite(value)) return 0;
    var base = 1, precision = 0;
    while (Math.round(value * base) / base !== value) { base *= 10; precision++; }
    return precision;
}

function greatestCommonDivisor(a, b) {
  return b === 0 ? a : greatestCommonDivisor(b, a % b);
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

export async function fetchMembershipLevelData(container, minLargeScreenSize, minLargestScreenSize) {
    try {        
        const url = 'https://trrmann.github.io/wdd231/chamber/data/membershipLevels.json';
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        DisplayMembershipCards(data.membershipLevels, container);
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

export function DisplayMembershipCards(membershipLevels, container) {
    const sorted = membershipLevels.sort((a, b) => {return (a['ordinal'] - b['ordinal']); });
    sorted.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('membershipLevelCard');
        const header = document.createElement('h4');
        const membershipName = document.createElement('span');
        const membershipLabel = document.createElement('span');
        const learnMoreButton = document.createElement('button');
        learnMoreButton.classList.add('membershipLevelButon');
        learnMoreButton.textContent = 'Learn More';
        const learnMoreDialog = document.createElement('dialog');
        learnMoreDialog.classList.add('learnMoreDialog');
        const learnMoreDialogHeader = document.createElement('h2');
        const learnMoreDialogCloseButton = document.createElement('button');
        learnMoreDialogCloseButton.classList.add('learnMoreDialogCloseButton');
        learnMoreDialogCloseButton.textContent = '❌';
        learnMoreDialogHeader.innerText = `${element['name']} Membership Level`;
        learnMoreDialogCloseButton.addEventListener('click',() => {
            learnMoreDialog.close();
        });
        learnMoreDialogHeader.appendChild(learnMoreDialogCloseButton);
        const learnMoreDialogDataSection = document.createElement('div');
        learnMoreDialogDataSection.classList.add('learnMoreDialogDataSection');
        const learnMoreDialogCostSection = document.createElement('div');
        learnMoreDialogCostSection.classList.add('learnMoreDialogCostSection');
        const learnMoreDialogCostSectionHeader = document.createElement('h3');
        learnMoreDialogCostSectionHeader.classList.add('learnMoreDialogCostSectionHeader');
        learnMoreDialogCostSectionHeader.innerText = 'Cost';
        learnMoreDialogCostSection.appendChild(learnMoreDialogCostSectionHeader);
        Object.keys(element.cost).forEach((key) => {
            const costName = document.createElement('p');
            costName.classList.add('costName');
            costName.textContent = key;
            const costValue = document.createElement('p');
            costValue.classList.add('costValue');
            const usdFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });
            costValue.textContent = usdFormatter.format(element.cost[key]);
            learnMoreDialogCostSection.appendChild(costName);
            learnMoreDialogCostSection.appendChild(costValue);
        });
        const learnMoreDialogBenfitsSection = document.createElement('div');
        learnMoreDialogBenfitsSection.classList.add('learnMoreDialogBenfitsSection');
        const learnMoreDialogBenfitsSectionHeader = document.createElement('h3');
        learnMoreDialogBenfitsSectionHeader.classList.add('learnMoreDialogBenfitsSectionHeader');
        learnMoreDialogBenfitsSectionHeader.innerText = 'Benefits';
        learnMoreDialogBenfitsSection.appendChild(learnMoreDialogBenfitsSectionHeader);
        Object.keys(element.benifits).forEach((key) => {
            const benefitName = document.createElement('p');
            benefitName.classList.add('benefitName');
            benefitName.textContent = key;
            const benefitValue = document.createElement('p');
            benefitValue.classList.add('benefitValue');
            benefitValue.textContent = element.benifits[key];
            learnMoreDialogBenfitsSection.appendChild(benefitName);
            learnMoreDialogBenfitsSection.appendChild(benefitValue);
        });
        learnMoreDialogDataSection.appendChild(learnMoreDialogCostSection);
        learnMoreDialogDataSection.appendChild(learnMoreDialogBenfitsSection);
        learnMoreDialog.appendChild(learnMoreDialogHeader);
        learnMoreDialog.appendChild(learnMoreDialogDataSection);
        membershipName.textContent = element.name;
        membershipLabel.textContent = ' Membership Level';
        header.appendChild(membershipName);
        header.appendChild(membershipLabel);
        card.appendChild(header);
        learnMoreButton.addEventListener('click',() => {
            learnMoreDialog.showModal();
        });
        card.appendChild(learnMoreButton);
        container.appendChild(card);
        container.appendChild(learnMoreDialog);
    });
}

export function RegisterDirectoryButtons(gridModeButtonClass, listModeButtonClass, listContainerClass, minLargeScreenSize, minLargestScreenSize, urls) {
    const gridButton = document.querySelector(gridModeButtonClass);
    const listButton = document.querySelector(listModeButtonClass);
    const directoryContent = document.querySelector(listContainerClass);
    if(IsDirDisplayList()) {
        listButton.classList.add('selected');
        if(gridButton.classList.contains('selected')) gridButton.classList.remove('selected');
    } else {
        gridButton.classList.add('selected');
        if(listButton.classList.contains('selected')) listButton.classList.remove('selected');
    }
    gridButton.addEventListener('click', () => {
        gridButton.classList.toggle('selected');
        listButton.classList.toggle('selected');
        SetDirDisplayGrid();
        fetchDirectoryData(directoryContent, gridButton);
    });
    listButton.addEventListener('click', () => {
        gridButton.classList.toggle('selected');
        listButton.classList.toggle('selected');
        SetDirDisplayList();
        fetchDirectoryData(directoryContent, gridButton);
    });
    fetchDirectoryData(directoryContent, gridButton, minLargeScreenSize, minLargestScreenSize);
}