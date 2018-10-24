/**
 * Created by pp on 2016/7/20.
 */
/**
 * 加载JSON模型文件
 * @param URL
 * @constructor
 */
define(["three", "js/animates/ModelWork"], function(THREE, modelWork){

    /**
     *
     * @param URL       JSON文件的位置
     * @param group
     * @param RoadPoints    路径的点集合
     * @constructor     var model1 = JsonLoader("model/android-animations.js", rgljgroup, RoadPoints );
     */
         function JsonLoader(URL, group, RoadPoints){

            var jsonLoader = new THREE.JSONLoader();
            jsonLoader.load( URL, function ( geometry, materials )
            {
                for (var i = 0, len = materials.length; i <len ; i++)
                    materials[i].morphTargets = true;

                var material = new THREE.MeshFaceMaterial( materials );
                var android = new THREE.Mesh( geometry, material );
                android.scale.set(0.1, 0.1, 0.1);
                android.position.copy(RoadPoints[0]);
                android.rotation.y = Math.PI / 2;
                group.add( android );

                modelWork(android, RoadPoints);
            });
        };
    return JsonLoader;

})
