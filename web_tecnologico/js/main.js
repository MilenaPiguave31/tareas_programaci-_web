// ===== VARIABLES GLOBALES =====
let currentTestimonial = 0;
let portfolioData = [];
let newsData = [];

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
    loadNewsData();
    initializeEventListeners();
    initializeSlider();
    initializeFAQ();
    checkActiveSection();
});

// MENÚ MÓVIL 
function initializeEventListeners() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle menú
    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Smooth scroll para enlaces internos
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

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', handleFormSubmit);

    // Filtros del portafolio
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', filterPortfolio);
    });

    // Scroll events
    window.addEventListener('scroll', () => {
        checkActiveSection();
        handleScrollEffects();
    });
}

// CARGA DE DATOS 
function loadPortfolioData() {
    portfolioData = [
      {
            id: 1, 
            title: 'Prototipo Industrial',
            category: 'prototipos',
            image: 'img/impresion2.png',
            description: 'Pieza mecánica para maquinaria industrial'
        },
        {
            id: 2,
            title: 'Figura de Colección',
            category: 'figuras',
            image: 'img/foto.jpg',
            description: 'Figura detallada impresa en resina'
        }
    ];

    renderPortfolio('all');
}

function loadNewsData() {
    newsData = [
        {
            id: 1,
            title: 'Nueva impresora 3D de resina 4K',
            date: '05 Mar 2025',
            excerpt: 'Hemos adquirido una nueva impresora de resina 4K para mayor precisión',
             image: 'img/foto.jpg',
        },
        {
            id: 2,
            title: 'Taller de modelado 3D',
            date: '02 Mar 2025',
            excerpt: 'Aprende a modelar tus propias piezas con nuestro taller gratuito',
             image: 'img/impresion2.png'
        }
    ];

    renderNews();
}

// PORTAFOLIO 
function renderPortfolio(category) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;

    const filtered = category === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === category);

    portfolioGrid.innerHTML = filtered.map(item => `
        <div class="portfolio-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');

    // Añadir event listeners a los items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', () => openPortfolioModal(item));
    });
}

function filterPortfolio(e) {
    // Actualizar botones activos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');

    // Filtrar
    const category = e.target.dataset.filter;
    renderPortfolio(category);
}

function openPortfolioModal(item) {
    // Aquí puedes implementar un modal para ver más detalles
    console.log('Abrir modal con detalles de:', item);
}

//  NOTICIAS 
function renderNews() {
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;

    newsGrid.innerHTML = newsData.map(item => `
        <article class="news-card">
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <div class="news-date">${item.date}</div>
                <h3>${item.title}</h3>
                <p>${item.excerpt}</p>
                <a href="#" class="read-more">Leer más <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>
    `).join('');
}

//  TESTIMONIOS SLIDER 
function initializeSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');

    if (!testimonials.length) return;

    // Mostrar el primer testimonio
    testimonials[0].classList.add('active');

    // Event listeners
    prevBtn?.addEventListener('click', () => changeTestimonial(-1));
    nextBtn?.addEventListener('click', () => changeTestimonial(1));

    // Auto slide cada 5 segundos
    setInterval(() => changeTestimonial(1), 5000);
}

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    if (!testimonials.length) return;

    // Ocultar testimonio actual
    testimonials[currentTestimonial].classList.remove('active');

    // Calcular nuevo índice
    currentTestimonial = (currentTestimonial + direction + testimonials.length) % testimonials.length;

    // Mostrar nuevo testimonio
    testimonials[currentTestimonial].classList.add('active');
}

//  preguntas frecuentes (FAQ)
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });

            // Abrir el actual si no estaba activo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

//  FORMULARIO DE CONTACTO 
function handleFormSubmit(e) {
    e.preventDefault();

    // Obtener datos del formulario
    const formData = {
        name: document.getElementById('name')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        service: document.getElementById('service')?.value,
        message: document.getElementById('message')?.value
    };

    // Validación datos
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return;
    }

    if (!isValidEmail(formData.email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }

    //  envío 
    console.log('Enviando datos:', formData);
    
    // Mostrar mensaje de éxito
    showNotification('Mensaje enviado con éxito. Te contactaremos pronto.', 'success');
    
    // Resetear formulario
    e.target.reset();
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <p>${message}</p>
    `;

    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

//  SCROLL EFFECTS 
function checkActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

function handleScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'white';
        navbar.style.backdropFilter = 'none';
    }
}

//  ANIMACIONES DE ENTRADA 
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

// Observar elementos para animación
document.querySelectorAll('.service-card, .portfolio-item, .pricing-card, .news-card, .resource-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== BOTÓN VOLVER ARRIBA =====
const createBackToTopButton = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        z-index: 99;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.display = 'block';
            btn.style.animation = 'fadeIn 0.3s ease';
        } else {
            btn.style.display = 'none';
        }
    });
};

// Inicializar botón volver arriba
createBackToTopButton();

// Añadir estilos de animación al documento
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .back-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-5px);
    }
`;
document.head.appendChild(style);