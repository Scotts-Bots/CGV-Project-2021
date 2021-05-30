class Player {

    static name = name;
    static health = 100;
    static ammo = 0;
    static cards = 0;
    static gun = false;

    static setName(Name) {
        this.name = Name;
    }

    static getName() {
        return this.name;
    }

    static getHealth() {
        return this.health;
    }

    static getAmmo() {
        return this.ammo;
    }

    static getCards() {
        return this.cards;
    }

    static incAmmo() {
        this.ammo = this.ammo + 16;
    }

    static decAmmo() {
        this.ammo = this.ammo - 1;
    }

    static resetHealth() {
        this.health = 100;
    }

    static decHealth() {
        this.health = this.health - 0.5;
    }

    static incCards(increase) {
        this.cards = this.cards + increase;
    }

    static decCards() {
        this.cards = this.cards - 1;
    }

    static checkGun(){
        return this.gun;
    }

    static pickUpGun(){
        this.gun = true;
    }

}