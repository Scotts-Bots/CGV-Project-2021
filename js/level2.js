
    //creating a scene
    const scene = new THREE.Scene();

    //adding ambient light
    const ambientLight1 = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight1);

    //adding directional light @ position 100,-300, 400
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(400, 500, -600);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight2.position.set(-500, 400, 100);
    //scene.add(dirLight2);

    //adding orthographic camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    const cameraWidth = 3500;
    const cameraHeight = cameraWidth / aspectRatio;

    const camera = new THREE.OrthographicCamera(
        cameraWidth / -2, //Left
        cameraWidth / 2, // Right
        cameraHeight / 2, //top
        cameraHeight / -2, // bottom
        -800, //near
        5000 // far
    );

    camera.position.set(-300, 200, -300);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);

    /*Perspective camera code
        const aspectRatio = window.innerwidthh / width/innerheight;

        const camera = new THREE.PerspectiveCamera(
            20, vertical field of view
            aspectRatio, aspect ratio
            60, // near plane
            100 // far plane
        )

    */

    const room = Room();
    room.scale.setScalar(0.5);
    scene.add(room);

    //setting up renderer
    const renderer = new THREE.WebGL1Renderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    document.body.appendChild(renderer.domElement);

    //generic floor mesh
    function Wall() {
        const floor = new THREE.Mesh(
            new THREE.BoxBufferGeometry(200, 100, 200),
            new THREE.MeshLambertMaterial({ color: 0x808080 })
        );
        return floor;
    }

    //generic wall mesh
    function Wall() {
        const wall = new THREE.Mesh(
            new THREE.BoxBufferGeometry(100, 800, 50),
            new THREE.MeshLambertMaterial({ color: 0xc99f63 })
        );
        return wall;
    }

    //wall with a single window
    function WindowedWall() {
        windowedWall = new THREE.Group();
        var wallHeight = 0;

        const leftWall = Wall();
        leftWall.scale.set(2,1,1);
        leftWall.position.set(-400,wallHeight,0);
        windowedWall.add(leftWall);

        const rightWall = Wall();
        rightWall.scale.set(2,1,1);
        rightWall.position.set(400,wallHeight,0);
        windowedWall.add(rightWall);

        const topWall = Wall();
        topWall.scale.set(1,0.8,1);
        topWall.rotateZ(Math.PI/2);
        topWall.position.set(0,350 + wallHeight,0);
        windowedWall.add(topWall);

        const bottomWall = Wall();
        bottomWall.scale.set(4,0.8,1);
        bottomWall.rotateZ(Math.PI/2);
        bottomWall.position.set(0,-200 + wallHeight,0);
        windowedWall.add(bottomWall);

        return windowedWall;
    }

    //Room unit that gets repeated multiple times
    function RoomPart() {
        const roomPart = new THREE.Group();
        //FLOORS
            //main floor 1 - f1
            const f1 = Wall()
            f1.scale.set(4,1,8);
            roomPart.add(f1);

            //floors 2 and 3
            const f2 = Wall();
            f2.scale.set(2,1,2);
            f2.position.set(600,0,600);
            roomPart.add(f2);

            const f3 = Wall();
            f3.scale.set(2,1,2);
            f3.position.set(600,0,-600);
            roomPart.add(f3);

            //walls 2 - 6
            const w2 = Wall();
            w2.scale.set(5,1,1);
            w2.rotateY(Math.PI/2);
            w2.position.set(820,200,550);
            roomPart.add(w2);

            const w6 = Wall();
            w6.scale.set(5,1,1);
            w6.rotateY(Math.PI/2);
            w6.position.set(820,200,-550);
            roomPart.add(w6);

            const w5 = Wall();
            w5.scale.set(5,1,1);
            w5.position.set(600,200,-380);
            roomPart.add(w5);

            const w3 = Wall();
            w3.scale.set(5,1,1);
            w3.position.set(600,200,380);
            roomPart.add(w3);

            const w4 = Wall();
            w4.scale.set(8,1,1);
            w4.rotateY(Math.PI/2);
            w4.position.set(375,200,0);
            roomPart.add(w4);

        return roomPart;
    }
    
    //Entire room of level
    function Room() {
        const room = new THREE.Group();

        //SUB ROOMS
            const roomPart1 = RoomPart();
            room.add(roomPart1);

            const roomPart2 = RoomPart();
            roomPart2.position.set(320,0,-1600);
            roomPart2.rotateY(Math.PI);
            room.add(roomPart2);

            const roomPart3 = RoomPart();
            roomPart3.position.set(400,0,-1600);
            room.add(roomPart3);

        //FLOORS
            //floors 4 and 5
            const f4 = Wall();
            f4.scale.set(4,1,5);
            f4.position.set(-800,0,300);
            room.add(f4);

            const f5 = Wall();
            f5.scale.set(4,1,3);
            f5.position.set(-800,0,-500);
            room.add(f5);
        
        //WALLS
            //walls 1,7
            const w1 = Wall();
            w1.scale.set(21,1,1);
            w1.position.set(-210,200,825);
            room.add(w1);

            const w7 = Wall();
            w7.scale.set(15,1,1);
            w7.position.set(-450,200,-800);
            room.add(w7);

            //walls 10,13,15,3r
            const w10 = Wall();
            w10.scale.set(10,1,1);
            w10.rotateY(Math.PI/2);
            w10.position.set(-1200,200,350);
            room.add(w10);

            const w13 = Wall();
            w13.scale.set(2,1,1);
            w13.rotateY(Math.PI/2);
            w13.position.set(-500,200,750);
            room.add(w13);

            const w15 = Wall();
            w15.scale.set(6,1,1);
            w15.rotateY(Math.PI/2);
            w15.position.set(-500,200,-500);
            room.add(w15);

            const w3r = Wall();
            w3r.scale.set(5,1,1);
            w3r.position.set(1050,200,-780);
            room.add(w3r);

            //walls with windows
            const w9 = WindowedWall();
            w9.scale.set(0.8,1,1);
            w9.rotateY(Math.PI/2);
            w9.position.set(-1200,200,-450);
            room.add(w9);

            const w14 = WindowedWall();
            w14.scale.set(0.8,1,1);
            w14.rotateY(Math.PI/2);
            w14.position.set(-500,200,0);
            room.add(w14);

            const w14r = Wall();
            w14r.scale.set(3,0.2,1);
            w14r.rotateY(Math.PI/2);
            w14r.position.set(-500,520,500);
            room.add(w14r);

            //end of level wall
            const w20 = Wall();
            w20.scale.set(6,1,1);
            w20.position.set(-200,200,-2400);
            room.add(w20);

            const w21 = Wall();
            w21.scale.set(6,1,1);
            w21.position.set(900,200,-2400);
            room.add(w21);

            const w21r = Wall();
            w21r.scale.set(2,1,1);
            w21r.rotateZ(Math.PI/2);
            w21r.position.set(200,500,-2400);
            room.add(w21r);

        return room;
    }