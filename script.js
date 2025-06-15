const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const nextNav = document.querySelector(".next");
const prevNav = document.querySelector(".prev");
const dotsNav = document.querySelector(".dots");

let currentIndex = 0;
let intervalId;

let touchStartX = 0;
let touchEndX = 0;

slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;

    const btn = document.createElement("button");
    btn.classList.add("dot");
    if (index === currentIndex) btn.classList.add("active");

    btn.addEventListener('click', () => {
        setCurrentSlide(index);
        stopSlider();
    });

    dotsNav.appendChild(btn);
});

// ✅ เริ่มสไลด์อัตโนมัติเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', startSlider);

// หยุด/เริ่ม slider เมื่อ hover
slider.addEventListener("mouseenter", stopSlider);
slider.addEventListener("mouseleave", startSlider);


nextNav.addEventListener("click", () => {
    showNextSlider();
    stopSlider();
});
prevNav.addEventListener("click", () => {
    showPreviousSlider();
    stopSlider();
});


slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});
slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const threshold = 50; // เกินกี่ px ถึงจะเปลี่ยนสไลด์

    if (touchEndX < touchStartX - threshold) {
        showNextSlider();
        stopSlider();
    } else if (touchEndX > touchStartX + threshold) {
        showPreviousSlider();
        stopSlider();
    }
}

function startSlider() {
    intervalId = setInterval(() => {
        showNextSlider(); 
    }, 2000);
}

function stopSlider() {
    clearInterval(intervalId);
}

function showNextSlider() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlides();
    updateDots();
}

function showPreviousSlider() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlides();
    updateDots();
}

function setCurrentSlide(index) {
    currentIndex = index;
    updateSlides();
    updateDots();
}

function updateSlides() {
    slides.forEach((slide, index) => {
        const offset = (index - currentIndex) * 100;
        slide.style.transform = `translateX(${offset}%)`;
        slide.classList.remove('active');
    });

    slides[currentIndex].classList.add("active");
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    [...dots].forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}
