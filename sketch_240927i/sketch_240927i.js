let row_ = 6;
let colum_ = 6;
let board = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  noFill();
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(15);  // Adjust text size as needed

  for (let x = 0; x < row_; x++) {
    board.push([]);
    for (let y = 0; y < colum_; y++) {
      // Random number for the cell
      let randomNum = random([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
      board[x].push(randomNum);
      
      // Draw the rectangle
      rect(
        x * (windowWidth / row_), 
        y * (windowHeight / colum_), 
        windowWidth / row_, 
        windowHeight / colum_
      );
      
      
    }
  }
  console.log(board)
  
}
function mouseClicked(event) {
  // Code to run that uses the event.
  let pos_X=floor(mouseX/(windowWidth/row_));
  let pos_Y=floor(mouseY/(windowHeight/colum_));
  text(
    board[pos_X][pos_Y],
    pos_X * (windowWidth / row_) + (windowWidth / (2 * row_)),  
    pos_Y * (windowHeight / colum_) + (windowHeight / (2 * colum_)) 
  );
  
  
}
