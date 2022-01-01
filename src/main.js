
import * as THREE from 'three';
import { ModelLoader } from './model/modelLoader.js';
import { MainWorld } from './WorldObjects/MainWorld.js';
import { FollowCamera } from './Cameras/FollowCamera.js';
import { CharacterControls } from './model/CharacterControls/Controls.js';

import model from './model/knight.fbx';
import boss1 from './model/mutant.fbx';
//import bossIdle from './model/animations/bosses/bossidle.fbx';
import bossIdle from './model/animations/bosses/idle2.fbx';
//import dance from './dance.fbx';
import walk from './model/animations/walk.fbx';
import run from './model/animations/run.fbx';
import idle from './model/animations/idle.fbx';
import wave from './model/animations/Waving.fbx';
import slash from './model/animations/SwordSlash.fbx';

import css from './css/style.css';

export default class Main
{
  constructor()
  {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position.set( 0, 6, 0 );

    this.scene.background = new THREE.Color(0xffffff);

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
    // must use different clock for every animation mixer (for every model) or animation will not run
    this.heroClock = new THREE.Clock();
    this.boss1Clock = new THREE.Clock();

    this.model = new ModelLoader();
    this.boss1 = new ModelLoader();

    // load model
    const hero = this.model.loadModel(model)
      .then(model =>
        {
          // start initial animation
          this.model.initialAnimation(idle, model);

          // instantiate character controller for movements
          this.characterController = new CharacterControls(this.camera, model, this.model);

          // instantiate camera to follow character
          this.followCamera = new FollowCamera(this.camera, model);
          this.scene.add(model)
        })
      .catch(err => console.log(err))

    // make the boss model larger;
    this.boss1.modelSize = 0.15;

    // load first boss model
    const firstBoss = this.boss1.loadModel(boss1)
      .then(boss =>{
        boss.rotation.y += Math.PI;
        boss.position.z = -80;
        this.boss1.initialAnimation(bossIdle, boss)

        this.scene.add(boss)
      })
      .catch(err => console.log(err))

    // object to add feature to the world
    this.worldObjects = new MainWorld(this.scene);

    // checking to see if all models are loaded then calling the animation function
    Promise.all([hero, firstBoss])
    .then(c => this.animate())
    .catch(err => console.log(err))

    // bind this to the main class, so we can pass the method to the requestAnimationFrame function
    this.animate = this.animate.bind(this);
  }

  animate(){
    requestAnimationFrame( this.animate );
    //this.scene.rotation.y += 0.01

    // the models mixer needs to be update to move animation
    this.model.mixer.update(this.heroClock.getDelta());

    // update bosses animation mixer
    this.boss1.mixer.update(this.boss1Clock.getDelta());

    // update character movements
    this.characterController.update();

    // update camera positions
    this.followCamera.update();

    // update the models animation index from the key events from character controller
    this.model.updateAnimationIndex(this.characterController.animationIndex);

    // update animations in the model class
    //this.model.animationUpdate();

    this.renderer.render( this.scene, this.camera );
  };

}

new Main();
