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
const date = new Date(2012, 2, 2);
console.log(date);
console.log(date.toLocaleDateString('en-US'));
// → "12/19/2012"
// British English uses day-month-year order
console.log(date.toLocaleDateString('en-GB'));
// → "20/12/2012"
// Korean uses year-month-day order
console.log(date.toLocaleDateString('ko-KR'));
// → "2012. 12. 20."
// Arabic in most Arabic speaking countries uses real Arabic digits
console.log(date.toLocaleDateString('ar-EG'));
// → "٢٠‏/١٢‏/٢٠١٢"
// chinese
console.log(date.toLocaleDateString('zh-Hans-CN'));
