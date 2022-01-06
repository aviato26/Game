
import walk from '../animations/walk.fbx';
import walkBack from '../animations/WalkBackwards.fbx';
import run from '../animations/run.fbx';
import idle from '../animations/idle.fbx';
import wave from '../animations/Waving.fbx';
import attack from '../animations/SwordSlash.fbx';
import block from '../animations/block2.fbx';
import mIdle from '../animations/bosses/bossidle.fbx';

// all animations for hero model
/*
let heroAnimations =
[
  {
    name: 'idle',
    animation: idle
  },
  {
    name: 'walk',
    animation: walk
  },
  {
    name: 'walkBack',
    animation: walkBack
  },
  {
    name: 'slash',
    animation: slash
  },
  {
    name: 'block',
    animation: block
  }
];
*/
let heroAnimations =
{
  idle: idle,
  walk: walk,
  walkBack: walkBack,
  attack: attack,
  block: block
};

export { heroAnimations };
