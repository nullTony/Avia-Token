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