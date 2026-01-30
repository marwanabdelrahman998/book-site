// ========================================
// السكريبت الرئيسي - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initNavbar();
    initScrollTop();
    initMobileMenu();
    initAnimations();
    renderBooks();
    renderSeries();
    renderTestimonials();
    updateStats();
});

// ========================================
// التنقل - Navigation
// ========================================
function initNavbar() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
}

// ========================================
// زر العودة للأعلى - Scroll to Top
// ========================================
function initScrollTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ========================================
// الرسوم المتحركة - Animations
// ========================================
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// عرض الكتب - Render Books
// ========================================
function renderBooks() {
    const booksGrid = document.querySelector('.books-grid');
    if (!booksGrid || typeof books === 'undefined') return;

    const featuredBooks = books.filter(book => book.isFeatured);

    booksGrid.innerHTML = featuredBooks.map(book => `
        <div class="book-card animate-on-scroll">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}" 
                     onerror="this.src='https://via.placeholder.com/220x300/1e3a5f/d4af37?text=${encodeURIComponent(book.title)}'">
                ${book.isNew ? '<span class="book-badge">جديد</span>' : ''}
            </div>
            <div class="book-info">
                <span class="book-series">${book.series}</span>
                <h3 class="book-title">${book.title}</h3>
                <div class="book-meta">
                    <span>📅 ${book.year}</span>
                    <span>📄 ${book.pages} صفحة</span>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAllBooks(filterSeriesId = null) {
    const booksGrid = document.querySelector('.books-grid');
    if (!booksGrid || typeof books === 'undefined') return;

    let filteredBooks = books;
    if (filterSeriesId) {
        filteredBooks = books.filter(book => book.seriesId === filterSeriesId);
    }

    booksGrid.innerHTML = filteredBooks.map(book => `
        <div class="book-card animate-on-scroll">
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}"
                     onerror="this.src='https://via.placeholder.com/220x300/1e3a5f/d4af37?text=${encodeURIComponent(book.title)}'">
                ${book.isNew ? '<span class="book-badge">جديد</span>' : ''}
            </div>
            <div class="book-info">
                <span class="book-series">${book.series}</span>
                <h3 class="book-title">${book.title}</h3>
                <div class="book-meta">
                    <span>📅 ${book.year}</span>
                    <span>📄 ${book.pages} صفحة</span>
                </div>
            </div>
        </div>
    `).join('');

    initAnimations();
}

// ========================================
// عرض السلاسل - Render Series
// ========================================
function renderSeries() {
    const seriesGrid = document.querySelector('.series-grid');
    if (!seriesGrid || typeof series === 'undefined') return;

    seriesGrid.innerHTML = series.map(s => `
        <div class="series-card animate-on-scroll">
            <div class="series-icon">${s.icon}</div>
            <h3 class="series-title">${s.name}</h3>
            <p class="series-count">${s.bookCount} كتاب</p>
            <p class="series-desc">${s.description}</p>
        </div>
    `).join('');
}

// ========================================
// عرض الشهادات - Render Testimonials
// ========================================
function renderTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid || typeof testimonials === 'undefined') return;

    testimonialsGrid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card animate-on-scroll">
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-author">
                <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar"
                     onerror="this.src='https://via.placeholder.com/50/1e3a5f/d4af37?text=${t.name.charAt(0)}'">
                <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-role">${t.role}</div>
                </div>
            </div>
        </div>
    `).join('');
}

// ========================================
// تحديث الإحصائيات - Update Stats
// ========================================
function updateStats() {
    if (typeof authorInfo === 'undefined') return;

    const statsElements = {
        books: document.querySelector('[data-stat="books"]'),
        readers: document.querySelector('[data-stat="readers"]'),
        years: document.querySelector('[data-stat="years"]')
    };

    Object.keys(statsElements).forEach(key => {
        if (statsElements[key]) {
            animateCounter(statsElements[key], authorInfo.stats[key]);
        }
    });
}

function animateCounter(element, target) {
    const isString = typeof target === 'string';
    const numericTarget = isString ? parseInt(target) : target;
    const suffix = isString ? target.replace(/[0-9]/g, '') : '';

    let current = 0;
    const increment = numericTarget / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericTarget) {
            current = numericTarget;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// ========================================
// البحث والتصفية - Search & Filter
// ========================================
function searchBooks(query) {
    if (!query || typeof books === 'undefined') {
        renderAllBooks();
        return;
    }

    const filtered = books.filter(book =>
        book.title.includes(query) ||
        book.series.includes(query) ||
        book.description.includes(query)
    );

    const booksGrid = document.querySelector('.books-grid');
    if (booksGrid) {
        booksGrid.innerHTML = filtered.length ?
            filtered.map(book => `
                <div class="book-card">
                    <div class="book-cover">
                        <img src="${book.cover}" alt="${book.title}"
                             onerror="this.src='https://via.placeholder.com/220x300/1e3a5f/d4af37?text=${encodeURIComponent(book.title)}'">
                        ${book.isNew ? '<span class="book-badge">جديد</span>' : ''}
                    </div>
                    <div class="book-info">
                        <span class="book-series">${book.series}</span>
                        <h3 class="book-title">${book.title}</h3>
                        <div class="book-meta">
                            <span>📅 ${book.year}</span>
                            <span>📄 ${book.pages} صفحة</span>
                        </div>
                    </div>
                </div>
            `).join('') :
            '<p class="no-results">لا توجد نتائج للبحث</p>';
    }
}

function filterBySeries(seriesId) {
    renderAllBooks(seriesId);
}

// ========================================
// نموذج التواصل - Contact Form
// ========================================
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // هنا يمكن إضافة كود إرسال النموذج
    console.log('Form submitted:', data);

    // رسالة نجاح
    alert('شكراً لتواصلك! سنرد عليك في أقرب وقت.');
    form.reset();
}
