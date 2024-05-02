let x: string="5";
x="RAM";
console.log(x);	
let emp: [number, string, boolean][] = [[1,'RAM', true], [2,'RAM', true]];// matches format
let eid:string | number ;
enum direction{left='left', right='right'}
type userType = {id:number, name:string}
let user:userType={ id:1, name:"bc"}

// type assert
let a: any=5;
let com = a as number; // let com = <number>a;

function add(a: number,b:number) : number{
    return a+b;
}
console.log(add(1,2));

//interface
interface userType1  {readonly id:number, name?:string, register(): string}  //? - optional, readonly - can't edit 
let user1:userType={ id:1, name:"bc"}

interface func{
    (x:number, y:number):number
}

const add1: func = (x:number,y:number) => x+y

class person implements userType1{
    id:number
    name:string
    constructor(id:number, name:string){
        this.id = id
        this.name= name        
    }
    register(){
        return `${this.name} is registered`
    }
}
const i1 = new person(1,"XXX");
class employee extends person{
    position:string
    constructor(id:number, name:string, position:string){
        super(id, name) // calls parents constructor
        this.position = position
    }
}

//generic
function getArray<T>(items:T[]):T[]{
    return new Array().concat(items);
}
let array = getArray<number>([1,2,3])




