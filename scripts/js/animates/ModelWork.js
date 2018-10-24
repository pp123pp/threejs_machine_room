/**
 * Created by pp on 2016/7/21.
 */
/**
 * 机器人行走的动画效果
 * @param Model
 * @constructor
 */

define(["three", "Tween", "js/animates/Walk"], function(THREE, TWEEN, Walk){
    /**
     *
     * @param Model     行走的物体（此处为安卓机器人）
     * @param RoadPoints    路径的点集
     */
        function modelWork(Model, RoadPoints){
            var walk = new Walk();

            var StriaghtArray = [];
            var RotateArray = [];
            var len = RoadPoints.length;

            for(var i= 1; i<len; i++){
                var straightValue = {
                    x:RoadPoints[i-1].x,
                    y:RoadPoints[i-1].y,
                    z:RoadPoints[i-1].z
                };
                var straightTargets = {
                    x:RoadPoints[i].x,
                    y:RoadPoints[i].y,
                    z:RoadPoints[i].z
                };
                StriaghtArray.push(walk.WalkStraight(Model.position, straightValue, straightTargets, 5000));

                //因为机器人只在两条直路的交叉处才发生旋转，因此在检测到旋转时
                //只需要路径点集的第二个点到倒数第二个点
                if(i<len - 1){
                    //判断机器人旋转方向
                    var subVec1 = new THREE.Vector3().subVectors(RoadPoints[i], RoadPoints[i -1]);
                    var subVec2 = new THREE.Vector3().subVectors(RoadPoints[i+1], RoadPoints[i]);

                    if(subVec1.x>0 && subVec2.z<0){
                        RotateArray.push(walk.WalkRotate(Model, {t:Math.PI/2}, {t:Math.PI}));
                    }else if(subVec1.z<0 && subVec2.x<0){
                        RotateArray.push(walk.WalkRotate(Model, {t:Math.PI}, {t:3 * Math.PI/2}));
                    }else if(subVec1.x<0 && subVec2.z<0){
                        RotateArray.push(walk.WalkRotate(Model, {t:3 * Math.PI/2}, {t:Math.PI}))
                    }else if(subVec1.z<0 && subVec2.x>0){
                        RotateArray.push(walk.WalkRotate(Model,{t:Math.PI}, {t:Math.PI/2} ))
                    }

                }

            }
            //当机器人的运动结束以后，可能机器人并未对着机柜
            //这里手动的让机器人对着机柜
            RotateArray.push(walk.WalkRotate(Model,{t:Math.PI / 2}, {t:0}));

        /**
         * 定义动画执行的顺序，进行一次行走动画之后，再执行一次旋转动画
         */
            for(var j = 0; j<StriaghtArray.length - 1; j++){
                StriaghtArray[j].chain(RotateArray[j]);
                RotateArray[j].chain(StriaghtArray[j+1])
            }
            StriaghtArray[0].start();
        }

    return modelWork;
});