class Player{

    constructor(name) { 
        this.name = name;
        this.health = 100;
        this.ammo = 0;
        this.cards = 0;
    }

    getName() { 
        return this.name;
    }

    getHealth() { 
        return this.health;
    }

    getAmmo() { 
         return this.ammo;
    }

    getCards() { 
        return this.cards;
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
        this.health = this.health - 0.5;
    }

    incCards(increase){
        this.cards = this.cards + increase;
    }

    decCards(){
        this.cards = this.cards - 1;
    }
    
}