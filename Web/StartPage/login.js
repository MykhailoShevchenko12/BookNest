document.getElementById("open-modal-btn").addEventListener("click",function(){
    document.getElementById("my-modal").classList.add("open")
})



document.querySelector("#my-modal .modal-box").addEventListener("click", event => {
    event._isClickWithInModal = true;
})
document.getElementById("my-modal").addEventListener("click", event => {
    if (event._isClickWithInModal) return;
    event.currentTarget.classList.remove("open");
})