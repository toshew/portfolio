// Smooth scrolling
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      let hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, () => window.location.hash = hash);
    } 
  });
});

//Back top button
window.onscroll = function() {scrollFunction()};

let scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backTopBtn").style.display = "block";
  } else {
    document.getElementById("backTopBtn").style.display = "none";
  }
}

// Internationalisation
let translations = {
  en: {
    about: 'ABOUT',
    skills: 'SKILLS',
    projects: 'PROJECTS',
    contact: 'CONTACT',
    aboutSec: 'ABOUT ME',
    contactSec: "Let's Get In Touch",
    contactPar: 'Give me a call or send an email and I will get back to you as soon as possible!',
    aboutPar: `I am <em>Junior JavaScript Web Developer</em> who loves Programming and Web <span>Development</span>.JavaScript is just the beginning of my <span>path</span> in programming, because I am planning  to <span>learn</span> more programming languages in the <span>future</span>.I am both driven and self-motivated, and I am constantly experimenting with new <span>technologies</span> and techniques.I am very <span>passionate</span> about Web Development, and <span>strive</span> to better myself as a developer.<br><br><em>Able to work independently as well as part of the team;</em><br><em>Determined, hardworking and responsible;</em><br><em>Eager to constant learning and development.</em><br>`
  },
  sr: {
    about: 'O MENI',
    skills: 'VEŠTINE',
    projects: 'PROJEKTI',
    contact: 'KONTAKT',
    aboutSec: 'O MENI',
    contactSec: "Budimo u kontaktu",
    contactPar: 'Pozovite me ili pošaljite email i ja ću Vam odgovoriti u najkraćem roku!',
    aboutPar: `Ja sam <em>Junior JavaScript Programer</em> koji uživa u programiranju i <span>razvoj</span>u web aplikacije. JavaScript je samo početak mog <span>put</span>a u programiranju, jer <span>plan</span>iram da naučim više programskih jezika u <span>budućnost</span>i. Ja sam i veoma <span>motivi</span>san i stalno eksperimentišem sa novim <span>tehnologija</span>ma i tehnikama. Veoma sam <span>strastven</span> u vezi sa Web Development-om i nastojim da se poboljšam kao programer.<br><br><em>Sposoban da radi samostalno i kao deo tima;<em><br><em>Odlučan, vredan i odgovoran;<em><br><em>Motivisan da konstantno uči i razvija se.<em>`
  }
}

