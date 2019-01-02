
function Ninja(name, health) {
    var speed = 3;
    var strength = 3;
    this.name = name;
    this.health = 100;


    Ninja.prototype.sayname = function () {
        console.log("My Ninja Name:" + name)
    }
    Ninja.prototype.showstatus = function () {
        console.log("Name: " + name + " , Health: " + this.health + " Speed : " + speed + " , Strenght " + strength)
    }
    Ninja.prototype.drinkShake = function () {
        health = health + 10;
    }
    Ninja.prototype.punch = function(enemyninja) {
        enemyninja.health = enemyninja.health - 5;
        console.log('Geamon was punch by billgates and lost 5, ' + enemyninja.health)

    }
    Ninja.prototype.kick= function (enemy){

        console.log(strength)
        enemy.health = enemy.health - ( 15 * strength)
        console.log("this not getting  " , enemy.health)
        console.log(this.health)

        
    }
   
}
var NinjaInstace = new Ninja('Ishika')
NinjaInstace.sayname();
NinjaInstace.showstatus();

var blueNinja = new Ninja('Geomon');
var redNinja = new Ninja('bill Gates');
redNinja.punch(blueNinja);

blueNinja.kick(redNinja);
console.log(blueNinja instanceof Ninja);


