// Initialize GSAP ScrollTrigger
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// Initialisation d'EmailJS avec plus de logs
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing EmailJS...');
    emailjs.init("yRb-j4b6K4CJSyp5A");
    console.log('EmailJS initialized successfully');

    // Variables globales
    const nav = document.querySelector('.main-nav');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const rsvpForm = document.getElementById('rsvpForm');
    const merciForm = document.getElementById('merciForm');
    const sections = document.querySelectorAll('section');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const headings = document.querySelectorAll('h2');
    const formGroups = document.querySelectorAll('.form-group');
    const dressCodeQuote = document.querySelector('.dress-code-quote');
    let lastScroll = 0;

    // Audio elements
    const audioToggle = document.getElementById('toggleAudio');
    const ambientSound = document.getElementById('ambientSound');
    let isAudioPlaying = false;

    // Get the existing confirmation message element
    const confirmationMsg = document.getElementById('confirmation');
    const merciConfirmationMsg = document.getElementById('merciConfirmation');

    // Create and append UI elements
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Audio toggle button
    if (audioToggle && ambientSound) {
        audioToggle.addEventListener('click', async () => {
            try {
                if (!isAudioPlaying) {
                    await ambientSound.play();
                    ambientSound.volume = 0.8;
                    audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                    isAudioPlaying = true;
                } else {
                    ambientSound.pause();
                    audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    isAudioPlaying = false;
                }
            } catch (error) {
                console.error('Error toggling audio:', error);
            }
        });
    }

    // Initial animations for the hero section
    if (typeof gsap !== 'undefined') {
        gsap.from('.hero-content', {
            opacity: 0,
            y: 30,
            duration: 0.8
        });
        
        gsap.from('h1', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.3
        });
        
        gsap.from('.tagline', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.6
        });
        
        gsap.from('.cta-button', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.9
        });
    }

    // Navigation Scroll Effect
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        if (currentScroll <= 0) {
            nav.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-up');
            nav.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
            nav.classList.remove('scroll-down');
            nav.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;

        // Update scroll progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;

        // Update active nav link based on current section
        sections.forEach(section => {
            const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
            if (!link) return;
            const sectionTop = section.offsetTop - (nav.offsetHeight + 20);
            const sectionBottom = sectionTop + section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    // Mobile menu functionality
    const navItems = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        mobileMenuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && !e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-toggle')) {
            toggleMenu();
        }
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Prevent menu from closing when clicking inside
    navLinks.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Improve scroll behavior for mobile
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Fix iOS Safari 100vh issue
    function setVhVariable() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    window.addEventListener('load', setVhVariable);
    window.addEventListener('resize', setVhVariable);

    // Form Submission
    if (rsvpForm && confirmationMsg) {
        console.log('RSVP form found in the document');
        
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Form submitted, preparing to send emails...');
            
            const formData = new FormData(rsvpForm);
            const data = {
                nom: formData.get('nom'),
                prenom: formData.get('prenom'),
                email: formData.get('email'),
                presence: formData.get('presence'),
                message: formData.get('message')
            };
            
            console.log('Form data collected:', data);

            try {
                console.log('Sending email to organizer...');
                
                // Envoyer l'email à l'organisateur avec le service et template corrects
                const organizerResponse = await emailjs.send(
                    "service_8dunhrv", 
                    "template_l167fad", 
                    {
                        // Fixé: Organizer's email is hardcoded, no using submitted email
                        from_name: `${data.prenom} ${data.nom}`,
                        from_email: data.email,
                        nom: data.nom,
                        prenom: data.prenom,
                        email: data.email,
                        presence: data.presence,
                        message: data.message || "Aucun message"
                    }
                );
                
                console.log('Organizer email sent successfully:', organizerResponse);
                
                console.log('Sending confirmation email...');
                
                // Envoyer l'email de confirmation avec le service et template corrects
                const confirmationResponse = await emailjs.send(
                    "service_8dunhrv", 
                    "template_xfdtcqn", 
                    {
                        to_name: `${data.prenom} ${data.nom}`,
                        to_email: data.email,
                        from_name: "La Bella Serata",
                        nom: data.nom,
                        prenom: data.prenom,
                        presence: data.presence,
                        message: data.message || "Aucun message"
                    }
                );
                
                console.log('Confirmation email sent successfully:', confirmationResponse);

                // Afficher le message de succès
                confirmationMsg.innerHTML = `Merci pour votre réponse !<br>Un mail de confirmation a été envoyé à<br>${data.email}.`;
                confirmationMsg.style.display = 'block';
                
                // Cacher le formulaire
                rsvpForm.style.display = 'none';
                
                // Scroll to the confirmation message
                setTimeout(() => {
                    confirmationMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                
                // Réinitialiser le formulaire pour une utilisation future
                rsvpForm.reset();
                
                console.log('Form submission complete!');

            } catch (error) {
                console.error('Erreur détaillée lors de l\'envoi des emails:', error);
                alert('Une erreur est survenue lors de l\'envoi de votre réponse. Veuillez réessayer.');
            }
        });
    } else {
        console.warn('RSVP form or confirmation element not found in the document!');
    }

    // Merci Form Submission
    if (merciForm && merciConfirmationMsg) {
        console.log('Merci form found in the document');
        merciForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Merci form submitted, preparing to send email...');

            const formData = new FormData(merciForm);
            const data = {
                nom: formData.get('merciNom'),
                prenom: formData.get('merciPrenom'),
                email: formData.get('merciEmail'),
                message: formData.get('merciMessage')
            };

            console.log('Merci form data collected:', data);

            try {
                console.log('Sending Merci email to organizer...');
                // Envoi du message de remerciement à labellaserrata@gmail.com via EmailJS
                const merciResponse = await emailjs.send(
                    "service_8dunhrv",
                    "template_pgnk8ti",
                    {
                        name: `${data.prenom} ${data.nom}`,
                        email: data.email,
                        message: data.message || "Aucun message",
                        title: "Remerciement",
                        time: new Date().toLocaleString()
                    }
                );

                console.log('Merci email sent successfully:', merciResponse);

                merciForm.reset();
                merciConfirmationMsg.style.display = 'block';
                merciConfirmationMsg.textContent = "Votre message a bien été envoyé, merci !";
                merciConfirmationMsg.style.color = "#0879B0";

                // Scroll to center the confirmation message
                merciConfirmationMsg.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });

                // Hide confirmation message after a few seconds
                setTimeout(() => {
                    merciConfirmationMsg.style.display = 'none';
                }, 7000);

            } catch (error) {
                console.error('Error sending Merci email:', error);
                merciConfirmationMsg.textContent = "Une erreur s'est produite lors de l'envoi du message : " + (error.text || error.message || error);
                merciConfirmationMsg.style.color = "red";
                merciConfirmationMsg.style.display = 'block';
            }
        });
    }

    // Smooth Scroll with nav offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Use scrollIntoView for better compatibility
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Offset for fixed nav after scroll
                setTimeout(() => {
                const navHeight = nav.offsetHeight;
                    window.scrollBy({ top: -navHeight, left: 0, behavior: 'instant' });
                }, 400);
            }
            // Always close the mobile menu after navigation
            if (navLinks.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ===== ANIMATIONS AMÉLIORÉES =====
    
    // Animation des sections au défilement
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Observateur pour les sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Smooth fade-in and upward movement for all sections
                if (typeof gsap !== 'undefined') {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 1.1,
                        ease: 'power2.out',
                    });
                } else {
                entry.target.classList.add('visible');
                }
                sectionObserver.unobserve(entry.target);
                
                // Dress Code section: fade in gallery items with stagger
                if (entry.target.id === 'dress-code') {
                    setTimeout(() => {
                        if (typeof gsap !== 'undefined') {
                            const galleryItems = entry.target.querySelectorAll('.gallery-item');
                            gsap.fromTo(galleryItems, {
                                opacity: 0,
                                y: 40
                            }, {
                                opacity: 1,
                                y: 0,
                                duration: 0.9,
                                stagger: 0.08,
                                ease: 'power2.out',
                            });
                        }
                        if (dressCodeQuote) {
                        dressCodeQuote.classList.add('visible');
                        }
                    }, 500);
                }
            }
        });
    }, observerOptions);

    // Observateur pour les titres
    const headingsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(entry.target, {
                        opacity: 1,
                        y: 0,
                        duration: 1.1,
                        ease: 'power2.out',
                    });
                } else {
                entry.target.classList.add('visible');
                }
                headingsObserver.unobserve(entry.target);
                
                // Animate form groups if this heading belongs to the RSVP section
                if (entry.target.closest('#rsvp')) {
                    animateFormGroups();
                }
            }
        });
    }, observerOptions);

    // Animer les éléments du formulaire avec délai
    function animateFormGroups() {
        // Option 1: Animation progressive (activée pour RSVP section)
        const useFormAnimation = true; // Enabled to reveal form fields progressively
        
        if (useFormAnimation) {
            // Ajouter d'abord la classe animate pour préparer l'animation
            formGroups.forEach(group => {
                group.classList.add('animate');
            });
            
            // Puis ajouter la classe visible avec délai
            formGroups.forEach((group, index) => {
                setTimeout(() => {
                    group.classList.add('visible');
                }, 100 * index);
            });
        }
    }

    // Observer les sections et titres
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    headings.forEach(heading => {
        headingsObserver.observe(heading);
    });

    // Animation pour l'effet de parallaxe lors du défilement
    if (typeof gsap !== 'undefined') {
        const parallaxElements = document.querySelectorAll('.hero-content, .names, .date, .tagline');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.classList.contains('hero-content') ? 0.5 : 0.7;
                const yPos = -(scrollPosition * speed / 10);
                gsap.to(element, {
                    y: yPos,
                    ease: 'power1.out',
                    duration: 0.3
                });
            });
        });
        
        // Animate side images when sections become visible
        const sideImages = document.querySelectorAll('.section-side-image');
        if (sideImages.length > 0) {
            // Initial state: reduced opacity
            gsap.set(sideImages, { opacity: 0.4 });
            
            // Create animation for each side image
            sideImages.forEach(img => {
                const parentSection = img.closest('.section');
                
                if (parentSection) {
                    ScrollTrigger.create({
                        trigger: parentSection,
                        start: 'top 80%',
                        onEnter: () => {
                            // Fade in and subtle scale when section becomes visible
                            gsap.to(img, {
                                opacity: 0.85,
                                scale: 1,
                                duration: 1.2,
                                ease: 'power2.out'
                            });
                        }
                    });
                }
            });
        }
        
        // Animer les éléments de la galerie avec un effet de cascade
        const gallerySection = document.getElementById('dress-code');
        if (gallerySection) {
            const galleryItems = gallerySection.querySelectorAll('.gallery-item');
            
            // Créer une timeline pour l'animation en grille
            const galleryTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: gallerySection,
                    start: 'top 70%',
                    toggleActions: 'play none none none'
                }
            });
            
            // Réorganiser les éléments pour une animation plus intéressante
            const chunks = Math.ceil(galleryItems.length / 4); // 4 éléments par groupe
            
            for (let i = 0; i < chunks; i++) {
                const chunk = Array.from(galleryItems).slice(i * 4, (i + 1) * 4);
                
                galleryTimeline.from(chunk, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out'
                }, i * 0.2); // Décalage entre les groupes
            }
        }
    }

    // Gallery Lightbox avec animation améliorée
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            // Use highest quality/original image for lightbox
            const fullSizeSrc = img.src;
            lightboxImg.src = fullSizeSrc;
            lightboxImg.alt = img.alt;
            
            const closeButton = document.createElement('button');
            closeButton.className = 'close-lightbox';
            closeButton.innerHTML = '&times;';
            
            // Créer un loader pour l'image
            const loader = document.createElement('div');
            loader.className = 'lightbox-loader';
            loader.innerHTML = '<div class="spinner"></div>';
            
            lightboxContent.appendChild(loader);
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(closeButton);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Attendre que l'image soit chargée
            lightboxImg.onload = () => {
                // Ensure image displays at its natural dimensions up to max container size
                lightboxImg.style.width = 'auto';
                lightboxImg.style.height = 'auto';
                loader.style.display = 'none';
            };
            
            if (typeof gsap !== 'undefined') {
                // Animation d'ouverture
                gsap.from(lightbox, {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    duration: 0.4,
                    ease: 'power2.out'
                });
                
                gsap.from(lightboxContent, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 0.5,
                    delay: 0.1,
                    ease: 'back.out(1.7)'
                });
                
                // Fermeture avec animation
                const closeLightbox = () => {
                    gsap.to(lightboxContent, {
                        scale: 0.9,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in'
                    });
                    
                    gsap.to(lightbox, {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        duration: 0.4,
                        delay: 0.1,
                        onComplete: () => lightbox.remove()
                    });
                };
                
                closeButton.addEventListener('click', closeLightbox);
                
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        closeLightbox();
                    }
                });
            } else {
                // Fallback sans GSAP
                closeButton.addEventListener('click', () => {
                    lightbox.remove();
                });
                
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox) {
                        lightbox.remove();
                    }
                });
            }
        });
    });

    // Initialize 3D tilt on gallery items
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(galleryItems, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
            scale: 1.02,
        });
    }

    // Dynamically generate the dress-code gallery
    const galleryContainer = document.getElementById('gallery');
    if (galleryContainer) {
        galleryContainer.innerHTML = '';
        const imageCount = 42; // There are 42 images, numbered 1.jpeg to 42.jpeg
        for (let i = 1; i <= imageCount; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            const img = document.createElement('img');
            img.src = `assets/gallery/${i}.jpeg`;
            img.alt = `Dress Code ${i}`;
            img.loading = 'lazy';
            img.onerror = function() {
                item.style.display = 'none';
            };
            item.appendChild(img);
            galleryContainer.appendChild(item);
        }
    }

    // Immediately reveal RSVP form fields
    animateFormGroups();

    // Magnifier Lens for Hero Background
    const hero = document.querySelector('.hero');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (hero && !isTouchDevice) {
        const magnifier = document.createElement('div');
        magnifier.className = 'magnifier';
        document.body.appendChild(magnifier);
        const zoom = 1.5;
        hero.addEventListener('mousemove', e => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            // Position lens, ensure it is visible
            magnifier.style.display = 'block';
            const lensSize = magnifier.offsetWidth;
            magnifier.style.left = `${e.pageX - lensSize/2}px`;
            magnifier.style.top = `${e.pageY - lensSize/2}px`;
            // Update magnifier background to zoom correctly at cursor
            const bgImage = window.getComputedStyle(hero).backgroundImage;
            magnifier.style.backgroundImage = bgImage;
            magnifier.style.backgroundSize = `${rect.width * zoom}px ${rect.height * zoom}px`;
            magnifier.style.backgroundPosition = `${-(x * zoom - lensSize/2)}px ${-(y * zoom - lensSize/2)}px`;
        });
        hero.addEventListener('mouseleave', () => {
            magnifier.style.display = 'none';
        });
    }

    // --- Ensure music starts on first user interaction (mobile/desktop) ---
    if (ambientSound) {
        const tryPlayAudio = () => {
            ambientSound.muted = false;
            ambientSound.volume = 0.8;
            ambientSound.play().then(() => {
                isAudioPlaying = true;
                if (audioToggle) {
                    audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            }).catch(() => {});
            // Remove listeners after first interaction
            document.removeEventListener('click', tryPlayAudio);
            document.removeEventListener('touchstart', tryPlayAudio);
        };
        document.addEventListener('click', tryPlayAudio);
        document.addEventListener('touchstart', tryPlayAudio);
    }

    // Fix 100vh on mobile browsers (iOS/Android) for .hero
    window.addEventListener('DOMContentLoaded', function() {
      function setVhVariable() {
        var vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
      }
      setVhVariable();
      window.addEventListener('resize', setVhVariable);
    });
});