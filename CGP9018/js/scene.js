//When the window is loaded fully, call initScene
window.addEventListener("load", initScene);

//Create a new Three.js scene
var scene = new THREE.Scene();

//Create a perspective camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 1000);
//time
var clock = new THREE.Clock;
//Create a renderer (with antialiasing)
var renderer = new THREE.WebGLRenderer({ antialias: true });
var controls;
var SPEED = 0.01;
var cube;
var lasttime = clock.getDelta();
var timeelapsed = 0.0;
var sceneObjects = new Array(500);

/**
 * Initialises the scene
 * @return {void} n/a
 */
function initScene()
{
    addLighting();   

    //Set the renderer size to the dimensions of the window
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Add the canvas to the page
    document.body.appendChild(renderer.domElement);
    
    

    //Create a (1x1x1) cube geometry
    for(var x = 0; x < sceneObjects.length; x++){
        var geometry = new THREE.BoxGeometry(1,1,1);

        var shaders = ShaderLoader.getShaders("shaders/simple.vert", "shaders/simple.frag");console.log("Shaders loaded...");

        //Create a solid-colour material
        var material = new THREE.ShaderMaterial({
            uniforms: {},
            vertexShader: shaders.vertex,
            fragmentShader: shaders.fragment
        });//new THREE.MeshLambertMaterial({ color: 0x00ff00 });
        //Create a mesh from this geometry and material
        cube = new THREE.Mesh(geometry, material);
        sceneObjects[x] = cube;
        sceneObjects[x].position.x= (Math.random()*20)-10;
        sceneObjects[x].position.y= (Math.random()*20)-10;
        sceneObjects[x].position.z= (Math.random()*20)-10;
        //Add the cube to the scene
        scene.add( sceneObjects[x] );
    }

    //set cube 2 position
    //cube2.position.x = 1;

    //scene.add( cube2 );

    //update cube rotations
    //cube2.rotation.y += 1;

    //Position the camera behind the cube and call update initially
    camera.position.z = 5;
    camera.lookAt (new THREE.Vector3(0,0,0));

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //initialise lighting
 

    update();
}

function addLighting()
{
    let pointLight = new THREE.PointLight(0xdddddd)
    pointLight.position.set(-5,-3, 3)
    scene.add(pointLight)

    let ambientLight = new THREE.AmbientLight(0x505050)
    scene.add(ambientLight)
}

/**
 * Called once-per-frame.
 * @return {void} n/a
 */
function update()
{
    controls.update();
    //Actually draw stuff to the screen
    renderer.render(scene, camera);
    rotateCube();
    //moveCamera();
    //Call update continously
    requestAnimationFrame(update);
}

function rotateCube(){
    var no = 0;
    for(var x = 0; x < sceneObjects.length; x++)
    {
        ran = (Math.random()* SPEED)*3;
        no = randWholeNum(3);
        console.log(no);
        switch(no){
            case 0:
                sceneObjects[x].rotation.x -= ran;
                break;
            case 1:
                sceneObjects[x].rotation.y -= ran;
                break;
            case 2:
                sceneObjects[x].rotation.z -= ran;
                break;
        }
    }
}

function randWholeNum(max){
    return Math.floor(Math.random()*max);
}
function moveCamera(){
    
    console.log(pos);
}