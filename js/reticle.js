function addReticle(cam) {
    var reticle = new THREE.Group();

    var circle = new THREE.Mesh(
        new THREE.RingBufferGeometry(0.015, 0.02 , 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
    );
    var rect = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.06, 0.003, 0.008),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    var rect1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.003, 0.06, 0.008),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    circle.position.z = -2;
    circle.lookAt(cam.quaternion.x*2000,cam.quaternion.y,cam.quaternion.z*2000);///300, 50, 2000);
    rect.position.z = -2;
    rect.lookAt(cam.quaternion.x*2000,cam.quaternion.y,cam.quaternion.z*2000);
    rect1.position.z = -2;
    rect1.lookAt(cam.quaternion.x*2000,cam.quaternion.y,cam.quaternion.z*2000);
    reticle.add(circle);
    reticle.add(rect);
    reticle.add(rect1);

    cam.add(reticle);
}