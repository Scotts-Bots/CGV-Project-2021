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
const cameraWidth = 960;
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

renderMap(cameraWidth*2 , cameraHeight*2);

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

    const carFrontTexture = getCarFrontTextures();
    carFrontTexture.center = new THREE.Vector2(0.5,0.5);
    carFrontTexture.rotation = Math.PI /2;

    const carBackTexture = getCarFrontTextures();
    carBackTexture.center = new THREE.Vector2(0.5,0.5);
    carBackTexture.rotation = -Math.PI /2;

    const carRightSideTexture = getCarSideTextures();

    const carLeftSideTexture = getCarSideTextures();
    carLeftSideTexture.flipY = false;

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(33,24,12),[
            new THREE.MeshLambertMaterial({map : carFrontTexture}),
            new THREE.MeshLambertMaterial({map : carBackTexture}),
            new THREE.MeshLambertMaterial({map : carLeftSideTexture}),
            new THREE.MeshLambertMaterial({map : carRightSideTexture}),
            new THREE.MeshLambertMaterial({color:0xffffff}), // top
            new THREE.MeshLambertMaterial({color:0xffffff}),  // bottom
        ]
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

//creating windows
function getCarFrontTextures(){
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0,0,64,32);

    context.fillStyle = "#666666";
    context.fillRect(8,8,48,24);

    return new THREE.CanvasTexture(canvas);
}

function getCarSideTextures(){
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 32;
    const context = canvas.getContext("2d");

    context.fillStyle = "#ffffff";
    context.fillRect(0,0,128,32);

    context.fillStyle = "#666666";
    context.fillRect(10,8,38,24);
    context.fillRect(58,8,60,24);

    return new THREE.CanvasTexture(canvas);
}

// drawing track
const trackRadius = 225;
const trackWidth = 45;
const innerTrackRadius = trackRadius - trackWidth;
const outerTrackRadius = trackRadius + trackWidth;

const arcAngle1 = (1/3) * Math.PI;

const deltaY = Math.sin(arcAngle1) * innerWidth;
const arcAngle2 = Math.asin(deltaY / outerTrackRadius);

const arcCenterX = (
    Math.cos(arcAngle1) * innerTrackRadius + 
    Math.cos(arcAngle2) * outerTrackRadius
)/2;

const arcAngle3 = Math.acos(arcCenterX / innerTrackRadius);

const arcAngle4 = Math.acos(arcCenterX / outerTrackRadius);

function renderMap(mapWidth , mapHeight){

    const planeGeometry = new THREE.PlaneBufferGeometry(mapWidth,mapHeight);
    const planeMaterial = new THREE.MeshLambertMaterial({
        color : 0x546e90,
    });
    const plane = new THREE.Mesh(planeGeometry,planeMaterial);
    scene.add(plane);
}