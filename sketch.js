//CLOUDS
var img_clouds, img_clouds2;
var clouds_y_increment;
var clouds_y, clouds_y2;
var scal_y, size_y;

//ROAD
var road;

//CAR
var car;
var carimg;

//BEERS 
var glass;
var beer;

//BANNER
var banner;
var arrows;
var info;

//BLOOD ALCOHOL CONTENT
var bac;

//SLEEPINESS
var drowsiness;
var drowsinessDelta;

//DIZZINESS
var dizziness;
var angle_swing;

//TREES
var tree1;
var tree2;

//TREE ARRAY
var imgTree = new Array();

//KEYS REPETITION FILTER
var keyfilter;

//CAR CRASH
var danger;
var dangerimg, dangerimg2;

//DELAYED ACTIONS
var error = new Array(0, 0, 2, 2, 5, 5, 8, 8, 10, 10, 30, 30);

//VARYING TEXT
var sentences = new Array("LEFT and RIGHT arrow keys move the car.\nUP and DOWN arrow keys set Blood Alcohol Content.\n\nLet's start! Press UP ARROW KEY to get high!", 
                         "At this point you look comfortable and relaxed.", 
                         "The car doesn't seem to react promptly to your inputs, does it?", 
                         "Goddamned! Everything's swinging!", 
                         "You're tired... You can't keep your eyes open.", 
                         "Can you stay on the road?!",
                         "Oh no! You've had a car crash!\n\nPress DOWN ARROW KEY to restart.");

//TITLE
var logo;

//MUSIC
var song;

function preload() {
    carimg = loadImage("./assets/car.png");
    beer = loadImage("./assets/beer.png");
    glass = loadImage("./assets/stein.png");
    banner = loadImage("./assets/banner.jpg");
	arrows = loadImage("./assets/arrows.png");
    info = loadImage("./assets/info.png");
    road = loadImage("./assets/road.png");
	img_clouds = loadImage("./assets/sky.jpg");
	img_clouds2 = loadImage("./assets/sky.jpg");
	dangerimg = loadImage("./assets/gameoverL.jpg");
	dangerimg2 = loadImage("./assets/gameoverR.jpg");
    imgTree[0] = loadImage("./assets/tree1.png");
	imgTree[1] = loadImage("./assets/tree2.png");
	imgTree[2] = loadImage("./assets/tree3.png");
	imgTree[3] = loadImage("./assets/tree4.png");
    logo = loadImage("./assets/logo.png");
    song = loadSound("./assets/music.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    //bannerheight = height/5;
    //imageheight = height-bannerheight;
    bac = 0;
    keyfilter = 0;
    angle_swing = 0;
    angle_swing_delta = 0.1;
    drowsiness = 0;
    drowsinessDelta = 0;
    danger = 0;
	scal_y = windowWidth/2560;
	size_y = floor(3810*scal_y);
	clouds_y = 0;
	clouds_y2 = size_y;
    clouds_y_increment = 0.35;
	car = new carObject();
    tree1 = new treeObject();
    tree2 = new treeObject();
    tree2.side = 1;
    tree2.position = 1.0;
    
    frameRate(20);
    background('white');
    
    song.loop();
}
 
function draw() {
    
	//CLOUDS LOOP
    
	clouds_y -= clouds_y_increment;
	clouds_y2 -= clouds_y_increment;
	image(img_clouds, 0, clouds_y, width, size_y);
	image(img_clouds2, 0, clouds_y2, width, size_y);

	if(clouds_y < -size_y) {
		clouds_y = size_y;
		image(img_clouds, 0, clouds_y, width, size_y);
		clouds_y -= clouds_y_increment;
	}
    
	if(clouds_y2 < -size_y) {
		clouds_y2 = size_y;
		image(img_clouds2, 0, clouds_y2, width, size_y);
		clouds_y2 -= clouds_y_increment;
	} 
	
	//ARROWS FUNCTION
	
    if(keyIsDown(LEFT_ARROW)) {
        car.speedx -= 1;
    }
    
    else if(keyIsDown(RIGHT_ARROW)) {
        car.speedx += 1;
    }
    
    else if(keyIsDown(UP_ARROW)) {
        if((keyfilter == 0) && (bac < 10)) {
            bac += 2;
        }
        car.x = car.startx;
        car.speedx = 0;
        keyfilter = 1;
    }
    
    else if(keyIsDown(DOWN_ARROW)) {
        if((keyfilter == 0) && (bac > 0)) {
            bac -= 2;
        }
        car.x = car.startx;
        car.speedx = 0;
        keyfilter = 1;
    }
    
    else {
        if(bac > 0) {
            car.speedx += random(-error[bac], error[bac]);
        }
        else {
            car.x = car.startx;
            car.speedx = 0;
        }
        keyfilter = 0;
    }
    
    ycorrection = -width*Math.sin(Math.PI*angle_swing/360);
    rotate(angle_swing);
    image(road, -width/10, ycorrection-(height/5*4)/9, width*1.2, (height/5*4)*1.2);
    rotate(-angle_swing);
    tree1.display();
    tree2.display();
    car.display();
    tree1.move();
    tree2.move();
    car.move();
	
	//BEERS EMPTYING OUT
	
    beers = (10-bac)/2;
    for(i = 0; i < beers; i++) {
        image(beer, 40+height/165+height/14*i, 50-height/80, height/23, height/23*1.8);
    }
    
    for(i = 0; i < 5; i++) {
        image(glass, 40+height/14*i, 50, height/14, height/14);
    }
    
    //DIZZINESS
    
    if(bac > 4) {
        angle_swing = angle_swing+angle_swing_delta;
        if(angle_swing > 3) {
        angle_swing_delta = -0.1;
        }
        if(angle_swing < -3) {
        angle_swing_delta = 0.1;
        }
    }
    
    else {
        angle_swing = 0;
    }
    
    //SLEEPINESS
    
    if(bac > 6) {
        c = color(0, 0, 0, drowsiness);
        if(drowsiness > 250) {
            drowsinessDelta = -15;
        }
        if(drowsiness < 10) {
            drowsinessDelta = random(5, bac);
        }
        drowsiness = drowsiness+drowsinessDelta;
        fill(c); 
        rect(0, 0, width, (height/5*4));
    }
	
	//CAR CRASH
    if(danger == 1) {
        image(dangerimg, 0, 0, width, (height/5*4)); 
    }
    
	if(danger == 2) {
		image(dangerimg2, 0, 0, width, (height/5*4));
	}
	
	//BANNER
    image(banner, 0, height/5*4, width, height/5);
	image(arrows, 40, (height/5*4)+(height/5)/6, ((height/5)/6*4)*1.42, (height/5)/6*4);
    image(info, width-((height/5)/6*4)*2.26-40, (height/5*4)+(height/5)/6, ((height/5)/6*4)*2.26, (height/5)/6*4);
    
    textFont('Arsenal');
    textSize(height/40);
    textAlign(CENTER);
    fill(255);
    
    if(width > height && width-(((height/5)/6*4)*2.26+40) > width/3*2.15) {
        if(danger == 0) {
            text(sentences[bac/2], width/2, (height/5*4)+(height/5)/3);
        } 
        else {
            text(sentences[6], width/2, (height/5*4)+(height/5)/3);
        }
    }
    
    //LOGO
    image(logo, width-height/8-40, 40, height/8, height/8);
    
    //MUSIC
    song.rate(1+bac*(-0.02));
    
    if (danger == 1 || danger == 2) {
        song.amp(0);
    } else {
        song.amp(1);
    }
}

//TREE

function treeObject() {
    this.startx = 0.48*width;
    this.starty = 0.40*(height/5*4);
    this.deltax = -0.48*width;
    this.deltay = -0.40*(height/5*4);
    this.starth = 0.07*(height/5*4);
    this.deltah = 0.60*(height/5*4);
    this.x = this.startx;
    this.y = this.starty;
    this.h = this.starth;
    this.side = 0;
    this.position = 0.1;
    this.deltapos = 0.05;
	this.t = 0;
    
    this.move = function() {
        this.position = this.position+this.deltapos*this.position;
        if(this.position > 1.7) {
            this.position = 0.1;
			this.t++;
			if(this.t == 3) {
				this.t = 0;
			}
        }
        this.x = this.startx + this.deltax * this.position;
        this.y = this.starty + this.deltay * this.position;
        this.h = this.starth + this.deltah * this.position;
    }
    
    this.display = function() {
        if(this.side) {
            image(imgTree[this.t], this.x-this.h*0.5, this.y, this.h*0.5, this.h);
        }
        else {
            image(imgTree[this.t+1], width-this.x, this.y, this.h*0.5, this.h);
        }
    }
}

//CAR

function carObject() {
        this.width = windowWidth/2;
        this.height = this.width/1.6;
        this.startx = (windowWidth-this.width)/2;
        this.x = this.startx;
        this.y = (windowHeight/5*4)-this.height-10;
    
        this.move = function() {
            this.x = this.x+this.speedx;
			
            if(this.x < 0) {
                this.x = 0;
                danger = 1;
            }
            else if(this.x > windowWidth-this.width) {
                this.x = windowWidth-this.width;
                danger = 2;
            }
            else {
                danger = 0;
            }
        }
        
        this.display = function() {
            image(carimg, this.x, this.y, this.width, this.height);
        }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}