/**
 * Created by pp on 2016/8/13.
 */
define(["three", "Tween", "OrbitControls", "js/detectCollision/DetectCollision"],
        function(THREE, TWEEN, OrbitControls, DetectCollision){
            function setOrbit(camera, dom, collisionArray){
                var detectCollision = new DetectCollision();
                var orbitControls = new THREE.OrbitControls(camera, dom);

                orbitControls.addEventListener("change", function(){
                    detectCollision.detectorCollisionOrbit(collisionArray, camera, orbitControls);
                }, false);
                return orbitControls;
            }

            return setOrbit;
        });