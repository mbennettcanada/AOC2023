import * as fs from 'fs';
import * as path from 'path';
import { isNumber } from 'util';

type location = {
    y: number
    x: number
    num:string
}

function isNumberSymbolAdjacent(map: string[],loc:location){
    let stringlen = loc.num.length
    let locationsToCheck:location[] = []
    if (loc.x != 0){ //left of the number
        locationsToCheck.push({x:loc.x-1,y:loc.y,num:loc.num})
    }
    if ((loc.x+loc.num.length-1) < map[loc.y].length-1) {  //right of the number
        locationsToCheck.push({x:loc.x+loc.num.length,y:loc.y,num:loc.num})
    }   

    if(loc.x!=0 && loc.y!=0){ //diagonal top left
        locationsToCheck.push({x:loc.x-1,y:loc.y-1,num:loc.num})
    }
    if ((loc.x+loc.num.length-1) < map[loc.y].length-1 && loc.y!=0 ) {  //diagonal top right
        locationsToCheck.push({x:loc.x+loc.num.length,y:loc.y-1,num:loc.num})
    }   

    if(loc.x!=0 && loc.y<map.length-1){ //diagonal bottom left
        locationsToCheck.push({x:loc.x-1,y:loc.y+1,num:loc.num})
    }
    if ((loc.x+loc.num.length-1) < map[loc.y].length-1 && loc.y<map.length-1 ) {  //diagonal bottom right
        locationsToCheck.push({x:loc.x+loc.num.length,y:loc.y+1,num:loc.num})
    }  
    //loop through an iterator the length of num
    for (let index = 0; index < loc.num.length; index++) {
        if(loc.y!=0){
            locationsToCheck.push({x:loc.x+index,y:loc.y-1,num:loc.num})
        }
        if(loc.y<map.length-1){
            locationsToCheck.push({x:loc.x+index,y:loc.y+1,num:loc.num})
        }
        
    }
    let re = /[-!$@%^&#*()_+|~=`{}\[\]:";'<>?,\/]/g
    let isSymbolAdjacent = false;
    locationsToCheck.forEach( l => {
        if(map[l.y][l.x].match(re)){
            isSymbolAdjacent = true
        }
    })
    return isSymbolAdjacent

}

function findNumbersAndLocations(map: string[]){
    let numbers:location[] = []
    let re = /\d/g
    for(let row = 0; row<map.length;row++) {
        let xindex = 0
        let foundNumber = ""
        let continueMatch = false
        for (let i = 0;i<map[row].length;i++){
            if(map[row][i].match(re)){
                if(!continueMatch){
                    xindex = i
                    foundNumber += map[row][i]
                    console.log(`set xindex: ${xindex}`)
                    continueMatch = true
                }
                else{
                    foundNumber +=map[row][i]
                }

            }
            else if(continueMatch){
                numbers.push({y:row,x:xindex,num:foundNumber})
                foundNumber = ""
                continueMatch = false
                //push the shit and reset foundNumber and dontinueMatch
            }

        }
    }
    return numbers
}


const inputtext = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');
const map = inputtext.split(/\r?\n/)

const numbers = findNumbersAndLocations(map)
console.log(numbers[numbers.length-1])
let sum = 0
numbers.forEach(number => {
    if(isNumberSymbolAdjacent(map,number)){
        sum += +number.num
    }
})
console.log(sum)



