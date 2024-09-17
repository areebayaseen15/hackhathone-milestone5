var _a;
var resumeForm = document.getElementById("resumeForm");
var resumeSection = document.getElementById("resume");
var editButton = document.getElementById("editButton");
var isEditing = false;
var imageUrl;
// Handle the image upload and convert to Base64
(_a = document.getElementById('profile-image')) === null || _a === void 0 ? void 0 : _a.addEventListener('change', function (event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            imageUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Store Base64 encoded image URL
        };
        reader.readAsDataURL(file); // Convert image to Base64
    }
});
resumeForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!isEditing) {
        // Generate resume
        var resumeData = {
            name: document.getElementById("name").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value,
            email: document.getElementById("email").value,
            linkdin: document.getElementById("linkdin").value,
            github: document.getElementById("github").value,
            qualifications: document.getElementById("qualifications").value,
            courses: document.getElementById("courses").value,
            skills: document.getElementById("skills").value,
            profession: document.getElementById("profession")
                .value,
            experience: document.getElementById("experience")
                .value,
            profile: document.getElementById("profile")
                .value,
            profileImage: imageUrl || "", // Use the uploaded image URL
        };
        displayResume(resumeData);
    }
});
function displayResume(data) {
    var resumeHTML = "\n       <div class=\"container\">\n        <!-- sidebar -->\n        <div class=\"sidebar\">\n            <div class=\"profile-image\">\n         <img src=\"".concat(data.profileImage, "\" alt=\"").concat(data.name, "\">\n                </div>\n            \n            <div class=\"profile-info\">\n                <h3>Profile</h3>\n                <ul>\n                    <p>").concat(data.profile, "</p>\n                </ul>\n            </div>\n\n            <div class=\"contact-info\">\n                <h3>Contact Me</h3>\n                <p><i class=\"fa fa-phone\"></i>").concat(data.phone, "</p>\n                <p><i class=\"fa fa-envelope\"></i>").concat(data.email, "</p>\n                <p><i class=\"fa fa-map-marker\"></i>").concat(data.linkdin, "</p>\n            </div>\n\n            <div class=\"social-info\">\n                <h3>Professional Accounts</h3>\n                <p><strong>Github Account:</strong><br><a href=\"").concat(data.github, "\">").concat(data.github, "</a> </p>\n                <p><strong>LinkedIn Profile:</strong><br><a href=\"").concat(data.linkdin, "\">").concat(data.linkdin, "</a> </p>\n            </div>\n        </div>\n        <!-- Main section -->\n            <div class=\"main\">\n                <div class=\"name\">\n            <h1>").concat(data.name, "</h1>\n            <p>").concat(data.profession, "</p>\n                </div>\n                <div class=\"education\">\n                <h2>Education</h2>\n                    <ul>\n                <li>").concat(data.qualifications, "</li>\n            </ul>\n                </div>\n\n                <div class=\"Technical-courses\">\n                    <h2>Technical Courses</h2>\n                    <ul>\n                        <li>").concat(data.courses, "</li>\n                    </ul>\n                </div>\n\n                <div class=\"skills\" id=\"skills\">\n                    <h2>Technical Skills</h2>\n                    <ul>\n                        <li>").concat(data.skills, "</li>\n                    </ul>\n                </div>\n\n                <div class=\"experience\">\n                    <h2>Work Experience</h2>\n                    <ul>\n                     <li>").concat(data.experience, "</li></ul>\n                </div>\n\n                <div class=\"Reference\">\n                    <h2>Reference</h2>\n                    <p>Will be furnished upon request.</p>\n                </div>\n            </div>\n        </div>\n     <button id=\"shareButton\">Share Resume</button>\n     <button id=\"downloadButton\">Download Resume</button>\n    ");
    resumeSection.innerHTML = resumeHTML;
    toggleFormElements(true);
    var shareButton = document.getElementById("shareButton");
    var downloadButton = document.getElementById("downloadButton");
    shareButton.addEventListener("click", function () {
        shareResume(data);
    });
    downloadButton.addEventListener("click", function () {
        downloadResume();
    });
}
function toggleFormElements(disable) {
    var inputs = resumeForm.querySelectorAll("input, select, textarea");
    inputs.forEach(function (input) {
        input.disabled = disable;
    });
}
function saveChanges() {
    toggleFormElements(true);
    editButton.textContent = "Edit";
    isEditing = false;
}
editButton.addEventListener("click", function () {
    isEditing = !isEditing;
    if (isEditing) {
        toggleFormElements(false);
        editButton.textContent = "Save";
    }
    else {
        resumeForm.dispatchEvent(new Event("submit"));
        saveChanges();
    }
});
// Share the generated resume 
function shareResume(data) {
    var resumeText = "\n       Personal Details:\n      Name: ".concat(data.name, "\n      Profession: ").concat(data.profession, "\n      Profile: ").concat(data.profile, "\n      Contact: ").concat(data.phone, ", ").concat(data.email, "\n      LinkedIn: ").concat(data.linkdin, "\n      GitHub: ").concat(data.github, "\n        Qualification:\n      Education: ").concat(data.qualifications, "\n      technical Courses : ").concat(data.courses, "\n       Technical Skills:\n      Skills: ").concat(data.skills, "\n      Experience: ").concat(data.experience, "\n  ");
    if (navigator.share) {
        navigator
            .share({
            title: "My Resume",
            text: resumeText,
        })
            .catch(function (error) { return console.log("Error sharing", error); });
    }
    else {
        navigator.clipboard
            .writeText(resumeText)
            .then(function () { return alert("Resume copied to clipboard!"); })
            .catch(function (error) { return console.log("Error copying text", error); });
    }
}
// Function to download the resume as PDF
function downloadResume() {
    var newWindow = window.open('', '_blank');
    if (newWindow) {
        newWindow.document.write("\n      <html>\n        <head>\n          <title>Resume</title>\n        </head>\n        <body>\n          ".concat(resumeSection.innerHTML, "\n        </body>\n      </html>\n    "));
        newWindow.document.close();
        newWindow.print();
    }
    else {
        alert("Failed to open new window.");
    }
}
