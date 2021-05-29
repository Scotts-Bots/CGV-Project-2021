const scene = new THREE.Scene();
intensity = 1;
len = 10;

var _euler = new THREE.Euler( 0, 0, 0, 'YXZ' );

var cam = new THREE.PerspectiveCamera(45, innerWidth/innerHeight, 1, 100000);
var renderer = new THREE.WebGL1Renderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(innerWidth, innerHeight);
//cam.position.set(500,50,2200);
cam.position.set(2100,50,200);
cam.lookAt(2900,0,2000);
//cam.lookAt(-2000,0,15000)


var directionalLight = new THREE.PointLight(0xffdead, 0.5);
directionalLight.position.set(47500, 8000, 20000);
//directionalLight.castShadow = true;
//scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.05);//0.05
scene.add(ambientLight);


//back right room
const light9 = new THREE.PointLight( 0xffffff, intensity, 2200 ,2 ); 
light9.position.set( -100,375,2100 ); 
light9.castShadow = true;
scene.add( light9 );
// const light10 = new THREE.PointLight( 0xffffff, 1, 2100 ,2 ); 
// light10.position.set( -100,375,2200 ); 
// light10.castShadow = true;
//scene.add( light10 );


//front right room
const light7 = new THREE.PointLight( 0xffffff, intensity, 2500 ,2 ); 
light7.position.set( -100,375,900 ); 
light7.castShadow = true;
scene.add( light7 );
// const light8 = new THREE.PointLight( 0xffffff, 1, 2000 ,2 ); 
// light8.position.set( -100,375,800 ); 
// light8.castShadow = true;
//scene.add( light8 );

//passage light
// const light4 = new THREE.PointLight( 0xffffff, 0.5, 1700 ,2 ); 
// light4.position.set( 1300,375,1650 ); 
//light4.castShadow = true;
//scene.add( light4 );
const light5 = new THREE.PointLight( 0xffffff, intensity, 800 ,2 ); 
light5.position.set( 1300,375,1500 ); 
light5.castShadow = true;
scene.add( light5 );
// const light6 = new THREE.PointLight( 0xffffff, 0.5, 1700 ,2 ); 
// light6.position.set( 1300,375,1350 ); 
//light6.castShadow = true;
//scene.add( light6 );

//emergency light
const light3 = new THREE.PointLight( 0xff0000, 3, 900 ,2 ); 
light3.position.set( 2000,200,1200 ); 
light3.castShadow = true;
scene.add( light3 );

//flourescent light
// const light = new THREE.PointLight( 0xffffff, 1, 3000 ,2 ); 
// light.position.set( 2500,375,1650 ); 
//light.castShadow = true;
//scene.add( light );
const light1 = new THREE.PointLight( 0xffffff, intensity, 6000 ,2 ); 
light1.position.set( 2500,375,1500 ); 
light1.castShadow = true;
light1.shadow.bias = -0.0001;
scene.add( light1 );
// const light2 = new THREE.PointLight( 0xffffff, 1, 3000 ,2 ); 
// light2.position.set( 2500,375,1350 ); 
//light2.castShadow = true;
//scene.add( light2 );


const room = Room();
room.scale.set(4,4,2.5);
room.rotateX(3*Math.PI/2);
scene.add(room);


const box = sky();
box.translateY(14600);
scene.add(box);

document.body.appendChild(renderer.domElement);

function onMouseMove( event ) {
	const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
				const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

				_euler.setFromQuaternion( cam.quaternion );

				_euler.y -= movementX * 0.02;
				_euler.x -= movementY * 0.02;
				_euler.x = Math.max(Math.PI / 2 - 3.141592653589793, Math.min(Math.PI / 2 - 0, _euler.x ) );
				cam.quaternion.setFromEuler( _euler );

}

let controls = new THREE.PointerLockControls(cam, renderer.domElement);


let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('clicAk', ()=>{
    //WWWWWWWWWWWWWWWDSASDAScontrols.lock();
});

let keyboard = [];
addEventListener('keydown', (e)=>{
    keyboard[e.key] = true;
});
addEventListener('keyup', (e)=>{
    keyboard[e.key] = false;
});
function processKeyboard(){
    var speed = 15
    if (keyboard['w']){
        controls.moveForward(speed);
    }
    else if(keyboard['a']){
        controls.moveRight(-speed);
    }
    else if(keyboard['s']){
        controls.moveForward(-speed);
    }
    else if(keyboard['d']){
        controls.moveRight(speed);
    }
}

function drawScene(){
    if (len == 0){
        len = Math.floor(Math.random() * 10);
        ran = Math.floor(Math.random() * 6);
        if (ran == 2){
            intensity = 0.3;
            light1.intensity = intensity;
            light5.intensity = intensity;
            light7.intensity = intensity;
            light9.intensity = intensity;
        }else{
            intensity = 1;
            light1.intensity = intensity;
            light5.intensity = intensity;
            light7.intensity = intensity;
            light9.intensity = intensity;
        }
    }else{
        len = len-1;
    }

    //raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

	// calculate objects intersecting the picking ray
	//const intersects = raycaster.intersectObjects( finder, true );

	// if (intersects.length > 0) {
    //     alert("Mouse on Circle");
    // }

    // raycaster.setFromCamera( mouse, cam );

	// // calculate objects intersecting the picking ray
	// let intersects = raycaster.intersectObjects( scene.children );
    // if (intersects.length > 0){
    //     console.log(intersects);
    // }
    
    
    
    renderer.render(scene, cam);
    processKeyboard();
    //wscon.update;
    requestAnimationFrame(drawScene);
}

window.addEventListener( 'mousemove', onMouseMove, false );

drawScene();

// const finder = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(200,200,200),
//     new THREE.MeshLambertMaterial({color: 0xffffff})
// );
// finder.position.set(2500,375,1500);