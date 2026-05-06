const allButton = document.querySelector('#all-btn');
const cseButton = document.querySelector('#cse-btn');
const wddButton = document.querySelector('#wdd-btn');
let curButton = document.querySelector('.current-btn');
const dataContainer = document.querySelector('#courses-data-div');
const courseAmountText = document.querySelector('.course-amount-text');
const courseCreditTotal = document.querySelector('.course-credit-total');

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]
const wddCourses = courses.filter(course => course.subject === 'WDD');
const cseCourses = courses.filter(course => course.subject === 'CSE');
const coursesCompleted = courses.filter(course => course.completed);
const wddCoursesCompleted = coursesCompleted.filter(course => course.subject === 'WDD');
const cseCoursesCompleted = coursesCompleted.filter(course => course.subject === 'CSE');
function courseCredit(courseArray) {
    return courseArray.reduce((total, course) => total + course.credits, 0);
}
function courseAmountTxt(courseArray) {
    const amount = courseArray.length;
    return amount === 1 ? 'course' : 'courses';
}
function displayCourses(courseArray, dataContainer) {
    if(dataContainer) {
        dataContainer.innerHTML = '';
        let col = 1;
        courseArray.forEach(course => {
            const courseCard = document.createElement("div");
            const courseParagraph = document.createElement("p");
            courseCard.classList.add("course-card");
            courseCard.classList.add(`col${col}`)
            courseParagraph.classList.add("course-title");
            if(course.completed) {
                courseCard.classList.add("completed-course")
                courseParagraph.classList.add("completed-course")
            }
            courseParagraph.textContent = `${course.subject} ${course.number}`;
            courseCard.appendChild(courseParagraph);
            courseCard.addEventListener('click',() => {
                displayCourseDetails(course);
            });
            dataContainer.appendChild(courseCard);
            col += 1;
            if (col > 3) col = 1;
        });
    }
}
courseAmountText.textContent = courseAmountTxt(coursesCompleted);
courseCreditTotal.textContent = courseCredit(coursesCompleted);
displayCourses(courses, dataContainer);

allButton.addEventListener('click', () => {
    curButton = document.querySelector('.current-btn');
    curButton.classList.toggle('current-btn');
    allButton.classList.toggle('current-btn');
    displayCourses(courses, dataContainer);
    courseAmountText.textContent = courseAmountTxt(coursesCompleted);
    courseCreditTotal.textContent = courseCredit(coursesCompleted);
});
cseButton.addEventListener('click', () => {
    curButton = document.querySelector('.current-btn');
    curButton.classList.toggle('current-btn');
    cseButton.classList.toggle('current-btn');
    displayCourses(cseCourses, dataContainer);
    courseAmountText.textContent = courseAmountTxt(cseCoursesCompleted);
    courseCreditTotal.textContent = courseCredit(cseCoursesCompleted);
});
wddButton.addEventListener('click', () => {
    curButton = document.querySelector('.current-btn');
    curButton.classList.toggle('current-btn');
    wddButton.classList.toggle('current-btn');
    displayCourses(wddCourses, dataContainer);
    courseAmountText.textContent = courseAmountTxt(wddCoursesCompleted);
    courseCreditTotal.textContent = courseCredit(wddCoursesCompleted);
});

function displayCourseDetails(course) {
    const backdrop = document.querySelector("#course-details-backdrop");
    const modal = document.createElement("dialog");
    backdrop.addEventListener('click', (e) => {
        if(e.target === modal) {
            e.stopPropagation();
            modal.close();
        }
    });
    modal.id = "course-details";
    modal.classList.add("courseDetailsDialog");
    modal.innerHTML='';
    const closeButton = document.createElement("button");
    closeButton.textContent='❌';
    closeButton.classList.add("courseDetailsModalCloseButton");
    closeButton.addEventListener('click', () => {
        modal.close();
    });
    const subjectAndNumber = document.createElement("h2");
    subjectAndNumber.classList.add("courseDetailsModalSubjectAndNumber");
    subjectAndNumber.textContent = `${course.subject} ${course.number}`;
    const title = document.createElement("h3");
    title.classList.add("courseDetailsModalTitle");
    title.textContent=`${course.title}`;
    const credits = document.createElement("p");
    const creditsLabel = document.createElement("strong");
    const creditsNumeric = document.createElement("span");
    credits.classList.add("courseDetailsModalCredits");
    creditsLabel.classList.add("courseDetailsModalCreditsLabel");
    creditsNumeric.classList.add("courseDetailsModalCreditsNumeric");
    creditsLabel.textContent = "Credits";
    creditsNumeric.textContent=`: ${course.credits}`;
    credits.appendChild(creditsLabel);
    credits.appendChild(creditsNumeric);
    const certificate = document.createElement("p");
    const certificateLabel = document.createElement("strong");
    const certificateText = document.createElement("span");
    certificate.classList.add("courseDetailsModalCertificate");
    certificateLabel.classList.add("courseDetailsModalCertificateLabel");
    certificateText.classList.add("courseDetailsModalCertificateText");
    certificateLabel.textContent = "Certificate";
    certificateText.textContent=`: ${course.certificate}`;
    certificate.appendChild(certificateLabel);
    certificate.appendChild(certificateText);
    const description = document.createElement("p");
    description.classList.add("courseDetailsModalDescription");
    description.textContent=`${course.description}`;
    const techStack = document.createElement("p");
    const techStackLabel = document.createElement("strong");
    const techStackText = document.createElement("span");
    techStack.classList.add("courseDetailsModalTechnologyStack");
    techStackLabel.classList.add("courseDetailsModalTechnologyStackLabel");
    techStackText.classList.add("courseDetailsModalTechnologyStackText");
    techStackLabel.textContent = "Technologies";
    techStackText.textContent=`: ${course.technology.join(', ')}`;
    techStack.appendChild(techStackLabel);
    techStack.appendChild(techStackText);
    modal.appendChild(subjectAndNumber);
    modal.appendChild(title);
    modal.appendChild(credits);
    modal.appendChild(description);
    modal.appendChild(certificate);
    modal.appendChild(techStack);
    modal.appendChild(closeButton);
    backdrop.appendChild(modal);
    modal.showModal();
}

