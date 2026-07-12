/* ===================================
PIONEERSX - PROJECTS / PORTFOLIO
Full-screen zoom-transition click interaction
================================== */

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.project-card[data-url]');

    cards.forEach(function (card) {
        card.addEventListener('click', function (e) {
            const url = card.getAttribute('data-url');
            if (!url) return;

            // Internal anchor links (e.g. "coming soon" -> #contact) just smooth-scroll
            if (url.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(url);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                return;
            }

            e.preventDefault();
            openProjectZoom(card, url);
        });

        // Keyboard accessibility (cards are focusable via tabindex)
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    function openProjectZoom(card, url) {
        const rect = card.getBoundingClientRect();

        const overlay = document.createElement('div');
        overlay.className = 'project-zoom-overlay';
        overlay.style.top = rect.top + 'px';
        overlay.style.left = rect.left + 'px';
        overlay.style.width = rect.width + 'px';
        overlay.style.height = rect.height + 'px';

        const inner = document.createElement('div');
        inner.className = 'project-zoom-inner';
        inner.innerHTML = '<div class="project-zoom-spinner"></div><p class="project-zoom-text">جارِ فتح المشروع...</p>';
        overlay.appendChild(inner);

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        // Force reflow so the browser registers the starting position
        // before we animate to the full-screen state.
        void overlay.offsetWidth;

        requestAnimationFrame(function () {
            overlay.classList.add('project-zoom-active');
            overlay.style.top = '0px';
            overlay.style.left = '0px';
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.borderRadius = '0px';
        });

        setTimeout(function () {
            window.location.href = url;
        }, 750);
    }
});
