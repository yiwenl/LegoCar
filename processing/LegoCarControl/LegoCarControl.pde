import processing.serial.*;
import pt.citar.diablu.processing.nxt.*;
import oscP5.*;
import netP5.*;
  
OscP5 oscP5;

int power = 100;
LegoNXT lego;


void setup() {
  size(400, 400);
  
  oscP5 = new OscP5(this,8885);

  lego = new LegoNXT(this, "/dev/tty.NXT-DevB");
  frameRate(30);
}


void draw() {
  background(0);
}



void keyPressed() {
  println(key);

  if (key == '1') {
    forward();
  }   
  else if (key == '2' ) {
    backward();
  }
  else if (key == '3') {
    turnRight();
  }
  else if (key == '4') {
    turnLeft();
  }
  else if (key == '+') {
    power += 5;
    println(power);
  } 
  else if (key == '-') {
    power -= 5;
    println(power);
  }
  

}

void oscEvent(OscMessage theOscMessage) {
  /* print the address pattern and the typetag of the received OscMessage */
  print("### received an osc message.");
  print(" addrpattern: "+theOscMessage.addrPattern());
  //println(" typetag: "+theOscMessage.typetag());
  
  String s = theOscMessage.addrPattern();
  
  if(s.indexOf("left") > -1) {
    turnLeft();
  } else if(s.indexOf("right") > -1) {
    turnRight();
  } else if(s.indexOf("forward") > -1) {
    forward();
  } else if(s.indexOf("backward") > -1) {
    backward();
  } else {
    brake();
  }
}


void forward() {
  lego.motorForward(LegoNXT.MOTOR_A, power);
  lego.motorForward(LegoNXT.MOTOR_B, power);
}


void backward() {
  lego.motorForward(LegoNXT.MOTOR_A, -power);
  lego.motorForward(LegoNXT.MOTOR_B, -power);
}

void turnLeft() {
  lego.motorForward(LegoNXT.MOTOR_A, power/4);
  lego.motorForward(LegoNXT.MOTOR_B, -power/4);
}


void turnRight() {
  lego.motorForward(LegoNXT.MOTOR_A, -power/4);
  lego.motorForward(LegoNXT.MOTOR_B, power/4);
}


void brake() {
  lego.motorHandBrake(LegoNXT.MOTOR_A);
  lego.motorHandBrake(LegoNXT.MOTOR_B);
}


void keyReleased() {
  brake();
}




void stop() {
  println("Stop");
  lego.motorStop(LegoNXT.MOTOR_A);
  lego.motorStop(LegoNXT.MOTOR_B);
}