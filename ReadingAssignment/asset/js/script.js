const setMap = document.getElementById("setMap");

setMap.addEventListener("click", setMapDemo);

function setMapDemo() {
    // Set
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