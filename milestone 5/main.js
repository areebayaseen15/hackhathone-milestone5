var resumeForm = document.getElementById('resumeForm');
var resumeSection = document.getElementById('resume');
var editButton = document.getElementById('editButton');
var isEditing = false;
resumeForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!isEditing) {
        // Generate resume
        var resumeData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            whatsapp: document.getElementById('whatsapp').value,
            email: document.getElementById('email').value,
            linkdin: document.getElementById('linkdin').value,
            qualifications: document.getElementById('qualifications').value,
            courses: document.getElementById('courses').value,
            skills: document.getElementById('skills').value,
            profession: document.getElementById('profession').value,
            experience: document.getElementById('experience').value,
            summary: document.getElementById('summary').value,
        };
        displayResume(resumeData);
    }
});
function displayResume(data) {
    var resumeHTML = "\n        <h2>Personal Details</h2>\n        <p><strong>Name:</strong> <span>".concat(data.name, "</span></p>\n        <p><strong>Contact Number:</strong> <span>").concat(data.phone, "</span></p>\n        <p><strong>WhatsApp:</strong> <span>").concat(data.whatsapp, "</span></p>\n        <p><strong>Email:</strong> <span>").concat(data.email, "</span></p>\n        <p><strong>LinkedIn:</strong> <span>").concat(data.linkdin, "</span></p>\n      \n        <h2>Education</h2>\n        <p><strong>Qualification:</strong> <span>").concat(data.qualifications, "</span></p>\n        <p><strong>Courses:</strong> <span>").concat(data.courses, "</span></p>\n\n        <h2>Skills</h2>\n        <p><strong>Your Skills:</strong> <span>").concat(data.skills, "</span></p>\n\n        <h2>Profession</h2>\n        <p><strong>Profession:</strong> <span>").concat(data.profession, "</span></p>\n\n        <h2>Work Experience</h2>\n        <p><strong>Experience:</strong> <span>").concat(data.experience, "</span></p>\n\n        <h2>Summary</h2>\n        <p><strong>Summary:</strong> <span>").concat(data.summary, "</span></p>\n      \n        <div>\n            <button id=\"shareButton\">Share Resume</button>\n            <button id=\"downloadButton\">Download Resume</button>\n        </div>\n    ");
    resumeSection.innerHTML = resumeHTML;
    toggleFormElements(true);
    // Add event listeners for the new buttons
    var shareButton = document.getElementById('shareButton');
    var downloadButton = document.getElementById('downloadButton');
    shareButton.addEventListener('click', function () {
        shareResume(data);
    });
    downloadButton.addEventListener('click', function () {
        downloadResume(data);
    });
}
function toggleFormElements(disable) {
    var inputs = resumeForm.querySelectorAll('input, select, textarea');
    inputs.forEach(function (input) {
        input.disabled = disable;
    });
}
function saveChanges() {
    toggleFormElements(true);
    editButton.textContent = 'Edit';
    isEditing = false;
}
editButton.addEventListener('click', function () {
    isEditing = !isEditing;
    if (isEditing) {
        toggleFormElements(false);
        editButton.textContent = 'Save';
    }
    else {
        resumeForm.dispatchEvent(new Event('submit'));
        saveChanges();
    }
});
function shareResume(data) {
    var resumeText = "\n        Personal Details\n        Name: ".concat(data.name, "\n        Contact Number: ").concat(data.phone, "\n        WhatsApp: ").concat(data.whatsapp, "\n        Email: ").concat(data.email, "\n        LinkedIn: ").concat(data.linkdin, "\n\n        Education\n        Qualification: ").concat(data.qualifications, "\n        Courses: ").concat(data.courses, "\n\n        Skills\n        Your Skills: ").concat(data.skills, "\n\n        Profession\n        Profession: ").concat(data.profession, "\n\n        Work Experience\n        Experience: ").concat(data.experience, "\n\n        Summary\n        Summary: ").concat(data.summary, "\n    ");
    // Replace this URL with your own
    var customURL = 'https://hackatone-milestone1.vercel.app/';
    if (navigator.share) {
        navigator.share({
            title: 'My Resume',
            text: resumeText,
            url: customURL
        }).catch(function (error) { return console.log('Error sharing', error); });
    }
    else {
        // Fallback to copying text to clipboard
        navigator.clipboard.writeText(resumeText)
            .then(function () { return alert('Resume copied to clipboard!'); })
            .catch(function (error) { return console.log('Error copying text', error); });
    }
}
function downloadResume(data) {
    var resumeText = "\n        Personal Details\n        Name: ".concat(data.name, "\n        Contact Number: ").concat(data.phone, "\n        WhatsApp: ").concat(data.whatsapp, "\n        Email: ").concat(data.email, "\n        LinkedIn: ").concat(data.linkdin, "\n\n        Education\n        Qualification: ").concat(data.qualifications, "\n        Courses: ").concat(data.courses, "\n\n        Skills\n        Your Skills: ").concat(data.skills, "\n\n        Profession\n        Profession: ").concat(data.profession, "\n\n        Work Experience\n        Experience: ").concat(data.experience, "\n\n        Summary\n        Summary: ").concat(data.summary, "\n    ");
    var blob = new Blob([resumeText], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'resume.txt'; // Change this to '.pdf' if you prefer PDF format
    link.click();
    URL.revokeObjectURL(url);
}
