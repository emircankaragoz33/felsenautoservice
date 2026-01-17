// Sticky Header Logic
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
        // Removing explicit style manipulations to let CSS handle it
        header.style.background = '';
        header.style.padding = '';
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Mobile Menu
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
        // Close others
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('i').classList.remove('fa-minus');
                otherItem.querySelector('i').classList.add('fa-plus');
            }
        });

        // Toggle current
        item.classList.toggle('active');
        const icon = item.querySelector('i');
        if (item.classList.contains('active')) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        } else {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
        }
    });
});
// Hero Video Slider
const videos = document.querySelectorAll('.hero-video');
if (videos.length > 1) {
    let currentVideoIndex = 0;
    const intervalTime = 8000; // Change every 8 seconds

    setInterval(() => {
        // Remove active from current
        videos[currentVideoIndex].classList.remove('active');
        // Reset current video time if needed, or let it play

        // Move to next
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;

        // Add active to next
        videos[currentVideoIndex].classList.add('active');
    }, intervalTime);
}
