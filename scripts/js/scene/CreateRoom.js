/**
 * Created by pp on 2016/7/14.
 */
/**
 * 创建一个机房的墙与地板
 * @returns {THREE.Mesh}
 * @constructorvar
 * room = CreateRoom();
   scene.add(room);
 */
define(["three"], function(THREE){
        function CreateRoom(URL){
            var roomGeometry = new THREE.Geometry();

            var loader = new THREE.TextureLoader();
            var texture = loader.load(URL);
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(20, 20);

            var boxGeometry1 = new THREE.BoxGeometry(20, 1, 20);
            var boxGeometry2 = new THREE.BoxGeometry(0.5, 10, 20.5);
            var boxGeometry3 = new THREE.BoxGeometry(0.5, 10, 20.5);
            var boxGeometry4 = new THREE.BoxGeometry(20.5, 10, 0.5);
            var boxGeometry5 = new THREE.BoxGeometry(20.5, 10, 0.5);

            var boxMesh1 = new THREE.Mesh(boxGeometry1);
            boxMesh1.position.y = -0.5;
            boxMesh1.updateMatrix();
            roomGeometry.merge(boxMesh1.geometry, boxMesh1.matrix);

            var boxMesh2 = new THREE.Mesh(boxGeometry2);
            boxMesh2.position.set(10, 0, 0);
            boxMesh2.updateMatrix();
            roomGeometry.merge(boxMesh2.geometry, boxMesh2.matrix);

            var boxMesh3 = new THREE.Mesh(boxGeometry3);
            boxMesh3.position.set(-10, 0, 0);
            boxMesh3.updateMatrix();
            roomGeometry.merge(boxMesh3.geometry, boxMesh3.matrix);

            var boxMesh4 = new THREE.Mesh(boxGeometry4);
            boxMesh4.position.set(0, 0, 10);
            boxMesh4.updateMatrix();
            roomGeometry.merge(boxMesh4.geometry, boxMesh4.matrix);

            var boxMesh5 = new THREE.Mesh(boxGeometry5);
            boxMesh5.position.set(0, 0, -10);
            boxMesh5.updateMatrix();
            roomGeometry.merge(boxMesh5.geometry, boxMesh5.matrix);

            var roomMaterial = new THREE.MeshPhongMaterial({ map:texture, color:0x21484A, specular:0x21484A, shininess: 10});
            return new THREE.Mesh(roomGeometry, roomMaterial);

        }

    return CreateRoom;
});
