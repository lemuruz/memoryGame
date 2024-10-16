//patiparn nakabodee 6601012620046
let gameMode = "critical"; // You can change the game mode here
let matchMode = "4match";
let row_ = 0;
let colum_ = 6;
let clicked1 = [];
let clicked2 = [];
let board = [];
let paired = [];
let fpsCounter = 0;
let frameRate_ = 60;
//////////////////adjust this to variable to set the timer/////////////////////////////
let timerMinute = 3;
let timerSecond = 45;
///////////////////////////////////////////////////////////////////////////////////////
let timerFrame = (timerSecond * frameRate_) + (timerMinute * 60 * frameRate_);
let RemainingFrame = 0;

// Variables for multiplayer
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

// Set row and column based on game mode
if (gameMode == "easy") {
    row_ = 2;
    colum_ = 5;
} else if (gameMode == "hard") {
    row_ = 4;
    colum_ = 5;
} else if (gameMode == "critical") {
    row_ = 8;
    colum_ = 5;
}

function setup() {
    frameRate(frameRate_);
    createCanvas(windowWidth, windowHeight);
    background('white');
    let numbers = null;
    if (matchMode == "2match") {
        numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20];
    } else if (matchMode == "4match") {
        numbers = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10];
    }
    
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
}

function draw() {
    fpsCounter = fpsCounter + 1;
    background('white');
    textAlign(CENTER, CENTER);
    textSize(40);
    
    RemainingFrame = timerFrame - fpsCounter;
    
    if (RemainingFrame < 0) {
        RemainingFrame = 0;
        stroke('red');
        text("Time out!", windowWidth/2, windowHeight/2);
        stroke('black');
    } else {
        text(floor(RemainingFrame/3600) + " : " + (floor(RemainingFrame/60))%60, windowWidth/2, windowHeight/2);
    }
    
    textSize(20);
    const blockX = floor(windowWidth / colum_);
    const blockY = floor(windowHeight / row_);
    
    stroke('black');
    
    // Draw vertical lines for columns
    for (let i = 1; i < colum_; i++) {
        strokeWeight(2);
        line(i * blockX, 0, i * blockX, windowHeight);
    }

    // Draw horizontal lines for rows
    for (let i = 1; i < row_; i++) {
        strokeWeight(2);
        line(0, i * blockY, windowWidth, i * blockY);
    }

    // Show the first clicked number
    if (clicked1.length != 0) {
        let text1 = board[clicked1[0]][clicked1[1]];
        strokeWeight(2);
        text(text1.toString(), clicked1[1] * blockX + blockX / 2, clicked1[0] * blockY + blockY / 2);
        drawLine(clicked1[1] * blockX + 5, clicked1[0] * blockY, text1, fpsCounter%100);
    }

    // Show the second clicked number
    if (clicked2.length != 0) {
        let text2 = board[clicked2[0]][clicked2[1]];
        strokeWeight(2);
        text(text2.toString(), clicked2[1] * blockX + blockX / 2, clicked2[0] * blockY + blockY / 2);
        drawLine(clicked2[1] * blockX + 5, clicked2[0] * blockY, text2, fpsCounter%100);
    }

    // Show paired numbers on the board
    paired.forEach((axis) => {
        strokeWeight(2);
        const numshow = board[axis[0]][axis[1]].toString();
        text(numshow, axis[1] * blockX + blockX / 2, axis[0] * blockY + blockY / 2);
        drawLine(axis[1] * blockX + 5, axis[0] * blockY, numshow, fpsCounter%100);
        text(numshow, axis[3] * blockX + blockX / 2, axis[2] * blockY + blockY / 2);
        drawLine(axis[3] * blockX + 5, axis[2] * blockY, numshow, fpsCounter%100);
    });

    // Display current player and scores
    textSize(30);
    fill(currentPlayer === 1 ? 'red' : 'blue');
    text(`Current Player: ${currentPlayer}`, windowWidth/2, 30);
    fill('red');
    text(`Player 1 Score: ${player1Score}`, windowWidth/4, 30);
    fill('blue');
    text(`Player 2 Score: ${player2Score}`, 3*windowWidth/4, 30);
    fill('black');
}

function mouseClicked() {
    if (clicked2.length == 0) {
        const blockX = floor(windowWidth / colum_);
        const blockY = floor(windowHeight / row_);
        const arrayY = floor(mouseY / blockY);
        const arrayX = floor(mouseX / blockX);
        drawLine(mouseX, mouseY, 2);
        
        // Handle the first and second clicks
        if (clicked1.length == 0) {
            clicked1.push(arrayY, arrayX);
        } else {
            clicked2.push(arrayY, arrayX);
            setTimeout(() => {
                checkMatch();
                clicked1 = [];
                clicked2 = [];
                // Switch player after each turn, regardless of match
                currentPlayer = currentPlayer === 1 ? 2 : 1;
                console.log("Turn ended, switched to Player", currentPlayer);
            }, 1000); // Wait for 1 second before resetting clicks and switching player
        }
        console.log(clicked1);
        console.log(clicked2);
    }
}

function checkMatch() {
    if (clicked1.length != 0 && clicked2.length != 0) {
        let text1 = board[clicked1[0]][clicked1[1]];
        let text2 = board[clicked2[0]][clicked2[1]];
        
        if (text1 == text2) {
            paired.push([clicked1[0], clicked1[1], clicked2[0], clicked2[1]]);
            // Increase score for the current player
            if (currentPlayer === 1) {
                player1Score++;
            } else {
                player2Score++;
            }
            console.log(`Player ${currentPlayer} scored a point!`);
        }
    }
}

function drawLine(x, y, n, z) {
    strokeWeight(5);
    stroke('magenta');
    let lengthY = windowHeight / (row_);
    for (let i = 0; i < n; i++) {
        line(x + i*10, y, x + i*10, y + lengthY*(z/100));
    }
    strokeWeight(2);
    stroke('black');
}
