/**
 * Created by pp on 2016/8/16.
 */
define(["three", "js/pipes/Elbows", "js/Winds"], function(THREE, CreateElbows, winds){
    function SetAnimate(){}

    SetAnimate.prototype.SetElbowanimate = function(pipe, points, offset){
        if(pipe.children[0]){
            for(var i = 1, len = points.length - 1; i<len; i++){
                var objname = pipe.getObjectByName("Elbow" + i);
                objname.material.dispose()
                objname.material.map.offset.x += offset;
                objname.material.needsUpdate = true
            }
        }
    };
    SetAnimate.prototype.SetWindsanimate = function(winds, offset){
        for(var i = 0, len = winds.children.length; i<len; i++){
            if(winds.getObjectByName("wind" + i) != undefined){
                var objname = winds.getObjectByName("wind" + i);




                objname.material.dispose();
                objname.material.map.offset.x += offset;
                objname.material.needsUpdate = true;


                
            }
        }
    };
    SetAnimate.prototype.SetStraightAnimate = function(straightPipe, offset){
        if(straightPipe){straightPipe.material.map.offset.y -= offset};
    }

    return SetAnimate;
});