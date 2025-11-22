import { HasParameter, GetParameter } from "./preference.mjs";
import { fetchMembershipLevelData } from "./directory.mjs";
    
export async function DisplayJoinInformation(joinContentClass, joinFormClass, joinFormTimestampClass, thankyouContentClass) {
    const joinContentContainer = document.querySelector(joinContentClass);
    const joinFormContainer = document.querySelector(joinFormClass);
    const joinFormTimestampContainer = document.querySelector(joinFormTimestampClass);
    const thankyouContentContainer = document.querySelector(thankyouContentClass);
    if(joinContentContainer) {
        const orgTitleInput = document.querySelector('.orgTitle');
        const orgTitleRegEx = new RegExp("^[a-zA-Z \\-]{7,}$");
        orgTitleInput.pattern = orgTitleRegEx.source;
        orgTitleInput.addEventListener('focusout',()=>{
            if(orgTitleInput.value!=="") {
                if(!orgTitleRegEx.test(orgTitleInput.value)) {
                    /*alert('Organization title must have a minimum of 7 alpha characters inclusing spaces and dashes!');*/
                    orgTitleInput.value = '';
                }
            }
        });
        joinFormTimestampContainer.value = Date.now();
        const membershipLevels = document.createElement('div');
        membershipLevels.classList.add('membershipLevels');
        const membershipLevelsHeader = document.createElement('h3');
        membershipLevelsHeader.textContent = 'Membership Levels';
        membershipLevelsHeader.classList.add('membershipLevelsHeader');
        membershipLevels.appendChild(membershipLevelsHeader);
        joinContentContainer.appendChild(membershipLevels);
        fetchMembershipLevelData(membershipLevels);
    } else if(thankyouContentContainer) {
        const firstName = GetParameter('first','',true);
        const lastName = GetParameter('last','',true);
        const title = GetParameter('title','',false);
        const organization = GetParameter('organization','',true);
        const email = GetParameter('email','',true);
        const phone = GetParameter('phone','',true);
        const membership = GetParameter('membership','',true);
        const description = GetParameter('description','',false);
        const timestamp = Date(GetParameter('timestamp','',true)).toLocaleString();
        const salutation = document.createElement('p');
        const salutationAddress = document.createElement('span');
        const orgSalutationAddress = document.createElement('span');
        const completeSalutation = document.createElement('span');
        const name = document.createElement('strong');
        const organizationName = document.createElement('strong');
        const ask = document.createElement('p');
        const firstNameDisplay = document.createElement('p');
        const firstNameLabel = document.createElement('strong');
        const firstNameContent = document.createElement('span');
        const lastNameDisplay = document.createElement('p');
        const lastNameLabel = document.createElement('strong');
        const lastNameContent = document.createElement('span');
        const titleDisplay = document.createElement('p');
        const titleLabel = document.createElement('strong');
        const titleContent = document.createElement('span');
        const organizationNameDisplay = document.createElement('p');
        const organizationNameLabel = document.createElement('strong');
        const organizationNameContent = document.createElement('span');
        const emailDisplay = document.createElement('p');
        const emailLabel = document.createElement('strong');
        const emailContent = document.createElement('span');
        const phoneDisplay = document.createElement('p');
        const phoneLabel = document.createElement('strong');
        const phoneContent = document.createElement('span');
        const membershipDisplay = document.createElement('p');
        const membershipLabel = document.createElement('strong');
        const membershipContent = document.createElement('span');
        const descriptionDisplay = document.createElement('p');
        const descriptionLabel = document.createElement('strong');
        const descriptionContent = document.createElement('span');
        const timestampDisplay = document.createElement('p');
        const timestampLabel = document.createElement('strong');
        const timestampContent = document.createElement('span');
        const completeDisplay = document.createElement('p');
        name.textContent=`${firstName} ${lastName}`;
        organizationName.textContent=`${organization}`;
        salutationAddress.textContent = 'Thankyou ';
        salutationAddress.appendChild(name);
        orgSalutationAddress.textContent = ' for your application to join ';
        orgSalutationAddress.appendChild(organizationName);
        completeSalutation.textContent = ' to the Simpsonville, SC Chamber of Commerse.';
        salutation.appendChild(salutationAddress);
        salutation.appendChild(orgSalutationAddress);
        salutation.appendChild(completeSalutation);
        salutation.classList.add('confirmSalutation');
        ask.textContent = 'Please review the following summary for accuracy, and bring up any discrepancies when we contact you.';
        ask.classList.add('confirmAsk');
        firstNameLabel.textContent = 'First Name';
        firstNameContent.textContent = `: ${firstName}`;
        firstNameDisplay.appendChild(firstNameLabel);
        firstNameDisplay.appendChild(firstNameContent);
        firstNameDisplay.classList.add('confirmDataItem');
        firstNameDisplay.classList.add('confirmFirstName');
        lastNameLabel.textContent = 'Last Name';
        lastNameContent.textContent = `: ${lastName}`;
        lastNameDisplay.appendChild(lastNameLabel);
        lastNameDisplay.appendChild(lastNameContent);
        lastNameDisplay.classList.add('confirmDataItem');
        lastNameDisplay.classList.add('confirmLastName');
        titleLabel.textContent = 'Title';
        titleContent.textContent = `: ${title}`;
        titleDisplay.appendChild(titleLabel);
        titleDisplay.appendChild(titleContent);
        titleDisplay.classList.add('confirmDataItem');
        titleDisplay.classList.add('confirmApplicantTitle');
        organizationNameLabel.textContent = 'Organization Name';
        organizationNameContent.textContent = `: ${organization}`;
        organizationNameDisplay.appendChild(organizationNameLabel);
        organizationNameDisplay.appendChild(organizationNameContent);
        organizationNameDisplay.classList.add('confirmDataItem');
        organizationNameDisplay.classList.add('confirmOrganizationName');
        emailLabel.textContent = 'Email';
        emailContent.textContent = `: ${email}`;
        emailDisplay.appendChild(emailLabel);
        emailDisplay.appendChild(emailContent);
        emailDisplay.classList.add('confirmDataItem');
        emailDisplay.classList.add('confirmEmail');
        phoneLabel.textContent = 'Phone';
        phoneContent.textContent = `: ${phone}`;
        phoneDisplay.appendChild(phoneLabel);
        phoneDisplay.appendChild(phoneContent);
        phoneDisplay.classList.add('confirmDataItem');
        phoneDisplay.classList.add('confirmPhone');
        membershipLabel.textContent = 'Membership';
        membershipContent.textContent = `: ${membership}`;
        membershipDisplay.appendChild(membershipLabel);
        membershipDisplay.appendChild(membershipContent);
        membershipDisplay.classList.add('confirmDataItem');
        membershipDisplay.classList.add('confirmMembership');
        descriptionLabel.textContent = 'Description';
        descriptionContent.textContent = `: ${description}`;
        descriptionDisplay.appendChild(descriptionLabel);
        descriptionDisplay.appendChild(descriptionContent);
        descriptionDisplay.classList.add('confirmDataItem');
        descriptionDisplay.classList.add('confirmDescription');
        timestampLabel.textContent = 'Application Received';
        timestampContent.textContent = `: ${timestamp}`;
        timestampDisplay.appendChild(timestampLabel);
        timestampDisplay.appendChild(timestampContent);
        timestampDisplay.classList.add('confirmDataItem');
        timestampDisplay.classList.add('confirmTimestamp');
        completeDisplay.textContent='A representative of the Simpsonville, SC Chamber of commerse will be in contact with you as soon as reasonablely possible.';        
        completeDisplay.classList.add('confirmLastWords');
        thankyouContentContainer.appendChild(salutation);
        thankyouContentContainer.appendChild(ask);
        thankyouContentContainer.appendChild(firstNameDisplay);
        thankyouContentContainer.appendChild(lastNameDisplay);
        if(HasParameter('title') && title !== '' ) {
            thankyouContentContainer.appendChild(titleDisplay);
        }
        thankyouContentContainer.appendChild(organizationNameDisplay);
        thankyouContentContainer.appendChild(emailDisplay);
        thankyouContentContainer.appendChild(phoneDisplay);
        thankyouContentContainer.appendChild(membershipDisplay);
        if(HasParameter('description') && description !== '' ) {
            thankyouContentContainer.appendChild(descriptionDisplay);
        }
        thankyouContentContainer.appendChild(timestampDisplay);
        thankyouContentContainer.appendChild(completeDisplay);        
    }
}