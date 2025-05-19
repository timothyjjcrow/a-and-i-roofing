// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", function () {
    mobileMenuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Hide header on scroll down, show on scroll up
const header = document.querySelector("header");
let lastScrollTop = 0;

function hideHeaderOnScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 150) {
    // Scrolling down and past the initial 150px
    header.classList.add("header-hidden");
  } else {
    // Scrolling up
    header.classList.remove("header-hidden");
  }

  lastScrollTop = scrollTop;
}

window.addEventListener("scroll", hideHeaderOnScroll);

// Mobile Dropdown Toggle
const dropdownItems = document.querySelectorAll(".dropdown");

dropdownItems.forEach((item) => {
  if (window.innerWidth < 768) {
    const link = item.querySelector("a");

    link.addEventListener("click", function (e) {
      if (window.innerWidth < 768) {
        e.preventDefault();
        item.classList.toggle("active");
      }
    });
  }
});

// Scroll animation for elements
const scrollElements = document.querySelectorAll(".scroll-animation");

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el);
    }
  });
};

// Add active class to current page in navigation
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href");

  if (
    linkPage === currentPage ||
    (currentPage === "" && linkPage === "index.html")
  ) {
    link.classList.add("active");
  } else if (
    currentPage.includes("portfolio") &&
    linkPage === "portfolio.html"
  ) {
    link.classList.add("active");
  }
});

// Portfolio filters
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      this.classList.add("active");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Filter items
      portfolioItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
        } else if (item.classList.contains(filterValue)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    const inputs = contactForm.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }

      // Email validation
      if (input.type === "email" && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
          isValid = false;
          input.classList.add("error");
        }
      }
    });

    if (isValid) {
      // Here you would normally submit the form, but for demo purposes we'll just show an alert
      alert("Form submitted successfully!");
      contactForm.reset();
    }
  });
}

// Initialize on window load
window.addEventListener("load", () => {
  // Initialize animations if there are any scroll elements
  if (scrollElements.length > 0) {
    window.addEventListener("scroll", handleScrollAnimation);
    // Run once on load to check for elements already in view
    handleScrollAnimation();
  }
});

// Back to top button
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Center lone cards in grids
function centerLoneGridItems() {
  const gridSelectors = [
    ".services-grid",
    ".portfolio-grid",
    ".principles-grid",
    ".options-grid",
    ".project-grid",
    ".sponsors-grid",
    ".testimonial-grid",
    ".before-after-grid",
  ];

  gridSelectors.forEach((selector) => {
    const gridContainers = document.querySelectorAll(selector);

    gridContainers.forEach((grid) => {
      // If the grid has exactly one direct child
      if (grid.children.length === 1) {
        grid.classList.add("single-item-grid");
      }
    });
  });
}

// Run when DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ... existing code ...

  // Center lone grid items
  centerLoneGridItems();
});
