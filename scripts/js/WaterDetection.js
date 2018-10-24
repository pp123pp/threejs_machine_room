/**
 * Created by pp on 2016/7/19.
 */
define(["three"],function(THREE){
    /**
     * 漏水检测
     * @constructor
     */

    function WaterDetection(){}

    //漏水
    WaterDetection.prototype.CreateWater = function (URL, parameters){
        parameters = parameters || {};
        parameters.transparent = parameters.transparent || true;
        parameters.opacity = parameters.opacity || 0.56;
        parameters.color = parameters.color || 0xB8F3F4;
            var loader = new THREE.TextureLoader();
            var texture = loader.load(URL);
            var sphereGeometry = new THREE.SphereGeometry(1, 30, 30);
            var sphereMaterial = new THREE.MeshPhongMaterial({ map:texture, transparent:parameters.transparent, opacity:parameters.opacity, color:parameters.color});
            var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            sphere.scale.set(1.64, 0.14, 0.98);
            return sphere;
    };

    //警示牌
    WaterDetection.prototype.WaterWarn = function(URL){
        var loader = new THREE.TextureLoader();
        var  texture = loader.load(URL);
        texture.needsUpdate = true;
        var waterWarnGeometry = new THREE.PlaneGeometry(1, 2);
        var waterWarnMaterial = new THREE.MeshBasicMaterial({map:texture, transparent:true, side:THREE.DoubleSide, depthWrite:false, depthTest:true});

        return new THREE.Mesh(waterWarnGeometry, waterWarnMaterial);
    }

    return WaterDetection;
})
