window.onload = function () {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 12); // 12 frames per second
    unlocked_facts = [];
    high_score = 0;
    start_len = 5;  // starting length of the snake
    resetGame();
}
var wrapSwitch = document.getElementById("wrap");
wrapSwitch.addEventListener("change", function () {
    if (this.checked) {
        console.log("Switch is ON");
        wrap = true;
    } else {
        console.log("Switch is OFF");
        wrap = false;
    }
});

all_facts = ["My favorite movie is Star Wars Episode III: Revenge of the Sith.\n",
                "In my spare time, I attend University of Alabama sports games.\n",
                "You can send me an email using the yellow button on the homepage!"];
resetGame();
fun_facts = [];
function game() {
    var score_display = document.getElementById("score-display");
    score_display.textContent = "Score: " + (tail - start_len) + " | High Score: " + high_score;
    px += xv;
    py += yv;
    // wrap around the screen or reset game, depending on settings
    if (wrap == true) {
        if (px < 0) {
            px = tc - 1;
        }
        if (px > tc - 1) {
            px = 0;
        }
        if (py < 0) {
            py = tc - 1;
        }
        if (py > tc - 1) {
            py = 0;
        }
    } else {
        if (px < 0) {
            resetGame();
        }
        if (px > tc - 1) {
            resetGame();
        }
        if (py < 0) {
            resetGame();
        }
        if (py > tc - 1) {
            resetGame();
        }
    }
    // game area
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    // player
    ctx.fillStyle = "lime";
    for (var i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
        if (trail[i].x == px && trail[i].y == py) {
            resetGame();
        }
    }
    // tail management
    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift();
    }
    // apple
    if (ax == px && ay == py) {
        addFunFact();
        high_score = Math.max(high_score, tail - start_len);    // update high score
        tail++;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
        while ({ x: ax, y: ay } in trail) { // prevent apple from spawning in the snake
            ax = Math.floor(Math.random() * tc);
            ay = Math.floor(Math.random() * tc);
        }
    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);
}
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37: // left arrow
            if (xv != 0) break; // prevent player from going backwards (right to left)
            xv = -1;
            yv = 0;
            break;
        case 38: // up arrow
            if (yv != 0) break; // prevent player from going backwards (down to up)
            xv = 0;
            yv = -1;
            break;
        case 39: // right arrow
            if (xv != 0) break; // prevent player from going backwards (left to right)
            xv = 1;
            yv = 0;
            break;
        case 40: // down arrow
            if (yv != 0) break; // prevent player from going backwards (up to down)
            xv = 0;
            yv = 1
            break;
    }
}
function resetGame() {
    px = py = 10;       // player x and y position
    gs = tc = 20;       // grid size and tile count
    ax = ay = 15;       // apple x and y position
    xv = yv = 0;        // x and y velocity
    trail = [];         // trail of the tail
    tail = start_len;   // length of the tail
    fact_index = 0;     // index of the fun fact
}
function addFunFact() {
    fact_index = Math.floor(((tail - start_len) / 3 % all_facts.length));
    if(!(unlocked_facts.includes(all_facts[fact_index]))) { // check if fun fact is already unlocked
        console.log("Unlocked fun fact: " + all_facts[fact_index]);
        const newP = document.createElement("p");
        newP.textContent = all_facts[fact_index];
        document.body.appendChild(newP);
        unlocked_facts.push(all_facts[fact_index]);
    } else {
        console.log("Error: fun fact \"" + all_facts[fact_index] + "\" already unlocked");
    }
}