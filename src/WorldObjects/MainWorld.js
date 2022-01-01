
import * as THREE from 'three';


export class MainWorld
{
  constructor(scene)
  {
    this.floorSize = 9000;
    this.floor = this.addFloor(this.floorSize);

    this.floor.rotation.x += Math.PI / 2;
    this.floor.position.y -= 2.0;
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
