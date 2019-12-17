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
var SPEED = 0.1;
var obj;
var lasttime = clock.getDelta();
var timeelapsed = 0.0;
var objno = 500;//total number of objects to be spawned
var sceneObjects = new Array(objno);//array of objects in scene
var coldis = 0.25;//distance of hitboxes on objects
var currentno = 0;//current number of objects
//var loader = new THREE.GLTFLoader();
var objectspawned = false;


var gltfLoader;
var shaders = ShaderLoader.getShaders("shaders/simple.vert", "shaders/simple.frag");console.log("Shaders loaded...");
var mat;
/**
 * Initialises the scene
 * @return {void} n/a
 */
var mesh;


function initScene()
{
    addLighting();   

    //Set the renderer size to the dimensions of the window
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Add the canvas to the page
    document.body.appendChild(renderer.domElement);
    
    mat = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: shaders.vertex,
        fragmentShader: shaders.fragment
    });
    gltfLoader= new THREE.GLTFLoader();
    
    
    //Create a (1x1x1) cube geometry
    addBullets(currentno);

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

function addBullets(index){
    if(currentno < objno){
        no = randWholeNum(3);
        switch(no){
            case 0:
                gltfLoader.load("Models/Fly.glb", function(gltf)
                {
                    gltf.scene.traverse( function ( child ) 
                    {
                        if ( child.isMesh) 
                        {
                            console.log(child.material);
                        }
                    })
                    var ob = gltf.scene;
                    ob.position.set((Math.random()*20)-10, (Math.random()*20)-10, (Math.random()*20)-10);
                    
                    ob.rotation.set((Math.random()*360), (Math.random()*360), (Math.random()*360));
                    sceneObjects[index] = ob;
                    scene.add( sceneObjects[index] );
                });
                break;
            case 1:
                gltfLoader.load("Models/Bullet.glb", function(gltf)
                {
                    gltf.scene.traverse( function ( child ) 
                    {
                        if ( child.isMesh) 
                        {
                            child.material = mat;
                            console.log(child.material);
                        }
                    })
                
                    var ob = gltf.scene;
                    ob.position.set((Math.random()*20)-10, (Math.random()*20)-10, (Math.random()*20)-10);
                    
                    ob.rotation.set((Math.random()*360), (Math.random()*360), (Math.random()*360));
                    sceneObjects[index] = ob;
                    scene.add( sceneObjects[index] );
                });
                break;
            case 2:
                gltfLoader.load("Models/DeadFly.glb", function(gltf)
                {
                    gltf.scene.traverse( function ( child ) 
                    {
                        if ( child.isMesh) 
                        {
                            console.log(child.material);
                        }
                    })
                    var ob = gltf.scene;
                    ob.position.set((Math.random()*20)-10, (Math.random()*20)-10, (Math.random()*20)-10);
                    
                    ob.rotation.set((Math.random()*360), (Math.random()*360), (Math.random()*360));
                    sceneObjects[index] = ob;
                    scene.add( sceneObjects[index] );
                });
                break;

        }
    }
    currentno+=1;
    
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
    
    
    //sceneObjects.forEach(rotateCube);
    sceneObjects.forEach(checkNearby);
    sceneObjects.forEach(move);
    if(currentno < objno) {
        addBullets(currentno);
    }
    
    renderer.render(scene, camera);
    //Call update continously
    requestAnimationFrame(update);
}

function move(item, index){
    sceneObjects[index].translateZ(-SPEED);
    //sceneObjects[index].position.set(sceneObjects[index].position.x + SPEED, sceneObjects[index].position.y, sceneObjects[index].position.z); 
}

function checkNearby(item, index){
    if(currentno == 0){
        for (i = 0; i < currentno; i++){
            if(i == index){
                continue;
            }
    
            x = false;
            y = false;
            z = false;
    
            if(sceneObjects[i].position.x >= item.position.x - coldis && sceneObjects[i].position.x <= item.position.x + coldis){
                x = true;
            }
    
            if(sceneObjects[i].position.y >= item.position.y - coldis && sceneObjects[i].position.y <= item.position.y + coldis){
                y = true;
            }
    
            if(sceneObjects[i].position.z >= item.position.z - coldis && sceneObjects[i].position.z <= item.position.z + coldis){
                z = true;
            }
    
            if(x&&y&&z){
                sceneObjects[index].rotation.set(item.rotation.x, item.rotation.y+180, item.rotation.z);
                sceneObjects[i].rotation.set(sceneObjects[i].rotation.x, sceneObjects[i].rotation.y+180, sceneObjects[i].rotation.z);
                sceneObjects[index].translateZ(-coldis);
                sceneObjects[i].translateZ(-coldis);
                
            }
        }
    }

    if((sceneObjects[index].position.x >= 10 || sceneObjects[index].position.x <= -10)||
    (sceneObjects[index].position.y >= 10 || sceneObjects[index].position.y <= -10)||
    (sceneObjects[index].position.z >= 10 || sceneObjects[index].position.z <= -10)){
        
        sceneObjects[index].rotation.set(item.rotation.x, item.rotation.y+180, item.rotation.z);
        sceneObjects[index].translateZ(-SPEED);
    }
}

function rotateCube(item, index){
    var no = 0;
    ran = (SPEED)*3;
    no = randWholeNum(3);
    console.log(no);
    switch(no){
        case 0:
            sceneObjects[index].rotation.set(item.rotation.x - ran, item.rotation.y, item.rotation.z);
            break;
        case 1:
            sceneObjects[index].rotation.set(item.rotation.x, item.rotation.y - ran, item.rotation.z);
            break;
        case 2:
            sceneObjects[index].rotation.set(item.rotation.x, item.rotation.y, item.rotation.z - ran);
            break;
    }
    
}

function randWholeNum(max){
    return Math.floor(Math.random()*max);
}
function moveCamera(){
    camera.position = sceneObjects[0].position;
    //console.log();
}