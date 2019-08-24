class BasicHero{

    constructor(id,keys){
        this.id = id;
        this.keys = keys;
        this.armed = true;
        this.bomb_power = 1;
    }
    getPosition(){
        return [this.x,this.y];
    }
    getId(){
        return this.id;
    }
    setPosition(coords){
        this.x = coords[0];
        this.y = coords[1];
    }
    move(e) {
        let coords = this.getPosition();
        let button = e.key;
        switch (button) {
            case this.keys[0]:
                if (game_field[coords[0]][coords[1]+1].className === "") {
                    game_field[coords[0]][coords[1] + 1].className = "hero";
                    if (game_field[coords[0]][coords[1]].className === "bomb")
                    game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[1] += 1;
                }
                break;
            case this.keys[1]:
                if (game_field[coords[0]][coords[1] - 1].className ==="") {
                    game_field[coords[0]][coords[1] - 1].className = "hero";
                    if (game_field[coords[0]][coords[1]].className === "bomb")
                        game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[1] -= 1;
                }
                break;
            case this.keys[2]:
                if (game_field[coords[0]-1][coords[1]].className === "") {
                    game_field[coords[0] - 1][coords[1]].className = "hero";
                    if (game_field[coords[0]][coords[1]].className === "bomb")
                        game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[0] -= 1;
                }
                break;
            case this.keys[3]:
                if (game_field[coords[0]+1][coords[1]].className === "") {
                    game_field[coords[0] + 1][coords[1]].className = "hero";
                    if (game_field[coords[0]][coords[1]].className === "bomb")
                        game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[0] += 1;
                }
                break;
            case this.keys[4]:
                if (this.armed){
                    game_field[coords[0]][coords[1]].className = "bomb";
                    this.armed = false;
                    this.bomb_x = coords[0];
                    this.bomb_y = coords[1];
                    let that = this;
                    setTimeout(function (){that.detonate()},2000);
                }
        }
        this.setPosition(coords);
    }
    detonate(){
        game_field[this.bomb_x][this.bomb_y].className = "";
        for (let i = -this.bomb_power; i <= this.bomb_power; i++) {
            switch (game_field[this.bomb_x - i][this.bomb_y].className){
                case "":
                    game_field[this.bomb_x - i][this.bomb_y].className = "explosion";
                    break;
                case "hero":
                    player_clean(this.id);
                    game_field[this.bomb_x - i][this.bomb_y].className = "";
                    this.keys= [];
                    break;
                case "block":
                    game_field[this.bomb_x - i][this.bomb_y].className = "";
                    break;
            }

            switch (game_field[this.bomb_x][this.bomb_y-i].className){
                case "":
                    game_field[this.bomb_x][this.bomb_y-i].className = "explosion";
                    break;
                case "hero":
                    player_clean(this.id);
                    game_field[this.bomb_x][this.bomb_y-i].className = "";
                    this.keys= [];
                    break;
                case "block":
                    game_field[this.bomb_x][this.bomb_y-i].className = "";
                    break;
            }
        }

        let that = this;
        setTimeout(function (){that.clean()},500);
}
clean(){
    for (let i = -this.bomb_power; i <= this.bomb_power; i++) {
        if (game_field[this.bomb_x - i][this.bomb_y].className === "explosion")
                game_field[this.bomb_x - i][this.bomb_y].className = "";
        if (game_field[this.bomb_x][this.bomb_y-i].className === "explosion")
            game_field[this.bomb_x][this.bomb_y-i].className = "";
    }
    this.armed = true;
}
}
function player_clean(id){
    for (let i = 0; i < hero_list.length; i++) {
        if (hero_list[i].id === id)
            hero_list.splice(i,1);
    }
    if (hero_list.length === 1){
        window.location.href = "victory.html?"+hero_list[0].id;
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function prepare() {
    for (let i = 0; i<23; i++){
        let new_line = [];
        for (let j = 0; j<23;j++){
            let n = getRandomInt(4);
            let new_block = document.createElement("div");
            if ((j === 0) || (i === 0) || (i === 22) || (j===22) || ((i % 2 === 0) && (j% 2 === 0))){
                new_block.className = "wall";
            }
            else if ((j===1) && (i===1)){
                new_block.className = "hero";
                hero.setPosition([i,j]);
            }
            else if ((j===21) && (i===21)){
                new_block.className = "hero";
                hero_2.setPosition([i,j]);
            }
            else if ((!n) && ((j > 3) || (i > 3))){
                new_block.className = "block";
            }
            new_line.push(new_block);
            field.appendChild(new_block);
        }
        game_field.push(new_line);
    }
}
let field = document.getElementById("field");
let game_field = [];
let hero_list = [];
let hero = new BasicHero(1,["d","a","w","s","k"]);
let hero_2 = new BasicHero(2,["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","l"]);
hero_list.push(hero);
hero_list.push(hero_2);
document.addEventListener("keydown",function () {
    hero.move(event);
});
document.addEventListener("keydown",function () {
    hero_2.move(event);
});