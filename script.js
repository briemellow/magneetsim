var rotations = { Magnet1: 0, Magnet2: 0 };
var positions = {}; // Store initial positions

document.addEventListener("DOMContentLoaded", () => {
    var magnets = document.querySelectorAll(".magnet");

    magnets.forEach(magnet => {
        let offsetX = 0, offsetY = 0, isDragging = false;
        let startX = 0, startY = 0;
        let translateX = 0, translateY = 0;

        
        positions[magnet.id] = { x: 0, y: 0 };

        magnet.addEventListener("mousedown", (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;

         
            const matrix = new WebKitCSSMatrix(window.getComputedStyle(magnet).transform);
            translateX = matrix.m41;
            translateY = matrix.m42;
            
            positions[magnet.id] = { x: translateX, y: translateY };
            magnet.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            
            let deltaX = e.clientX - startX;
            let deltaY = e.clientY - startY;

            positions[magnet.id].x = translateX + deltaX;
            positions[magnet.id].y = translateY + deltaY;

            magnet.style.transform = `translate(${positions[magnet.id].x}px, ${positions[magnet.id].y}px) ` + magnet.style.transform.replace(/translate\(.*?\)/, "").trim();
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            magnet.style.cursor = "grab";
        });
    });
});

// Functions to rotate while keeping the position
function Turn1() {
    rotateMagnet('Magnet1');
}

function Turn2() {
    rotateMagnet('Magnet2');
}

function rotateMagnet(magnetId) {
    if (!positions[magnetId]) return; // Ensure position is stored
    rotations[magnetId] += 45;

    let magnet = document.getElementById(magnetId);
    let { x, y } = positions[magnetId];

    magnet.style.transform = `translate(${x}px, ${y}px) rotate(${rotations[magnetId]}deg)`;
}
