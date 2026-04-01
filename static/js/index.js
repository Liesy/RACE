// More Works Dropdown Functionality
function toggleMoreWorks() {
  const dropdown = document.getElementById("moreWorksDropdown");
  const button = document.querySelector(".more-works-btn");
  if (!dropdown || !button) return;

  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
    button.classList.remove("active");
  } else {
    dropdown.classList.add("show");
    button.classList.add("active");
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const container = document.querySelector(".more-works-container");
  const dropdown = document.getElementById("moreWorksDropdown");
  const button = document.querySelector(".more-works-btn");
  if (!container || !dropdown || !button) return;

  if (container && !container.contains(event.target)) {
    dropdown.classList.remove("show");
    button.classList.remove("active");
  }
});

// Copy BibTeX to clipboard
function copyBibTeX() {
  const bibtexElement = document.getElementById("bibtex-code");
  const button = document.querySelector(".copy-bibtex-btn");
  if (!bibtexElement || !button) return;
  const copyText = button.querySelector(".copy-text");
  if (!copyText) return;

  if (bibtexElement) {
    navigator.clipboard
      .writeText(bibtexElement.textContent)
      .then(function () {
        // Success feedback
        button.classList.add("copied");
        copyText.textContent = "Cop";

        setTimeout(function () {
          button.classList.remove("copied");
          copyText.textContent = "Copy";
        }, 2000);
      })
      .catch(function (err) {
        console.error("Failed to copy: ", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = bibtexElement.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        button.classList.add("copied");
        copyText.textContent = "Cop";
        setTimeout(function () {
          button.classList.remove("copied");
          copyText.textContent = "Copy";
        }, 2000);
      });
  }
}

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo(0, 0);
}

function initializeImageLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  const lightboxImage = document.getElementById("imageLightboxImage");
  const lightboxCaption = document.getElementById("imageLightboxCaption");
  const closeButton = document.getElementById("imageLightboxClose");
  const zoomableMedia = document.querySelectorAll(
    '.project-figure-media[data-zoomable="true"]',
  );

  if (
    !lightbox ||
    !lightboxImage ||
    !lightboxCaption ||
    !closeButton ||
    zoomableMedia.length === 0
  ) {
    return;
  }

  let previousFocusedElement = null;

  function openLightbox(media) {
    const image = media.querySelector("img");
    const caption = media.parentElement?.querySelector(
      ".project-figure-caption .subtitle",
    );
    if (!image) return;

    previousFocusedElement = document.activeElement;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = caption ? caption.textContent.trim() : "";
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    if (lightbox.hidden) return;

    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxImage.alt = "";
    lightboxCaption.textContent = "";
    document.body.classList.remove("lightbox-open");

    if (previousFocusedElement instanceof HTMLElement) {
      previousFocusedElement.focus();
    }
  }

  zoomableMedia.forEach(function (media) {
    media.addEventListener("click", function () {
      openLightbox(media);
    });

    media.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(media);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", function (event) {
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.dataset.lightboxClose === "true"
    ) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      if (!lightbox.hidden) {
        closeLightbox();
        return;
      }

      const dropdown = document.getElementById("moreWorksDropdown");
      const button = document.querySelector(".more-works-btn");
      if (dropdown && button) {
        dropdown.classList.remove("show");
        button.classList.remove("active");
      }
    }
  });
}

initializeImageLightbox();

// Show/hide scroll to top button
window.addEventListener("scroll", function () {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (!scrollButton) return;

  if (window.pageYOffset > 300) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
});
