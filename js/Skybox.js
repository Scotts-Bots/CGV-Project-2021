
    //creating a scene
    const scene = new THREE.Scene();

    // adding ambient light
    const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight1);

    //adding directional light @ position 100,-300, 400
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(100, -300, 400);
    scene.add(dirLight);

    //adding orthographic camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraWidth = 3500;
    const cameraHeight = cameraWidth / aspectRatio;

    /*const camera = new THREE.OrthographicCamera(
        cameraWidth / -2, //Left
        cameraWidth / 2, // Right
        cameraHeight / 2, //top
        cameraHeight / -2, // bottom
        -800, //near
        5000 // far
    );*/

    const camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,10000);
    camera.position.set(-900, -200, -900);
    //camera.up.set(0, 0, 1);
    //camera.position.set(0,0,300);
    camera.lookAt(1, 1, 1);

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
    const renderer = new THREE.WebGL1Renderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    

    document.body.appendChild(renderer.domElement);


    scene.add(skyBox);


    renderer.render(scene, camera);

    function sky(){
        const materialArray = [];
        const texture_ft = new THREE.TextureLoader().load('js/marslike01ft.jpg');
        const texture_bk = new THREE.TextureLoader().load('js/marslike01bk.jpg');
        const texture_lt = new THREE.TextureLoader().load('js/marslike01lf.jpg');
        const texture_rt = new THREE.TextureLoader().load('js/marslike01rt.jpg');
        const texture_dn = new THREE.TextureLoader().load('js/marslike01dn.jpg');
        const texture_up = new THREE.TextureLoader().load('js/marslike01up.jpg');
    
        materialArray.push(new THREE.MeshBasicMaterial({map : texture_ft}));
        materialArray.push(new THREE.MeshBasicMaterial({map : texture_bk}));
        materialArray.push(new THREE.MeshBasicMaterial({map : texture_lt}));
        materialArray.push(new THREE.MeshBasicMaterial({map : texture_rt}));
        materialArray.push(new THREE.MeshBasicMaterial({map : texture_dn}));
        materialArray.push(new THREE.MeshBasicMaterial({map : texture_up}));
    
        for (let i = 0; i < 6; i++){
            materialArray[i].side = THREE.BackSide;
        }
               
    
        const skyBoxGeo = new THREE.BoxGeometry(10000,10000,10000);
        const skyBox = new THREE.Mesh(skyBoxGeo,materialArray);

        return skyBox
    }

    /*
    const scene = new THREE.Scene();
var cam = new THREE.PerspectiveCamera(55, innerWidth/innerHeight,1, 30000);
var renderer = new THREE.WebGLRenderer({antialias: true});

scene.background = new THREE.Color(0xfafafa);
renderer.setSize(innerWidth, innerHeight);
//cam.position.z = 5;
//cam.position.y = 0;
cam.position.set(0,-900,0);
document.body.appendChild(renderer.domElement);
var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 100);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const box = sky();
scene.add(box);
// let grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
// grid.position.set(0, -0.5, 0);
// scene.add(grid);

// let bGeo = new THREE.BoxGeometry(1, 1, 1);
// let bMat = new THREE.MeshStandardMaterial({color: 0x00ff00, wireframe: false});
// let cube = new THREE.Mesh(bGeo, bMat);
// scene.add(cube);

let controls = new THREE.PointerLockControls(cam, renderer.domElement);
let clock = new THREE.Clock();

let btn1 = document.querySelector("#button1");
btn1.addEventListener('click', ()=>{
    controls.lock();
});

let keyboard = [];
addEventListener('keydown', (e)=>{
    keyboard[e.key] = true;
});
addEventListener('keyup', (e)=>{
    keyboard[e.key] = false;
});
function processKeyboard(){
    var speed =50;
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
    renderer.render(scene, cam);
    processKeyboard();
    requestAnimationFrame(drawScene);
}

function sky(){
    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load('js/marslike01ft.jpg');
    const texture_bk = new THREE.TextureLoader().load('js/marslike01bk.jpg');
    const texture_up = new THREE.TextureLoader().load('js/marslike01up.jpg');
    const texture_dn = new THREE.TextureLoader().load('js/marslike01dn.jpg');
    const texture_rt = new THREE.TextureLoader().load('js/marslike01rt.jpg');
    const texture_lt = new THREE.TextureLoader().load('js/marslike01lf.jpg');

    materialArray.push(new THREE.MeshBasicMaterial({map : texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map : texture_lt}));

    for (let i = 0; i < 6; i++){
        materialArray[i].side = THREE.BackSide;
    }
           

    const skyBoxGeo = new THREE.BoxGeometry(30000,30000,30000);
    const skyBox = new THREE.Mesh(skyBoxGeo,materialArray);

    return skyBox
}

drawScene();
*/