document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById('header');
    const social = document.getElementById('social_sticky');
    const track = document.querySelector('.partners-track');
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const langWrapper = document.getElementById("langWrapper");
    const langCurrent = langWrapper?.querySelector(".lang_current");
    const langItems = langWrapper?.querySelectorAll(".lang_list li");

    window.addEventListener('scroll', () => {
        const isSticky = window.scrollY > 50;
        header?.classList.toggle('sticky', isSticky);
        social?.classList.toggle('sticky', isSticky);
    });

    if (track) {
        track.innerHTML += track.innerHTML; 
        let scrollLeft = 0;
        const step = () => {
            scrollLeft += 0.5;
            if (scrollLeft >= track.scrollWidth / 2) scrollLeft = 0;
            track.style.transform = `translateX(-${scrollLeft}px)`;
            requestAnimationFrame(step);
        };
        step();
    }

    menuBtn?.addEventListener("click", () => mobileMenu?.classList.toggle("active"));
    mobileMenu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => mobileMenu.classList.remove("active"));
    });

    const langFiles = { ru: "index.html", uz: "index-uz.html", en: "index-en.html" };
    const pathParts = window.location.pathname.split('/');
    const currentFile = pathParts.pop() || "index.html";
    const isInSrc = pathParts.includes('src');
    const currentLang = Object.keys(langFiles).find(k => langFiles[k] === currentFile) || "ru";

    const updateLangUI = (lang) => {
        const flags = { ru: "ru", uz: "uz", en: "gb" };
        const texts = { ru: "RU", uz: "UZB", en: "EN" };
        if (langCurrent) {
            const img = langCurrent.querySelector("img");
            const span = langCurrent.querySelector("span");
            if (img) img.src = `https://flagcdn.com/w20/${flags[lang]}.png`;
            if (span) span.textContent = texts[lang];
        }
    };
    updateLangUI(currentLang);

    langCurrent?.addEventListener("click", (e) => {
        e.stopPropagation();
        langWrapper.classList.toggle("open");
    });

    langItems?.forEach(item => {
        item.addEventListener("click", () => {
            const newLang = item.getAttribute("data-lang");
            if (newLang && newLang !== currentLang) {
                let targetUrl = langFiles[newLang];
                if (newLang === 'ru') {
                    targetUrl = isInSrc ? "../index.html" : "index.html";
                } else {
                    targetUrl = isInSrc ? targetUrl : `./src/${targetUrl}`;
                }
                window.location.href = targetUrl;
            }
        });
    });

    document.addEventListener("click", () => langWrapper?.classList.remove("open"));

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                mobileMenu?.classList.remove("active");
                const offset = header ? header.offsetHeight : 0;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});