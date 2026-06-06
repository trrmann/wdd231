import { HasParameter, GetParameter } from "./preference.mjs";
export function DisplayExploreInformation(exploreContainerClass) {
    const exploreContainer = document.querySelector(exploreContainerClass);
    const exploreHeader = document.createElement('h1');
    const exploreForm = document.createElement('form');
    const exploreTitle = document.createElement('h3');
    const firstNameLabel = document.createElement('label');
    const firstNameInput = document.createElement('input');
    const lastNameLabel = document.createElement('label');
    const lastNameInput = document.createElement('input');
    const emailLabel = document.createElement('label');
    const emailInput = document.createElement('input');
    const phoneLabel = document.createElement('label');
    const phoneInput = document.createElement('input');
    const suggestionTypeLabel = document.createElement('h3');
    const suggestionTypeSiteLabel = document.createElement('label');
    const suggestionTypeSiteInput = document.createElement('input');
    const suggestionTypeSiteSpan = document.createElement('span');
    const suggestionTypeFoodLabel = document.createElement('label');
    const suggestionTypeFoodInput = document.createElement('input');
    const suggestionTypeFoodSpan = document.createElement('span');
    const suggestionTypeAttractionLabel = document.createElement('label');
    const suggestionTypeAttractionInput = document.createElement('input');
    const suggestionTypeAttractionSpan = document.createElement('span');
    const suggestionLabel = document.createElement('label');
    const suggestionInput = document.createElement('textarea');
    const timestampLabel = document.createElement('label');
    const timestampInput = document.createElement('input');
    const submitInput = document.createElement('input');
    exploreTitle.classList.add('exploreTitle');
    exploreTitle.textContent="Explore Peru Suggestion Form";
    firstNameInput.classList.add('firstNameInput');
    firstNameInput.classList.add('input');
    firstNameInput.type = "text";
    firstNameInput.name = "first";
    firstNameInput.required = true;
    firstNameInput.autocomplete="given-name";
    firstNameInput.title="Your First Name";
    firstNameLabel.classList.add('firstNameLabel');
    firstNameLabel.classList.add('label');
    firstNameLabel.textContent = "First Name ";
    firstNameLabel.appendChild(firstNameInput);
    lastNameInput.classList.add('lastNameInput');
    lastNameInput.classList.add('input');
    lastNameInput.type = "text";
    lastNameInput.name = "last";
    lastNameInput.required = true;
    lastNameInput.autocomplete="family-name";
    lastNameInput.title="Your Last Name";
    lastNameLabel.classList.add('lastNameLabel');
    lastNameLabel.classList.add('label');
    lastNameLabel.textContent = "Last Name ";
    lastNameLabel.appendChild(lastNameInput);
    emailInput.classList.add('emailInput');
    emailInput.classList.add('input');
    emailInput.type = "email";
    emailInput.name = "email";
    emailInput.required = true;
    emailInput.placeholder="john89@gmail.com";
    emailInput.autocomplete="email";
    emailInput.title="Your Email";
    emailLabel.classList.add('emailLabel');
    emailLabel.classList.add('label');
    emailLabel.textContent = "Email ";
    emailLabel.appendChild(emailInput);
    phoneInput.classList.add('phoneInput');
    phoneInput.classList.add('input');
    phoneInput.type = "tel";
    phoneInput.name = "phone";
    phoneInput.required = true;
    phoneInput.placeholder="987-555-1234";
    phoneInput.autocomplete="tel";
    phoneInput.title="A Phone Number with dashes";
    phoneLabel.classList.add('phoneLabel');
    phoneLabel.classList.add('label');
    phoneLabel.textContent = "Mobile Phone ";
    phoneLabel.appendChild(phoneInput);
    suggestionTypeLabel.classList.add('suggestionTypeLabel');
    suggestionTypeLabel.classList.add('radio-label');
    suggestionTypeLabel.textContent = "Select Type of Suggestion";
    suggestionTypeSiteInput.classList.add('suggestionTypeSiteInput');
    suggestionTypeSiteInput.classList.add('input');
    suggestionTypeSiteInput.type = "radio";
    suggestionTypeSiteInput.name = "suggestionType";
    suggestionTypeSiteInput.value = "site";
    suggestionTypeSiteInput.checked = true;
    suggestionTypeSiteSpan.textContent = " Site";
    suggestionTypeSiteSpan.classList.add('suggestionTypeSiteSpan');
    suggestionTypeSiteLabel.classList.add('suggestionTypeSiteLabel');
    suggestionTypeSiteLabel.classList.add('radio-label');
    suggestionTypeSiteLabel.appendChild(suggestionTypeSiteInput);
    suggestionTypeSiteLabel.appendChild(suggestionTypeSiteSpan);
    suggestionTypeFoodInput.classList.add('suggestionTypeFoodInput');
    suggestionTypeFoodInput.classList.add('input');
    suggestionTypeFoodInput.type = "radio";
    suggestionTypeFoodInput.name = "suggestionType";
    suggestionTypeFoodInput.value = "food";
    suggestionTypeFoodInput.checked = false;
    suggestionTypeFoodSpan.textContent = " Food";
    suggestionTypeFoodSpan.classList.add('suggestionTypeFoodSpan');
    suggestionTypeFoodLabel.classList.add('suggestionTypeFoodLabel');
    suggestionTypeFoodLabel.classList.add('radio-label');
    suggestionTypeFoodLabel.appendChild(suggestionTypeFoodInput);
    suggestionTypeFoodLabel.appendChild(suggestionTypeFoodSpan);
    suggestionTypeAttractionInput.classList.add('suggestionTypeAttractionInput');
    suggestionTypeAttractionInput.classList.add('input');
    suggestionTypeAttractionInput.type = "radio";
    suggestionTypeAttractionInput.name = "suggestionType";
    suggestionTypeAttractionInput.value = "attraction";
    suggestionTypeAttractionInput.checked = false;
    suggestionTypeAttractionSpan.textContent = " Attraction";
    suggestionTypeAttractionSpan.classList.add('suggestionTypeAttractionSpan');
    suggestionTypeAttractionLabel.classList.add('suggestionTypeAttractionLabel');
    suggestionTypeAttractionLabel.classList.add('radio-label');
    suggestionTypeAttractionLabel.classList.add('last-radio-label');
    suggestionTypeAttractionLabel.appendChild(suggestionTypeAttractionInput);
    suggestionTypeAttractionLabel.appendChild(suggestionTypeAttractionSpan);
    suggestionInput.classList.add('suggestionInput');
    suggestionInput.classList.add('textarea');
    suggestionInput.name = "suggestion";
    suggestionInput.required = true;
    suggestionInput.rows="5"
    suggestionInput.cols="30"
    suggestionInput.placeholder="Enter your suggestion details here..."
    suggestionInput.title="Describe your suggestion";
    suggestionLabel.classList.add('suggestionLabel');
    suggestionLabel.classList.add('label');
    suggestionLabel.textContent = "Description ";
    suggestionLabel.appendChild(suggestionInput);
    timestampInput.classList.add('timestamp');
    timestampInput.id = "timestamp";
    timestampInput.type = "hidden";
    timestampInput.name = "timestamp";
    timestampInput.value = Date.now();
    timestampLabel.textContent = "";
    timestampLabel.appendChild(timestampInput);
    submitInput.classList.add('submitInput');
    submitInput.classList.add('input');
    submitInput.type = "submit";
    submitInput.value = "Suggest your Idea";
    exploreForm.method="GET";
    exploreForm.action="thankyou.html";
    exploreForm.classList.add('exploreForm');
    exploreForm.appendChild(exploreTitle);
    exploreForm.appendChild(firstNameLabel);
    exploreForm.appendChild(lastNameLabel);
    exploreForm.appendChild(emailLabel);
    exploreForm.appendChild(phoneLabel);
    exploreForm.appendChild(suggestionTypeLabel);
    exploreForm.appendChild(suggestionTypeSiteLabel);
    exploreForm.appendChild(suggestionTypeFoodLabel);
    exploreForm.appendChild(suggestionTypeAttractionLabel);
    exploreForm.appendChild(suggestionLabel);
    exploreForm.appendChild(timestampLabel);
    exploreForm.appendChild(submitInput);
    exploreHeader.classList.add('exploreHeader');
    exploreHeader.classList.add('science-gothic-regular');
    exploreHeader.textContent = 'Explore';
    if(exploreContainer !== null) {
        exploreContainer.appendChild(exploreHeader);
        exploreContainer.appendChild(exploreForm);
    }
}
export function DisplayThankyouInformation(thankyouContainerClass) {
    const thankyouContainer = document.querySelector(thankyouContainerClass);
    thankyouContainer.classList.add('thankyouContainer');
    const thankyouHeader = document.createElement('h1');
    thankyouHeader.classList.add('thankyouHeader');
    thankyouHeader.textContent = "Thankyou";
    const thankyouContent = document.createElement('div');
    thankyouContent.classList.add('thankyouContent');
    const thankyouMessage = document.createElement('p');
    thankyouMessage.classList.add('thankyouMessage');
    thankyouMessage.textContent = "Thankyou for your submission, please review for accuracy and a member of our team will be in contact with you to discuss your suggestion."
    thankyouContent.appendChild(thankyouMessage);
    if(HasParameter('first')) {
        const firstNameLabel = document.createElement('span');
        firstNameLabel.classList.add('firstNameLabel');
        firstNameLabel.classList.add('thankyouLabel');
        firstNameLabel.textContent = "First Name:"
        const firstNameSpan = document.createElement('span');
        firstNameSpan.classList.add('firstNameSpan');
        firstNameSpan.classList.add('thankyouSpan');
        firstNameSpan.textContent = GetParameter('first');
        const firstName = document.createElement('p');
        firstName.classList.add('firstName');
        firstName.classList.add('thankyouField');
        firstName.appendChild(firstNameLabel);
        firstName.appendChild(firstNameSpan);
        thankyouContent.appendChild(firstName);
    }
    if(HasParameter('last')) {
        const lastNameLabel = document.createElement('span');
        lastNameLabel.classList.add('lastNameLabel');
        lastNameLabel.classList.add('thankyouLabel');
        lastNameLabel.textContent = "Last Name:"
        const lastNameSpan = document.createElement('span');
        lastNameSpan.classList.add('lastNameSpan');
        lastNameSpan.classList.add('thankyouSpan');
        lastNameSpan.textContent = GetParameter('last');
        const lastName = document.createElement('p');
        lastName.classList.add('lastName');
        lastName.classList.add('thankyouField');
        lastName.appendChild(lastNameLabel);
        lastName.appendChild(lastNameSpan);
        thankyouContent.appendChild(lastName);
    }
    if(HasParameter('email')) {
        const emailNameLabel = document.createElement('span');
        emailNameLabel.classList.add('emailLabel');
        emailNameLabel.classList.add('thankyouLabel');
        emailNameLabel.textContent = "Email:"
        const emailNameSpan = document.createElement('span');
        emailNameSpan.classList.add('emailSpan');
        emailNameSpan.classList.add('thankyouSpan');
        emailNameSpan.textContent = GetParameter('email');
        const emailName = document.createElement('p');
        emailName.classList.add('email');
        emailName.classList.add('thankyouField');
        emailName.appendChild(emailNameLabel);
        emailName.appendChild(emailNameSpan);
        thankyouContent.appendChild(emailName);
    }
    if(HasParameter('phone')) {
        const phoneNameLabel = document.createElement('span');
        phoneNameLabel.classList.add('phoneLabel');
        phoneNameLabel.classList.add('thankyouLabel');
        phoneNameLabel.textContent = "Phone:"
        const phoneNameSpan = document.createElement('span');
        phoneNameSpan.classList.add('phoneSpan');
        phoneNameSpan.classList.add('thankyouSpan');
        phoneNameSpan.textContent = GetParameter('phone');
        const phoneName = document.createElement('p');
        phoneName.classList.add('phone');
        phoneName.classList.add('thankyouField');
        phoneName.appendChild(phoneNameLabel);
        phoneName.appendChild(phoneNameSpan);
        thankyouContent.appendChild(phoneName);
    }
    if(HasParameter('suggestionType')) {
        const suggestionTypeNameLabel = document.createElement('span');
        suggestionTypeNameLabel.classList.add('suggestionTypeLabel');
        suggestionTypeNameLabel.classList.add('thankyouLabel');
        suggestionTypeNameLabel.textContent = "Suggestion Type:"
        const suggestionTypeNameSpan = document.createElement('span');
        suggestionTypeNameSpan.classList.add('suggestionTypeSpan');
        suggestionTypeNameSpan.classList.add('thankyouSpan');
        suggestionTypeNameSpan.textContent = GetParameter('suggestionType');
        const suggestionTypeName = document.createElement('p');
        suggestionTypeName.classList.add('suggestionType');
        suggestionTypeName.classList.add('thankyouField');
        suggestionTypeName.appendChild(suggestionTypeNameLabel);
        suggestionTypeName.appendChild(suggestionTypeNameSpan);
        thankyouContent.appendChild(suggestionTypeName);
    }
    if(HasParameter('suggestion')) {
        const suggestionNameLabel = document.createElement('span');
        suggestionNameLabel.classList.add('suggestionLabel');
        suggestionNameLabel.classList.add('thankyouLabel');
        suggestionNameLabel.textContent = "Suggestion:"
        const suggestionNameSpan = document.createElement('span');
        suggestionNameSpan.classList.add('suggestionSpan');
        suggestionNameSpan.classList.add('thankyouSpan');
        suggestionNameSpan.textContent = GetParameter('suggestion');
        const suggestionName = document.createElement('p');
        suggestionName.classList.add('suggestion');
        suggestionName.classList.add('thankyouField');
        suggestionName.appendChild(suggestionNameLabel);
        suggestionName.appendChild(suggestionNameSpan);
        thankyouContent.appendChild(suggestionName);
    }
    if(HasParameter('timestamp')) {
        const timestampNameLabel = document.createElement('span');
        timestampNameLabel.classList.add('timestampLabel');
        timestampNameLabel.classList.add('thankyouLabel');
        timestampNameLabel.textContent = "Date and Time of submission:"
        const timestampNameSpan = document.createElement('span');
        timestampNameSpan.classList.add('timestampSpan');
        timestampNameSpan.classList.add('thankyouSpan');
        const timestampIn = parseInt(GetParameter('timestamp'), 10);
        timestampNameSpan.textContent = new Date(timestampIn);
        const timestampName = document.createElement('p');
        timestampName.classList.add('timestamp');
        timestampName.classList.add('thankyouField');
        timestampName.appendChild(timestampNameLabel);
        timestampName.appendChild(timestampNameSpan);
        thankyouContent.appendChild(timestampName);
    }
    if(thankyouContainer !== null) {
        thankyouContainer.appendChild(thankyouHeader);
        thankyouContainer.appendChild(thankyouContent);
    }
}