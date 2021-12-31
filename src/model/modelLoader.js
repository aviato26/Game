
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//import model from './model.fbx';
//import model from './swordmodel2.fbx';
import model from './knight.fbx';
//import dance from './dance.fbx';
import walk from './animations/walk.fbx';
import run from './animations/run.fbx';
import idle from './animations/idle.fbx';
import wave from './animations/Waving.fbx';
import slash from './animations/SwordSlash.fbx';
//import sword from './weapons/sword1.fbx';

export class ModelLoader
{
  constructor()
  {
    this.loader = new FBXLoader();
    //this.loadModel(scene);
  }

  loadModel(model)
  {
    return new Promise((res, rej) =>
    {
      this.loader.load(model, (gltf) => {
      const size = 0.1;
      // scaling model down
      gltf.scale.x = size;
      gltf.scale.y = size;
      gltf.scale.z = size;

      // moving models position down
      gltf.rotation.y = Math.PI;
      gltf.position.y -= 2.0;

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
      return anim.load(walk, (a) => {
        this.mixer = new THREE.AnimationMixer(gltf);
        this.idle = this.mixer.clipAction(a.animations[0]);
        //this.mixer._actions[0].clampWhenFinished = true;
        //console.log(this.mixer)
        this.idle.play();

        if(gltf)
        {
          res(gltf)
        }
        else {
          rej('model not loaded')
        }
      })

    })
  })
  }

}
