let app = document.querySelector(".app");
let screens = ["screen1", "screen2", "screen3"];
let currentIndex = 0;
let activeBarIndex = 0; // To store the active bar index

function renderScreen(app, screens) {
    let screen = document.querySelector("." + screens[currentIndex]);
    let clonedScreen = screen.content.cloneNode(true);

    // Assign the 'active' class to the active bar
    let bars = clonedScreen.querySelectorAll(".bar");
    if(bars.length > activeBarIndex) {
        bars[activeBarIndex].classList.add('active');
    }

    app.appendChild(clonedScreen);

    // Attach click event to each bar
    bars.forEach((bar, index) => {
        bar.addEventListener('click', function() {
            bars.forEach(bar => bar.classList.remove('active'));
            bar.classList.add('active');
            activeBarIndex = index;
        });
    });

    // Attach event to the button inside the appended template
    let nextScreenButton = app.querySelector("#button1");
    if(nextScreenButton) {
        nextScreenButton.addEventListener("click", function () {
            clearScreen(app);
            activeBarIndex = (activeBarIndex + 1) % 3; // Cycle through 0, 1, 2
            currentIndex = (currentIndex + 1) % screens.length; // Cycle through screens
            renderScreen(app, screens);
        });
    }
}

window.addEventListener("load", (event) => {
    renderScreen(app, screens);
});

function clearScreen(app) {
    app.innerHTML = "";
}
