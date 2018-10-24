/**
 * Created by pp on 2016/7/25.
 */

define(["three", "js/pipes/Elbows", "js/pipes/StraightPipe" ], function (THREE,CreateElbows,StraightPipe){
    /**
     * 将直管与弯管归为一个组
     * @param radius
     * @param points
     * @returns {THREE.Group}
     * @constructor
     */
    function CreatePiPe(radius, points ){
        var pipeGroup = new THREE.Group();
        var Elbow = CreateElbows(radius, points);
        pipeGroup.add(Elbow);

        var Straight = StraightPipe(radius, points);
        Straight.name = 'Straight';
        pipeGroup.add(Straight);

        return pipeGroup;
    }
    return CreatePiPe

});
