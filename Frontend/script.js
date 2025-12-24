// Navbar ko load karne ka function
// Generic function jo kisi bhi HTML file ko load karega
async function loadComponent(elementId, filePath, isNavbar = false) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Could not load ${filePath}`);
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;

        // Agar Navbar load ho rahi hai, toh Active Class logic chalao
        if (isNavbar) {
            setActiveNavLink();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Active Link set karne ka logic
function setActiveNavLink() {
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-link-item');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        }
    });
}

// Sab components ko ek saath load karna
document.addEventListener('DOMContentLoaded', () => {
    // Navbar load karein (isNavbar = true rakha hai)
    loadComponent('navbar-placeholder', 'partials/navbar.html', true);

    // Newsletter load karein
    loadComponent('newsletter-placeholder', 'partials/newsletter.html');

    // Footer load karein
    loadComponent('footer-placeholder', 'partials/footer.html');

    // AOS Refresh (agar use kar rahe hain toh)
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.init();
            AOS.refresh();
        }
    }, 500); // Thora delay taake HTML puri tarah inject ho jaye
});



window.addEventListener("scroll", function () {
    const navbar = document.querySelector("nav.navbar-main");
    const topbar = document.querySelector(".topbar");

    const scrollY = window.scrollY;
    const topbarHeight = topbar ? topbar.offsetHeight : 0;

    // Add scrolled class when user scrolls past topbar
    if (scrollY > topbarHeight) {
        topbar.style.transform = "translateY(-100%)";
        topbar.style.opacity = "0";
        navbar.classList.add("scrolled");
    } else {
        topbar.style.transform = "translateY(0)";
        topbar.style.opacity = "1";
        navbar.classList.remove("scrolled");
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const scheduleItems = document.querySelectorAll('.schedule-item');

    scheduleItems.forEach(item => {
        const header = item.querySelector('.item-header');
        const expandBtn = item.querySelector('.expand-btn');

        header.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') return;

            const isActive = item.classList.contains('active');

            scheduleItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});


// Slider
document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper(".tracks-slider", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });
});

// Initialize Element SDK
const defaultConfig = {
    hero_title: "ENCOURAGE 2026 — Empowering National Conference for Undergraduate Research",
    hero_tagline: "Inspiring Ideas. Empowering Futures.",
    hero_description: "Join Pakistan's premier undergraduate research conference where innovative minds converge to shape tomorrow's breakthroughs. Present your research, network with industry leaders, and transform your academic journey.",
    contact_email: "info@encourage2026.org",
    contact_phone: "+92 300 1234567",
    primary_color: "#F5A623",
    secondary_color: "#0C3B78",
    accent_color: "#008040",
    highlight_color: "#D05328",
    background_color: "#f8f9fa",
    font_family: "Plus Jakarta Sans",
    font_size: 16
};

// Configuration update handler
async function onConfigChange(config) {
    const heroTitle = config.hero_title || defaultConfig.hero_title;
    const heroTagline = config.hero_tagline || defaultConfig.hero_tagline;
    const heroDescription = config.hero_description || defaultConfig.hero_description;
    const contactEmail = config.contact_email || defaultConfig.contact_email;
    const contactPhone = config.contact_phone || defaultConfig.contact_phone;
    const primaryColor = config.primary_color || defaultConfig.primary_color;
    const secondaryColor = config.secondary_color || defaultConfig.secondary_color;
    const fontFamily = config.font_family || defaultConfig.font_family;
    const fontSize = config.font_size || defaultConfig.font_size;

    // Update text content
    document.getElementById('hero-title').textContent = heroTitle;
    document.getElementById('hero-tagline').textContent = heroTagline;
    document.getElementById('hero-description').textContent = heroDescription;
    document.getElementById('contact-email').textContent = contactEmail;
    document.getElementById('contact-phone').textContent = contactPhone;

    // Update colors
    document.querySelectorAll('.hero-btn-primary').forEach(el => {
        el.style.background = `linear-gradient(135deg, ${primaryColor}, ${config.highlight_color || defaultConfig.highlight_color})`;
    });

    document.querySelectorAll('.nav-link-item:hover, .nav-link-item.active').forEach(el => {
        el.style.color = primaryColor;
    });

    document.querySelector('.hero-tagline').style.color = primaryColor;

    document.querySelectorAll('.topbar-item, .nav-link-item, .navbar-brand-custom, .hero-title').forEach(el => {
        el.style.color = secondaryColor;
    });

    // Update fonts
    const baseFontStack = 'sans-serif';
    document.body.style.fontFamily = `${fontFamily}, ${baseFontStack}`;

    // Update font sizes proportionally
    document.querySelector('.hero-title').style.fontSize = `${fontSize * 3.5}px`;
    document.querySelector('.hero-tagline').style.fontSize = `${fontSize * 1.5}px`;
    document.querySelector('.hero-description').style.fontSize = `${fontSize * 1.125}px`;
    document.querySelectorAll('.topbar-item').forEach(el => {
        el.style.fontSize = `${fontSize * 0.875}px`;
    });
    document.querySelectorAll('.nav-link-item').forEach(el => {
        el.style.fontSize = `${fontSize * 0.9375}px`;
    });
}

// Capabilities mapping
function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.primary_color || defaultConfig.primary_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.config.primary_color = value;
                        window.elementSdk.setConfig({ primary_color: value });
                    }
                }
            },
            {
                get: () => config.secondary_color || defaultConfig.secondary_color,
                set: (value) => {
                    if (window.elementSdk) {
                        window.elementSdk.config.secondary_color = value;
                        window.elementSdk.setConfig({ secondary_color: value });
                    }
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                if (window.elementSdk) {
                    window.elementSdk.config.font_family = value;
                    window.elementSdk.setConfig({ font_family: value });
                }
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                if (window.elementSdk) {
                    window.elementSdk.config.font_size = value;
                    window.elementSdk.setConfig({ font_size: value });
                }
            }
        }
    };
}

// Edit panel values mapping
function mapToEditPanelValues(config) {
    return new Map([
        ["hero_title", config.hero_title || defaultConfig.hero_title],
        ["hero_tagline", config.hero_tagline || defaultConfig.hero_tagline],
        ["hero_description", config.hero_description || defaultConfig.hero_description],
        ["contact_email", config.contact_email || defaultConfig.contact_email],
        ["contact_phone", config.contact_phone || defaultConfig.contact_phone]
    ]);
}

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Initial hero animations
gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('.hero-tagline', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.hero-description', {
    duration: 1,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.7
});

gsap.from('.hero-btn', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power3.out',
    stagger: 0.2,
    delay: 0.9
});

// Scroll-based animations
// let lastScrollY = 0;
const topbar = document.getElementById('topbar');
const navbar = document.getElementById('navbar');

// Mobile menu toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const navAuth = document.getElementById('navAuth');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-active');
    navAuth.classList.toggle('mobile-active');

    const icon = mobileToggle.querySelector('i');
    if (navLinks.classList.contains('mobile-active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Active link highlighting and mobile menu closing
document.querySelectorAll('.nav-link-item').forEach(link => {
    link.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-link-item').forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');

        // Close mobile menu after clicking a link
        if (window.innerWidth < 992) {
            navLinks.classList.remove('mobile-active');
            navAuth.classList.remove('mobile-active');
            mobileToggle.querySelector('i').classList.remove('fa-times');
            mobileToggle.querySelector('i').classList.add('fa-bars');
        }
    });
});



// Objective Scroll Trigger
// Horizontal Objectives Animation
// Ye script apne page ke end mein add karein (before </body>)

gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
    const section = document.querySelector(".mission-section");
    const track = document.querySelector(".objective-scroll-track");

    if (!section || !track) return;

    const cards = track.querySelectorAll('.objective-card-h');
    const cardWidth = 300; // your card width
    const gap = 24;
    const visibleCards = 3;
    const scrollDistance = (cards.length - visibleCards) * (cardWidth + gap);

    gsap.to(track, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollDistance * 2}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        }
    });
});