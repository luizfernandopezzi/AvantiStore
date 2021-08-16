var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 30,
    grabCursor: true,
    observer: true,
    observeParents: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});