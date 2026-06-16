export async function DisplaySitesInformation(sitesContainerClass, data) {
    const sitesContainer = document.querySelector(sitesContainerClass);
    const sitesHeader = document.createElement('h1');
    const sitesContent = document.createElement('div');
    sitesHeader.classList.add('sitesHeader');
    sitesHeader.classList.add('science-gothic-regular');
    sitesContent.classList.add('sitesContent');
    sitesContent.classList.add('science-gothic-regular');
    sitesHeader.textContent = 'Sites';
    data.forEach(site => {
        const siteCardTitle = document.createElement('h2');
        siteCardTitle.textContent = site.name;
        const siteCard = document.createElement('div');
        siteCard.classList.add('siteCard');
        siteCardTitle.classList.add('siteCardTitle');
        const cityNamesLabel = document.createElement('span');
        cityNamesLabel.classList.add('siteCityNamesLabel')
        cityNamesLabel.textContent = "City: ";
        const cityNamesSpan = document.createElement('span');
        cityNamesSpan.classList.add('siteCityNamesSpan')
        cityNamesSpan.textContent = site.cityNames;
        const descriptionLabel = document.createElement('span');
        descriptionLabel.classList.add('siteDescriptionLabel')
        descriptionLabel.textContent = "Description: ";
        const descriptionSpan = document.createElement('span');
        descriptionSpan.classList.add('siteDescriptionSpan')
        descriptionSpan.textContent = site.description;
        const historicalLabel = document.createElement('span');
        historicalLabel.classList.add('siteHistoricalLabel')
        historicalLabel.textContent = "Historical: ";
        const historicalSpan = document.createElement('span');
        historicalSpan.classList.add('siteHistoricalSpan')
        historicalSpan.textContent = site.historical;
        const ageLabel = document.createElement('span');
        ageLabel.classList.add('siteAgeLabel')
        ageLabel.textContent = "Approximate Age: ";
        const ageSpan = document.createElement('span');
        ageSpan.classList.add('siteAgeSpan')
        ageSpan.textContent = site.age;

        const tempsLabel = document.createElement('span');
        tempsLabel.classList.add('siteTempsLabel')
        tempsLabel.textContent = "Approximate Average Tempuratures: ";
        const tempsSpan = document.createElement('span');
        tempsSpan.classList.add('siteTempsSpan')
        if((typeof site.avgTemps)==="object") {
            if('high' in site.avgTemps) {
                const siteHighTemp = document.createElement('p');
                siteHighTemp.classList.add('siteHighTemp');
                const siteHighTempLabel = document.createElement('span');
                siteHighTempLabel.classList.add('siteHighTempLabel');
                siteHighTempLabel.textContent = "high: "
                const siteHighTempValue = document.createElement('span');
                siteHighTempValue.classList.add('siteHighTempValue');
                siteHighTempValue.textContent = site.avgTemps.high;
                siteHighTemp.appendChild(siteHighTempLabel);
                siteHighTemp.appendChild(siteHighTempValue);
                tempsSpan.appendChild(siteHighTemp);
            }
            if('low' in site.avgTemps) {
                const siteLowTemp = document.createElement('p');
                siteLowTemp.classList.add('siteLowTemp');
                const siteLowTempLabel = document.createElement('span');
                siteLowTempLabel.classList.add('siteLowTempLabel');
                siteLowTempLabel.textContent = "low: "
                const siteLowTempValue = document.createElement('span');
                siteLowTempValue.classList.add('siteLowTempValue');
                siteLowTempValue.textContent = site.avgTemps.low;
                siteLowTemp.appendChild(siteLowTempLabel);
                siteLowTemp.appendChild(siteLowTempValue);
                tempsSpan.appendChild(siteLowTemp);
            }
            if('mean' in site.avgTemps) {
                const siteMeanTemp = document.createElement('p');
                siteMeanTemp.classList.add('siteMeanTemp');
                const siteMeanTempLabel = document.createElement('span');
                siteMeanTempLabel.classList.add('siteMeanTempLabel');
                siteMeanTempLabel.textContent = "mean avg: "
                const siteMeanTempValue = document.createElement('span');
                siteMeanTempValue.classList.add('siteMeanTempValue');
                siteMeanTempValue.textContent = site.avgTemps.mean;
                siteMeanTemp.appendChild(siteMeanTempLabel);
                siteMeanTemp.appendChild(siteMeanTempValue);
                tempsSpan.appendChild(siteMeanTemp);
            }
            const keys = Object.keys(site.avgTemps);
            keys.forEach((key) => {
                if(key!=='high'&&key!=='low'&&key!=='mean') {
                    const entry = site.avgTemps[key];
                    const siteTempLabel = document.createElement('p');
                    siteTempLabel.classList.add('siteTempLabel');
                    siteTempLabel.textContent = `${key}: `;
                    tempsSpan.appendChild(siteTempLabel);
                    if('high' in entry) {
                        const siteHighTemp = document.createElement('p');
                        siteHighTemp.classList.add('siteHighTemp');
                        const siteHighTempLabel = document.createElement('span');
                        siteHighTempLabel.classList.add('siteHighTempLabel');
                        siteHighTempLabel.textContent = "high: "
                        const siteHighTempValue = document.createElement('span');
                        siteHighTempValue.classList.add('siteHighTempValue');
                        siteHighTempValue.textContent = entry.high;
                        siteHighTemp.appendChild(siteHighTempLabel);
                        siteHighTemp.appendChild(siteHighTempValue);
                        tempsSpan.appendChild(siteHighTemp);
                    }
                    if('low' in entry) {
                        const siteLowTemp = document.createElement('p');
                        siteLowTemp.classList.add('siteLowTemp');
                        const siteLowTempLabel = document.createElement('span');
                        siteLowTempLabel.classList.add('siteLowTempLabel');
                        siteLowTempLabel.textContent = "low: "
                        const siteLowTempValue = document.createElement('span');
                        siteLowTempValue.classList.add('siteLowTempValue');
                        siteLowTempValue.textContent = entry.low;
                        siteLowTemp.appendChild(siteLowTempLabel);
                        siteLowTemp.appendChild(siteLowTempValue);
                        tempsSpan.appendChild(siteLowTemp);
                    }
                    if('mean' in entry) {
                        const siteMeanTemp = document.createElement('p');
                        siteMeanTemp.classList.add('siteMeanTemp');
                        const siteMeanTempLabel = document.createElement('span');
                        siteMeanTempLabel.classList.add('siteMeanTempLabel');
                        siteMeanTempLabel.textContent = "mean avg: "
                        const siteMeanTempValue = document.createElement('span');
                        siteMeanTempValue.classList.add('siteMeanTempValue');
                        siteMeanTempValue.textContent = entry.mean;
                        siteMeanTemp.appendChild(siteMeanTempLabel);
                        siteMeanTemp.appendChild(siteMeanTempValue);
                        tempsSpan.appendChild(siteMeanTemp);
                    }
                }
            });
        } else {
            tempsSpan.textContent = site.avgTemps;
        }
        const recommendLabel = document.createElement('span');
        recommendLabel.classList.add('siteRecommendLabel')
        recommendLabel.textContent = "Recommended times to visit:  ";
        const recommendSpan = document.createElement('span');
        recommendSpan.classList.add('siteRecommendSpan')
        if((typeof site.recommend) == 'object') {
            recommendSpan.textContent = JSON.stringify(site.recommend);
        } else {
            recommendSpan.textContent = site.recommend;
        }
        const costLabel = document.createElement('span');
        costLabel.classList.add('siteCostLabel')
        costLabel.textContent = "Approximate Cost in Soles: ";
        const costSpan = document.createElement('span');
        costSpan.classList.add('siteCostSpan')
        costSpan.textContent = JSON.stringify(site.cost);
        const transportLabel = document.createElement('span');
        transportLabel.classList.add('siteTransportLabel')
        transportLabel.textContent = "Approximate Transportation Cost in Soles from Lima: ";
        const transportSpan = document.createElement('span');
        transportSpan.classList.add('siteTransportSpan');
        const transportIsArray = Array.isArray(site.transport);
        if(transportIsArray) {
            const lowTransport = document.createElement('span');
            lowTransport.classList.add('siteLowTransport');
            const lowTransportSpanLabel = document.createElement('span');
            lowTransportSpanLabel.classList.add('siteLowTransportSpanLabel');
            lowTransportSpanLabel.textContent = "low: ";
            const lowTransportSpan = document.createElement('span');
            lowTransportSpan.classList.add('siteLowTransportSpan');
            lowTransportSpan.textContent = site.transport[0];
            lowTransport.appendChild(lowTransportSpanLabel);
            lowTransport.appendChild(lowTransportSpan);
            const highTransport = document.createElement('span');
            highTransport.classList.add('siteHighTransport');
            const highTransportSpanLabel = document.createElement('span');
            highTransportSpanLabel.classList.add('siteHighTransportSpanLabel');
            highTransportSpanLabel.textContent = "high: ";
            const highTransportSpan = document.createElement('span');
            highTransportSpan.classList.add('siteHighTransportSpan');
            highTransportSpan.textContent = site.transport[1];
            highTransport.appendChild(highTransportSpanLabel);
            highTransport.appendChild(highTransportSpan);
            const delimiterSpan = document.createElement('span');
            delimiterSpan.classList.add('siteTransportDelimiterSpan');
            delimiterSpan.textContent = " -- ";
            transportSpan.appendChild(lowTransport);
            transportSpan.appendChild(delimiterSpan);
            transportSpan.appendChild(highTransport);
        } else {
            const transportSpanLabel = document.createElement('span');
            transportSpanLabel.classList.add('siteTransportSpanLabel');
            transportSpanLabel.textContent = "~";
            const transportContentSpan = document.createElement('span');
            transportContentSpan.classList.add('siteTransportContentSpan');
            transportContentSpan.textContent = site.transport;
            transportSpan.appendChild(transportSpanLabel);
            transportSpan.appendChild(transportContentSpan);
        }

        const picture = document.createElement('picture');
        picture.classList.add('sitePicture')
        let filename = "";
        for(let count = (site.imageSizes.sizes.length-1); count>=0; count--){
            const size = site.imageSizes.sizes[count];
            const source = document.createElement('source');
            source.classList.add('siteSource')
            filename = `images\\${site.stringId}.${size}.webp`;
            source.srcset = filename;
            let media = "";
            if(count===0) {
                media = `(width >= ${size}px)`

            } else {
                media = `(width < ${site.imageSizes.sizes[count-1]}px)`
            }
            source.media = media;
            picture.appendChild(source);
        }
        const image = document.createElement('img');
        image.classList.add('siteImage')
        image.src=filename;
        image.alt=`image of ${site.name}`;
        image.width = site.originalImageWidth;
        image.height = site.originalImageHeight;
        picture.appendChild(image);

        const cityNames = document.createElement('p');
        cityNames.classList.add('siteCityNames')
        const description = document.createElement('p');
        description.classList.add('siteDescription')
        const historical = document.createElement('p');
        historical.classList.add('siteHistorical')
        const age = document.createElement('p');
        age.classList.add('siteAge')
        const temps = document.createElement('p');
        temps.classList.add('siteTemps')
        const recommend = document.createElement('p');
        recommend.classList.add('siteRecommend')
        const cost = document.createElement('p');
        cost.classList.add('siteCost')
        const transport = document.createElement('p');
        transport.classList.add('siteTransport')
        cityNames.appendChild(cityNamesLabel);
        cityNames.appendChild(cityNamesSpan);
        description.appendChild(descriptionLabel);
        description.appendChild(descriptionSpan);
        historical.appendChild(historicalLabel);
        historical.appendChild(historicalSpan);
        age.appendChild(ageLabel);
        age.appendChild(ageSpan);
        temps.appendChild(tempsLabel);
        temps.appendChild(tempsSpan);
        recommend.appendChild(recommendLabel);
        recommend.appendChild(recommendSpan);
        cost.appendChild(costLabel);
        cost.appendChild(costSpan);
        transport.appendChild(transportLabel);
        transport.appendChild(transportSpan);

        siteCard.textContent="";
        siteCard.appendChild(siteCardTitle);
        siteCard.appendChild(picture);
        siteCard.appendChild(cityNames);
        siteCard.appendChild(description);
        siteCard.appendChild(historical);
        if(site.age!=null && site.age!=="") {
            siteCard.appendChild(age);
        }
        if(JSON.stringify(site.avgTemps)!='{}'&&JSON.stringify(site.avgTemps)!=null) {
            siteCard.appendChild(temps);
        }
        if(JSON.stringify(site.recommend)!='{}'&&JSON.stringify(site.recommend)!=null&&site.recommend!=="") {
            siteCard.appendChild(recommend);
        }
        if(JSON.stringify(site.cost)!='{}'&&JSON.stringify(site.cost)!=null) {
            siteCard.appendChild(cost);
        }
        if(JSON.stringify(site.transport)!='{}'&&JSON.stringify(site.transport)!=null) {
            siteCard.appendChild(transport);
        }
        //TODO:  complete build

        sitesContent.appendChild(siteCard);
    });
    sitesContainer.appendChild(sitesHeader);
    sitesContainer.appendChild(sitesContent);
}