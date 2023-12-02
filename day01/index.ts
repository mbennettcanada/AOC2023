import * as fs from 'fs';
import * as path from 'path';

function summerFunction(listofstrings: string[]) {
    let sum :number = 0
    listofstrings.forEach(digits => {
        let thissum = +`${digits.at(0)}${digits.at(-1)}`
        sum += thissum
    });
    return sum
}

const inputtext = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');
const inputtest = fs.readFileSync(path.join(__dirname, './test.txt'), 'utf-8');
const inputtest2 = fs.readFileSync(path.join(__dirname, './test2.txt'), 'utf-8');

let splitstring = inputtext.split(/\r?\n/)

//part1
let strippedList:string[] = []
splitstring.forEach(element => {
    strippedList.push(element.replace(/\D/g, ''))
});
console.log(strippedList)
console.log(`Part 1:${summerFunction(strippedList)}`)

//part2
let splitstring2 = inputtext.split(/\r?\n/)
let unstupifiedList:string[] = []
splitstring2.forEach(element => {
    element = element.replace(/one/g,"o1ne")
    element = element.replace(/two/g,"t2wo")
    element = element.replace(/three/g,"th3ree")
    element = element.replace(/four/g,"fo4ur")
    element = element.replace(/five/g,"fi5ve")
    element = element.replace(/six/g,"si6x")
    element = element.replace(/seven/g,"se7ven")
    element = element.replace(/eight/g,"ei8ght")
    element = element.replace(/nine/g,"ni9ne")
    element = element.replace(/\D/g, '')
    unstupifiedList.push(element)
})

console.log(`Part 2:${summerFunction(unstupifiedList)}`)


