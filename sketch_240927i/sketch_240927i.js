//patiparn nakabodee 6601012620046
//add multiplayer
//hint tell player the distanc between the pair 
//timer
let gameMode = "critical"; // You can change the game mode here
let matchMode = "4match"
let row_ = 0;
let colum_ = 6;
let clicked1 = [];
let clicked2 = [];
let board = [];
let paired = [];
let fpsCounter = 0;

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
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
    background('white');
    let numbers = null;
    if (matchMode == "2match"){
      numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20];
    }else if(matchMode == "4match"){
      numbers = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10];
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
    console.log(board);
}

function draw() {
    fpsCounter = fpsCounter + 1;
    background('white'); // Clear the canvas
    textAlign(CENTER, CENTER);
    textSize(40);
    text(floor(fpsCounter/3600) +" : "+(floor(fpsCounter/60))%60 ,windowWidth/2,windowHeight/2)
    textSize(20);
    let text1;
    let text2;
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
        text1 = board[clicked1[0]][clicked1[1]];
        strokeWeight(2);
        text(
            text1.toString(),
            clicked1[1] * blockX + blockX / 2,
            clicked1[0] * blockY + blockY / 2
        );
        drawLine(clicked1[1] * blockX + 5,clicked1[0] * blockY,text1,fpsCounter%100);
    }

    // Show the second clicked number
    if (clicked2.length != 0) {
        text2 = board[clicked2[0]][clicked2[1]];
        strokeWeight(2);
        text(
            text2.toString(),
            clicked2[1] * blockX + blockX / 2,
            clicked2[0] * blockY + blockY / 2
        );
        drawLine(clicked2[1] * blockX + 5,clicked2[0] * blockY,text2,fpsCounter%100);
        
        // If the two numbers match, add them to the paired array
        if (text1 == text2) {
            paired.push([clicked1[0], clicked1[1], clicked2[0], clicked2[1]]);
        }
    }

    // Show paired numbers on the board
    paired.forEach((axis) => {
        strokeWeight(2);
        const numshow = board[axis[0]][axis[1]].toString();
        text(numshow, axis[1] * blockX + blockX / 2, axis[0] * blockY + blockY / 2);
        drawLine(axis[1] * blockX + 5,axis[0] * blockY,numshow,fpsCounter%100);
        text(numshow, axis[3] * blockX + blockX / 2, axis[2] * blockY + blockY / 2);
        drawLine(axis[3] * blockX + 5,axis[2] * blockY,numshow,fpsCounter%100);
    });
}
//function 
function mouseClicked() {
    if (clicked2.length == 0) {
        const blockX = floor(windowWidth / colum_);
        const blockY = floor(windowHeight / row_);
        const arrayY = floor(mouseY / blockY);
        const arrayX = floor(mouseX / blockX);
        drawLine(mouseX,mouseY,2);
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
function drawLine(x,y,n,z){
  strokeWeight(5);
  stroke('magenta');
  let linedrawingSpd = 5;
  let lengthY = windowHeight / (row_)
  let drawing = 0;
  for (let i=0;i<n;i++){
    //drawing = 0;
    //for (let animate = 0;animate<linedrawingSpd;animate++){
    //    //frameRate(1);
    //    drawing = drawing + lengthY/linedrawingSpd;
    //    line(x + i*10 , y, x + i*10, y + drawing);
    //  }
    line(x + i*10 , y, x + i*10, y + lengthY*(z/100));
     
  }
  strokeWeight(2);
  stroke('black');
  
}
