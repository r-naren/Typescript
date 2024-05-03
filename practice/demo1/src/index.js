var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function runAll() {
    var x = "5";
    x = "RAM";
    console.log(x);
    var emp = [[1, 'RAM', true], [2, 'RAM', true]]; // matches format
    var eid;
    var direction;
    (function (direction) {
        direction["left"] = "left";
        direction["right"] = "right";
    })(direction || (direction = {}));
    var user = { id: 1, name: "bc" };
    // type assert
    var a = 5;
    var com = a; // let com = <number>a;
    function add(a, b) {
        return a + b;
    }
    console.log(add(1, 2));
    var user1 = { id: 1, name: "bc" };
    var add1 = function (x, y) { return x + y; };
    var person = /** @class */ (function () {
        function person(id, name) {
            this.id = id;
            this.name = name;
        }
        person.prototype.register = function () {
            return "".concat(this.name, " is registered");
        };
        return person;
    }());
    var i1 = new person(1, "XXX");
    var employee = /** @class */ (function (_super) {
        __extends(employee, _super);
        function employee(id, name, position) {
            var _this = _super.call(this, id, name) || this; // calls parents constructor
            _this.position = position;
            return _this;
        }
        return employee;
    }(person));
    //generic
    function getArray(items) {
        return new Array().concat(items);
    }
    var array = getArray([1, 2, 3]);
    var date = new Date(2012, 2, 2);
    console.log("Normal value : " + date);
    console.log("US Format : " + date.toLocaleDateString('en-US'));
    console.log("British English format : " + date.toLocaleDateString('en-GB'));
}
