
function Ninja(name, health) {
    var speed = 3;
    var strength = 3;
    this.name = name;
    this.health = 100;


    Ninja.prototype.sayname = function(){
        console.log("My Ninja Name:"+  name)
    }
    Ninja.prototype.showstatus= function(){
       console.log("Name: "  + name+ " , Health: " + this.health+ " Speed : " + speed+ " , Strenght " + strength)
    }
    Ninja.prototype.drinkShake= function(){
        health= health+10;
    }
}
var NinjaInstace = new Ninja('Ishika')
NinjaInstace.sayname();
NinjaInstace.showstatus();
    
