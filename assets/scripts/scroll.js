window.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
        $("#scroll-arrow").removeClass("display-none");
    }
    else {
        $("#scroll-arrow").addClass("display-none");
    }
});

document.getElementById("scroll-arrow").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.getElementById("scroll-arrow").addEventListener("mouseover", () => {
    $("#scroll-arrow").addClass("padding-bottom-10px");
});

document.getElementById("scroll-arrow").addEventListener("mouseout", () => {
    $("#scroll-arrow").removeClass("padding-bottom-10px");
});