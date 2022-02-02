
import * as THREE from 'three';

export class EnemyAI
{
  constructor(hero, enemy, animations)
  {
    this.distance = 0;
    this.hero = hero;
    this.enemy = enemy;
    this.attackDistance = 0.5;
    this.speed = 0;
    this.velocity = 0;
    this.enemyState = 'idle';
    this.prevEnemyState = 'idle';
    this.stateChanged = false;
  }

  getTargetDistance()
  {
    return this.hero.position.distanceTo(this.enemy.position);
  }

  atAttackDistance()
  {
    // once hero characrer gets within this distance area, enemy character will walk towards them
    if(this.getTargetDistance() < 60 && this.getTargetDistance() > 17)
    {
      this.enemyState = 'walk';
    }
    // once enemy character is within this short area (5 and 16), enemy will begin to attack
    else if(this.getTargetDistance() <= 16 && this.getTargetDistance() >= 5)
    {
      this.enemyState = 'attack';
    }
  }

  // this function is responsible for making sure the state changed variable is only set to true once the enemy's state has changed
  checkForStateChange()
  {
    // checks to see if the current and previous state are the same
    if(this.enemyState != this.prevEnemyState)
    {
      // once the state changes we change the state to true to check if it has changed in the main animation loop
      this.stateChanged = true;

      // setting the previous enemy state to current state to break out of this if statement and keep the state changed variable to be checked only once
      this.prevEnemyState = this.enemyState;
    }
  }

  update()
  {
    this.atAttackDistance();
    //this.animationState();
    this.speed = 0.0;

    if ( this.enemyState === 'walk' ) { this.speed = 0.3; }

    // update and apply velocity
    this.velocity += (this.speed - this.velocity) * 0.2;

    // have the enemy character face the hero model
    this.enemy.lookAt(this.hero.position);

    // apply velocity to enemy model to have it move towards hero model
    this.enemy.translateZ( this.velocity );

    //this.enemyAnimation.updateCharacterState(this.enemyState);
    //animations
  }

}
