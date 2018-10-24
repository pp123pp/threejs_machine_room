/**
 * Created by pp on 2016/7/14.
 */
/**
 * 创建空调风向指示
 * @param number
 * @returns {THREE.Object3D}    返回风向指示的集合
 */
define(["three"], function(THREE){
        function winds( number,cases){
            var windsGroup = new THREE.Group();

            for(var i = 0; i<number; i++){
                var wind = WindDirection(1, 1, 0, Math.PI / 2);
                wind.rotation.z = 3 *Math.PI / 2;
                wind.position.x = cases.children[i].position.x;
                wind.name = 'wind'+i;
                windsGroup.add(wind);
            }
            return windsGroup;
        }

        function WindDirection( radius, height, Thetastart, ThetaLength){
            radius = radius || 1;
            height = height || 1;
            Thetastart = Thetastart || 0;
            ThetaLength = ThetaLength || Math.PI / 2;

            var cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, 32, 1, true, Thetastart, ThetaLength);

            for(var i = 0, len = cylinderGeometry.faces.length; i<len; i++){
                var f = cylinderGeometry.faces[i];

                for(var j = 0; j<3; j++){
                    var color = new THREE.Color(0xdb2020);
                    color.setHSL(( i / 22 + 1 ) / 14, 0.8, 0.46);
                    f.vertexColors[ j ] = color;
                }
            }

            var loader = new THREE.TextureLoader();
            var texture = loader.load('images/wind.png');
            texture.needsUpdate = true;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);

            var cylinderMaterial = new THREE.MeshBasicMaterial({transparent:true, map:texture, side:THREE.DoubleSide,vertexColors:THREE.VertexColors, depthWrite:false});

            return new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        }
    return winds;
});
