/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/

// MAIN
// standard global variables
// var container, scene, camera, renderer, stats;
// var clock = new THREE.Clock();
// custom global variables

var cubeGeometry = new THREE.BoxBufferGeometry(50,50,50,3,3,3);
    var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
    MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
    MovingCube.position.set(0, 0, 0);
var collidableMeshList = [];

function setCollisionDetection(){
    camera.add(MovingCube);
}

/*let btn1 = document.querySelector("#button1");
    btn1.addEventListener('click', ()=>{
        controls.lock();
    });



function processKeyboard(){
    var speed = 10;
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


	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,50,400);
	camera.lookAt(scene.position);	
	// RENDERER
	renderer = new THREE.WebGLRenderer( {antialias:true} );
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild(renderer.domElement);
    //CONTROLS
    let controls = new THREE.PointerLockControls(camera, renderer.domElement);
    let keyboard = [];
    addEventListener('keydown', (e)=>{
        keyboard[e.key] = true;
    });
    addEventListener('keyup', (e)=>{
        keyboard[e.key] = false;
    });
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
	// FLOOR
	var floorMaterial = new THREE.MeshBasicMaterial( {color:0x444444, side:THREE.DoubleSide} );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.BoxBufferGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	////////////
	// CUSTOM //
	////////////

	var cubeGeometry = new THREE.BoxBufferGeometry(50,50,50,1,1,1);
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
	MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
	MovingCube.position.set(0, 25.1, 0);
	camera.add( MovingCube );	
    console.log(MovingCube.geometry.attributes.position.array.length);
	
	var wallGeometry = new THREE.BoxBufferGeometry( 100, 100, 20, 1, 1, 1 );
	var wallMaterial = new THREE.MeshBasicMaterial( {color: 0x8888ff} );
	var wireMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe:true } );
	
	var wall = new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(100, 50, -100);
	scene.add(wall);
	collidableMeshList.push(wall);
	var wall = new THREE.Mesh(wallGeometry, wireMaterial);
	wall.position.set(100, 50, -100);
	scene.add(wall);
	
	var wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
	wall2.position.set(-150, 50, 0);
	wall2.rotation.y = 3.14159 / 2;
	scene.add(wall2);
	collidableMeshList.push(wall2);
	var wall2 = new THREE.Mesh(wallGeometry, wireMaterial);
	wall2.position.set(-150, 50, 0);
	wall2.rotation.y = 3.14159 / 2;
	scene.add(wall2);

    animate();

/*function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}


function update()
{	
	processKeyboard();
				
	// collision detection:
	//   determines if any of the rays from the cube's origin to each vertex
	//		intersects any face of a mesh in the array of target meshes
	//   for increased collision accuracy, add more vertices to the cube;
	//		for example, new THREE.CubeGeometry( 64, 64, 64, 8, 8, 8, wireMaterial )
	//   HOWEVER: when the origin of the ray is within the target mesh, collisions do not occur
	var originPoint = camera.position;

	clearText();
	var cubeArr = MovingCube.geometry.attributes.position.array;
	for (var vertexIndex = 0; vertexIndex < cubeArr.length/3; vertexIndex+=3)
	{
		var localVertex = new THREE.Vector3(cubeArr[vertexIndex],cubeArr[vertexIndex+1],cubeArr[vertexIndex+2]);
		var globalVertex = localVertex.applyMatrix4( MovingCube.matrix );
		var directionVector = globalVertex.sub( MovingCube.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
			appendText(" Hit ");
            console.log(keyboard)
	}	
}

function render() 
{
	renderer.render( scene, camera );
}

*/
function clearText()
{   document.getElementById('message').innerHTML = '..........';   }

function appendText(txt)
{   document.getElementById('message').innerHTML += txt;   }

function checkCollision(){
    var originPoint = camera.position;

	clearText();
	var cubeArr = MovingCube.geometry.attributes.position.array;
	for (var vertexIndex = 0; vertexIndex < cubeArr.length/3; vertexIndex+=3)
	{
		var localVertex = new THREE.Vector3(cubeArr[vertexIndex],cubeArr[vertexIndex+1],cubeArr[vertexIndex+2]);
		var globalVertex = localVertex.applyMatrix4( MovingCube.matrix );
		var directionVector = globalVertex.sub( MovingCube.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
			appendText(" Hit ");
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
}
