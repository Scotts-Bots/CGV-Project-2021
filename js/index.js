//creating a scene
const scene = new THREE.Scene();

// arrray containing color of vehicles
const vehicleColors = [0xa52523 , 0xbdb638 , 0x78b14b];

//adding a car object to the scene
const playerCar = Car();
scene.add(playerCar);

// adding ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

//adding directional light @ position 100,-300, 400
const dirLight = new THREE.DirectionalLight(0xffffff,0.6);
dirLight.position.set(100,-300, 400);
scene.add(dirLight);

//adding orthographic camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 150;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
    cameraWidth / -2, //Left
    cameraWidth / 2, // Right
    cameraHeight / 2, //top
    cameraHeight / -2, // bottom
    0, //near
    1000 // far
);
camera.position.set(200,-200,300);
camera.up.set(0,0,1);
camera.lookAt(0,0,0);

/*Perspective camera code
    const aspectRatio = window.innerwidthh / width/innerheight;

    const camera = new THREE.PerspectiveCamera(
        20, vertical field of view
        aspectRatio, aspect ratio
        60, // near plane
        100 // far plane
    )

*/

// setting up renderer
const renderer = new THREE.WebGL1Renderer({antialias : true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene,camera);

document.body.appendChild(renderer.domElement);

//setting up the car
function Car(){
    const car = new THREE.Group();

    const backWheel = Wheel();
    backWheel.position.x = -18;
    car.add(backWheel);

    const frontWheel = Wheel();
    frontWheel.position.x = 18;
    car.add(frontWheel);

    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(60,30,15),
        new THREE.MeshLambertMaterial({color:pickRandom(vehicleColors)})
    );
    main.position.z = 12;
    car.add(main);

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33,24,12),
        new THREE.MeshLambertMaterial({color:0xffffff})
    );
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    car.add(cabin);

    return car;
}

// Wheel function
function Wheel() {
    const wheel = new THREE.Mesh(
        new THREE.BoxBufferGeometry(12,33,12),
        new THREE.MeshLambertMaterial({color:0x333333})
    );
    wheel.position.z = 6;
    return wheel

}

// random color picker for car
function pickRandom(array){
    return array[Math.floor(Math.random() * array.length)];
}