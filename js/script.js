document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            alert('Thank you for your message. We will get back to you soon!');
            this.reset();
        });
    }
    
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }
    
    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .role-card, .media-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    document.querySelectorAll('.service-card, .role-card, .media-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Language switcher functionality
    const languageSwitch = document.getElementById('languageSwitch');
    if (languageSwitch) {
        languageSwitch.addEventListener('click', function(e) {
            e.preventDefault();
            const html = document.documentElement;
            const currentLang = html.getAttribute('lang');
            
            if (currentLang === 'ar') {
                // Switch to English
                html.setAttribute('lang', 'en');
                html.setAttribute('dir', 'ltr');
                languageSwitch.textContent = 'عربي';
                
                // Update all translatable elements to English
                updateContent('en');
            } else {
                // Switch to Arabic
                html.setAttribute('lang', 'ar');
                html.setAttribute('dir', 'rtl');
                languageSwitch.textContent = 'English';
                
                // Update all translatable elements to Arabic
                updateContent('ar');
            }
        });
    }
    
    // Function to update content based on language
    function updateContent(lang) {
        // Get all elements with data-i18n attribute
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
        
        // Update input placeholders
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang] && translations[lang][key]) {
                element.setAttribute('placeholder', translations[lang][key]);
            }
        });
    }
    
    // Translations object
    const translations = {
        en: {
            // Navigation
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.consulting': 'Consulting',
            'nav.academia': 'Academia',
            'nav.international': 'International Role',
            'nav.media': 'Media',
            'nav.contact': 'Contact',
            
            // Hero section
            'hero.title': 'Dr. Ahmed Haleem',
            'hero.subtitle': 'Bridging Academic Excellence, Sustainable Architecture, and International Collaboration',
            'hero.cta1': 'About Me',
            'hero.cta2': 'Consulting Services',
            
            // About section
            'about.title': 'About Me',
            'about.text': 'Dr. Ahmed Haleem is a distinguished architect, educator, and international consultant with a passion for sustainable design and cross-cultural collaboration. With decades of experience in both academia and professional practice, Dr. Haleem has established himself as a thought leader in architectural innovation and international partnerships.',
            'about.ceo': 'CEO & Founder',
            'about.professor': 'Associate Professor',
            'about.director': 'Director',
            
            // Contact form
            'contact.name': 'Your Name',
            'contact.email': 'Your Email',
            'contact.subject': 'Subject',
            'contact.message': 'Your Message',
            'contact.send': 'Send Message',
            'contact.download': 'Download CV',
            
            // Footer
            'footer.newsletter': 'Subscribe to Newsletter',
            'footer.subscribe': 'Subscribe',
            'footer.copyright': '© 2024 Dr. Ahmed Haleem. All Rights Reserved.',
            'footer.privacy': 'Privacy Policy',
            'footer.terms': 'Terms of Service',
            
            // Clients section
            'clients.title': 'Our Valued Clients',
            'clients.grand_imam': 'Grand Imam of Al-Azhar',
            'clients.ministry_youth': 'Ministry of Youth',
            'clients.armed_forces': 'Armed Forces Engineering Authority',
            'clients.nspa': 'National Service Projects Authority',
            'clients.aio': 'Arab International Optronics',
            'clients.dasco': 'DASCO',
            'clients.ngcs': 'National General Contracting and Supplies'
        },
        ar: {
            // Navigation
            'nav.home': 'الرئيسية',
            'nav.about': 'نبذة عني',
            'nav.consulting': 'الاستشارات',
            'nav.academia': 'الأكاديمية',
            'nav.international': 'الدور الدولي',
            'nav.media': 'الوسائط',
            'nav.contact': 'اتصل بنا',
            
            // Hero section
            'hero.title': 'د. أحمد حليم',
            'hero.subtitle': 'ربط التميز الأكاديمي، العمارة المستدامة، والتعاون الدولي',
            'hero.cta1': 'تعرف علي',
            'hero.cta2': 'خدمات استشارية',
            
            // About section
            'about.title': 'نبذة عني',
            'about.text': 'الدكتور أحمد حليم هو مهندس معماري متميز ومعلم ومستشار دولي شغوف بالتصميم المستدام والتعاون بين الثقافات. مع عقود من الخبرة في كل من الأوساط الأكاديمية والممارسة المهنية، أثبت الدكتور حليم نفسه كرائد فكري في الابتكار المعماري والشراكات الدولية.',
            'about.ceo': 'المدير التنفيذي والمؤسس',
            'about.professor': 'أستاذ مساعد',
            'about.director': 'مدير',
            
            // Contact form
            'contact.name': 'الاسم',
            'contact.email': 'البريد الإلكتروني',
            'contact.subject': 'الموضوع',
            'contact.message': 'رسالتك',
            'contact.send': 'إرسال الرسالة',
            'contact.download': 'تحميل السيرة الذاتية',
            
            // Footer
            'footer.newsletter': 'اشترك في النشرة البريدية',
            'footer.subscribe': 'اشتراك',
            'footer.copyright': '© 2024 د. أحمد حليم. جميع الحقوق محفوظة.',
            'footer.privacy': 'سياسة الخصوصية',
            'footer.terms': 'شروط الخدمة',
            
            // Clients section - Arabic
            'clients.title': 'عملاؤنا الكرام',
            'clients.grand_imam': 'دار الإفتاء المصرية',
            'clients.ministry_youth': 'وزارة الشباب والرياضة',
            'clients.armed_forces': 'الهندسة العسكرية',
            'clients.nspa': 'هيئة المجتمعات العمرانية الجديدة',
            'clients.aio': 'الشركة العربية الدولية للإلكترونيات',
            'clients.dasco': 'داسكو',
            'clients.ngcs': 'المقاولون المتحدون للمقاولات والتوريدات'
        }
    };
    
    // Initialize any tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (this.offsetWidth - tooltip.offsetWidth) / 2}px`;
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            });
        });
    });
});

// Add a simple preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});
