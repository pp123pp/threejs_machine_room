/**
 * Created by pp on 2016/8/16.
 */
define(["three", "Tween"], function(THREE, TWEEN){
    /**
     * 机器人的行走与转弯
     * @constructor
     */
    function Walk(){

    }

    /**
     * 机器人的转弯
     * @param Model     机器人模型
     * @param RotateValues      初始时的旋转角度
     * @param RotateTarget      最终的旋转角度
     * @constructor
     */
    Walk.prototype.WalkRotate = function(Model, RotateValues, RotateTarget){
        var values2 = RotateValues;
        var target2 = RotateTarget;
        var tween2 = new TWEEN.Tween(values2).to(target2, 2000);
        tween2.onUpdate(function(){
            Model.rotation.y = values2.t
        });
        tween2.easing(TWEEN.Easing.Sinusoidal.InOut);
        return tween2
    };

    /**
     * 机器人直走
     * @param Model
     * @param values    初始时的position
     * @param targets
     * @param time
     * @constructor
     */
    Walk.prototype.WalkStraight = function(Model, values, targets, time){
        var values1 = values;
        var target1 = targets;
        var tween1 = new TWEEN.Tween(values1).to(target1, time);
        tween1.onUpdate(function(){
            Model.x = values1.x;
            Model.y = values1.y;
            Model.z = values1.z;

        });
        tween1.easing(TWEEN.Easing.Sinusoidal.InOut);
        return tween1;
    }

    return Walk;
})