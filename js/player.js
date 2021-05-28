class Player{

    constructor(name) { 
        this.name = name;
        this.health = 100;
        this.ammo = 0;
    }

    getName() { 
        return this.name;
    }

    getHealth() { 
        return this.health;
    }

    getAmmo() { 
         return this.ammo
    }

    incAmmo(increase){
        this.ammo = this.ammo + increase;
    }

    decAmmo(){
        this.ammo = this.ammo - 1;
    }

    resetHealth(){
        this.health = 100;
    }

    decHealth(){
        this.ammo = this.ammo - 0.5;
    }
    
}