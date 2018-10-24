/**
 * Created by pp on 2016/7/21.
 */
/**
 *函数CreateBox()，创建机柜利用率的彩色box，CaseBoxUtilization(),实现box的动态效果
 * @param number:机柜的个数
 * @returns {THREE.Object3D}
 * @constructor
 * var Box1 = CreateBox(5);
   scene.add(Box1);
   Box1.position.copy(helper.position);
 */

define(["three","Tween"], function(THREE,TWEEN){
    function CaseBox(caseImgArray){
        this.caseImgArray = caseImgArray
    }

    CaseBox.prototype.CreateBox = function( number, cases){
            var BoxGroup = new THREE.Group();
            for(var i = 0; i<number; i++){
                var cubeGeometry = new THREE.BoxGeometry(1, 0.3, 1);
                var cubeMaterial = new THREE.MeshLambertMaterial({color:0x4FEC36 * (i+1)});
                var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.position.x = cases.children[i].position.x;
                cube.position.y = -2;
                BoxGroup.add(cube);
                this.CaseBoxUtilization({y:0.15, t:true}, {y:3 - 2*Math.random(), t:true}, cube, 500);
            }
            return BoxGroup

        };
    CaseBox.prototype.CaseBoxUtilization = function  (value, target, cube, delay){
            var values1 = value;
            var target1 = target;
            var cubeGeo = cube.geometry;
            var tween1 = new TWEEN.Tween(values1).to(target1, 2000);
            tween1.onUpdate(function(){
                cubeGeo.vertices[0].y = values1.y;
                cubeGeo.vertices[1].y = values1.y;
                cubeGeo.vertices[4].y = values1.y;
                cubeGeo.vertices[5].y = values1.y;

                cubeGeo.verticesNeedUpdate = values1.t;
            });
            tween1.easing(TWEEN.Easing.Bounce.Out);
            tween1.delay(delay);
            tween1.start();
        };
    CaseBox.prototype.CreateCase = function(number, width, height, depth){
        //加入兼容性判断
        //number必选参数
        if(typeof number === "undefined" || number === 0) return;

        //可选参数 加入候选值
        width = width || 1;
        height = height || 4;
        depth = depth || 1;

        var gapRatio = 0.1;

        //归为一个组时，用THREE.Group();
        var caseGroup = new THREE.Group();
        var loader = new THREE.TextureLoader();
        for (var i = 0; i<number; i++){
            var materialArray = [];
            for (var j = 0, len = this.caseImgArray.length; j < len; j++)
                materialArray.push( new THREE.MeshPhongMaterial({
                    map: loader.load( this.caseImgArray[j] ),
                    color:0xDFD8D8,
                    specular:0xDFD8D8,
                    shininess:10
                }));

            var caseGeometry = new THREE.BoxGeometry(width, height, depth);
            var caseMaterial = new THREE.MeshFaceMaterial(materialArray);
            var caseMesh = new THREE.Mesh(caseGeometry, caseMaterial);
            caseMesh.position.x = i * width * (1 + gapRatio);
            caseGroup.add(caseMesh);
        }
        return caseGroup
    };
    CaseBox.prototype.CreateHelper = function(CreateCase, parameters){
        parameters = parameters || {};
        parameters.color = parameters.color || 0xffffff;
        parameters.transparent = parameters.transparent || true;
        parameters.opacity = parameters.opacity || 0.5;


        var helperGroup = new THREE.Group();

        //获取group.children, boxes为一个数组
        var boxes = CreateCase.children;

        //循环遍历数组的每一个元素(使用forEach)
        boxes.forEach(function(box){
            var boxHelper = new THREE.BoxHelper(box);
            var boxHelperMater = boxHelper.material;

            boxHelperMater.color.set(parameters.color);
            boxHelperMater.transparent = parameters.transparent;
            boxHelperMater.opacity = parameters.opacity;

            helperGroup.add(boxHelper);

        });
        return helperGroup;
    };

    return CaseBox;
});
