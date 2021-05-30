function Reticle() {
    var reticle = new THREE.Group();


    var circle = new THREE.Mesh(
        new THREE.RingBufferGeometry(0.8, 1, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending, side: THREE.DoubleSide })
    );
    var rect = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.25, 0.01, 0.1),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    var rect1 = new THREE.Mesh(
        new THREE.BoxBufferGeometry(0.01, 0.25, 0.01),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    circle.scale.set(0.1, 0.1, 1);
    circle.position.z = -9;
    circle.lookAt(300, 50, 2000);
    rect.position.z = -9;
    rect.lookAt(300, 50, 2000);
    rect1.position.z = -9;
    rect1.lookAt(300, 50, 2000);
    reticle.add(circle);
    reticle.add(rect);
    reticle.add(rect1);

    return reticle;
}