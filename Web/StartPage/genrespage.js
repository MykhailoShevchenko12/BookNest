document.addEventListener("DOMContentLoaded", function () {
    const accordionBtn = document.querySelector(".accordion-btn");
    const accordionContent = document.querySelector(".accordion-content");

    accordionBtn.addEventListener("click", function () {
        if (accordionContent.style.maxHeight) {
            // Закриваємо акордеон
            accordionContent.style.maxHeight = null;
        } else {
            // Відкриваємо акордеон
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
    });
});


