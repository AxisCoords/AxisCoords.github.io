// Define types for our DOM elements
type HamburgerElements = {
    hamburger: HTMLElement | null;
    navLinks: HTMLElement | null;
    barsIcon: HTMLElement | null;
    xmarkIcon: HTMLElement | null;
    navLinksItems: NodeListOf<HTMLElement>;
};

// Initialize and type our elements
const initElements = (): HamburgerElements => {
    return {
        hamburger: document.querySelector('.hamburger'),
        navLinks: document.querySelector('.nav-links'),
        barsIcon: document.querySelector('.hamburger .fa-bars'),
        xmarkIcon: document.querySelector('.hamburger .fa-xmark'),
        navLinksItems: document.querySelectorAll('.nav-links a')
    };
};

// Toggle the navigation menu
const toggleMenu = (elements: HamburgerElements): void => {
    if (!elements.navLinks || !elements.barsIcon || !elements.xmarkIcon) return;

    elements.navLinks.classList.toggle('open');
    
    if (elements.navLinks.classList.contains('open')) {
        elements.barsIcon.style.display = 'none';
        elements.xmarkIcon.style.display = 'block';
    } else {
        elements.barsIcon.style.display = 'block';
        elements.xmarkIcon.style.display = 'none';
    }
};

// Close the menu when a link is clicked
const setupLinkListeners = (elements: HamburgerElements): void => {
    elements.navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (!elements.navLinks || !elements.barsIcon || !elements.xmarkIcon) return;
            
            elements.navLinks.classList.remove('open');
            elements.barsIcon.style.display = 'block';
            elements.xmarkIcon.style.display = 'none';
        });
    });
};

// Initialize the mobile navigation
const initMobileNavigation = (): void => {
    const elements = initElements();
    
    if (!elements.hamburger) return;
    
    elements.hamburger.addEventListener('click', () => toggleMenu(elements));
    setupLinkListeners(elements);
};

// PDF Download from Google Drive
const setupDriveDownload = () => {
  const downloadBtn = document.getElementById('download-cv');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    // Replace this with your actual Google Drive link
    const driveLink = "https://drive.google.com/file/d/1KwsrInz18TDscxnJeVxMqpRK3jsJ-UwH/view?usp=sharing";
    
    // Method 1: Direct download (best for most cases)
    window.open(driveLink, '_blank');
  });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  setupDriveDownload();
});
