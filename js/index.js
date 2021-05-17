//creating a scene
const scene = new THREE.Scene();

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
const aspectRatio = new window.innerWidth / window.innerHeight;
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
	
/*Perspective camera code
    const aspectRatio = window.innerwidthh / width/innerheight;

    const camera = new THREE.PerspectiveCamera(
        20, vertical field of view
        aspectRatio, aspect ratio
        60, // near plane
        100 // far plane
    )

*/

