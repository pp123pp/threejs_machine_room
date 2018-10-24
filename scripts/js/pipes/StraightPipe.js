/**
 * Created by pp on 2016/7/12.
 */
/**
 * 创建直水管
 * @param radius    两个之水管连接弯曲处的半径
 * @param points    水管两端的坐标数组
 * @returns {THREE.Mesh}    返回所有直水管的集合
 */
define(["three"], function(THREE){

         function StraightPipe( radius, points){


             var loader = new THREE.TextureLoader();
             var texture = loader.load('images/tube.jpg');
             texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

             var tubeGeometry = new THREE.Geometry();
             for(var j = 0; j<points.length- 1; j++){
                 //计算相邻两个点之间的中心位置(这个位置就是值管道的位置)
                 var straightlength = new THREE.Vector3().subVectors(points[j+1], points[j]).length() - radius * 2;
                 var straightCore = new THREE.Vector3().addVectors(points[j], points[j+1]).divideScalar(2);
                 //计算两点之间的向量
                 var straightSub = new THREE.Vector3().subVectors(points[j+1], points[j]);
                 var cylindergeometry = new THREE.CylinderGeometry(0.1, 0.1, straightlength, 20, 20, true);

                 var cylindermesh = new THREE.Mesh(cylindergeometry);
                 var cylinderRo = cylindermesh.rotation;
                 //计算直管道的摆放方式
                 if(straightSub.x > 0){
                     cylinderRo.z =3 * Math.PI/2;
                 } else if(straightSub.x < 0){
                     cylinderRo.z = Math.PI/2;
                 }else if(straightSub.y > 0){
                     cylinderRo.z = 2 * Math.PI;
                 }else if(straightSub.y < 0){
                     cylinderRo.z = Math.PI;
                 }else if(straightSub.z > 0){
                     cylinderRo.x = Math.PI / 2;
                 }else if(straightSub.z < 0){
                     cylinderRo.x = 3 * Math.PI / 2;
                 }
                 cylindermesh.position.copy(straightCore);
                 cylindermesh.updateMatrix();

                 tubeGeometry.merge(cylindermesh.geometry, cylindermesh.matrix);

             }
             var tubematerial = new THREE.MeshLambertMaterial({map:texture, color:0x040FF, side:THREE.DoubleSide, transparent:true});
             var tube = new THREE.Mesh(tubeGeometry, tubematerial);
             texture.repeat.set(1, 5);
             return tube;

    };
    return StraightPipe;
})
