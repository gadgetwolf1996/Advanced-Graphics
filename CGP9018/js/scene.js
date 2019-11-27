//When the window is loaded fully, call initScene
window.addEventListener("load", initScene);

//Create a new Three.js scene
var scene = new THREE.Scene();

//Create a perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

//Create a renderer (with antialiasing)
var renderer = new THREE.WebGLRenderer({ antialias: true });