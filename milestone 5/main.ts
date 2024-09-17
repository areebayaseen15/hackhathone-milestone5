
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
let imageUrl: string | null 

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
     profileImage: imageUrl || ""
       
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
                <p><strong>Github Account:</strong><br><a href="">${data.github}</a> </p>
                <p><strong>LinkedIn Profile:</strong><br><a href="">${data.linkdin}</a> </p>
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
                        <li> ${data.skills}</li>
                       
                    </ul>
                </div>

                <div class="experiece">
                    <h2>Work Experience</h2>
                    <ul>
                     <li> ${data.experience}</li></ul>
                   
                    
                </div>

                <div class="Reference">
                    <h2>Reference</h2>
                    <p>Will be furnished upon request.</p>
                </div>

                <div class = "SharableLink">
                <h2>Sharrable link: </h2>
                 <a href = "#">https://hackhathone-milestone5-areeba15.vercel.app/</a>
               </div>

            </div>
        
    </div>

     <button id="shareButton">Share Resume</button>
    <a href="https://hackatone-milestone1.vercel.app/"></a>
    <button id="downloadButton">Download Resume</button>
    `;

  resumeSection.innerHTML = resumeHTML;
  toggleFormElements(true);

  // Add event listeners for the new buttons
  const shareButton = document.getElementById(
    "shareButton"
  ) as HTMLButtonElement;
  const downloadButton = document.getElementById(
    "downloadButton"
  ) as HTMLButtonElement;

  shareButton.addEventListener("click", () => {
    shareResume(data);
  });

  downloadButton.addEventListener("click", () => {
    downloadResume(data);
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

function shareResume(data: UserDetails) {
  const resumeText = `
        Personal Details
       
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
                <p><strong>Github Account:</strong><br><a href="">${data.github}</a> </p>
                <p><strong>LinkedIn Profile:</strong><br><a href="">${data.linkdin}</a> </p>
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
                        <li> ${data.skills}</li>
                       
                    </ul>
                </div>

                <div class="experiece">
                    <h2>Work Experience</h2>
                    <ul>
                     <li> ${data.experience}</li></ul>
                   
                    
                </div>

                <div class="Reference">
                    <h2>Reference</h2>
                    <p>Will be furnished upon request.</p>
                </div>

                
            </div>
        
    </div>
     
    `;

  //  URL
  const customURL = "https://hackhathone-milestone5-areeba15.vercel.app/";

  if (navigator.share) {
    navigator
      .share({
        title: "My Resume",
        text: resumeText,
        url: customURL,
      })
      .catch((error) => console.log("Error sharing", error));
  } else {
    navigator.clipboard
      .writeText(resumeText)
      .then(() => alert("Resume copied to clipboard!"))
      .catch((error) => console.log("Error copying text", error));
  }
}

function downloadResume(data: UserDetails) {
  const resumeText = `
      Personal Details
       
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
                <p><strong>Github Account:</strong><br><a href="">${data.github}</a> </p>
                <p><strong>LinkedIn Profile:</strong><br><a href="">${data.linkdin}</a> </p>
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
                        <li> ${data.skills}</li>
                       
                    </ul>
                </div>

                <div class="experiece">
                    <h2>Work Experience</h2>
                    <ul>
                     <li> ${data.experience}</li></ul>
                   
                    
                </div>

                <div class="Reference">
                    <h2>Reference</h2>
                    <p>Will be furnished upon request.</p>
                </div>
            </div>
        
    </div>

   
    `;
    
   

   

  const blob = new Blob([resumeText], { type: "pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "resume.pdf";
  link.click();
  URL.revokeObjectURL(url);
}
