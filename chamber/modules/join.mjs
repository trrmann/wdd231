import { Spotlights } from "./directory.mjs";

export async function DisplayJoinInformation(joinContentClass, joinFormClass) {
    const darkModeButton = document.querySelector('.darkMode');
    const joinContentContainer = document.querySelector(joinContentClass);
    const joinFormContainer = document.querySelector(joinFormClass);

    /*localStorage.removeItem('spotlights');/**/
    try {
        const spotlightsString = localStorage.getItem('spotlights'); 
        let spotlightsJSON = JSON.parse(spotlightsString);
        const weighted = false;
        const weight = 1;
        if(spotlightsJSON === null) {
            let spotlights = await Spotlights.Factory(weighted, weight);
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
        } else {
            let spotlights = await Spotlights.CopyFromJSON(spotlightsJSON);
            if(!(spotlights.weighted===weighted && spotlights.GetGoldToSilverRatio()===weight)) {
                spotlights = await Spotlights.Factory(weighted, weight);
            }
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
        }
    } catch(error) {
            let spotlights = await Spotlights.Factory(weighted, weight);
            const index = await spotlights.DisplayFirstSpotlight(firstBusinessSpotlightTitle, firstBusinessSpotlightContainer, darkModeButton);
            const indexArray = await spotlights.DisplaySecondSpotlight(index, secondBusinessSpotlightTitle, secondBusinessSpotlightContainer, darkModeButton);
            await spotlights.DisplayThirdSpotlight(indexArray, thirdBusinessSpotlightTitle, thirdBusinessSpotlightContainer, darkModeButton);
            localStorage.setItem('spotlights', JSON.stringify(spotlights));
    }   
}