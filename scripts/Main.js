/**
 * Created by pp on 2016/7/10.
 */

require.config({
    paths:{
        "three":"lib/three",
        "OrbitControls":"lib/OrbitControls",
        "SpriteParticleSystem":"lib/SpriteParticleSystem",
        "Tween":"lib/Tween",
        "PointerLockControls":"lib/PointerLockControls",
        "cannon":"lib/cannon"
    },
    shim:{
        "three":{exports:"THREE"},
        "OrbitControls":{
            deps:["three"],
            exports:"OrbitControls"
        },
        "SpriteParticleSystem":{
            deps:["three"],
            exports:"SpriteParticleSystem"
        },
        "Tween":{exports:"TWEEN"},
        "PointerLockControls":{
            deps:["three", "cannon"],
            exports:"PointerLockControls"
        },
        "cannon":{
            exports:"CANNON"
        }
    }
});

require([
    "three",
    "OrbitControls",
    "Tween",
    "SpriteParticleSystem",
    "PointerLockControls",
    "cannon",
    "js/scene/Basic",
    "js/scene/CreateRoom",
    "js/scene/createLight",
    "js/CaseBox",
    "js/text/drawSprite",
    "js/JsonLoader",
    "js/ManRoad",
    "js/Marker",
    "js/pipes/Pipe",
    "js/Smoke" ,
    "js/WaterDetection",
    "js/Winds",
    "js/text/PlaneText",
    "js/detectCollision/DetectCollision",
    "js/animates/SetAnimate",
    "js/detectCollision/SetOrbit"
    ],
    function(THREE,
             OrbitControls,
             TWEEN,
             SpriteParticleSystem,
             PointerLockControls,
             CANNON,
             Basic,
             CreateRoom,
             createlight,
             CaseBox,
             drawSprite,
             JsonLoader,
             createRoad,
             CreateMarker,
             CreatePiPe,
             smoke,
             WaterDetection,
             winds,
             PlaneText,
             DetectCollision,
             SetAnimate,
             setOrbit
             ){
        var doc = document;
        var clock = new THREE.Clock();
        var basic, scene, camera, renderer, sprite, pipes, casesGroup, windsGroup, waterGroup, roadGroup, smokeGroup;
        var collidableMeshList = [];

        var collisionArray = [];

        var orbitControls;
        var cases1, cases2, room1;

        var instructions = doc.getElementById('instructions');


        //这些点用于生成管道
        var points = [
            new THREE.Vector3(9, 6, 0),
            new THREE.Vector3(6, 6, 0),
            new THREE.Vector3(6, 6, 3),
            new THREE.Vector3(6, 9, 3),
            new THREE.Vector3(6, 9, 6),
            new THREE.Vector3(0, 9, 6),
            new THREE.Vector3(0, 9, 9),
            new THREE.Vector3(0, 6, 9),
            new THREE.Vector3(0, 6, 6),
            new THREE.Vector3(-3, 6, 6),
            new THREE.Vector3(-3, 6, 3),
            new THREE.Vector3(0, 6, 3),
            new THREE.Vector3(0, 6, 0),
            new THREE.Vector3(0, 12, 0),
            new THREE.Vector3(6, 12, 0),
            new THREE.Vector3(6, 12, -6),
            new THREE.Vector3(6, 9, -6),
            new THREE.Vector3(6, 9, -4),
            new THREE.Vector3(6, 3, -4),
            new THREE.Vector3(6, 3, -7)

        ];

        //这些点用于生成路径
        var RoadPoints = [
            new THREE.Vector3(-8, 0, 8),
            new THREE.Vector3(8, 0, 8),
            new THREE.Vector3(8, 0, -1),
            new THREE.Vector3(0, 0, -1),
            new THREE.Vector3(0, 0, -8),
            new THREE.Vector3(6, 0, -8)
        ];

        var detectCollision, caseBox, setAnimate, waterDetection;

        var caseImgArray = [
            "images/caseimages/rack.jpg",
            "images/caseimages/rack.jpg",
            "images/caseimages/rack.jpg",
            "images/caseimages/rack.jpg",
            "images/caseimages/rack_front_door.jpg",
            "images/caseimages/rack_door_back.jpg"];

        main();

        function main (){

            //初始化DetectCollision
            detectCollision = new DetectCollision();
            caseBox = new CaseBox(caseImgArray);
            setAnimate = new SetAnimate();
            waterDetection = new WaterDetection();
            basic = new Basic();

            scene = basic.scene;

            casesGroup = new THREE.Group();
            windsGroup = new THREE.Group();
            waterGroup = new THREE.Group();
            roadGroup = new THREE.Group();
            smokeGroup = new THREE.Group();


            camera = basic.createCamera();
            renderer = basic.createRenderere();
            window.addEventListener('resize', function(){basic.onWindowResize()}, false);

            var light = createlight(scene);





            //创建机房的外围
            room1 = CreateRoom('images/floor.jpg');
            scene.add(room1);

            cases1 = caseBox.CreateCase(5);
            scene.add(cases1);
            collidableMeshList.push(cases1);
            cases1.position.set(-8, 2, 5);

            cases2 = caseBox.CreateCase(3);
            scene.add(cases2);
            cases2.position.set(4, 2, -4);

            var planeText1 = PlaneText('3D机房', '#FFFFFF');
            scene.add(planeText1);
            planeText1.position.set(-6, 0.01, 6);

            var planeText2 = PlaneText('3D机房', '#FFFFFF');
            scene.add(planeText2);
            planeText2.position.set(5, 0.01, -3);

            //机柜利用率
            doc.getElementById("cases").onclick = function(){

                if(casesGroup.children.length == 0){
                    var helper1 = caseBox.CreateHelper(cases1);
                    var Box1 = caseBox.CreateBox(5, cases1);
                    var helper2 = caseBox.CreateHelper(cases2);
                    var Box2 = caseBox.CreateBox(3, cases2);
                    cases1.visible = false;
                    cases2.visible = false;
                    casesGroup.add(helper1);
                    casesGroup.add(Box1);
                    Box1.position.copy(cases1.position);
                    casesGroup.add(helper2);

                    casesGroup.add(Box2);
                    Box2.position.copy(cases2.position);

                    scene.add(casesGroup);

                } else {
                    casesGroup.children.length = 0;
                    cases1.visible = true;
                    cases2.visible = true;
                }
            };

            //空调风向
            doc.getElementById("winds").onclick = function(){

                if(windsGroup.children.length == 0){
                    var winds1 = winds( 5, cases1);
                    winds1.position.set(-8, 2.5, 5.5);
                    windsGroup.add(winds1);
                    scene.add(windsGroup);
                    console.log(windsGroup.children[0].children.length)
                } else {
                    windsGroup.children.length = 0;
                }

            };

            //漏水检测
            doc.getElementById("water").onclick = function(){
                if(waterGroup.children.length == 0){
                    var water1 = waterDetection.CreateWater("images/water.jpg");
                    waterGroup.add(water1);
                    water1.position.set(6, 0, 3);

                    var warn = waterDetection.WaterWarn('images/alert.png');
                    warn.position.set(6, 1, 3);
                    waterGroup.add(warn);
                    scene.add(waterGroup)
                }else {
                    waterGroup.children.length = 0
                }
            };

            //人工路径
            doc.getElementById("road").onclick = function(){
                if(roadGroup.children.length == 0){
                    var road1 = createRoad( RoadPoints);
                    roadGroup.add(road1);
                    road1.scale.y = 0.08;
                    JsonLoader("model/android-animations.js", roadGroup, RoadPoints );

                    scene.add(roadGroup);
                } else {
                    roadGroup.children.length = 0;
                }
            };



            //添加被检测的物体case1
            collisionArray =detectCollision.addDetector(cases1);

            //烟雾监控
            var smoke1 = smoke.createSmoke("images/smoke.png");
            scene.add(smokeGroup);
            doc.getElementById("smoke").onclick = function(){
                if(smokeGroup.children.length == 0){
                    smokeGroup.add(smoke1);
                    smoke1.position.set(-4, 4, 5);
                } else {
                    smokeGroup.children.length = 0;
                }

            };

            //机柜上方图标
            var markers1 = CreateMarker(5, cases1);
            scene.add(markers1);
            markers1.position.set(-8, 4.5, 5);
            markers1.children[2].material.color = new THREE.Color(0x40FF00);

            var markers2 = CreateMarker(3, cases2);
            scene.add(markers2);
            markers2.position.set(4, 4.5, -4);
            markers2.children[2].material.color = new THREE.Color(0x40FF00);

            //管道
            pipes = CreatePiPe(0.3, points);
            scene.add(pipes);

            orbitControls = setOrbit(camera, renderer.domElement, collisionArray);



            animate();


            function animate(){
                requestAnimationFrame(animate);
                render();
            }

        }


        function render(){

            if(sprite != undefined){scene.remove(sprite)}
            var myDate = new Date();
            sprite = drawSprite( 'Hello, world!' +  myDate.getSeconds(), 0.01, 120, 6, 9, 0 );
            sprite.material.needsUpdate = true;
            scene.add( sprite );

            var dt = clock.getDelta();
            if (smoke.psys)smoke.psys.update(dt);

            //直管动画
            setAnimate.SetStraightAnimate(pipes.children[1], 0.01);
            //弯管动画
            setAnimate.SetElbowanimate(pipes,points, 0.01);
            //风向动画
            if(windsGroup.children.length != 0)
            setAnimate.SetWindsanimate(windsGroup.children[0], 0.01);

            TWEEN.update();

            renderer.render(scene, camera);

        }









    });

