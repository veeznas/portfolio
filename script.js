// DOM Elements
const navbar = document.querySelector('.dock');
const dockItems = document.querySelectorAll('.dock-item');

// Highlight active dock item on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    dockItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const checkReveal = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', checkReveal);
// Initial check
checkReveal();


// Typing Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span><span class="txt-cursor">|</span>`;

        // Initial Type Speed
        let typeSpeed = 200;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init TypeWriter
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('.txt-type');
    if (txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
}

// Splash Screen Logic
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
        }, 500);
    }, 2500); // 2.5 seconds display time
});

// Count Up Animation
const stats = document.querySelectorAll('.count-up');

const observeStats = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = +entry.target.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    entry.target.innerText = Math.ceil(current) + (target === 100 ? '%' : '+');
                    requestAnimationFrame(updateCount);
                } else {
                    entry.target.innerText = target + (target === 100 ? '%' : '+');
                }
            };

            updateCount();
            observer.unobserve(entry.target);
        }
    });
});

stats.forEach(stat => {
    observeStats.observe(stat);
});

// Ops Terminal Animation (Typing Effect)
const runOpsTerminalAnimation = async () => {
    const container = document.getElementById('ops-terminal-content');
    if (!container) return; // Guard clause

    const typeText = async (element, text, speed = 40) => {
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            await new Promise(r => setTimeout(r, speed));
        }
    };

    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    // Content Cycle: Docker Status -> Suggest Projects -> K8s Optimization
    while (true) {
        container.innerHTML = ''; // Clear terminal

        // --- Sequence 1: Docker Check (Existing) ---
        const line1 = document.createElement('div');
        line1.innerHTML = '<span class="cmd-prompt">$</span><span class="cmd-val"></span><span class="cursor-blink">_</span>';
        container.appendChild(line1);

        const cmd1 = line1.querySelector('.cmd-val');
        const cursor1 = line1.querySelector('.cursor-blink');

        await wait(1000);
        cursor1.style.display = 'inline';
        await typeText(cmd1, 'check_status docker');
        cursor1.remove();

        await wait(200);
        const out1 = document.createElement('div');
        out1.className = 'text-gray-400 fade-in';
        out1.innerHTML = 'Daemon: <span class="text-green-400 font-bold">ACTIVE</span>';
        container.appendChild(out1);

        // --- Sequence 2: Project Ideas (New Content) ---
        await wait(1000);
        const line2 = document.createElement('div');
        line2.className = 'mt-2';
        line2.innerHTML = '<span class="cmd-prompt">$</span><span class="cmd-val"></span><span class="cursor-blink">_</span>';
        container.appendChild(line2);

        const cmd2 = line2.querySelector('.cmd-val');
        const cursor2 = line2.querySelector('.cursor-blink');
        await typeText(cmd2, 'list_ideas --type=portfolio');
        cursor2.remove();

        await wait(300);
        const projects = [
            { name: '1. Full CI/CD', desc: 'GitHub -> Jenkins -> K8s', color: 'text-cyan-400' },
            { name: '2. Cloud Native', desc: 'FastAPI + S3 + EC2', color: 'text-purple-400' },
            { name: '3. Observability', desc: 'Prometheus + Grafana', color: 'text-yellow-400' }
        ];

        for (let p of projects) {
            await wait(150);
            const pRow = document.createElement('div');
            pRow.className = 'mt-1 text-sm';
            pRow.innerHTML = `<span class="${p.color}">${p.name}</span> <span class="text-gray-500">// ${p.desc}</span>`;
            container.appendChild(pRow);
        }

        // --- Sequence 3: Optimization Suggestion ---
        await wait(1200);
        const line3 = document.createElement('div');
        line3.className = 'mt-2';
        line3.innerHTML = '<span class="cmd-prompt">$</span><span class="cmd-val"></span><span class="cursor-blink">_</span>';
        container.appendChild(line3);

        const cmd3 = line3.querySelector('.cmd-val');
        const cursor3 = line3.querySelector('.cursor-blink');
        await typeText(cmd3, 'optimize_k8s --dry-run');
        cursor3.remove();

        await wait(400);
        const opts = [
            { msg: '> Analyzing Pods...', status: 'OK', sColor: 'text-green-400' },
            { msg: '> Suggestion: Use Deployments', status: 'WARN', sColor: 'text-yellow-400' },
            { msg: '> Suggestion: Enable HPA', status: 'INFO', sColor: 'text-blue-400' }
        ];

        for (let o of opts) {
            await wait(200);
            const oRow = document.createElement('div');
            oRow.className = 'text-gray-400 text-sm';
            oRow.innerHTML = `${o.msg} <span class="${o.sColor} ml-2">[${o.status}]</span>`;
            container.appendChild(oRow);
        }

        // --- Final: Waiting for Input ---
        await wait(800);
        const lineEnd = document.createElement('div');
        lineEnd.className = 'mt-2';
        lineEnd.innerHTML = '<span class="cmd-prompt">$</span><span class="cursor-blink">_</span>';
        container.appendChild(lineEnd);

        // Long pause before restart
        await wait(5000);
    }
};

document.addEventListener('DOMContentLoaded', runOpsTerminalAnimation);

// Custom Cursor Tracking Effect
const createCursorTrail = () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorTrail = [];
    const trailLength = 20;

    // Create trail elements
    for (let i = 0; i < trailLength; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrail.push({
            element: trail,
            x: 0,
            y: 0
        });
    }

    let mouseX = 0;
    let mouseY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update main cursor
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Animate trail
    const animateTrail = () => {
        let currentX = mouseX;
        let currentY = mouseY;

        cursorTrail.forEach((trail, index) => {
            // Smooth following effect
            trail.x += (currentX - trail.x) * 0.3;
            trail.y += (currentY - trail.y) * 0.3;

            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';

            // Scale based on position in trail
            const scale = 1 - (index / trailLength) * 0.8;
            trail.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
            trail.element.style.opacity = 1 - (index / trailLength);

            currentX = trail.x;
            currentY = trail.y;
        });

        requestAnimationFrame(animateTrail);
    };

    animateTrail();
};

// Initialize cursor tracking
createCursorTrail();
