
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
//import model from './model.fbx';
//import model from './swordmodel2.fbx';
//import model from './knight.fbx';
//import dance from './dance.fbx';
import walk from './animations/walk.fbx';
import walkBack from './animations/WalkBackwards.fbx';
import run from './animations/run.fbx';
import idle from './animations/idle.fbx';
import wave from './animations/Waving.fbx';
import slash from './animations/SwordSlash.fbx';
import block from './animations/block2.fbx';
import mIdle from './animations/bosses/bossidle.fbx';
//import sword from './weapons/sword1.fbx';

export class Character
{
  constructor(animations)
  {
    this.loader = new FBXLoader();
    //this.animations = [];
    //this.animation = [];
    //this.enemyAnimations = [];
    //this.lastAction = new THREE.AnimationAction;
    //this.activeAction = new THREE.AnimationAction;
    //this.lastAnimeIndex = 0;
    //this.currentAnimeIndex = 0;
    //this.animationIndex = 0;
    this.modelSize = 0.1;

    // passing in animation states from classes in AnimationsForModels folder
    //this.characterPreviousState = null;
    this.characterState = animations;

    //this.preloadAnimations();
  }
/*
  animations(animations)
  {
    for(let i = 0; i < animations.length; i++)
    {
      this.loader.load(animations[i], (anime) => {})
    }
  }
*/
  loadModel(model)
  {
    return new Promise((res, rej) =>
    {
      this.loader.load(model, (gltf) => {
      //const size = 0.1;
      // scaling model down
      gltf.scale.x = this.modelSize;
      gltf.scale.y = this.modelSize;
      gltf.scale.z = this.modelSize;

      // moving models position down
      gltf.rotation.y = Math.PI;
      //gltf.position.y -= 2.0;

      gltf.castShadow = true;

      this.mixer = new THREE.AnimationMixer(gltf);

      const anim = new FBXLoader();

      //this.animation.push(idle, walk, walkBack, run, slash, block);

      anim.load(idle, (idle) =>
      {
        /*
        // name animation
        idle.animations[0].name = 'idle';
        this.animations.push(this.mixer.clipAction(idle.animations[0]));
        */
        // set initial character animation which would be idle
        this.restState = this.mixer.clipAction(idle.animations[0]);
      });
/*
      anim.load(walk, (wAnime) =>
      {
        wAnime.animations[0].name = 'walk';
        this.animations.push(this.mixer.clipAction(wAnime.animations[0]));
      });

      anim.load(run, (runAnime) =>
      {
        runAnime.animations[0].name = 'run';
        this.animations.push(this.mixer.clipAction(runAnime.animations[0]));
      });
*/
      if(gltf)
      {
        res(gltf)
      }
      else {
        rej('model not loaded')
      }
/*
      anim.load(idle, (a) => {
        this.mixer = new THREE.AnimationMixer(gltf);
        this.anime = this.mixer.clipAction(a.animations[0]);
        //this.anime = this.animations[0];
        //console.log(this.animations[this.animationIndex].animations[0])
        //this.mixer._actions[0].clampWhenFinished = true;
        //console.log(this.mixer)
        this.anime.play();
        if(gltf)
        {
          res(gltf)
        }
        else {
          rej('model not loaded')
        }
      })
      */
    })
  })
  }
/*
  updateAnimationIndex(index)
  {
    this.animationIndex = index;
  }
*/
  initialAnimation()
  {

    this.mixer.dispatchEvent({
      type: 'finished',
      action: this,
      //direction: deltaTime < 0 ? -1 : 1
    })

    this.loader.load(this.characterState.idle, (a) => {
      this.animationClip = a.animations[0];

      this.anime = this.mixer.clipAction(a.animations[0]);
      this.anime.play();
    })
  }

  updateCharacterState(state)
  {
    switch(state)
    {
      case 'walk':
        this.updateAnimation(this.characterState.walk);
      break;

      case 'walkBack':
        this.updateAnimation(this.characterState.walkBack);
      break;

      case 'attack':
        this.updateAnimation(this.characterState.attack);
      break;

      case 'block':
        this.updateAnimation(this.characterState.block);
      break;

      default:
        this.updateAnimation(this.characterState.idle);
      break;
    }
  }

  updateAnimation(state)
  {
    this.loader.load(state, (a) => {
      this.anime.crossFadeTo(this.restState, 0.3, true);
      this.anime = this.mixer.clipAction(a.animations[0]);
      this.anime.fadeIn(0.3);
      this.anime.play();
    })

  }
/*
  animationUpdate()
  {
    this.loader.load(this.animation[this.animationIndex], (a) => {
      //this.mixer = new THREE.AnimationMixer(gltf);
      //this.mixer.stopAllAction();
      //this.anime.reset();
      this.anime.crossFadeTo(this.animations[0], 0.3, true);
      this.anime = this.mixer.clipAction(a.animations[0]);
      this.anime.fadeIn(0.3);
      this.anime.play();
      this.lastAnimeIndex = this.animationIndex;
    })
  }
*/
}
