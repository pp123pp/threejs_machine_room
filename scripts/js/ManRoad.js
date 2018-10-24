/**
 * Created by pp on 2016/7/20.
 */

/**
 * 创建机器人行走的路
 * @param radius
 * @param points
 * @returns {THREE.Mesh}
 * 创建路的方法与创建之水管的方法一样，只是将radius变为0，在将条直道的长度加长
 * var cylinderGeometry = new THREE.BoxGeometry(0.4, straightLength + 0.4, 0.4);
 */
define(["three"], function(THREE){
    function createRoad(points){
        var tubeGeometry = new THREE.Geometry();

        for(var j = 0, len =points.length- 1 ; j<len; j++){
            //计算相邻两个点之间的中心位置(这个位置就是值管道的位置)
            var straightLength = new THREE.Vector3().subVectors(points[j+1], points[j]).length();
            var straightCore = new THREE.Vector3().addVectors(points[j], points[j+1]).divideScalar(2);
            //计算两点之间的向量
            var straightSub = new THREE.Vector3().subVectors(points[j+1], points[j]);
            var roadGeometry = new THREE.BoxGeometry(0.4, straightLength + 0.4, 0.4);

            var roaderMesh = new THREE.Mesh(roadGeometry);
            var roadRo = roaderMesh.rotation;
            //计算直管道的摆放方式
            if(straightSub.x > 0){
                roadRo.z =3 * Math.PI/2;
            } else if(straightSub.x < 0){
                roadRo.z = Math.PI/2;
            }else if(straightSub.y > 0){
                roadRo.z = 2 * Math.PI;
            }else if(straightSub.y < 0){
                roadRo.z = Math.PI;
            }else if(straightSub.z > 0){
                roadRo.x = Math.PI / 2;
            }else if(straightSub.z < 0){
                roadRo.x = 3 * Math.PI / 2;
            }
            roaderMesh.position.copy(straightCore);
            roaderMesh.updateMatrix();

            tubeGeometry.merge(roaderMesh.geometry, roaderMesh.matrix);

        }
        var tubeMaterial = new THREE.MeshPhongMaterial({ color:0x67EC65,specular:0x67EC65});
        return new THREE.Mesh(tubeGeometry, tubeMaterial);
    }


    return createRoad;
});