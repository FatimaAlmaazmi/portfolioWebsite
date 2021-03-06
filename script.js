// sidebar!
var barOpen = document.querySelector('.bars');
var barClose = document.querySelector('.bars-close');
var sidebar = document.querySelector('.sidebar-content');
var main = document.querySelector('.main');

barOpen.addEventListener("click", function(){
console.log("sidebar HI!!")
sidebar.style.display = "block";
});

barClose.addEventListener("click", function(){
console.log("sidebar BYE!!")

sidebar.style.display = "none";


});


// responsiveness!
function handleMobileToDesktopChange(query)
{
  if(query.matches)
  {
    console.log('mobile size!');
  }
  else{
    console.log('desktop size!');
  }
}

var responsiveMediaQuery = window.matchMedia('(max-width: 768px)');
//listen for change
responsiveMediaQuery.addListener(handleMobileToDesktopChange);
//get initial state
handleMobileToDesktopChange(responsiveMediaQuery);




// P5 starts here!

var canvas;
var x;
var y;
let numBalls = 8;
let spring = 0.02;
let gravity = 0.09;
let friction = -0.9;
let drag = 0.95;
let balls = [];



function setup(){

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style("z-index", "-1");

//fun balls
  for (let i = 0; i < numBalls; i++) {
   balls[i] = new Ball(
     random(width),
     random(height),
     random(50, 200),
     i,
     balls,
     color(random(159, 250), random(159, 250), random(159, 250)),
     null,
     null
   );
 }


// clickable balls

//about ball
  balls.push(new Ball(
    random(width),
    random(height),
    300,
    balls.length,
    balls,
    color(255, 196, 245),
    "About my balls",
    "about.html"
  ));

//project 1 ball
  balls.push(new Ball(
    random(width),
    random(height),
    255,
    balls.length,
    balls,
    color(215, 159, 250),
    "Let's Zoom!",
    "https://fatimaalmaazmi.github.io/30MFFWebsite/"
  ));

//project 2 ball
  balls.push(new Ball(
    random(width),
    random(height),
    230,
    balls.length,
    balls,
    color(250, 195, 159),
    "The Goodest Boy",
    "https://fatimaalmaazmi.github.io/comicWebsite/"
  ));

//project 3 ball
  balls.push(new Ball(
    random(width),
    random(height),
    240,
    balls.length,
    balls,
    color(250, 162, 159),
    "Guy's Show",
    "https://nicholasraffone.github.io/CommLab-Asg3/"
  ));

//project 4 ball
  balls.push(new Ball(
    random(width),
    random(height),
    225,
    balls.length,
    balls,
    color(180,250, 95),
    "Agent Bow",
    "https://mission-ulens-brief.netlify.app/"
  ));



}//end of setup



function mousePressed(){

  balls.forEach(ball => {
    if(dist(mouseX, mouseY, ball.x, ball.y) < ball.diameter/2){
      console.log("clicked");
      if(ball.href != null){
        window.open(ball.href, '_self');
        }
      }
    }
  );

//creates more fun balls when mouse is pressed
  for (let i = 0; i < 9; i++) {
  balls.push(new Ball(
    mouseX,
    mouseY,
    random(50, 200),
    balls.length,
    balls,
    color(random(174, 250), random(174, 250), random(174, 250)),
    null,
    null
      )
    );
  }

}//end of mousePressed




function windowResized(){
resizeCanvas(windowWidth, windowHeight);
}//end of windowResized



class Ball {
  constructor(xin, yin, din, idin, oin, colorin, titlein, hrefin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;

    this.color = colorin;
    this.title = titlein;
    this.href = hrefin;

    console.log(this.id);

  }//end of constructor


  collide() {
  for (let i = this.id + 1; i < balls.length; i++) {
    let dx = this.others[i].x - this.x;
    let dy = this.others[i].y - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    let minDist = this.others[i].diameter / 2 + this.diameter / 2;
    if (distance < minDist) {
      let angle = atan2(dy, dx);
      let targetX = this.x + cos(angle) * minDist;
      let targetY = this.y + sin(angle) * minDist;
      let ax = (targetX - this.others[i].x) * spring;
      let ay = (targetY - this.others[i].y) * spring;
      this.vx -= ax;
      this.vy -= ay;
      this.others[i].vx += ax;
      this.others[i].vy += ay;
    }
  }
}//end of collide

move() {
    this.vx *= drag;
    this.vy *= drag;
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
  }//end of move



  display() {

    fill(this.color);
    noStroke();

    push();
      translate(this.x, this.y);
      ellipse(0, 0, this.diameter, this.diameter);
    pop();


//highlight on ball (i removed it, but if u want to add it go ahead)

    // push();
    //   fill(255);
    //   translate(this.x, this.y);
    //   rotate(radians(45));
    //   ellipse(-this.diameter/2.8, -2, this.diameter/6, this.diameter/2);
    // pop();


    fill(72, 68, 68);
    if(this.title != null){
      push();
      rectMode(CENTER);
      translate(this.x, this.y);
      textFont('Titan One', 23);
      text(this.title, -92, 10);
      pop();
    }
  }//end of display

}//end of class Ball




function draw(){
  background(255);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
}//end of draw
