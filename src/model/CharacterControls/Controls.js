
import * as THREE from 'three';

export class CharacterControls
{
  constructor(camera, character, animations)
  {
    this.velocity = 0.0;
    this.speed = 0.0;

    this.character = character;
    this.animeActions = animations;
    this.keyDown = false;
    //console.log(this.animeActions)

    this.keys =
    {
      up: false,
      down: false,
      left: false,
      right: false,
      animationIndex: 0
    }

    this.addEventListeners();

  }

  addEventListeners()
  {

    document.body.addEventListener('keydown', (e) => {
      // keydown events trigger continously when held down so this checks if the event was already triggered to keep animations smooth
      if(!e.repeat)
      {
        // apply movements when key is pressed
        switch(e.key)
        {
          case "ArrowUp":
            //this.speed = 0.01;
            this.keys.up = true;
            this.animationIndex = 1;
            this.animeActions.updateAnimationIndex(this.animationIndex);
            this.animeActions.animationUpdate()
          break;

          case "ArrowDown":
            //this.speed = -0.01;
            this.keys.down = true;
            this.animationIndex = 2;
            this.animeActions.updateAnimationIndex(this.animationIndex);
            this.animeActions.animationUpdate()
          break;

          case "ArrowRight":
            //this.character.rotateY(0.05);
            this.keys.right = true;
          break;

          case "ArrowLeft":
            //this.character.rotateY(-0.05);
            this.keys.left = true;
          break;

          case "s":
            this.animationIndex = 4;
            this.animeActions.updateAnimationIndex(this.animationIndex);
            this.animeActions.animationUpdate()
          break;

          case "a":
            this.animationIndex = 5;
            this.animeActions.updateAnimationIndex(this.animationIndex);
            this.animeActions.animationUpdate()
          break;

          default:
          break;
        }
      }
    })

    document.body.addEventListener('keyup', (e) => {
      // cancel movements when key is released
      switch(e.key)
      {
        case "ArrowUp":
          //this.speed = 0.01;
          this.keys.up = false;
          this.animationIndex = 0;
          this.animeActions.updateAnimationIndex(this.animationIndex);
          this.animeActions.animationUpdate()
        break;

        case "ArrowDown":
          //this.speed = -0.01;
          this.keys.down = false;
          this.animationIndex = 0;
          this.animeActions.updateAnimationIndex(this.animationIndex);
          this.animeActions.animationUpdate()          
        break;

        case "ArrowRight":
          //this.character.rotateY(0.05);
          this.keys.right = false;
        break;

        case "ArrowLeft":
          //this.character.rotateY(-0.05);
          this.keys.left = false;
        break;

        case "s":
          this.animationIndex = 0;
          this.animeActions.updateAnimationIndex(this.animationIndex);
          this.animeActions.animationUpdate()
        break;

        case "a":
          this.animationIndex = 0;
          this.animeActions.updateAnimationIndex(this.animationIndex);
          this.animeActions.animationUpdate()
        break;

        default:
        break;
      }

    })

  }

  update()
  {

    this.speed = 0.0;

    // increase speed when walking forward or backwards
    if ( this.keys.up && this.animationIndex === 1)
      this.speed = 0.3;
    else if ( this.keys.down && this.animationIndex === 2)
      this.speed = -0.3;

      // turn character
    if ( this.keys.left )
      this.character.rotateY(0.05);
    else if ( this.keys.right )
      this.character.rotateY(-0.05);

    // update and apply velocity
    this.velocity += (this.speed - this.velocity) * 0.2;
    this.character.translateZ( this.velocity );
  }

}
