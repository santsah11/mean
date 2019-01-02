class Ninja {
    constructor(name,health=100,speed=3,strength=3) {
        this.name = name;
        this.health = health;
        this.speed = speed;
        this.strength = strength;
    }
    sayName() {
        console.log(`My ninja name is: ${this.name}`)
    }

    showStatus() {
        console.log(`Name : ${this.name} strength ${this.strength} Health ${this.health} Speed ${this.speed}`)
    }

    drinkShake() {
        this.health = this.health + 10;
    }
}

class Sensi extends Ninja {

    constructor(name) {
        super(name,200,10,10)
        this.wisdom = 10;
    }
    speakWisdom(){
        const drink = super.drinkShake();
        
        console.log("This is wise message from wise method")
       
}

}
var superSensi = new Sensi('Master splenti');
superSensi.showStatus();
superSensi.speakWisdom();
superSensi.showStatus();
