"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Initialize and type our elements
const initElements = () => {
    return {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        barsIcon: document.querySelector('.hamburger .fa-bars'),
        xmarkIcon: document.querySelector('.hamburger .fa-xmark'),
        navLinksItems: document.querySelectorAll('.nav-links a')
    };
};
// Toggle the navigation menu
const toggleMenu = (elements) => {
    if (!elements.navLinks || !elements.barsIcon || !elements.xmarkIcon)
        return;
    elements.navLinks.classList.toggle('open');
    if (elements.navLinks.classList.contains('open')) {
        elements.barsIcon.style.display = 'none';
        elements.xmarkIcon.style.display = 'block';
    }
    else {
        elements.barsIcon.style.display = 'block';
        elements.xmarkIcon.style.display = 'none';
    }
};
// Close the menu when a link is clicked
const setupLinkListeners = (elements) => {
    elements.navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (!elements.navLinks || !elements.barsIcon || !elements.xmarkIcon)
                return;
            elements.navLinks.classList.remove('open');
            elements.barsIcon.style.display = 'block';
            elements.xmarkIcon.style.display = 'none';
        });
    });
};
// Initialize the mobile navigation
const initMobileNavigation = () => {
    const elements = initElements();
    if (!elements.hamburger)
        return;
    elements.hamburger.addEventListener('click', () => toggleMenu(elements));
    setupLinkListeners(elements);
};
// PDF Download from Google Drive
const setupDriveDownload = () => {
    const downloadBtn = document.getElementById('download-cv');
    if (!downloadBtn)
        return;
    downloadBtn.addEventListener('click', () => {
        // Replace this with your actual Google Drive link
        const driveLink = "https://drive.google.com/file/d/1AkZnjNQfN2MfsIq84EGvHlil8Q6hCA0a/view?usp=sharing";
        // Method 1: Direct download (best for most cases)
        window.open(driveLink, '_blank');
    });
};
// Redirect to thankyou.html on contact form submit
const setupContactFormSubmission = () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm)
        return;
    contactForm.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        try {
            const response = yield fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                window.location.href = 'thankyou.html';
            }
            else {
                alert('Failed to send message. Please try again later.');
            }
        }
        catch (error) {
            alert('Error sending message.');
        }
    }));
};
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
    setupDriveDownload();
    setupContactFormSubmission();
});
