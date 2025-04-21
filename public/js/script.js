window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Add this to your HTML <head> or before </body>
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");

    const images = document.querySelectorAll('.category-item img');
    console.log("Found", images.length, "images");

    images.forEach(img => {
        console.log("Processing image:", img.src);

        if (img.complete) {
            console.log("Image is already complete:", img.src);
            img.parentElement.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                console.log("Image loaded successfully:", img.src, "at", new Date().toLocaleTimeString());
                img.parentElement.classList.add('loaded');
            });
        }

        img.addEventListener('error', () => {
            console.error(`Failed to load image: ${img.src}`);
            img.parentElement.style.display = 'none';
        });
    });
});

