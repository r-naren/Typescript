"use strict";
let x = "5";
x = "RAM";
console.log(x);
let emp = [[1, 'RAM', true], [2, 'RAM', true]]; // matches format
let eid;
var direction;
(function (direction) {
    direction["left"] = "left";
    direction["right"] = "right";
})(direction || (direction = {}));
let user = { id: 1, name: "bc" };
// type assert
let a = 5;
let com = a; // let com = <number>a;
function add(a, b) {
    return a + b;
}
console.log(add(1, 2));
let user1 = { id: 1, name: "bc" };
const add1 = (x, y) => x + y;
class person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    register() {
        return `${this.name} is registered`;
    }
}
const i1 = new person(1, "XXX");
class employee extends person {
    constructor(id, name, position) {
        super(id, name); // calls parents constructor
        this.position = position;
    }
}
//generic
function getArray(items) {
    return new Array().concat(items);
}
let array = getArray([1, 2, 3]);
