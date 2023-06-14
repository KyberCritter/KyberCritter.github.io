window.onload = function () {
    canv = document.getElementById("gc");
    ctx = canv.getContext("2d");
    // document.addEventListener("keydown", keyPush);
    setInterval(game, 1000 / 60); // 60 frames per second
    cooldown = 0;
}
function game() {
    // ctx.fillStyle = "black";
    // ctx.font = "30px Arial";
    // ctx.fillText(value, 100, 100);
}
function rollD20() {
    // game area
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, canv.width, canv.height);
    value = Math.floor(Math.random() * 20) + 1;
    console.log(value);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(value, 100, 100);
}