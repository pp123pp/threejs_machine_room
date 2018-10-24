/**
 * Created by pp on 2016/8/17.
 */
define(["three"], function(THREE){
    function Road(){
        this.straightlength = straightlength;
        this.cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, this.straightlength, 20, 20, true);
    }

    Road.prototype.CreateRoad = function(points, radius){
        radius = radius || 0;

        var geometry = new THREE.Geometry();

        for(var j = 0; j<points.length- 1; j++){
            //计算相邻两个点之间的中心位置(这个位置就是值管道的位置)
            this.straightlength = new THREE.Vector3().subVectors(points[j+1], points[j]).length() - radius * 2;
            var straightCore = new THREE.Vector3().addVectors(points[j], points[j+1]).divideScalar(2);
            //计算两点之间的向量
            var straightSub = new THREE.Vector3().subVectors(points[j+1], points[j]);
            var cylinderGeometry = this.cylinderGeometry;

            var cylindermesh = new THREE.Mesh(cylinderGeometry);
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

            geometry.merge(cylindermesh.geometry, cylindermesh.matrix);

        }

        return geometry;
    };

    return Road;
});