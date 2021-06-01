//All the functions associated with keyboard controls are located here.
const speedDefault = 40;
var speedW = speedDefault;
var speedA = speedDefault;
var speedS = speedDefault;
var speedD = speedDefault;
var lastKeyPressed;


let keyboard = [];
addEventListener('keydown', (e)=>{
    keyboard[e.key] = true;
});
addEventListener('keyup', (e)=>{
    keyboard[e.key] = false;
});



function processKeyboard(){
    if (keyboard['w']){
        controls.moveForward(speedW);
        lastKeyPressed = 'w';
    }
    else if(keyboard['a']){
        controls.moveRight(-speedA);
        lastKeyPressed = 'a';
    }
    else if(keyboard['s']){
        controls.moveForward(-speedS);
        lastKeyPressed = 's';
    }
    else if(keyboard['d']){
        controls.moveRight(speedD);
        lastKeyPressed = 'd';
    }
    else if (keyboard['r']) {
        controls.lock();
    }
}

function updateKeyboard(isCollision){
    if (isCollision) {
        //appendText(" Hit ");
        switch (lastKeyPressed) {
            case "w":
                speedW = 0;
                break;
            case "a":
                speedA = 0;
                break;
            case "s":
                speedS = 0;
                break;
            case "d":
                speedD = 0;
                break;
        }
    } else {
        speedA = speedDefault;
        speedW = speedDefault;
        speedS = speedDefault;
        speedD = speedDefault;
    }
}