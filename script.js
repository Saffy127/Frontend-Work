document.getElementById("getStarted").addEventListener("click", function() {
    alert("Thank you for your interest! Our signup process is under construction. We'll be in touch soon.");
  });
  
  const signupButtons = document.querySelectorAll(".signup");
  
  signupButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      if (button.textContent === "Contact Us") {
        window.location.href = "#contact";
      } else {
        alert("Thank you for your interest! Our signup process is under construction. We'll be in touch soon.");
      }
    });
  });
  
  document.querySelector(".contact form").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Thank you for contacting us! We will get back to you shortly.");
  });
  