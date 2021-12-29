
import * as THREE from 'three';
import { ModelLoader } from './model/modelLoader.js';
import { MainWorld } from './WorldObjects/MainWorld.js';
import css from './css/style.css';

export default class Main
{
  constructor()
  {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    //this.scene.background = new THREE.Color(0xffffff);

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 4 );
    this.scene.add( light );


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    //this.renderer.shadowMap.enabled = true
    //this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

    document.body.appendChild( this.renderer.domElement );

    // clock to update animation sequences
    this.clock = new THREE.Clock();

    this.model = new ModelLoader(this.scene);

    // add World objects;

    this.worldObjects = new MainWorld(this.scene);

    this.camera.position.z = 5;

    this.animate = this.animate.bind(this);

    this.animate();
  }

  animate(){
    requestAnimationFrame( this.animate );
    //this.scene.rotation.y += 0.01

    // the models mixer needs to be update to move animation
    if(this.model.mixer)
    {
      this.model.mixer.update(this.clock.getDelta());
    }

    this.renderer.render( this.scene, this.camera );
  };

}

new Main();
