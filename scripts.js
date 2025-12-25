// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
      const preloader = document.querySelector('.preloader');
      preloader.style.opacity = '0';
      setTimeout(function() {
        preloader.style.display = 'none';
        // Animate hero section elements after preloader is gone
        animateHero();
      }, 500);
    }, 1500);
  
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
      document.addEventListener('mousemove', function(e) {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
      });
      
      document.addEventListener('mouseout', function() {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
      });
      
      // Add hover effect to links and buttons
      const links = document.querySelectorAll('a, button, .filter-btn');
      links.forEach(link => {
        link.addEventListener('mouseenter', function() {
          cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorFollower.style.backgroundColor = 'rgba(78, 84, 200, 0.1)';
          cursorFollower.style.borderWidth = '0';
        });
        
        link.addEventListener('mouseleave', function() {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorFollower.style.backgroundColor = 'transparent';
          cursorFollower.style.borderWidth = '2px';
        });
      });
    }
  
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  
    // Header scroll effect
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Back to top button visibility
      const backToTopBtn = document.querySelector('.back-to-top');
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const headerHeight = header.offsetHeight;
        
        window.scrollTo({
          top: targetSection.offsetTop - headerHeight,
          behavior: 'smooth'
        });
        
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
      let current = '';
      const headerHeight = header.offsetHeight;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  
    // Hero section animation
    function animateHero() {
      // Text animation with anime.js
      const heroTitle = document.querySelector('.hero-text h1 .letters');
      const heroText = heroTitle.textContent;
      let heroHTML = '';
      
      [...heroText].forEach(char => {
        heroHTML += `<span class="letter">${char}</span>`;
      });
      
      heroTitle.innerHTML = heroHTML;
      
      anime.timeline()
        .add({
          targets: '.hero-text h1 .letter',
          opacity: [0, 1],
          translateY: [50, 0],
          easing: "easeOutExpo",
          duration: 1200,
          delay: (el, i) => 100 + 30 * i
        })
        .add({
          targets: '.hero-text p',
          opacity: [0, 1],
          translateY: [20, 0],
          easing: "easeOutExpo",
          duration: 800,
          offset: '-=500'
        })
        .add({
          targets: '.hero-buttons',
          opacity: [0, 1],
          translateY: [20, 0],
          easing: "easeOutExpo",
          duration: 800,
          offset: '-=500'
        });
        
      // Create particles for the security animation
      createParticles();
    }
  
    // Create particles for security shield animation
    function createParticles() {
      const particlesContainer = document.querySelector('.particles');
      const numParticles = 20;
      
      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position, size and animation delay
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 3 + 2;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
      }
    }
  
    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  
    // Testimonial slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    let currentSlide = 0;
    const slideWidth = 100; // 100%
    
    // Create dots
    testimonialSlides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
      
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Next slide
    nextBtn.addEventListener('click', () => {
      if (currentSlide === testimonialSlides.length - 1) {
        goToSlide(0);
      } else {
        goToSlide(currentSlide + 1);
      }
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
      if (currentSlide === 0) {
        goToSlide(testimonialSlides.length - 1);
      } else {
        goToSlide(currentSlide - 1);
      }
    });
    
    // Go to specific slide
    function goToSlide(slideIndex) {
      testimonialTrack.style.transform = `translateX(-${slideIndex * slideWidth}%)`;
      
      // Update current slide
      currentSlide = slideIndex;
      
      // Update dots
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
    }
    
    // Auto slide
    let slideInterval = setInterval(() => {
      if (currentSlide === testimonialSlides.length - 1) {
        goToSlide(0);
      } else {
        goToSlide(currentSlide + 1);
      }
    }, 5000);
    
    // Pause auto slide on hover
    testimonialTrack.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    testimonialTrack.addEventListener('mouseleave', () => {
      slideInterval = setInterval(() => {
        if (currentSlide === testimonialSlides.length - 1) {
          goToSlide(0);
        } else {
          goToSlide(currentSlide + 1);
        }
      }, 5000);
    });
  
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress .progress');
    
    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      });
    };
    
    // Initialize GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      // Animate skill cards
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });
      
      // Animate skill bars
      ScrollTrigger.create({
        trigger: '.technical-skills',
        start: 'top 80%',
        onEnter: animateSkillBars,
        once: true
      });
      
      // Animate project cards
      gsap.from('.project-card', {
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      });
      
      // Animate about section
      gsap.from('.about-image', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 1
      });
      
      gsap.from('.about-text', {
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 80%'
        },
        x: 50,
        opacity: 0,
        duration: 1
      });
      
      // Animate contact section
      gsap.from('.contact-info', {
        scrollTrigger: {
          trigger: '.contact-content',
          start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 1
      });
      
      gsap.from('.contact-form-container', {
        scrollTrigger: {
          trigger: '.contact-content',
          start: 'top 80%'
        },
        x: 50,
        opacity: 0,
        duration: 1
      });
    }
  
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address');
          return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Your message has been sent successfully!');
        contactForm.reset();
      });
    }
  
    // Add CSS particle animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
      .particle {
        position: absolute;
        background-color: rgba(0, 201, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: particleAnimation linear infinite;
      }
      
      @keyframes particleAnimation {
        0% {
          transform: translate(0, 0);
          opacity: 1;
        }
        100% {
          transform: translate(var(--x, 50px), var(--y, 50px));
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
      // Set random movement direction for each particle
  document.querySelectorAll('.particle').forEach(particle => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    particle.style.setProperty('--x', `${x}px`);
    particle.style.setProperty('--y', `${y}px`);
  });

  // Typing effect for section headers
  const sectionHeaders = document.querySelectorAll('.section-header h2');
  
  if (typeof ScrollTrigger !== 'undefined') {
    sectionHeaders.forEach(header => {
      const text = header.textContent;
      const words = text.split(' ');
      let html = '';
      
      words.forEach(word => {
        if (word.includes('<span')) {
          html += word + ' ';
        } else {
          html += `<span class="word">${word} </span>`;
        }
      });
      
      header.innerHTML = html;
      
      gsap.from(header.querySelectorAll('.word'), {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%'
        },
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8
      });
    });
  }

  // Initialize AOS (Animate on Scroll) if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true
    });
  }

  // Project details modal
  const projectLinks = document.querySelectorAll('.project-link');
  
  projectLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const projectCard = this.closest('.project-card');
      const projectTitle = projectCard.querySelector('h3').textContent;
      const projectDesc = projectCard.querySelector('p').textContent;
      const projectImg = projectCard.querySelector('img').src;
      
      // Create modal
      const modal = document.createElement('div');
      modal.classList.add('project-modal');
      
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div class="modal-header">
            <h3>${projectTitle}</h3>
          </div>
          <div class="modal-body">
            <img src="${projectImg}" alt="${projectTitle}">
            <div class="modal-description">
              <h4>Project Overview</h4>
              <p>${projectDesc}</p>
              <h4>Technologies Used</h4>
              <div class="modal-tech">
                ${Array.from(projectCard.querySelectorAll('.project-tech span')).map(span => 
                  `<span>${span.textContent}</span>`
                ).join('')}
              </div>
              <h4>Key Features</h4>
              <ul>
                <li>Feature 1: Detailed description of this feature</li>
                <li>Feature 2: Detailed description of this feature</li>
                <li>Feature 3: Detailed description of this feature</li>
              </ul>
              <h4>Challenges & Solutions</h4>
              <p>Description of challenges faced during the project and how they were overcome.</p>
              <div class="modal-buttons">
                <a href="#" class="btn primary-btn">View Live Demo</a>
                <a href="#" class="btn secondary-btn">View Source Code</a>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.classList.add('no-scroll');
      
      // Animate modal
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
      
      // Close modal
      const closeBtn = modal.querySelector('.close-modal');
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(modal);
          document.body.classList.remove('no-scroll');
        }, 300);
      });
      
      // Close modal when clicking outside
      modal.addEventListener('click', function(e) {
        if (e.target === this) {
          modal.classList.remove('active');
          setTimeout(() => {
            document.body.removeChild(modal);
            document.body.classList.remove('no-scroll');
          }, 300);
        }
      });
    });
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[type="email"]').value;
      
      // Simple validation
      if (!email) {
        alert('Please enter your email address');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Here you would typically send the form data to a server
      // For now, we'll just show a success message
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
    });
  }

  // Add CSS for modal
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    .project-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    .project-modal.active {
      opacity: 1;
      visibility: visible;
    }
    
    .modal-content {
      background-color: white;
      width: 90%;
      max-width: 1000px;
      max-height: 90vh;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      transform: translateY(50px);
      opacity: 0;
      transition: transform 0.5s ease, opacity 0.5s ease;
    }
    
    .project-modal.active .modal-content {
      transform: translateY(0);
      opacity: 1;
    }
    
    .close-modal {
      position: absolute;
      top: 20px;
      right: 20px;
      font-size: 30px;
      color: #333;
      cursor: pointer;
      z-index: 1;
    }
    
    .modal-header {
      padding: 20px 30px;
      border-bottom: 1px solid #eee;
    }
    
    .modal-header h3 {
      font-size: 24px;
      margin: 0;
    }
    
    .modal-body {
      padding: 0;
      overflow-y: auto;
      max-height: calc(90vh - 70px);
      display: flex;
      flex-direction: column;
    }
    
    .modal-body img {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
    }
    
    .modal-description {
      padding: 30px;
    }
    
    .modal-description h4 {
      font-size: 20px;
      margin: 20px 0 10px;
    }
    
    .modal-description p {
      margin-bottom: 15px;
      color: #666;
    }
    
    .modal-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .modal-tech span {
      padding: 5px 15px;
      background-color: #f5f5f5;
      border-radius: 20px;
      font-size: 14px;
      color: #666;
    }
    
    .modal-description ul {
      margin-bottom: 20px;
      padding-left: 20px;
    }
    
    .modal-description li {
      margin-bottom: 10px;
      color: #666;
    }
    
    .modal-buttons {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }
    
    .no-scroll {
      overflow: hidden;
    }
    
    @media screen and (min-width: 768px) {
      .modal-body {
        flex-direction: row;
      }
      
      .modal-body img {
        width: 50%;
        max-height: none;
        height: auto;
      }
      
      .modal-description {
        width: 50%;
        padding: 30px;
      }
    }
    
    @media screen and (max-width: 767px) {
      .modal-buttons {
        flex-direction: column;
      }
      
      .modal-buttons .btn {
        width: 100%;
      }
    }
  `;
  document.head.appendChild(modalStyle);

  // Theme switcher
  const createThemeSwitcher = () => {
    const themeSwitch = document.createElement('div');
    themeSwitch.classList.add('theme-switch');
    themeSwitch.innerHTML = `
      <div class="theme-switch-toggle">
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
        <span class="slider"></span>
      </div>
    `;
    
    document.body.appendChild(themeSwitch);
    
    // Add CSS for theme switcher
    const themeSwitchStyle = document.createElement('style');
    themeSwitchStyle.textContent = `
      .theme-switch {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 99;
      }
      
      .theme-switch-toggle {
        width: 60px;
        height: 30px;
        background-color: white;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 5px;
        position: relative;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      
      .theme-switch-toggle i {
        font-size: 16px;
        color: #333;
        z-index: 1;
      }
      
      .theme-switch-toggle .fa-sun {
        color: #f1c40f;
      }
      
      .theme-switch-toggle .fa-moon {
        color: #2c3e50;
      }
      
      .theme-switch-toggle .slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 26px;
        height: 26px;
        background-color: var(--primary-color);
        border-radius: 50%;
        transition: transform 0.3s ease;
      }
      
      body.dark-theme {
        --bg-color: #1a1a2e;
        --bg-light: #16213e;
        --text-color: #e6e6e6;
        --text-light: #b3b3b3;
        --border-color: #2a2a4a;
      }
      
      body.dark-theme .theme-switch-toggle .slider {
        transform: translateX(30px);
      }
      
      body.dark-theme header.scrolled {
        background-color: rgba(26, 26, 46, 0.95);
      }
      
      body.dark-theme .skill-card,
      body.dark-theme .project-card,
      body.dark-theme .contact-form,
      body.dark-theme .testimonial-content {
        background-color: #16213e;
      }
      
      body.dark-theme .project-tech span {
        background-color: #1a1a2e;
      }
    `;
    document.head.appendChild(themeSwitchStyle);
    
    // Toggle theme
    const themeToggle = document.querySelector('.theme-switch-toggle');
    
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      // Save theme preference
      if (document.body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    }
  };
  
  // Initialize theme switcher
  createThemeSwitcher();
});
