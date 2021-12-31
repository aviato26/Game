
import * as THREE from 'three';

export class CharacterControls
{
  constructor(camera, character)
  {
    this.velocity = 0.0;
    this.speed = 0.0;

    this.character = character;

    this.keys =
    {
      up: false,
      down: false,
      left: false,
      right: false
    }

    this.addEventListeners();

  }

  addEventListeners()
  {

    document.body.addEventListener('keydown', (e) => {
      // apply movements when key is pressed
      switch(e.key)
      {
        case "ArrowUp":
          //this.speed = 0.01;
          this.keys.up = true;
        break;

        case "ArrowDown":
          //this.speed = -0.01;
          this.keys.down = true;
        break;

        case "ArrowRight":
          //this.character.rotateY(0.05);
          this.keys.right = true;
        break;

        case "ArrowLeft":
          //this.character.rotateY(-0.05);
          this.keys.left = true;
        break;

        default:
        break;
      }
    })

    document.body.addEventListener('keyup', (e) => {
      // cancel movements when key is released
      switch(e.key)
      {
        case "ArrowUp":
          //this.speed = 0.01;
          this.keys.up = false;
        break;

        case "ArrowDown":
          //this.speed = -0.01;
          this.keys.down = false;
        break;

        case "ArrowRight":
          //this.character.rotateY(0.05);
          this.keys.right = false;
        break;

        case "ArrowLeft":
          //this.character.rotateY(-0.05);
          this.keys.left = false;
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
    if ( this.keys.up )
      this.speed = 0.3;
    else if ( this.keys.down )
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
