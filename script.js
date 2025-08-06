document.addEventListener("DOMContentLoaded", () => {
  // ---- HEADER SCROLL EFFECT ----
  const header = document.querySelector(".main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ---- MOBIELE NAVIGATIE TOGGLE ----
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("is-open");
      navToggle.classList.toggle("is-active");
    });

    mainNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
      });
    });
  }

  // ---- INTERACTIVE OFFER SECTION ----
  const offerList = document.querySelector(".offer-list");
  const contentPanes = document.querySelectorAll(".content-pane");

  if (offerList) {
    offerList.addEventListener("click", (e) => {
      const clickedItem = e.target.closest(".offer-item");
      if (!clickedItem) return;

      // Verwijder active class van alle items
      offerList
        .querySelectorAll(".offer-item")
        .forEach((item) => item.classList.remove("active"));
      contentPanes.forEach((pane) => pane.classList.remove("active"));

      // Voeg active class toe aan geklikt item
      clickedItem.classList.add("active");

      // Toon het bijbehorende content paneel
      const targetId = clickedItem.dataset.target;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  }

  // ---- SCROLL ANIMATIES ----
  const scrollElements = document.querySelectorAll(".animate-on-scroll");
  if (scrollElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    scrollElements.forEach((el) => {
      observer.observe(el);
    });
  }

  // ---- CONTACT FORMULIER LOGICA ----
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');

      submitButton.textContent = "Versturen...";
      submitButton.disabled = true;

      setTimeout(() => {
        const contactBox = this.closest(".contact-box");
        if (contactBox) {
          contactBox.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>Bedankt voor uw aanvraag!</h3>
                            <p>We hebben uw bericht ontvangen en nemen zo spoedig mogelijk contact met u op.</p>
                        </div>
                    `;
          const successDiv = contactBox.querySelector(".form-success");
          successDiv.style.padding = "3rem";
          successDiv.style.textAlign = "center";
          successDiv.querySelector("i").style.fontSize = "3rem";
          successDiv.querySelector("i").style.color = "var(--color-primary)";
          successDiv.querySelector("i").style.marginBottom = "1rem";
          successDiv.querySelector("h3").style.color = "var(--color-light)";
          successDiv.querySelector("p").style.color = "#a0aec0";
        }
      }, 1500);
    });
  }
});
