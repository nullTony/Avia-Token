const header = document.getElementById('header');
const social = document.getElementById('social_sticky');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
        social.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
        social.classList.remove('sticky');
    }
});

const track = document.querySelector('.partners-track');

const trackContent = track.innerHTML;
track.innerHTML += trackContent; 

let scrollLeft = 0;
const speed = 0.5;

function step() {
    scrollLeft += speed;
    
    if (scrollLeft >= track.scrollWidth / 2) {
        scrollLeft = 0;
    }
    
    track.style.transform = `translateX(-${scrollLeft}px)`;
    requestAnimationFrame(step);
}

step();

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
});

const menuLinks = mobileMenu.querySelectorAll("li");
menuLinks.forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
});

const langWrapper = document.getElementById('langWrapper');

langWrapper.addEventListener('click', (e) => {
    e.stopPropagation();
    langWrapper.classList.toggle('open');
});

document.addEventListener('click', () => {
    langWrapper.classList.remove('open');
});

const langItems = langWrapper.querySelectorAll('.lang_list li');
langItems.forEach(item => {
    item.addEventListener('click', () => {
        const selectedLang = item.getAttribute('data-lang');
        console.log('Переключаем на:', selectedLang);
        langWrapper.classList.remove('open');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            document.getElementById("mobileMenu").classList.remove("active");

            const headerHeight = document.getElementById("header").offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            targetElement.classList.remove('highlight-opacity');
            
            setTimeout(() => {
                targetElement.classList.add('highlight-opacity');
            }, 500);

            setTimeout(() => {
                targetElement.classList.remove('highlight-opacity');
            }, 1700);
        }
    });
});