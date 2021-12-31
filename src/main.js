
import * as THREE from 'three';
import { ModelLoader } from './model/modelLoader.js';
import { MainWorld } from './WorldObjects/MainWorld.js';
import { FollowCamera } from './Cameras/FollowCamera.js';
import { CharacterControls } from './model/CharacterControls/Controls.js';

import model from './model/knight.fbx';
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
    this.clock = new THREE.Clock();

    this.model = new ModelLoader();
    // load model
    this.model.loadModel(model)
    .then(model =>
      {
        this.characterController = new CharacterControls(this.camera, model);
        //this.tempCharacterPos = model;
        this.followCamera = new FollowCamera(this.camera, model);
        this.scene.add(model)
      })
    .catch(err => console.log(err))
    //this.characterController = new CharacterControls(this.camera, this.scene.children[1]);
    // add World objects;

    this.worldObjects = new MainWorld(this.scene);

    //this.camera.position.z = 5;

    this.cameraOffset = new THREE.Vector3(0.0, 5.0, 5.0); // NOTE Constant offset between the camera and the target

    // NOTE Assuming the camera is direct child of the Scene
    this.objectPosition = new THREE.Vector3(0, 0, 0);

    //this.followCamera = new FollowCamera({camera: null, target: null})
/*
    this.waitForModelLoad()
    .then(c => console.log(c))
    .catch(err => console.log(err))
*/
    this.animate = this.animate.bind(this);
    //console.log(this.waitForModelLoad())
    this.animate();
  }

  animate(){
    requestAnimationFrame( this.animate );
    //this.scene.rotation.y += 0.01

    // the models mixer needs to be update to move animation
    if(this.model.mixer)
    {
      this.model.mixer.update(this.clock.getDelta());
      //this.scene.children[2].position.z += 0.01;
      //this.model.position.z += 0.01
    }

    if(this.characterController)
    {
      this.characterController.update();
      this.followCamera.update();
      //this.tempCharacterPos.position.y -= 0.1;
      //this.camera.lookAt(this.characterController.character.position)
      //console.log(this.camera)
      //this.scene.children[2].position.y += 0.01;
      //this.scene.children[2].getWorldPosition(this.objectPosition);

      //this.camera.position.copy(this.objectPosition).add(this.cameraOffset);
      //this.characterController._params.target = this.scene.children[2];
      //this.characterController.Update(this.clock.getDelta())
      /*
      this.modelPosition = this.scene.children[2];
      //console.log(this.followCamera)
      this.followCamera._params.camera = this.camera;
      this.followCamera._params.target = this.modelPosition;
      //console.log(this.modelPosition)
      //this.followCamera.update();
      */
      //console.log(this.camera.position)
    }


    this.renderer.render( this.scene, this.camera );
  };

}

new Main();
