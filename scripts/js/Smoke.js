/**
 * Created by pp on 2016/7/15.
 */
/**
 * 创建场景的烟雾效果
 * @returns {THREE.Object3D}
 */
define(["three", "SpriteParticleSystem"], function(THREE){
    var smoke = {
        createSmoke : function(URL){
            var cloud = new THREE.Object3D();

            cloud.scale.set(0.06, 0.06, 0.06);
            var loader = new THREE.TextureLoader();
            loader.load(URL, function(texture){

                texture.needsUpdate = true;
                smoke.psys = particlesLoaded( texture, cloud)
            });

            return cloud;
        }
    }

    function particlesLoaded( texture, cloud){
        var psys = new SpriteParticleSystem({
            cloud:cloud,
            rate:5,
            num:30,
            texture:texture,
            scaleR:[0.001,1],
            speedR:[0.01,0.01],
            rspeedR:[-0.1,0.3],
            lifespanR:[3,4],
            terminalSpeed:10
        });
        psys.addForce(new THREE.Vector3(0,25,5));
        psys.start();

        return psys;
    }

    return smoke
})
