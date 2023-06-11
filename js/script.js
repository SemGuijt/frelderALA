let app = document.querySelector(".app");
let screens = ["screen1", "screen2", "screen3"];
let currentIndex = 0;

function renderScreen(app, screens) {

    let screen = document.querySelector("." + screens[currentIndex]);
    let clonedScreen = screen.content.cloneNode(true);
    currentIndex++;

    app.appendChild(clonedScreen);
}

window.addEventListener("load", (event) => {
    renderScreen(app, screens);

    let nextScreenButton = document.getElementById("button1");
    nextScreenButton.addEventListener("click", function () {
        clearScreen(app);
        renderScreen(app, screens);

    });
});

function clearScreen(app) {
    app.innerHTML = "";
}




