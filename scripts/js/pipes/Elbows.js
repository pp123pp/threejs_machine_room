/**
 * Created by pp on 2016/7/12.
 */
/**
 * 创建直水管的弯曲处
 * @param radius    弯曲处的半径
 * @param points
 * @returns {THREE.Group}   返回弯曲处的集合
 * @constructorvar
 * Elbow = Elbows(0.3, points);
 * scene.add(Elbow);
 */

define(["three"], function(THREE){
    function CreateElbows(radius, points){
        var tubeGroup = new THREE.Group();
        for (var i = 1, len = points.length - 1; i<len; i++){

            var loader = new THREE.TextureLoader();
            var texture = loader.load('images/tube1.jpg');
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0.6, 0 );

            var subvec1 = new THREE.Vector3().subVectors(points[i], points[i -1]);
            var subvec2 = new THREE.Vector3().subVectors(points[i+1], points[i]);

            var geometry = new THREE.TorusGeometry( radius, 0.1, 20, 20, Math.PI / 2 );
            var material = new THREE.MeshLambertMaterial( {map:texture, color:0x040FF, transparent:true } );
            var mesh = new THREE.Mesh(geometry, material);
            var meshRo = mesh.rotation;
            var meshPo = mesh.position;
            meshPo.copy(points[i]);

            //根据管道的路径，计算弯曲处的旋转方向
            if(subvec1.x>0 && subvec2.y>0){
                meshRo.z = 3 * Math.PI / 2;
                meshPo.x = points[i].x - 0.3;
                meshPo.y = points[i].y + 0.3;
            } else if(subvec1.y>0 && subvec2.x>0){
                meshRo.z = Math.PI / 2;
                meshPo.x = points[i].x + 0.3;
                meshPo.y = points[i].y - 0.3;
            } else if(subvec1.x>0 && subvec2.y<0){

                meshPo.x = points[i].x - 0.3;
                meshPo.y = points[i].y - 0.3;
            } else if(subvec1.y<0 && subvec2.x>0){
                meshRo.z = Math.PI;
                meshPo.x = points[i].x + 0.3;
                meshPo.y = points[i].y + 0.3;
            }else if(subvec1.x>0 && subvec2.z>0){
                meshRo.x = 3 * Math.PI / 2;
                meshPo.x = points[i].x - 0.3;
                meshPo.z = points[i].z + 0.3;
            }else if(subvec1.x>0 && subvec2.z<0){
                meshRo.x = Math.PI / 2;
                meshPo.x = points[i].x - 0.3;
                meshPo.z = points[i].z - 0.3;
            }else if(subvec1.x<0 && subvec2.z>0){
                meshRo.x = 3 * Math.PI / 2;
                meshRo.y = Math.PI;
                meshPo.x = points[i].x + 0.3;
                meshPo.z = points[i].z + 0.3;
            }else if(subvec1.z<0 && subvec2.y<0){
                meshRo.y = Math.PI / 2;
                //meshRo.x = Math.PI;
                meshPo.y = points[i].y - 0.3;
                meshPo.z = points[i].z + 0.3;
            }else if(subvec1.z>0 && subvec2.y<0){
                meshRo.y =  3 * Math.PI / 2;
                meshPo.z = points[i].z - 0.3;
                meshPo.y = points[i].y - 0.3;
            }else if(subvec1.z>0 && subvec2.x>0){
                meshRo.x = Math.PI / 2;
                meshRo.z = Math.PI / 2;
                meshPo.x = points[i].x + 0.3;
                meshPo.z = points[i].z - 0.3;
            }else if(subvec1.x<0 && subvec2.z<0){
                meshRo.x = Math.PI / 2;
                meshRo.z = Math.PI / 2;
                texture.repeat.set(-1, -1);
                meshPo.x = points[i].x + 0.3;
                meshPo.z = points[i].z - 0.3;
            }else if(subvec1.y>0 && subvec2.z>0){
                meshRo.y = Math.PI / 2;
                texture.repeat.set(-1, -1);
                meshPo.z = points[i].z + 0.3;
                meshPo.y = points[i].y - 0.3;
            }else if(subvec1.y<0 && subvec2.z<0){
                meshRo.y = Math.PI / 2;
                meshRo.x = Math.PI;
                texture.repeat.set(-1, -1);
                meshPo.y = points[i].y + 0.3;
                meshPo.z = points[i].z - 0.3;
            }else if(subvec1.y<0 && subvec2.z>0){
                meshRo.y = Math.PI / 2;
                meshRo.x = 3 * Math.PI / 2;
                //texture.repeat.set(-1, -1);
                meshPo.y = points[i].y + 0.3;
                meshPo.z = points[i].z + 0.3;
            }else if(subvec1.z>0 && subvec2.x<0){
                meshRo.x = Math.PI / 2;
                texture.repeat.set(-1, -1);
                meshPo.x = points[i].x - 0.3;
                meshPo.z = points[i].z - 0.3;
            }else if(subvec1.z>0 && subvec2.y>0){
                meshRo.y =  3 * Math.PI / 2;
                meshRo.x =  Math.PI / 2;
                texture.repeat.set(-1, -1);
                meshPo.z = points[i].z - 0.3;
                meshPo.y = points[i].y + 0.3;
            }else if(subvec1.z<0 && subvec2.y>0){
                meshRo.y = Math.PI / 2;
                meshRo.x = 3 * Math.PI / 2;
                texture.repeat.set(-1, -1);
                meshPo.y = points[i].y + 0.3;
                meshPo.z = points[i].z + 0.3;
            }else if(subvec1.z<0 && subvec2.x>0){
                meshRo.x = Math.PI / 2;
                meshRo.z = Math.PI;
                texture.repeat.set(-1, -1);
                meshPo.x = points[i].x + 0.3;
                meshPo.z = points[i].z + 0.3;
            }else if(subvec1.z<0 && subvec2.x<0){
                meshRo.x = 3 * Math.PI / 2;
                texture.repeat.set(-1, -1);
                meshPo.x = points[i].x - 0.3;
                meshPo.z = points[i].z + 0.3;
            }
            mesh.name = 'Elbow' + i;

            tubeGroup.add(mesh);
        }
        return tubeGroup;
    }
    return CreateElbows;
});