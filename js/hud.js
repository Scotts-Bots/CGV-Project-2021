var helpText;

var loader = new THREE.FontLoader();

    loader.load('node_modules/three/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var helperText = new THREE.TextGeometry("Complete all tasks before proceeding to next level", {

            font: font,

            size: 0.02,
            height: 0.001,
            curveSegments: 2,

        });

        textMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

        helpText = new THREE.Mesh(helperText, textMaterial);
        helpText.position.z = -1;
        helpText.position.y = 0.03;
        helpText.position.x = -0.325;


    });

    function ShowHelp(help){
    
        if (help){
            cam.add(helpText);
            scene.add(cam);
        }else{
            cam.remove(helpText);
        scene.add(cam);
        }
        
    }


function HUD() {

    let check = document.getElementById("Hbar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Obar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("helper");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Q");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("torch");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("ammo");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Name");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("gun");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("card");
    if (check != null) {
        check.parentNode.removeChild(check);
    }

    var Name = document.createElement('div');
    Name.id = "Name";
    Name.style.position = 'absolute';
    Name.style.color = "white";
    Name.style.fontSize = "25px";
    Name.style.letterSpacing = "2px";
    Name.style.fontFamily = "Helvetica";
    Name.style.width = 200;
    Name.style.height = 500;
    Name.innerHTML = Player.getName();
    Name.style.top = 70 + 'px';
    Name.style.left = 70 + 'px';

    var Hbar = document.createElement('progress');
    Hbar.id = "Hbar";
    Hbar.style.position = 'absolute';
    Hbar.value = Player.getHealth();
    Hbar.max = 100;
    Hbar.style.top = 100 + 'px';
    Hbar.style.left = 75 + 'px';
    Hbar.style.backgroundColor = 'green';

    var Obar = document.createElement('progress');
    Obar = document.createElement('progress');
    Obar.id = "Obar";
    Obar.style.position = 'absolute';
    Obar.value = Player.getOxygen();
    Obar.max = 100;
    Obar.style.top = 120 + 'px';
    Obar.style.left = 75 + 'px';

    var ammo = document.createElement('div');
    ammo.id = "ammo"
    ammo.style.position = 'absolute';
    ammo.style.color = "white";
    ammo.style.fontSize = "20px";
    ammo.style.letterSpacing = "2px";
    ammo.style.fontFamily = "Helvetica";
    ammo.style.width = 200;
    ammo.style.height = 500;
    ammo.innerHTML = "Ammo: " + Player.getAmmo();
    ammo.style.top = 750 + 'px';
    ammo.style.left = 2200 + 'px';

    var torch = document.createElement("img");
    torch.id = "torch";
    torch.style.position = 'absolute';
    torch.src = "Images/torch.png";
    torch.style.top = 850 + 'px';
    torch.style.left = 2100 + 'px';
    torch.width = 80;

    var gun = document.createElement("img");
    gun.id = "gun";
    gun.style.position = 'absolute';
    gun.src = "Images/gun.jpg";
    gun.style.top = 850 + 'px';
    gun.style.left = 2230 + 'px';
    gun.width = 85;

    var card = document.createElement("img");
    card.id = "card";
    card.style.position = 'absolute';
    card.src = "Images/keycard.jpg";
    card.style.top = 650 + 'px';
    card.style.left = 2200 + 'px';
    card.height = 80;

    var helper = document.createElement('div');
    helper.id = "helper";
    helper.style.position = 'absolute';
    helper.style.color = "white";
    helper.style.fontSize = "15px";
    helper.style.letterSpacing = "2px";
    helper.style.fontFamily = "Helvetica";
    helper.style.width = 1500;
    helper.style.height = 700;
    helper.innerHTML = "To aim center the mouse on the reticle and press r, Shoot - single click,    Interact - double click,         Movement - WASD           PAUSE - P";
    helper.style.top = 40 + 'px';
    helper.style.left = 500 + 'px';

    var Q = document.createElement('div');
    Q.id ="Q";
    Q.style.position = 'absolute';
    Q.style.color = "white";
    Q.style.fontSize = "20px";
    Q.style.letterSpacing = "2px";
    Q.style.fontFamily = "Helvetica";
    Q.style.width = 200;
    Q.style.height = 500;
    Q.innerHTML = "Q";
    Q.style.top = 820 + 'px';
    Q.style.left = 2130 + 'px';


    document.body.appendChild(Hbar);
    document.body.appendChild(Obar);
    document.body.appendChild(Name);
    document.body.appendChild(ammo);
    document.body.appendChild(torch);
    document.body.appendChild(Q);
    document.body.appendChild(helper);
    if (Player.checkGun() != false && Player.getAmmo() > 0) {
        document.body.appendChild(gun);
    }
    if (Player.getCards() > 0) {
        document.body.appendChild(card);
    }

}

function RemoveHUD(){
    check = document.getElementById("Hbar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("card");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Obar");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("helper");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Q");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("torch");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("ammo");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("Name");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
    check = document.getElementById("gun");
    if (check != null) {
        check.parentNode.removeChild(check);
    }
}

