/**
 * Created by pp on 2016/7/28.
 */
/**
 * 创建地面的字
 */
define(["three"], function(THREE){
    /**
     *
     * @param text      地面上显示的字
     * @param textColor 字的颜色
     * @returns {THREE.Mesh}
     * @constructor
     */
    function PlaneText (text, textColor){
        var texture = canvasMultilineText(text, textColor );
        var planeGeometry = new THREE.PlaneBufferGeometry(1.5, 0.5);
        var planeMaterial = new THREE.MeshLambertMaterial({ map:texture, transparent:true});
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = 3 * Math.PI / 2;
        return plane;
    }

    function canvasMultilineText (textArray, textColor, parameters){
        parameters = parameters || {} ;
        var width = 0;
        var canvas = document.createElement( 'canvas' );
        var context = canvas.getContext( '2d' );

        if ( typeof textArray === 'string' ) textArray = [ textArray ];

        context.font = parameters.font ? parameters.font : '48px sans-serif';

        for (var i = 0, len = textArray.length; i < len; i++) {
            width = context.measureText( textArray[i] ).width > width ? context.measureText( textArray[i] ).width : width;
        }

        canvas.width = width + 20;
        canvas.height = textArray.length * 60;

        context.font = parameters.font ? parameters.font : '48px sans-serif';

        for (var i = 0, len = textArray.length; i < len; i++) {
            context.fillStyle = textColor;
            context.fillText( textArray[i], 10, 48  + i * 60 );
        }

        var texture = new THREE.Texture( canvas );
        texture.minFilter = texture.magFilter = THREE.NearestFilter;
        texture.needsUpdate = true;

        return texture;

    }
    return PlaneText;
})