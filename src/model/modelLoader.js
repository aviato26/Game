
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//import model from './model.fbx';
//import model from './swordmodel2.fbx';
import model from './knight.fbx';
//import dance from './dance.fbx';
import walk from './animations/SwordWalk.fbx';
import idle from './animations/idle.fbx';
import wave from './animations/Waving.fbx';
//import sword from './weapons/sword1.fbx';

export class ModelLoader
{
  constructor(scene)
  {
    this.loader = new FBXLoader();

    this.loadModel(scene);
  }

  loadModel(scene)
  {

    this.loader.load(model, (gltf) => {
      const size = 0.03;
      // scaling model down
      gltf.scale.x = size;
      gltf.scale.y = size;
      gltf.scale.z = size;

      // moving models position down
      gltf.position.y -= 1.0;

      gltf.castShadow = true;

      // bones of the right hand to place weapon in
      //let rightHand = gltf.children[0].children[0].children[0].children[0].children[2].children[0].children[0].children[0]
      //let rightHand = gltf.children[0].children[0].children[0].children[0].children[2].children[0].children[0]

/*
      // loading weapon
      const weapon = new FBXLoader();
      weapon.load(sword, (w) => {
        const size = 0.04;
        //weapon.position.y += 1.0;
        //gltf.scale = {x: size, y: size, z: size};
        w.scale.x = size;
        w.scale.y = size;
        w.scale.z = size;
        //rightHand.add(w)
        rightHand.attach(w)

        scene.add(w)
      })
*/
      const anim = new FBXLoader();
      anim.load(idle, (a) => {
        this.mixer = new THREE.AnimationMixer(gltf);
        this.idle = this.mixer.clipAction(a.animations[0]);
        this.idle.play();

        scene.add(gltf)
      })

    })
  }

}
