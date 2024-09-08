
// TypeScript interface to structure user data
interface ResumeData {
    name: string;
    phone: string;
    whatsapp: string;
    email: string;
    linkdin: string;
    qualifications: string;
    courses: string;
    skills: string;
    profession: string;
    experience: string;
    summary: string;
}

const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const resumeSection = document.getElementById('resume') as HTMLElement;
const editButton = document.getElementById('editButton') as HTMLButtonElement;

let isEditing = false;

resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!isEditing) {
        // Generate resume
        const resumeData: ResumeData = {
            name: (document.getElementById('name') as HTMLInputElement).value,
            phone: (document.getElementById('phone') as HTMLInputElement).value,
            whatsapp: (document.getElementById('whatsapp') as HTMLInputElement).value,
            email: (document.getElementById('email') as HTMLInputElement).value,
            linkdin: (document.getElementById('linkdin') as HTMLInputElement).value,
            qualifications: (document.getElementById('qualifications') as HTMLSelectElement).value,
            courses: (document.getElementById('courses') as HTMLInputElement).value,
            skills: (document.getElementById('skills') as HTMLInputElement).value,
            profession: (document.getElementById('profession') as HTMLInputElement).value,
            experience: (document.getElementById('experience') as HTMLTextAreaElement).value,
            summary: (document.getElementById('summary') as HTMLTextAreaElement).value,
        };

        displayResume(resumeData);
    }
});

function displayResume(data: ResumeData) {
    const resumeHTML = `
        <h2>Personal Details</h2>
        <p><strong>Name:</strong> <span>${data.name}</span></p>
        <p><strong>Contact Number:</strong> <span>${data.phone}</span></p>
        <p><strong>WhatsApp:</strong> <span>${data.whatsapp}</span></p>
        <p><strong>Email:</strong> <span>${data.email}</span></p>
        <p><strong>LinkedIn:</strong> <span>${data.linkdin}</span></p>
      
        <h2>Education</h2>
        <p><strong>Qualification:</strong> <span>${data.qualifications}</span></p>
        <p><strong>Courses:</strong> <span>${data.courses}</span></p>

        <h2>Skills</h2>
        <p><strong>Your Skills:</strong> <span>${data.skills}</span></p>

        <h2>Profession</h2>
        <p><strong>Profession:</strong> <span>${data.profession}</span></p>

        <h2>Work Experience</h2>
        <p><strong>Experience:</strong> <span>${data.experience}</span></p>

        <h2>Summary</h2>
        <p><strong>Summary:</strong> <span>${data.summary}</span></p>
      
        <div>
            <button id="shareButton">Share Resume</button>
            <button id="downloadButton">Download Resume</button>
        </div>
    `;

    resumeSection.innerHTML = resumeHTML;
    toggleFormElements(true); 

    // Add event listeners for the new buttons
    const shareButton = document.getElementById('shareButton') as HTMLButtonElement;
    const downloadButton = document.getElementById('downloadButton') as HTMLButtonElement;
    
    shareButton.addEventListener('click', () => {
        shareResume(data);
    });

    downloadButton.addEventListener('click', () => {
        downloadResume(data);
    });
}

function toggleFormElements(disable: boolean) {
    const inputs = resumeForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        (input as HTMLInputElement).disabled = disable;
    });
}

function saveChanges() {
    toggleFormElements(true); 
    editButton.textContent = 'Edit';
    isEditing = false;
}

editButton.addEventListener('click', () => {
    isEditing = !isEditing;
    
    if (isEditing) {
        toggleFormElements(false);
        editButton.textContent = 'Save';
    } else {
        resumeForm.dispatchEvent(new Event('submit'));
        saveChanges();
    }
});

function shareResume(data: ResumeData) {
    const resumeText = `
        Personal Details
        Name: ${data.name}
        Contact Number: ${data.phone}
        WhatsApp: ${data.whatsapp}
        Email: ${data.email}
        LinkedIn: ${data.linkdin}

        Education
        Qualification: ${data.qualifications}
        Courses: ${data.courses}

        Skills
        Your Skills: ${data.skills}

        Profession
        Profession: ${data.profession}

        Work Experience
        Experience: ${data.experience}

        Summary
        Summary: ${data.summary}
    `;

    //  URL 
    const customURL = 'https://hackatone-milestone1.vercel.app/';

    if (navigator.share) {
        navigator.share({
            title: 'My Resume',
            text: resumeText,
            url: customURL
        }).catch(error => console.log('Error sharing', error));
    } else {
        
        navigator.clipboard.writeText(resumeText)
            .then(() => alert('Resume copied to clipboard!'))
            .catch(error => console.log('Error copying text', error));
    }
}

function downloadResume(data: ResumeData) {
    const resumeText = `
        Personal Details
        Name: ${data.name}
        Contact Number: ${data.phone}
        WhatsApp: ${data.whatsapp}
        Email: ${data.email}
        LinkedIn: ${data.linkdin}

        Education
        Qualification: ${data.qualifications}
        Courses: ${data.courses}

        Skills
        Your Skills: ${data.skills}

        Profession
        Profession: ${data.profession}

        Work Experience
        Experience: ${data.experience}

        Summary
        Summary: ${data.summary}
    `;
    
    const blob = new Blob([resumeText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.txt'; // Change this to '.pdf' if you prefer PDF format
    link.click();
    URL.revokeObjectURL(url);
}
