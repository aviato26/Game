
import * as THREE from 'three';

export class FollowCamera
{
  constructor(camera, character)
  {
    this.camera = camera;
    this.character = character;
    this.lerpOffset = 0.1;

    this.currentPos = new THREE.Vector3();
    this.currentLookAt = new THREE.Vector3();
  }

  calcOffset()
  {
    // this is were the cameras position will be
    const idealOffset = new THREE.Vector3(-2, 15, -25);
    idealOffset.applyQuaternion(this.character.quaternion);
    idealOffset.add(this.character.position);
    return idealOffset;
  }

  calcLookAt()
  {
    // this is for calculating where the camera will look
    const idealLookAt = new THREE.Vector3(-2, 15, 0);
    idealLookAt.applyQuaternion(this.character.quaternion);
    idealLookAt.add(this.character.position);
    return idealLookAt;
  }

  update()
  {
      const idealOffset = this.calcOffset();
      const idealLookAt = this.calcLookAt();
/*
      this.currentPos.copy(idealOffset);
      this.currentLookAt.copy(idealLookAt);
*/
      // lerping between offsets and lerpOffset to give the camera more of a spring feel
      this.currentPos.lerp(idealOffset, this.lerpOffset);
      this.currentLookAt.lerp(idealLookAt, this.lerpOffset);

      this.camera.position.copy(this.currentPos);
      this.camera.lookAt(this.currentLookAt);
  }

}
