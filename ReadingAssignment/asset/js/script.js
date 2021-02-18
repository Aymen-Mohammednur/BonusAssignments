import power from './exportDefault.js'
// Define UI Variables
const taggedTemp = document.getElementById("taggedTemp");
const passingFunc = document.getElementById("passingFunc");
const returnFunc = document.getElementById("returnFunc");
const closure = document.getElementById("closure");
const reflect = document.getElementById("reflect");
const exportDef = document.getElementById("exportDef");
const iteratorGen = document.getElementById("iteratorGen");
const setMap = document.getElementById("setMap");

// Add Event Listeners
taggedTemp.addEventListener("click", taggedTemplates);
passingFunc.addEventListener("click", passingFunction);
returnFunc.addEventListener("click", returningFunction);
closure.addEventListener("click", closures);
reflect.addEventListener("click", reflectAPI);
exportDef.addEventListener("click", exportDefault);
iteratorGen.addEventListener("click", iteratorGenDemo);
setMap.addEventListener("click", setMapDemo);

// Answers
let name = "Aymen"
function taggedTemplates() {
    var age = 21;
    let str0 =  "My name"
    let str1 =  " is "
    let str2 = " and I am "
    let str4=  "."

    let ageStr;
    if (age > 20){
        ageStr = 'a young adult';
    } 
    else {
        ageStr = 'a teenager';
    }

    alert(`${str0}${str1}${name}${str2}${ageStr}${str4}`);
}


function passingFunction() {
    function helloWorld() {
        return "Hello World";
    }
    function message(text, name) {
        alert(text() + name);
    }
    // Pass `helloWorld` as an argument to `message` function
    message(helloWorld, ", I'm Aymen!");
    // The function that we pass as an argument to another function, is called a Callback function. helloWorld is a Callback function.
}

function helloWorld() {
    return function() {           // We can return a function because we treated function in JavaScript as a value.
        alert("Hello, World");    // A function that returns a function is called a Higher-Order Function.
    }
}

function returningFunction() {
    helloWorld()(); // We are using double parentheses ()() to invoke the returned function as well.
                    // If we invoked helloWorld directly, it would return the function itself without invoking its returned function.
}

//var counter = 0;
function closures() {
    function adder(num1) {
        function add(num2) {
            return num1 + num2;
        }
        return add;
    }

    var addOne = adder(1);
    var addTwo = adder(2);

    console.log(addOne(10));
    console.log(addTwo(10));
}


function reflectAPI() {
    // construction and method call
    class Person {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        }
    };
    
    let names = ['Aymen', 'Moh'];
    let john = Reflect.construct(Person, names);
    
    console.log(john instanceof Person);
    console.log(john.fullName);


    // properties
    const person = {
        name: 'Aymen',
        age: '21'
    }
    console.log(Reflect.has(person, 'age')); // true
    console.log(Reflect.has(person, 'sex')); // false

    console.log(Reflect.ownKeys(person));  // returns object's keys

    console.log(Reflect.set(person, 'occupation', 'student'));  // returns true if its successful
    console.log(person);
    console.log(Reflect.ownKeys(person));
}

function exportDefault() {
    alert(power(4));
}

function* generateSequence() {
    yield 1;
    return 2;
    return 3;
}

function iteratorGenDemo() {
    
    // Iterator
    console.log("//// ITERATOR ////")
    console.log("")
    const numList = [1, 2, 3, 4, 5, 6];
    const iterableList = numList[Symbol.iterator]();
    var count = 0;

    let result = iterableList.next();
    while (!result.done) {
    console.log(result.value); // 1 2 3 4 5 6
    result = iterableList.next();
    count++;
    }

    console.log("Iterated over list of size: " + count); // 6 numbers returned
    console.log(iterableList);

    // Generator
    console.log("")
    console.log("//// GENERATOR ////")
    console.log("")

    // "generator function" creates "generator object"
    let generator = generateSequence();
    // alert(generator); // [object Generator]
    let one = generator.next();
    console.log(JSON.stringify(one)); // {value: 1, done: false} done will be false untill the function code has finished

    let two = generator.next();
    console.log(JSON.stringify(two));

    let final = generator.next();
    console.log(JSON.stringify(final));
}

function setMapDemo() {
    // Set
    console.log("//// SET ////")
    console.log("")
    let mySet = new Set();

    mySet.add(1)           // [1]
    mySet.add(3)           // [1, 3]
    mySet.add(3)           // [1, 3]
    mySet.add(3)           // [1, 3]
    mySet.add('Hello')     // [1, 3, 'Hello']
    console.log(mySet)

    let obj = {name: 'Aymen', age: '21'}
    mySet.add(obj)
    //console.log(mySet)

    console.log(mySet.has(1))              // true
    console.log(mySet.has(2))              // false
    console.log(mySet.has(Math.sqrt(9)))   // true
    console.log(mySet.has('Hello'.toLowerCase())) // false, it is case sensitive
    console.log(mySet.has(obj))           // true

    console.log(mySet.size)         // 4

    mySet.delete(3)    // removes 3 from the set
    console.log(mySet.has(3))       // false

    // Used to remove duplicate elements from the array
    const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,3,4,5]
    console.log([new Set(numbers)]);

    console.log(mySet);

    // Map
    console.log("")
    console.log("//// MAP ////")
    console.log("")
    let myMap = new Map();

    let String = 'Name'
    let Obj    = {}

    // setting the values
    myMap.set(String, "Aymen Moh")
    myMap.set(Obj, "{age: '21', work: 'student}")

    console.log(myMap.size)              // 2

    // getting the values
    console.log(myMap.get(String)) 
    console.log(myMap.get(Obj))       
    console.log(myMap.get('Name'))

    console.log(myMap);
}