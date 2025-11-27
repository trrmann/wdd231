import { LastVisitedDays, IsLastVisitedUnderOneDay, IsLastVisited, SetLastVisited } from "../modules/preference.mjs"

export function SetCopyWriteDate(copyWriteDateContainerClass) {
    // Get the current date
    const currentYear = new Date().getFullYear();
    // Get the currentYear element from html
    const currentYearElement = document.querySelector(copyWriteDateContainerClass);
    // update the html element with the data
    if(currentYearElement) currentYearElement.innerHTML = `&copy; ${currentYear}`;
}
export function SetLastModifiedDate(lastModifiedDateContainerClass) {
    // Get the documents last modified date
    const lastModDate = document.lastModified;
    const lastModElement = document.querySelector(lastModifiedDateContainerClass);
    if(lastModElement) lastModElement.innerHTML = `Last modification:  ${lastModDate}`;
}
export function GetLastVisitedMessage() {
    if(!IsLastVisited()) {
        SetLastVisited();
        return 'Welcome! Let us know if you have any questions.';
    } else if(IsLastVisitedUnderOneDay()) {
        SetLastVisited();
        return 'Back so soon! Awesome!';
    } else {
        return `You last visited ${LastVisitedDays()} days ago.`;
    }
}