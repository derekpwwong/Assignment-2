/// <reference path="../../typings/tsd.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var gameObjectContainer = (function (_super) {
        __extends(gameObjectContainer, _super);
        //CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++
        function gameObjectContainer(geometry, x, y, z) {
            _super.call(this, geometry);
            this._geometry = geometry;
            this.position.x = x;
            this.position.y = y;
            this.position.z = z;
            this.receiveShadow = true;
            this.castShadow = true;
        }
        return gameObjectContainer;
    }(THREE.Mesh));
    objects.gameObjectContainer = gameObjectContainer;
})(objects || (objects = {}));

//# sourceMappingURL=gameobjectcontainer.js.map
