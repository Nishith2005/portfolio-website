// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initTypewriter();
    initParticles();
    initSkillBars();
    initSkillsChart();
    initProjectCards();
    initScrollAnimations();
    
    // Navigation functionality
    function initNavigation() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Typewriter effect for hero text
    function initTypewriter() {
        const typed = new Typed('#typed-text', {
            strings: [
                'Computer Science Student',
                'AI/ML Enthusiast',
                'Web Developer',
                'Mobile App Developer',
                'Researcher'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
    
    // Particle background system
    function initParticles() {
        const container = document.getElementById('particle-container');
        if (!container) return;
        
        // Create canvas for particles
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);
        
        let particles = [];
        const particleCount = 50;
        
        function resizeCanvas() {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        }
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            };
        }
        
        function initParticlesArray() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        }
        
        function updateParticles() {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            });
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(193, 120, 23, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(193, 120, 23, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
        }
        
        function animate() {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        }
        
        resizeCanvas();
        initParticlesArray();
        animate();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticlesArray();
        });
    }
    
    // Skill bars animation
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }
    
    // Skills chart using ECharts
    function initSkillsChart() {
        const chartContainer = document.getElementById('skills-chart');
        if (!chartContainer) return;
        
        const chart = echarts.init(chartContainer);
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c}%'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                textStyle: {
                    color: '#374151'
                }
            },
            series: [
                {
                    name: 'Skills',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['60%', '50%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 90, name: 'Python', itemStyle: { color: '#3B82F6' } },
                        { value: 85, name: 'Java', itemStyle: { color: '#10B981' } },
                        { value: 80, name: 'JavaScript', itemStyle: { color: '#F59E0B' } },
                        { value: 75, name: 'Flutter', itemStyle: { color: '#06B6D4' } },
                        { value: 70, name: 'HTML/CSS', itemStyle: { color: '#EF4444' } },
                        { value: 65, name: 'Arduino', itemStyle: { color: '#8B5CF6' } }
                    ]
                }
            ]
        };
        
        chart.setOption(option);
        
        // Responsive chart
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }
    
    // Project cards interaction
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', function() {
                const projectType = this.getAttribute('data-project');
                showProjectDetails(projectType);
            });
            
            // 3D tilt effect on hover
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }
    
    // Show project details modal
    function showProjectDetails(projectType) {
        const projectData = {
            healthcare: {
                title: 'Healthcare Diagnostic System',
                description: 'An innovative web-based healthcare platform featuring an interactive 3D human body model. Users can click on specific body parts to receive targeted diagnostic questions. The system uses AI-powered algorithms to analyze symptoms and provide preliminary health assessments.',
                technologies: ['JavaScript', 'Three.js', 'Node.js', 'MongoDB', 'Machine Learning'],
                features: [
                    'Interactive 3D human model with clickable body parts',
                    'AI-driven diagnostic question system',
                    'Symptom analysis and health assessment',
                    'User-friendly medical interface',
                    'Responsive design for all devices'
                ],
                github: '#',
                demo: '#'
            },
            mindlock: {
                title: 'MindLock - Mindfulness App',
                description: 'A Flutter-based mobile application designed to reduce unconscious smartphone usage through mindfulness techniques. The app features intent prompts, timed focus check-ins, and comprehensive analytics to help users develop healthier digital habits.',
                technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'Analytics'],
                features: [
                    'Mindfulness-based usage reduction',
                    'Intent prompts and focus check-ins',
                    'Behavioral analytics dashboard',
                    'Usage tracking and insights',
                    'Clean, intuitive mobile UI'
                ],
                github: '#',
                demo: '#'
            },
            research: {
                title: 'Air Quality Forecasting Research',
                description: 'Comprehensive research project developing machine learning and deep learning models to forecast urban air quality (AQI) in Hyderabad, Vijayawada, and Visakhapatnam. The study utilized five years of pollution and weather data to achieve high prediction accuracy.',
                technologies: ['Python', 'TensorFlow', 'Scikit-learn', 'Pandas', 'Matplotlib'],
                features: [
                    'Time series forecasting models',
                    'Seasonal trend analysis',
                    'High prediction accuracy',
                    'Interpretable results for policy decisions',
                    'Published in Q1 engineering journal'
                ],
                github: '#',
                paper: '#'
            }
        };
        
        const project = projectData[projectType];
        if (!project) return;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-8">
                    <div class="flex justify-between items-start mb-6">
                        <h2 class="text-3xl font-bold text-gray-800">${project.title}</h2>
                        <button class="close-modal text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                    </div>
                    
                    <p class="text-gray-600 mb-6 text-lg leading-relaxed">${project.description}</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-4">Technologies Used</h3>
                            <div class="flex flex-wrap gap-2">
                                ${project.technologies.map(tech => 
                                    `<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${tech}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                            <ul class="space-y-2">
                                ${project.features.map(feature => 
                                    `<li class="flex items-start">
                                        <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        <span class="text-gray-600">${feature}</span>
                                    </li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="flex space-x-4">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">View Code</a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" target="_blank" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors">Live Demo</a>` : ''}
                        ${project.paper ? `<a href="${project.paper}" target="_blank" class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-500 transition-colors">Read Paper</a>` : ''}
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal functionality
        modal.querySelector('.close-modal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
    
    // Scroll animations
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Add animation classes to elements
        const animatedElements = document.querySelectorAll('.project-card, .skill-item, .bg-white');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        // Reinitialize components that need resize handling
        if (window.innerWidth > 768) {
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    }, 250));
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements
        anime({
            targets: '.hero-bg h1',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1000,
            easing: 'easeOutQuart',
            delay: 500
        });
        
        anime({
            targets: '.hero-bg p',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutQuart',
            delay: 800
        });
        
        anime({
            targets: '.hero-bg .flex.flex-col.sm\\:flex-row',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutQuart',
            delay: 1200
        });
    });
    
});