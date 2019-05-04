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