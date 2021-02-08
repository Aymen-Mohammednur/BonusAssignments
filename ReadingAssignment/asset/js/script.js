import power from './exportDefault.js'
// Define UI Variables
const exportDef = document.getElementById("exportDef");
const iteratorGen = document.getElementById("iteratorGen");
const setMap = document.getElementById("setMap");

// Add Event Listeners
exportDef.addEventListener("click", exportDefault);
iteratorGen.addEventListener("click", iteratorGenDemo);
setMap.addEventListener("click", setMapDemo);

function exportDefault() {
    console.log(power(4));
}

function* generateSequence() {
    yield 1;
    yield 2;
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

    let obj = {name: 'Aymen', age: '21'}
    mySet.add(obj)

    console.log(mySet.has(1))              // true
    console.log(mySet.has(2))              // false
    console.log(mySet.has(Math.sqrt(9)))   // true
    console.log(mySet.has('Hello'.toLowerCase())) // false, it is case sensitive
    console.log(mySet.has(obj))           // true

    console.log(mySet.size)         // 5

    mySet.delete(5)    // removes 5 from the set
    console.log(mySet.has(5))       // false

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
    myMap.set(true, "boolean")

    console.log(myMap.size)              // 2

    // getting the values
    console.log(myMap.get(String)) 
    console.log(myMap.get(Obj))       
    console.log(myMap.get('Name'))

    console.log(myMap.get({}))            // undefined, because Obj !== {}

    console.log(myMap);
}