document.addEventListener("DOMContentLoaded", function () {
  let currentSlide = 1;
  const totalSlides = 7;
  const music = document.getElementById("background-music");

  // Play music on load
  music.play();

  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  function showSlide(slideNumber) {
    document.querySelectorAll(".slide").forEach((slide) => {
      slide.classList.remove("active");
    });
    const activeSlide = document.getElementById(`slide-${slideNumber}`);
    activeSlide.classList.add("active");
    currentSlide = slideNumber;

    // Trigger typing effect for the heading
    const heading = activeSlide.querySelector("h1");
    if (heading && heading.dataset.text) {
      typeWriter(heading, heading.dataset.text, 80);
    }

    // Trigger typing effect for the paragraph
    const paragraph = activeSlide.querySelector("p");
    if (paragraph && paragraph.dataset.text) {
      setTimeout(
        () => {
          typeWriter(paragraph, paragraph.dataset.text);
        },
        heading.dataset.text ? heading.dataset.text.length * 80 + 500 : 0
      );
    }
  }

  function nextSlide() {
    if (currentSlide < totalSlides) {
      showSlide(currentSlide + 1);
    }
  }

  function validatePassword(slideNumber, password) {
    if (slideNumber === 1 && password === "rosalia syifa salsabila") {
      nextSlide();
    } else if (slideNumber === 2 && password === "170122") {
      nextSlide();
    } else {
      alert("Password salah! Coba lagi.");
    }
  }

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      const slide = this.closest(".slide");
      const slideId = slide.id;
      const slideNumber = parseInt(slideId.split("-")[1]);

      if (slideNumber === 1 || slideNumber === 2) {
        const input = slide.querySelector("input");
        const password = input.value.trim();
        validatePassword(slideNumber, password);
      } else if (slideNumber === 7) {
        // Restart
        showSlide(1);
      } else {
        nextSlide();
      }
    });
  });

  // Allow Enter key to submit password
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const button = this.closest(".slide").querySelector("button");
        button.click();
      }
    });
  });

  // Initialize typing effect for the first slide
  const firstSlide = document.getElementById("slide-1");
  const firstParagraph = firstSlide.querySelector("p");
  if (firstParagraph && firstParagraph.dataset.text) {
    typeWriter(firstParagraph, firstParagraph.dataset.text);
  }
});
