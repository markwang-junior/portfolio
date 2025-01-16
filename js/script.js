// Cursor personalizado
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Efecto de escritura para el texto del hero
const texts = ['Desarrollador Web y Multiplataforma', 'Full Stack Developer', 'DAW y DAM'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
    if (count === texts.length) {
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('.typing-text').textContent = letter;
    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
}

// Iniciar efecto de escritura después de cargar
setTimeout(type, 1500);

// Animación de barras de habilidades
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const skillBar = item.querySelector('.skill-bar');
        const skillLevel = item.dataset.skill;
        
        skillBar.style.width = `${skillLevel}%`;
    });
}

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Observer para las tarjetas de proyectos
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    projectObserver.observe(card);
});

// Observer para las barras de habilidades
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelector('.skills-container')?.forEach(container => {
    skillsObserver.observe(container);
});

// Efecto de scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Cerrar menú móvil si está abierto
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('active')) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        // Cambiar el texto del botón durante el envío
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío (aquí deberías agregar tu lógica real de envío)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mostrar mensaje de éxito
        alert('Mensaje enviado con éxito!');
        
        // Resetear formulario
        contactForm.reset();
        submitBtn.textContent = 'Enviar Mensaje';
        submitBtn.disabled = false;
    });
}

// Efecto parallax para la imagen de perfil
const profileImage = document.querySelector('.profile-image-container');
if (profileImage) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const moveX = (clientX - innerWidth / 2) / 25;
        const moveY = (clientY - innerHeight / 2) / 25;
        
        profileImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}