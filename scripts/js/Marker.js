/**
 * 创建机柜上方的指示牌
 * @param number
 * @returns {THREE.Object3D}
 * @constructor
 * var markers1 = Marker(5);
 * scene.add(markers1);
 * markers1.position.set(-8, 4.5, 5);
 */
define(["three"], function(THREE){
         function CreateMarker(number, cases){
            var markerGroup = new THREE.Group();
            for(var i = 0; i<number; i++){
                var markerGeometry = new THREE.PlaneGeometry(1, 1);
                var loader = new THREE.TextureLoader();
                var texture = loader.load('images/marker1.png');
                var markerMaterial = new THREE.MeshBasicMaterial({map:texture, transparent:true, side:THREE.DoubleSide, alphaTest: 0.50});
                var marker =new THREE.Mesh(markerGeometry, markerMaterial);
                marker.position.x = cases.children[i].position.x;
                markerGroup.add(marker);
            }

            return markerGroup;

        }

    return CreateMarker;
});