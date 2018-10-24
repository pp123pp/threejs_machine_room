/**
 * 创建水管处显示的字
 */
define(["three"], function(THREE){
    /**
     *
     * @param text2d    显示的字
     * @param scale     字的缩放倍数
     * @param color     字的颜色
     * @param x         字的x坐标
     * @param y         字的y坐标
     * @param z         字的z坐标
     * @returns {*}
     */
    function drawSprite(  text2d, scale, color, x, y, z){
            var texture = canvasMultilineText( text2d, { backgroundColor: color }, 'rgba(155, 187, 89, 1)'  );
            var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9 } );
            var sprite = new THREE.Sprite( spriteMaterial );
            sprite.position.set( x, y, z );

            sprite.scale.set( scale * texture.image.width, scale * texture.image.height );

            return sprite;
    }

    function canvasMultilineText(textArray, parameters, rgba){
        parameters = parameters || {} ;
        var width = 0;
        var canvas = document.createElement( 'canvas' );
        var context = canvas.getContext( '2d' );
        var len = textArray.length;

        if ( typeof textArray === 'string' ) textArray = [ textArray ];

        context.font = parameters.font ? parameters.font : '48px sans-serif';

        for (var i = 0; i < len; i++) {

            width = context.measureText( textArray[i] ).width > width ? context.measureText( textArray[i] ).width : width;

        }

        canvas.width = width + 20; // 480
        canvas.height = textArray.length * 60;

        context.fillStyle = rgba;
        context.fillRect( 0, 0, canvas.width, canvas.height);

        context.font = parameters.font ? parameters.font : '48px sans-serif';

        for (var j = 0; j < len; j++) {
            context.fillStyle = '#1920E6';
            context.fillText( textArray[j], 10, 48  + j * 60 );
        }

        var texture = new THREE.Texture( canvas );
        texture.minFilter = texture.magFilter = THREE.NearestFilter;
        texture.needsUpdate = true;

        return texture;

    }

    return drawSprite;


})

