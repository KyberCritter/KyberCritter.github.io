window.onload = function () {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 12); // 12 frames per second
    unlocked_facts = [];
    high_score = 0;
    resetGame();
}
resetGame();
enemies = [];
function game() {
    px += xv;
    py += yv;
    // wrap around the screen
    if (px < 0) {
        // px = tc - 1;
        px = 0;
    }
    if (px > tc - 1) {
        // px = 0;
        px = tc - 1;
    }
    // game area
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);
    // player
    ctx.fillStyle = "gray";
    ctx.fillRect(px * gs, py * gs, gs - 2, gs - 2);
    // laser
    if (laserOn == true) {
        console.log("Laser on");
        ctx.fillStyle = "yellow";
        ctx.fillRect(px * gs, py * gs + gs - 2, gs - 2, (gs - 2) * laserLength);
        // laserTimer++;    // increment laser timer
        if (laserTimer > laserMax) {
            laserOn = false;
            cooldown = laserMax;
        }
    } else {
        cooldown--;
    }
    // enemies
    if (enemies.length < 10 && Math.floor(Math.random()) < 0.2) {
        spawnEnemy();
    }
    ctx.fillStyle = "red";
    for (var i = 0; i < enemies.length; i++) {
        ctx.fillRect(enemies[i].x * gs, enemies[i].y * gs, gs - 2, gs - 2);
        // check if enemy is hit by laser
        if (laserOn == true) {
            if (enemies[i].x == px && enemies[i].y >= py && enemies[i].y <= py + laserLength) {
                // enemies.splice(i, 1);
                // i--;
                enemies[i].y -= 1;  // move enemy into tractor bea m
            }
            if (enemies[i].y < 4) { // enemy is in UFO
                enemies.splice(i, 1);
                i--;
            }
        }
    }
}
function keyPush(evt) {
    switch (evt.keyCode) {
        case 37: // left arrow
            if (px < 0) break; // prevent player from going off the screen
            xv = -1;
            break;
        case 39: // right arrow
            if (px > 20) break; // prevent player from going off the screen
            xv = 1;
            break;
        case 32: // spacebar
            if (laserOn == false) {
                laserOn = true;
                laserTimer = 0;
                laserLength = 1;
            } else if(laserOn && cooldown < 0) {
                laserLength += 2;
            }
            break;
    }
}
function resetGame() {
    px = 10;            // player x position
    py = 1;             // player y position
    gs = tc = 20;       // grid size and tile count
    xv = yv = 0;        // x and y velocity
    fact_index = 0;     // index of the fun fact
    
    laserOn = false;    // whether the laser is on or off
    laserTimer = 0;     // how long the laser has been on for
    laserMax = 20;      // how long the laser can be on for
    laserLength = 1;    // how long the laser is
    cooldown = 0;       // how long until the laser can be used again
}
function spawnEnemy() {
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * 7) + 13
    while ({ x: ax, y: ay } in enemies) { // prevent enemy from spawning in another enemy
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * 7) + 13
    }
    console.log("Enemy spawned at " + ax + ", " + ay)
    enemies.push({ x: ax, y: ay });
}