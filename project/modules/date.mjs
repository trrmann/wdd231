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
export function GetNow() {
    return Date.now();
}
export function GetAdjDateFromNow(timeMS, directionBackward=false) {
    const date = Date.now();
    const ms = +date;
    let newMS = 0;
    if(directionBackward) {
        newMS = ms - timeMS;
    } else {
        newMS = ms + timeMS;
    }
    return Date(newMS);
}
export function GetAdjDate(date, hours, directionBackward=false) {
    const dateIn = new Date(date);
    const ms = +dateIn;
    const hour = 1000 * 60 * 60;
    const hoursMS = hours * hour;
    let newMS = 0;
    if(directionBackward) {
        newMS = ms - hoursMS;
    } else {
        newMS = ms + hoursMS;
    }
    return new Date(newMS);
}
export function GetAdjDOW(date, hours, directionBackward=false) {
    return new Date(GetAdjDate(date, hours, directionBackward)).toLocaleDateString(navigator.language, {weekday: 'long'});
}