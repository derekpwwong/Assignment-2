/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    export class gameObjectContainer extends THREE.Mesh {
        //PRIVATE INSTANCE VARIABLES +++++++++++++++++++++++++++++++++++++
        private _geometry: THREE.Geometry;
  
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor(geometry: THREE.Geometry, x:number, y:number, z:number) {
            super(geometry);
            this._geometry = geometry;
            
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
        
    }
}