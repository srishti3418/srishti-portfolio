// Portfolio JavaScript functionality
// adding comment to check git

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero section button smooth scroll
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    heroButtons.forEach(button => {
        if (button.getAttribute('href').startsWith('#')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Resume Download Functionality
    const downloadResumeBtn = document.getElementById('download-resume');
    
    downloadResumeBtn.addEventListener('click', function() {
        generateAndDownloadResume();
    });

    function generateAndDownloadResume() {
        // Create resume content
        const resumeContent = `
SRISHTI SUMAN
Software Engineer | Full-Stack Developer | Problem Solver

CONTACT INFORMATION
Phone: 7667812287
Email: srishti.suman1822@gmail.com
LinkedIn: linkedin.com/in/srishti-suman-349514191
GitHub: github.com/srishti3418

PROFESSIONAL EXPERIENCE

Software Engineer 2 | Gupshup Technologies Pvt. Ltd
July 2023 – Present | Gurugram, Haryana
• Developed and deployed gupshup.ai from scratch to production within a tight deadline, showcasing technical proficiency and timely delivery.
• Enhanced gupshup.io page load times by 25% through code optimization, lazy loading, asynchronous loading, and efficient state management.
• Developed and implemented a clearbit form shortening feature for Salesforce (SFDC) integration, boosting lead collection efficiency by approximately 10-15% on the company website.

Software Engineer 1 | Gupshup Technologies Pvt. Ltd
July 2022 – June 2023 | Gurugram, Haryana
• Website Revamp: Revamped gupshup.io website, scaling from 20 to 180 pages
• Implemented GitLab CI/CD pipelines enabling automated deployments across multiple environments, reducing deployment times by 40% and improving team productivity by 30%
• Collaborated in Agile development processes, facilitating regular sprints and effective team communication.
• Integrated Strapi CMS with Next.js through GraphQL to enhance content management efficiency and streamline data fetching for responsive web applications

Software Development Intern | Gupshup Technologies Pvt. Ltd
Aug. 2021 – June 2022 | IIT Dharwad (Remotely), Karnataka
• Developed RESTful APIs for the backend of the Gupshup Retail Digital Store project using Firebase DB.
• Improved performance of the retail User Interface by 20%

TECHNICAL SKILLS

Languages: C++, SQL, JavaScript, HTML/CSS
Frameworks & Technologies: React, Node.js, Next.js, Strapi CMS, REST APIs, Microservices, TypeScript, CI/CD, PM2
Tools & Platforms: Git, Docker, VS Code, GitLab, Figma, Postman, Jira, Agile, LaTeX, Cursor, Windsurf
Databases: Google Firebase, MySQL

PROJECTS

ENTERTAINMENT-HUB | April 2021
Technologies: ReactJS, IMDB API, Material-UI, Axios
GitHub: https://github.com/srishti3418/entertainment-hub
• Developed an application to display trending movies and series using real-time IMDb data for user-centric recommendations.
• Integrated pagination to efficiently manage data display, enhancing navigation and improving load times for users accessing trending movies and series.
• Implemented a robust search functionality, allowing users to quickly find specific movies and series, thereby optimizing user experience.

EDUCATION

Bachelor of Technology in Computer Science and Engineering
Indian Institute of Technology Dharwad | Aug. 2018 – May 2022
CGPA: 7.16 | Dharwad, Karnataka

Senior Secondary Education
Progressive Central School | April 2015 – May 2017
Grade: 92.8% | Samastipur, Bihar

ACHIEVEMENTS

• Solved over 350 data structures and algorithms problems, enhancing coding and problem-solving proficiency.
• Have taught Data structure and algorithm to 200+ students on Gradskey Platform
• Participated in the hackathon organized at IIT Dharwad.
        `;

        // Create blob and download
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Srishti_Suman_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success notification
        showNotification('Resume downloaded successfully!', 'success');
    }

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background change on scroll
    const navbar = document.getElementById('navbar');
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNavLink();
        updateNavbarBackground();
        animateOnScroll();
    });

    // Initial call to set correct active link
    updateActiveNavLink();
    updateNavbarBackground();

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .project-card, .achievement-card, .education-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .achievement-card, .education-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Initial animation check
    animateOnScroll();

    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        // Validation
        let isValid = true;
        const errors = [];
        
        // Clear previous error styling
        const formControls = contactForm.querySelectorAll('.form-control');
        formControls.forEach(control => {
            control.style.borderColor = '';
        });
        
        // Name validation
        if (name.length < 2) {
            errors.push('Name must be at least 2 characters long');
            document.getElementById('name').style.borderColor = 'var(--color-error)';
            isValid = false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please enter a valid email address');
            document.getElementById('email').style.borderColor = 'var(--color-error)';
            isValid = false;
        }
        
        // Message validation
        if (message.length < 10) {
            errors.push('Message must be at least 10 characters long');
            document.getElementById('message').style.borderColor = 'var(--color-error)';
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', { name, email, message });
        } else {
            // Show error message
            showNotification('Please fix the errors in the form.', 'error');
        }
    });

    // Skill tags hover effect
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project cards hover effect enhancement
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
        });
    });

    // Achievement cards hover effect
    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 14px;
            padding: 4px;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Lazy loading for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for lazy loading
    const observeElements = document.querySelectorAll('.timeline-item, .skill-category, .project-card, .achievement-card, .education-card');
    observeElements.forEach(element => {
        observer.observe(element);
    });

    // Add CSS for animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.6s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-link.active {
            color: var(--color-primary) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);

    // Typing effect for hero title (optional enhancement)
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below if you want typing effect
        // typeWriter(heroTitle, originalText, 80);
    }

    // Smooth reveal animations for sections
    const revealSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(section);
    });

    // Initialize all animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn--primary') || (this.classList.contains('btn--outline') && this.classList.contains('resume-download'))) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            }
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
});

// Utility function to handle external links
function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="https"]');
    externalLinks.forEach(link => {
        if (!link.hostname || link.hostname !== window.location.hostname) {
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
}

// Initialize external links handling
document.addEventListener('DOMContentLoaded', handleExternalLinks);