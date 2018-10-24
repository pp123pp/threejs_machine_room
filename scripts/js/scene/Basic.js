define(["three"], function(THREE){
    function Basic(){}

    //创建场景
    Basic.prototype.scene = new THREE.Scene();


    //相机
    Basic.prototype.createCamera = function(){
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);
        this.camera.lookAt(this.scene.position);
        this.camera.position.set(25, 25, 25);
        return this.camera;
    };

    //渲染
    Basic.prototype.createRenderere = function(bgColor){
        bgColor = bgColor || 0x8838FF;
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(bgColor);
        document.body.appendChild(this.renderer.domElement);

        return this.renderer;
    };

    Basic.prototype.onWindowResize = function(){
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight);
    };

    return Basic;
});