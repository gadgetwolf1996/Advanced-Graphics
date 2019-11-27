//When the window is loaded fully, call initScene
window.addEventListener("load", initScene);

//Create a new Three.js scene
var scene = new THREE.Scene();

//Create a perspective camera
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/ window.innerHeight, 0.1, 1000);

//Create a renderer (with antialiasing)
var renderer = new THREE.WebGLRenderer({ antialias: true });

var SPEED = 0.01;
var cube;

/**
 * Initialises the scene
 * @return {void} n/a
 */
function initScene()
{
    //Set the renderer size to the dimensions of the window
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Add the canvas to the page
    document.body.appendChild(renderer.domElement);
    //Create a (1x1x1) cube geometry
    var geometry = new THREE.BoxGeometry(1,1,1);
    //Create a solid-colour material
    var material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
    //Create a mesh from this geometry and material
    cube = new THREE.Mesh(geometry, material);

    var cube2 = new THREE.Mesh(geometry, material);


    //Add the cube to the scene
    scene.add( cube );

    //set cube 2 position
    cube2.position.x = 1;

    scene.add( cube2 );

    //update cube rotations
    cube2.rotation.y += 1;

    //Position the camera behind the cube and call update initially
    camera.position.z = 5;
    //initialise lighting
    addLighting();

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
    //Actually draw stuff to the screen
    renderer.render(scene, camera);
    rotateCube();
    //Call update continously
    requestAnimationFrame(update);
}

function rotateCube(){
    cube.rotation.x -= SPEED * 2;
    cube.rotation.y -= SPEED;
    cube.rotation.z -= SPEED * 3;
}