// Inizialisiere AOS Animationen
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Globale Variablen
let isModelRotating = false;
let modelRotationInterval;

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav) {
        mobileNav.classList.toggle('active');
        
        // Body scrolling verhindern, solange Menü geöffnet ist
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Zu Section scrollen
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Mobile menu schließen, falls schon geöffnet
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav && mobileNav.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// 3D Modell Steuerung
function rotateModel(direction) {
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        // Basic rotation simulation
        const currentTransform = splineViewer.style.transform || 'rotateY(0deg)';
        const rotationMatch = currentTransform.match(/rotateY\((-?\d+)deg\)/);
        const currentRotation = rotationMatch ? parseInt(rotationMatch[1]) : 0;
        
        const newRotation = direction === 'left' ? 
            currentRotation - 30 : currentRotation + 30;
        
        splineViewer.style.transform = `rotateY(${newRotation}deg)`;
        splineViewer.style.transition = 'transform 0.5s ease';
        
        // Visuellles Feedback
        showNotification(`Modell ${direction === 'left' ? 'nach links' : 'nach rechts'} gedreht`);
    }
}

function resetModel() {
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        splineViewer.style.transform = 'rotateY(0deg)';
        splineViewer.style.transition = 'transform 0.5s ease';
        showNotification('Modellansicht zurückgesetzt');
    }
}

// Code Beispiele
function showCode(example) {
    const examples = {
        'einbettung': {
            title: 'Spline in HTML einbetten',
            code: `<!-- Spline in HTML einbetten -->
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meine Spline Szene</title>
</head>
<body>
    <!-- Spline Viewer Script laden -->
    <script type="module" 
        src="https://unpkg.com/@splinetool/viewer@1.10.68/build/spline-viewer.js">
    </script>

    <!-- Spline Szene einbetten -->
    <spline-viewer 
        url="https://prod.spline.design/DEINE-SPLINE-URL-HIER/scene.splinecode"
        style="width: 100%; height: 500px;">
    </spline-viewer>

    <style>
        /* Spline Viewer Styling */
        spline-viewer {
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
            spline-viewer {
                height: 300px;
            }
        }
    </style>
</body>
</html>`
        },
        'events': {
            title: 'Spline Events verarbeiten',
            code: `// Spline Events in JavaScript verarbeiten
document.addEventListener('DOMContentLoaded', () => {
    const splineViewer = document.querySelector('spline-viewer');
    
    if (splineViewer) {
        // Warten bis Spline geladen ist
        splineViewer.addEventListener('load', () => {
            console.log('Spline Szene wurde geladen');
        });
        
        // Event Listener für Spline Events
        splineViewer.addEventListener('mouseHover', (event) => {
            console.log('Objekt wurde überfahren:', event.target.name);
            splineViewer.style.cursor = 'pointer';
        });
        
        splineViewer.addEventListener('mouseDown', (event) => {
            console.log('Objekt wurde geklickt:', event.target.name);
            
            if (event.target.name === 'Button') {
                alert('Spline Button wurde geklickt!');
            }
        });
        
        splineViewer.addEventListener('mouseUp', () => {
            splineViewer.style.cursor = 'default';
        });
        
        // Fehlerbehandlung
        splineViewer.addEventListener('error', (error) => {
            console.error('Fehler beim Laden der Spline Szene:', error);
        });
    }
});`
        },
        'responsive': {
            title: 'Responsive Spline Integration',
            code: `// Responsive Spline-Viewer mit JavaScript
function setupResponsiveSpline(selector, splineUrl) {
    const viewer = document.querySelector(selector);
    if (!viewer) return;
    
    // Viewport-basierte Größenanpassung
    function updateSize() {
        const width = window.innerWidth;
        
        if (width < 768) {
            // Mobile
            viewer.style.height = '300px';
        } else if (width < 1024) {
            // Tablet
            viewer.style.height = '400px';
        } else {
            // Desktop
            viewer.style.height = '600px';
        }
    }
    
    // Initial size
    updateSize();
    
    // Resize Listener
    window.addEventListener('resize', updateSize);
    
    // Spline URL setzen
    viewer.setAttribute('url', splineUrl);
    
    // Event Listener
    viewer.addEventListener('load', () => {
        console.log('Spline erfolgreich geladen');
    });
    
    viewer.addEventListener('error', (error) => {
        console.error('Spline Ladefehler:', error);
    });
}

// Verwendung:
document.addEventListener('DOMContentLoaded', () => {
    setupResponsiveSpline(
        'spline-viewer', 
        'https://prod.spline.design/DEINE-URL/scene.splinecode'
    );
});`
        }
    };
    
    const codeExample = examples[example];
    if (codeExample) {
        const codeTitle = document.getElementById('codeTitle');
        const codeContent = document.getElementById('codeContent');
        const codeModal = document.getElementById('codeModal');
        
        if (codeTitle && codeContent && codeModal) {
            codeTitle.textContent = codeExample.title;
            codeContent.innerHTML = `<code>${escapeHtml(codeExample.code)}</code>`;
            codeModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
}

function copyCode() {
    const codeContent = document.getElementById('codeContent');
    if (!codeContent) return;
    
    const text = codeContent.textContent;
    
    // In Zwischenablage kopieren
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('📋 Code in Zwischenablage kopiert!');
        }).catch(() => {
            fallbackCopyCode(text);
        });
    } else {
        fallbackCopyCode(text);
    }
}

function fallbackCopyCode(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('📋 Code in Zwischenablage kopiert!');
    } catch (err) {
        showNotification('❌ Kopieren fehlgeschlagen');
    }
    
    document.body.removeChild(textArea);
}

// Dokumentation Funktionen
function toggleDocCategory(element) {
    if (!element) return;
    
    element.classList.toggle('active');
    
    // Andere Kategorien schließen
    const categories = document.querySelectorAll('.doc-category');
    categories.forEach(category => {
        if (category !== element) {
            category.classList.remove('active');
        }
    });
}

// Dialogfenster Funktionen
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Utility Funktionen
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message) {
    // Existierende Benachrichtigungen entfernen
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    });
    
    // Element zum erstellen von Benachrichtigungen
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #6600c5, #7f42a7);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(102, 0, 197, 0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animieren in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Nach delay entfernen
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

// Statistik Counter Animation
function animateCounter(element, target) {
    if (!element) return;
    
    const start = 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}

// Spline Watermark entfernen
function hideSplineWatermark() {
    const viewers = document.querySelectorAll("spline-viewer");
    viewers.forEach(viewer => {
        if (viewer.shadowRoot) {
            const watermarkSelectors = [
                '.watermark', 
                '.logo', 
                '[class*="watermark"]', 
                '[class*="logo"]',
                '[class*="branding"]',
                'a[href*="spline"]'
            ];
            
            watermarkSelectors.forEach(selector => {
                try {
                    const elements = viewer.shadowRoot.querySelectorAll(selector);
                    elements.forEach(element => {
                        element.style.display = "none";
                        element.style.visibility = "hidden";
                        element.style.opacity = "0";
                    });
                } catch (error) {
                    // Errors ignorieren wenn auf Shadow DOM zugegriffen wird
                }
            });
        }
    });
}

// Alles inizialisieren wenn DOM geladen wird
document.addEventListener('DOMContentLoaded', () => {
    // Statistik Animation
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count')) || 0;
                    animateCounter(entry.target, target);
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        stats.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    // Spline Watermark entfernen
    const hideWatermarkInterval = setInterval(hideSplineWatermark, 200);
    setTimeout(() => clearInterval(hideWatermarkInterval), 10000);
    
    // Optionale Versuche zu verschiedenen Zeiten
    setTimeout(hideSplineWatermark, 1000);
    setTimeout(hideSplineWatermark, 3000);
    setTimeout(hideSplineWatermark, 5000);
    
    // Mobile menu schließen wenn auf Links geklickt wird
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileNav = document.getElementById('mobileNav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // Spline-spezifische event listeners
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
        splineViewer.addEventListener('load', () => {
            console.log('Spline-Szene erfolgreich geladen');
            hideSplineWatermark();
        });
        
        splineViewer.addEventListener('error', (error) => {
            console.error('Fehler beim Laden der Spline-Szene:', error);
        });
    }
});

// Header scroll Effekt
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.backdropFilter = 'blur(20px)';
            header.style.background = 'rgba(15, 15, 15, 0.9)';
        } else {
            header.style.backdropFilter = 'blur(10px)';
            header.style.background = 'transparent';
        }
    }
});

// Keyboard Navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Alle offenen Dialogfenster schließen
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Mobile menu schließen
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
    
    // Spline Tastatursteuerung
    if (e.target.tagName === 'SPLINE-VIEWER') {
        switch(e.key) {
            case 'ArrowLeft':
                rotateModel('left');
                e.preventDefault();
                break;
            case 'ArrowRight':
                rotateModel('right');
                e.preventDefault();
                break;
            case 'Home':
                resetModel();
                e.preventDefault();
                break;
        }
    }
});

// Außerhalb von Dialogfenster klicken um zu schließen
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});

// Performance Optimierung
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animierte Elemente beobachten
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        if (performanceObserver) {
            performanceObserver.observe(el);
        }
    });
});