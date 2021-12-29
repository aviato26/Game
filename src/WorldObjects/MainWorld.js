
import * as THREE from 'three';


export class MainWorld
{
  constructor(scene)
  {
    this.floorSize = 5000;
    this.floor = this.addFloor(this.floorSize);

    this.floor.rotation.x += 1.5;
    this.floor.position.y -= 3.0;
    scene.add(this.floor)
  }

  addFloor(size)
  {
    const floorGeometry = new THREE.PlaneGeometry(size, size);
    const floorMaterial = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide, color: 0xff0000 });
    const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

    return floorMesh;
  }
}
