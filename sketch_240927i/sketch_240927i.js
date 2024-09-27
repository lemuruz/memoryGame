let gameMode = "easy"; // You can change the game mode here
let row_ = 0;
let colum_ = 6;
let board = [];
} else if (gameMode == "critical") {
    row_ = 8;
    colum_ = 5;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('white');
    let numbers = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
    
    // Fill the board with random numbers
    for (let i = 0; i < row_; i++) {
        board.push([]);
        for (let j = 0; j < colum_; j++) {
            const randomNum = random(numbers);
            let index = numbers.indexOf(randomNum);
            numbers.splice(index, 1);
            board[i].push(randomNum);
        }
    }
    console.log(board);
}

function draw() {
    background('white'); // Clear the canvas
    textAlign(CENTER, CENTER);
    textSize(20);
    let text1;
    let text2;
    const blockX = floor(windowWidth / colum_);
    const blockY = floor(windowHeight / row_);
    
    // Draw vertical lines for columns
    for (let i = 1; i < colum_; i++) {
        line(i * blockX, 0, i * blockX, windowHeight);
    }

    // Draw horizontal lines for rows
    for (let i = 1; i < row_; i++) {
        line(0, i * blockY, windowWidth, i * blockY);
    }

    // Show the first clicked number
    if (clicked1.length != 0) {
        text1 = board[clicked1[0]][clicked1[1]];
        text(
            text1.toString(),
            clicked1[1] * blockX + blockX / 2,
            clicked1[0] * blockY + blockY / 2
        );
    }

    // Show the second clicked number
    if (clicked2.length != 0) {
        text2 = board[clicked2[0]][clicked2[1]];
        text(
            text2.toString(),
            clicked2[1] * blockX + blockX / 2,
            clicked2[0] * blockY + blockY / 2
        );
        
        // If the two numbers match, add them to the paired array
        if (text1 == text2) {
            paired.push([clicked1[0], clicked1[1], clicked2[0], clicked2[1]]);
        }
    }

    // Show paired numbers on the board
    paired.forEach((axis) => {
        const numshow = board[axis[0]][axis[1]].toString();
        text(numshow, axis[1] * blockX + blockX / 2, axis[0] * blockY + blockY / 2);
        text(numshow, axis[3] * blockX + blockX / 2, axis[2] * blockY + blockY / 2);
    });
}

function mouseClicked() {
    if (clicked2.length == 0) {
        const blockX = floor(windowWidth / colum_);
        const blockY = floor(windowHeight / row_);
        const arrayY = floor(mouseY / blockY);
        const arrayX = floor(mouseX / blockX);
        
        // Handle the first and second clicks
        if (clicked1.length == 0) {
            clicked1.push(arrayY, arrayX);
        } else {
            clicked2.push(arrayY, arrayX);
            setTimeout(() => {
                clicked1 = [];
                clicked2 = [];
                console.log("clicked reset");
            }, 1000); // Wait for 1 second before resetting clicks
        }
        console.log(clicked1);
        console.log(clicked2);
    }
}
