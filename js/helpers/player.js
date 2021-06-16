// function supports_html5_storage() {
//     try {
//       return 'localStorage' in window && window['localStorage'] !== null;
//     } catch (e) {
//       return false;
//     }
// }

  //This class contains information about the player including stats and name,
//and functions to update respective members.
class Player {
    // static name = localStorage["name"];
    // static health = localStorage["health"];
    // static oxygen = localStorage["oxygen"];
    // static ammo = localStorage["ammo"];
    // static cards = localStorage["cards"];
    // static gun = localStorage["gun"];
    static name = "Guest";
    static health = 100;
    static oxygen = 100;
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

    static getOxygen() {
        return this.oxygen;
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

    static resetOxygen() {
        this.oxygen = 100;
    }

    static decHealth(amt) {
        this.health = this.health - amt;
    }

    static decOxygen(amt) {
        this.oxygen = this.oxygen - amt;
    }

    static incCards() {
        this.cards = this.cards + 1;
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