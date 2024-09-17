// TypeScript interface to structure user data
interface UserDetails {
  name: string;
  phone: string;
  address: string;
  email: string;
  linkdin: string;
  qualifications: string;
  courses: string;
  skills: string;
  profession: string;
  experience: string;
  profile: string;
  github: string;
  profileImage: string;
}

const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeSection = document.getElementById("resume") as HTMLElement;
const editButton = document.getElementById("editButton") as HTMLButtonElement;

let isEditing = false;
let imageUrl: string | null;

document.getElementById('profile-image')?.addEventListener('change', function (event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageUrl = e.target?.result as string; 
    };
    reader.readAsDataURL(file);
  }
});

resumeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isEditing) {
    // Generate resume
    const resumeData: UserDetails = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      phone: (document.getElementById("phone") as HTMLInputElement).value,
      address: (document.getElementById("address") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      linkdin: (document.getElementById("linkdin") as HTMLInputElement).value,
      github: (document.getElementById("github") as HTMLInputElement).value,
      qualifications: (
        document.getElementById("qualifications") as HTMLSelectElement
      ).value,
      courses: (document.getElementById("courses") as HTMLInputElement).value,
      skills: (document.getElementById("skills") as HTMLInputElement).value,
      profession: (document.getElementById("profession") as HTMLInputElement)
        .value,
      experience: (document.getElementById("experience") as HTMLTextAreaElement)
        .value,
      profile: (document.getElementById("profile") as HTMLTextAreaElement)
        .value,
      profileImage: imageUrl || "", // Use the uploaded image URL
    };

    displayResume(resumeData);
  }
});

function displayResume(data: UserDetails) {
  const resumeHTML = `
       <div class="container">
        <!-- sidebar -->
        <div class="sidebar">
            <div class="profile-image">
         <img src="${data.profileImage}" alt="${data.name}">
                </div>
            
            <div class="profile-info">
                <h3>Profile</h3>
                <ul>
                    <p>${data.profile}</p>
                </ul>
            </div>

            <div class="contact-info">
                <h3>Contact Me</h3>
                <p><i class="fa fa-phone"></i>${data.phone}</p>
                <p><i class="fa fa-envelope"></i>${data.email}</p>
                <p><i class="fa fa-map-marker"></i>${data.linkdin}</p>
            </div>

            <div class="social-info">
                <h3>Professional Accounts</h3>
                <p><strong>Github Account:</strong><br><a href="${data.github}">${data.github}</a> </p>
                <p><strong>LinkedIn Profile:</strong><br><a href="${data.linkdin}">${data.linkdin}</a> </p>
            </div>
        </div>
        <!-- Main section -->
            <div class="main">
                <div class="name">
            <h1>${data.name}</h1>
            <p>${data.profession}</p>
                </div>
                <div class="education">
                <h2>Education</h2>
                    <ul>
                <li>${data.qualifications}</li>
            </ul>
                </div>

                <div class="Technical-courses">
                    <h2>Technical Courses</h2>
                    <ul>
                        <li>${data.courses}</li>
                    </ul>
                </div>

                <div class="skills" id="skills">
                    <h2>Technical Skills</h2>
                    <ul>
                        <li>${data.skills}</li>
                    </ul>
                </div>

                <div class="experience">
                    <h2>Work Experience</h2>
                    <ul>
                     <li>${data.experience}</li></ul>
                </div>

                <div class="Reference">
                    <h2>Reference</h2>
                    <p>Will be furnished upon request.</p>
                </div>
            </div>
        </div>
     <button id="shareButton">Share Resume</button>
     <button id="downloadButton">Download Resume</button>
    `;

  resumeSection.innerHTML = resumeHTML;
  toggleFormElements(true);

  const shareButton = document.getElementById("shareButton") as HTMLButtonElement;
  const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement;

  shareButton.addEventListener("click", () => {
    shareResume(data);
  });

  downloadButton.addEventListener("click", () => {
    downloadResume();
  });
}

function toggleFormElements(disable: boolean) {
  const inputs = resumeForm.querySelectorAll("input, select, textarea");
  inputs.forEach((input) => {
    (input as HTMLInputElement).disabled = disable;
  });
}

function saveChanges() {
  toggleFormElements(true);
  editButton.textContent = "Edit";
  isEditing = false;
}

editButton.addEventListener("click", () => {
  isEditing = !isEditing;

  if (isEditing) {
    toggleFormElements(false);
    editButton.textContent = "Save";
  } else {
    resumeForm.dispatchEvent(new Event("submit"));
    saveChanges();
  }
});

// Share the generated resume 
function shareResume(data: UserDetails) {
  const resumeText = `
       Personal Details:
      Name: ${data.name}
      Profession: ${data.profession}
      Profile: ${data.profile}
      Contact: ${data.phone}, ${data.email}
      LinkedIn: ${data.linkdin}
      GitHub: ${data.github}
        Qualification:
      Education: ${data.qualifications}
      technical Courses : ${data.courses}
       Technical Skills:
      Skills: ${data.skills}
      Experience: ${data.experience}
  `;

  if (navigator.share) {
    navigator
      .share({
        title: "My Resume",
        text: resumeText,
      })
      .catch((error) => console.log("Error sharing", error));
  } else {
    navigator.clipboard
      .writeText(resumeText)
      .then(() => alert("Resume copied to clipboard!"))
      .catch((error) => console.log("Error copying text", error));
  }
}

// Function to download the resume as PDF
function downloadResume() {
  const newWindow = window.open('', '_blank');
  if (newWindow) {
    newWindow.document.write(`
      <html>
        <head>
          <title>Resume</title>
        </head>
        <body>
          ${resumeSection.innerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  } else {
    alert("Failed to open new window.");
  }
}
