let lang = 'fr';

// Load JSON data and inject into HTML
function loadContent() {
  const loader = document.getElementById("loader-wrapper");

  fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
      data = (lang === "fr") ? data.fr : data.en;
      document.title = data.pageTitle;
      injectHeader(data);
      injectNavBar(data);
      injectCVSection(data);
      injectPortfolioSection(data.projects);
      injectFooter(data.contact, data.profile.location);
    })
    .catch(error => {
      console.error('Error loading data:', error);
    })
    .finally(() => {
      loader.style.display = "none";
    });
}


// Inject header section
function injectHeader(data) {
  // header left
  document.getElementById('header-job-title').textContent = data.headerJobTitle;
  document.getElementById('header-period-title').textContent = data.headerPeriodTitle;
  // header picture
  document.getElementById('linkedin-profile-link').href = data.contact.linkedin.link;
  document.getElementById('linkedin-profile-link').ariaLabel = data.contact.linkedin.ariaLabel;
  document.getElementById('profile-pic').src = data.profile.picture.src;
  document.getElementById('profile-pic').alt = data.profile.picture.alt;
  // header middle - contact-summary
  document.getElementById('location').textContent = data.profile.location.tag;
  document.getElementById('age').textContent = data.profile.age;
  document.getElementById('driving-license').textContent = data.profile.drivingLicense;
  // header right
  document.getElementById('name').textContent = data.profile.name;
  document.getElementById('mail').textContent = data.contact.mail.tag;
  document.getElementById('mail').href = data.contact.mail.link;
  document.getElementById('mail').ariaLabel = data.contact.mail.ariaLabel;
  document.getElementById('phone').textContent = data.contact.phone.tag;
  document.getElementById('phone').href = data.contact.phone.link;
  document.getElementById('phone').ariaLabel = data.contact.phone.ariaLabel;
}

// Inject navigation bar
function injectNavBar(data) {
  document.getElementById('cv-section-button').textContent = data.cvButton;
  document.getElementById('portfolio-section-button').textContent = data.portfolioButton;
}

// Inject CV Section
function injectCVSection(data) {
  // About / Info section
  document.getElementById('about').innerHTML = data.about;

  // Jobs section
  document.getElementById('experience-section-title').textContent = data.experienceSectionTitle;

  const experienceContainer = document.getElementById('experience-container');
  experienceContainer.innerHTML = '';
  data.experiences.forEach(exp => {
    const expHTML = `
      <div class="experience">
        <a href="${exp.logo.link}" target="_blank">
          <img src="${exp.logo.img.src}" alt="${exp.logo.img.alt}" class="logo">
        </a>
        <div class="details">
          <h3><span class="job-title">${exp.details.jobTitle}</span> – <span class="company">${exp.details.company}</span></h3>
          <p><span class="period">${exp.details.period}</span> · <span class="location">${exp.details.location}</span></p>
          <p class="description">${exp.details.description}</p>
          <p class="skills">${exp.details.skills}</p>
        </div>
      </div>
    `;
    experienceContainer.innerHTML += expHTML;
  });

  // Education section
  document.getElementById('education-section-title').textContent = data.educationSectionTitle;

  const educationContainer = document.getElementById('education-container');
  educationContainer.innerHTML = '';
  data.education.forEach(edu => {
    const eduHTML = `
    <div class="education">
      <a href="${edu.logo.link}" target="_blank">
        <img src="${edu.logo.img.src}" alt="${edu.logo.img.alt}" class="logo">
      </a>
      <div class="details">
        <h3><span class="institution">${edu.details.institution}</span></h3>
        <p><span class="qualification">${edu.details.qualification}</span></p>
        <p><span class="period">${edu.details.period}</span> · <span class="location">${edu.details.location}</span></p>
        <p class="description">${edu.details.description}</p>
        <p class="skills">${edu.details.skills}</p>
      </div>
    </div>
    `;
    educationContainer.innerHTML += eduHTML;
  });

  // Volunteering section
  document.getElementById('volunteering-section-title').textContent = data.volunteeringSectionTitle;

  const volunteeringContainer = document.getElementById('volunteering-container');
  volunteeringContainer.innerHTML = '';
  data.volunteering.forEach(vol => {
    const volHTML = `
    <div class="experience">
      <a href="${vol.logo.link}" target="_blank"><img src="${vol.logo.img.src}" alt="${vol.logo.img.alt}" class="logo"></a>
      <div class="details">
        <h3><span class="job-title">${vol.details.jobTitle}</span> – <span class="company">${vol.details.company}</span></h3>
        <p><span class="period">${vol.details.period}</span> · <span class="location">${vol.details.location}</span></p>
        <p class="description">${vol.details.description}</p>
        <p class="skills">${vol.details.skills}</p>
      </div>
    </div>
    `;
    volunteeringContainer.innerHTML += volHTML;
  });

  // Certification section
  document.getElementById('certification-section-title').textContent = data.certificationSectionTitle;

  const certificationContainer = document.getElementById('certification-container');
  certificationContainer.innerHTML = '';
  data.certifications.forEach(certif => {
    const certifHTML = `
    <div class="education">
      <a href="${certif.logo.link}" target="_blank"><img src="${certif.logo.img.src}" alt="${certif.logo.img.alt}" class="logo"></a>
      <div class="details">
        <h3><span class="institution">${certif.details.qualification}</span></h3>
        <p><span class="qualification">${certif.details.institution}</span></p>
        <p><span class="period">${certif.details.deliveryDate}</span></p>
        <p class="description">
              <a href="${certif.details.identifierLink}" target="_blank">${certif.details.identifier}</a>
        </p>
        <p class="skills">${certif.details.skills}</p>
      </div>
    </div>
    `;
    certificationContainer.innerHTML += certifHTML;
  });
}

// Inject Portfolio Section
function injectPortfolioSection(projects) {
  const portfolioContainer = document.getElementById('portfolio-container');
  portfolioContainer.innerHTML = '';
  projects.forEach(project => {
    const projectHTML = `
    <div class="project">
      <button class="project-title">${project.title}</button>
      <div class="project-details">
        <p class="project-intro">${project.description}</p>
        <div class="project-video">
              <iframe src="${project.videoLink}" frameborder="0" allowfullscreen></iframe>
        </div>
        <ul class="project-tech">
          ${project.skills}
        </ul>
        <div class="project-github">
           <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer">${project.githubText}</a>
        </div>
      </div>
    </div>
    `;
    portfolioContainer.innerHTML += projectHTML;
  });

  // Script to activate drop-down panel 
  document.querySelectorAll('.project-title').forEach(button => {
    button.addEventListener('click', () => {
      const details = button.nextElementSibling;
      details.classList.toggle('open');
    });
  });
}

// Inject Footer 
function injectFooter(contact, location) {
  document.getElementById('footer-title').textContent = contact.tag;
  document.getElementById('footer-mail').innerHTML = '<i class="fas fa-envelope"></i> ' + contact.mail.tag;
  document.getElementById('footer-mail').href = contact.mail.link;
  document.getElementById('footer-mail').ariaLabel = contact.mail.ariaLabel;
  document.getElementById('footer-phone').innerHTML = '<i class="fas fa-phone"></i> ' + contact.phone.tag;
  document.getElementById('footer-phone').href = contact.phone.link;
  document.getElementById('footer-phone').ariaLabel = contact.phone.ariaLabel;
  //document.getElementById('footer-linkedin').textContent = contact.linkedin.tag;
  document.getElementById('footer-linkedin').href = contact.linkedin.link;
  document.getElementById('footer-linkedin').ariaLabel = contact.linkedin.ariaLabel;
  //document.getElementById('footer-github').textContent = contact.github.tag;
  document.getElementById('footer-github').href = contact.github.link;
  document.getElementById('footer-github').ariaLabel = contact.github.ariaLabel;
  document.getElementById('footer-location').innerHTML = '<i class="fas fa-map-marker-alt"></i> ' + location.tag;
  document.getElementById('footer-location').href = location.link;
  document.getElementById('footer-location').ariaLabel = location.ariaLabel;
}

// Switch Language
function switchLanguage(newLang) {
  lang = newLang;

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`lang-${newLang}`).classList.add('active');

  loadContent();
}

document.addEventListener("DOMContentLoaded", function () {
  // Tab switching
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabSections = document.querySelectorAll(".tab-section");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");

      tabButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      tabSections.forEach(section => {
        if (section.id === targetId) {
          section.classList.add("active");
        } else {
          section.classList.remove("active");
        }
      });
    });
  });

  // Language switching
  const langFrBtn = document.getElementById('lang-fr');
  const langEnBtn = document.getElementById('lang-en');

  if (langFrBtn && langEnBtn) {
    langFrBtn.addEventListener('click', () => switchLanguage('fr'));
    langEnBtn.addEventListener('click', () => switchLanguage('en'));
  }

  loadContent();
});



