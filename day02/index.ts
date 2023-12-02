import * as fs from 'fs';
import * as path from 'path';

type Game = {
    Id: number;
    Possible: boolean;
    MinRed: number;
    MinBlue: number;
    MinGreen: number;
}

const inputtext = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8');
let splitstring = inputtext.split(/\r?\n/)

let games:Game[] = []
splitstring.forEach(element => {
    let gameElement = element.split(":")
    let id = +gameElement[0].split(" ")[1]
    let possible = true
    let rounds = gameElement[1].split(";")
    let green = 0
    let red = 0
    let blue = 0
    rounds.forEach(round => {
        let dies = round.split(",")
        
        dies.forEach(die => {
            let duh :string[] = die.split(" ")
            if(duh[2].includes("blue")){
                if(+duh[1]>14){
                    possible = false
                }
                if(+duh[1]>blue){
                    blue = +duh[1]
                }
                
            }
            if(duh[2].includes("red")){
                if(+duh[1]>12){
                    possible = false
                }
                if(+duh[1]>red){
                    red = +duh[1]
                }
            }
            if(duh[2].includes("green")){
                if(+duh[1]>13){
                    possible = false
                }
                if(+duh[1]>green){
                    green = +duh[1]
                }
            }
        })
    })
    games.push(
        {
            Id: id,
            Possible: possible,
            MinBlue: blue,
            MinRed: red,
            MinGreen: green
        }
    )
});
let sumOfPossible = 0
let power = 0
games.forEach(game => {
    if(game.Possible){
        sumOfPossible += game.Id
    }
    power += (game.MinRed*game.MinGreen*game.MinBlue)
    
});

console.log(`Sum of Possible: ${sumOfPossible}`)
console.log(`Power: ${power}`)