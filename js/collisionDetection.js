/*
	Three.js "tutorials by example"
	Author: Lee Stemkoski
	Date: July 2013 (three.js v59dev)
*/
//example hit box
// var cubeGeometry = new THREE.BoxBufferGeometry(200,200,200,3,3,3);
//     var wireMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe:true } );
//     MovingCube = new THREE.Mesh( cubeGeometry, wireMaterial );
//     MovingCube.position.set(0, 0, 0);

var collidableMeshList = [];

function setCollisionDetection(obj,hitBox){
    obj.add(hitBox);
}

function clearText()
{   document.getElementById('message').innerHTML = '..........';   }

function appendText(txt)
{   document.getElementById('message').innerHTML += txt;   }

function checkCollision(obj,reactionFunction,hitBox){
    var originPoint = obj.position;

	//clearText();
	var cubeArr = hitBox.geometry.attributes.position.array;
	for (var vertexIndex = 0; vertexIndex < cubeArr.length/3; vertexIndex+=3)
	{
		var localVertex = new THREE.Vector3(cubeArr[vertexIndex],cubeArr[vertexIndex+1],cubeArr[vertexIndex+2]);
		var globalVertex = localVertex.applyMatrix4( hitBox.matrix );
		var directionVector = globalVertex.sub( hitBox.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){
            reactionFunction(true);
        } //if there is a collision
        else{
            reactionFunction(false);
        }   
	}
}
