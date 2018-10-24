/**
 * Created by pp on 2016/7/14.
 */
/**
 * 添加灯光
 * @param scene
 * @constructor
 */
define(["three"], function(THREE){

        function createlight(scene){
            var ambientLight = new THREE.AmbientLight(0xFFFFFF);
            var lights_1 = new THREE.PointLight( 0xffffff, 1, 0 );
            var lights_2 = new THREE.PointLight( 0xffffff, 1, 0 );

            lights_1.position.set( 300, 600, 300 );
            lights_2.position.set( - 100, - 200, - 100 );

            scene.add(ambientLight);
            scene.add( lights_1 );
            scene.add( lights_2 );

        }

    return createlight;
});