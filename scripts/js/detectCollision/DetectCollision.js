/**
 * Created by pp on 2016/8/5.
 */
/**
 * 第一人称碰撞检测
 */

define(["three", "OrbitControls"], function(THREE, OrbitControls){
    function DetectCollision() {
        //被检测的物体
        this.detectArray = [];
        this.movingCube = (function(){

            var geometry = new THREE.SphereGeometry(0.5);

            return new THREE.Mesh(geometry);
        })();

    }

     DetectCollision.prototype.removeDetector = function(object){

        var index = this.detectArray.indexOf(object);
        if(index === -1) return;

        this.detectArray.splice(index, 1);

    };

     DetectCollision.prototype.addDetector = function(object){
        if(this.detectArray.indexOf(object) !== -1) return;
        this.detectArray.push(object);
        return this.detectArray;
    };



    //第三人称碰撞检测
     DetectCollision.prototype.detectorCollisionOrbit = function(detectArray, camera, orbitControls){

        var offset = new THREE.Vector3();

         var movingCube = this.movingCube;

         movingCube.position.copy(camera.position);

         movingCube.updateMatrixWorld();

        var Movingvertices = movingCube.geometry.vertices;

        //获取到底部cube的中心点坐标

        var originPoint = movingCube.position.clone();

        for(var vertexIndex = 0,len = Movingvertices.length; vertexIndex < len; vertexIndex++){
            //顶点原始坐标
            var localVertex = Movingvertices[vertexIndex].clone();
            //顶点经过变换后的坐标
            var globaVertex = localVertex.applyMatrix4(movingCube.matrix);
            //获得由中心指向顶点的向量
            var directionVector = globaVertex.sub(originPoint);

            //将方向向量初始化
            var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
            //检测射线与多个物体相交的情况
            var collisionResults = ray.intersectObjects(detectArray, true);

            //如果返回结果不为空，且交点与射线起点的距离小于物体中心至顶点的距离，则发生碰撞
            if(collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() + 1.2 ){

                //获得一条与camera.position平行且同向的便偏移向量
                offset.subVectors(orbitControls.target,camera.position).normalize();

                camera.position.sub(offset.multiplyScalar(1/40));

            }
        }

    };

    return DetectCollision

})