class BasicHero{

    constructor(id,name,keys){
        this.id = id;
        this.keys = keys;
        this.bomb_power = 1;
        this.name = name;
        this.bomb_limit = 3;
        this.bomb_placed = 0;
        this.direction = this.keys[3];
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
        let movers = this.keys.slice(0,4);
        if (movers.includes(button)){
            this.direction = button;
        }
        switch (button) {
            case this.keys[0]:
                if (game_field[coords[0]][coords[1]+1].className === "") {
                    game_field[coords[0]][coords[1] + 1].className = this.name;

                    if (game_field[coords[0]][coords[1]].className === "bomb")
                    game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[1] += 1;
                }
                break;
            case this.keys[1]:
                if (game_field[coords[0]][coords[1] - 1].className ==="") {
                    game_field[coords[0]][coords[1] - 1].className = this.name;
                    if (game_field[coords[0]][coords[1]].className === "bomb")
                        game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[1] -= 1;
                }
                break;
            case this.keys[2]:
                if (game_field[coords[0]-1][coords[1]].className === "") {
                    game_field[coords[0] - 1][coords[1]].className = this.name;
                    if (game_field[coords[0]][coords[1]].className === "bomb")
                        game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[0] -= 1;
                }
                break;
            case this.keys[3]:
                if (game_field[coords[0]+1][coords[1]].className === "") {
                    game_field[coords[0] + 1][coords[1]].className = this.name;
                    if (game_field[coords[0]][coords[1]].className === "bomb")
                        game_field[coords[0]][coords[1]].className = "bomb";
                    else
                        game_field[coords[0]][coords[1]].className = "";
                    coords[0] += 1;
                }
                break;
            case this.keys[4]:
                if ((this.bomb_placed < this.bomb_limit) && (game_field[coords[0]][coords[1]].className !== "bomb")){
                    game_field[coords[0]][coords[1]].className = "bomb";
                    let bomb = new Bomb(coords[0],coords[1],this.bomb_power);
                    setTimeout(function (){bomb.detonate()},2000);
                    this.bomb_placed += 1;
                    let hero = this;
                    setTimeout(function (){hero.bomb_placed -= 1},2500);
                }
                break;
            case this.keys[5]:
                this.ultimate();

        }
        this.setPosition(coords);
    }
ultimate(){

}
}
class Bomb {
    constructor(x,y,bomb_power){
        this.bomb_x = x;
        this.bomb_y = y;
        this.bomb_power = bomb_power;
    }
    detonate(){
        game_field[this.bomb_x][this.bomb_y].className = "";
        for (let j = 0; j < hero_list.length; j++){
            let coords = hero_list[j].getPosition();
            if ((coords[0] === this.bomb_x) &&(coords[1] === this.bomb_y)) {
                player_clean(j);
            }
        }
        for (let i = -this.bomb_power; i <= this.bomb_power; i++) {
            switch (game_field[this.bomb_x - i][this.bomb_y].className){
                case "":
                    game_field[this.bomb_x - i][this.bomb_y].className = "explosion";
                    break;
                case "warrior_rage":
                    for (let j = 0; j < hero_list.length; j++){
                        let coords = hero_list[j].getPosition();
                        if ((coords[0] === this.bomb_x-i) &&(coords[1] === this.bomb_y) && (!hero_list[j].invincible)) {
                            player_clean(j);
                            game_field[this.bomb_x-i][this.bomb_y].className = "";
                        }
                    }

                    break;
                case "warrior":
                case "mage":
                case "knight":
                case "elf":
                case "dwarf":
                    for (let j = 0; j < hero_list.length; j++){
                        let coords = hero_list[j].getPosition();
                        if ((coords[0] === this.bomb_x-i) &&(coords[1] === this.bomb_y)) {
                            player_clean(j);
                        }
                    }
                    game_field[this.bomb_x-i][this.bomb_y].className = "";
                    break;

                case "block":
                    game_field[this.bomb_x - i][this.bomb_y].className = "";
                    break;
            }

            switch (game_field[this.bomb_x][this.bomb_y-i].className){
                case "":
                    game_field[this.bomb_x][this.bomb_y-i].className = "explosion";
                    break;
                case "warrior_rage":
                    for (let j = 0; j < hero_list.length; j++){
                        let coords = hero_list[j].getPosition();
                        if ((coords[0] === this.bomb_x) && (coords[1] === this.bomb_y-i) && (!hero_list[j].invincible)) {
                            player_clean(j);
                            game_field[this.bomb_x][this.bomb_y-i].className = "";
                        }

                    }
                    break;
                case "mage":
                case "warrior":
                case "knight":
                case "elf":
                case "dwarf":
                    for (let j = 0; j < hero_list.length; j++){
                        let coords = hero_list[j].getPosition();
                        console.log(this.bomb_x,this.bomb_y-i);
                        if ((coords[0] === this.bomb_x) && (coords[1] === this.bomb_y-i)) {
                            player_clean(j);
                        }
                    }
                    game_field[this.bomb_x][this.bomb_y-i].className = "";
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
    }
}
class Warrior extends BasicHero{
    constructor(id,keys){
        super(id,"warrior",keys);
        this.invincible = false;
        this.ultimate_ready = true;
    }

    ultimate() {
        if (this.ultimate_ready) {
            this.invincible = true;
            this.name = "warrior_rage";
            game_field[this.x][this.y].className = "warrior_rage";
            let hero = this;
            this.ultimate_ready = false;
            setTimeout(function () {
                hero.invincible = false;
                hero.name = "warrior";
                game_field[hero.x][hero.y].className = "warrior";
            }, 4000);
            setTimeout(function () {
                hero.ultimate_ready = true
            }, 10000);
            print_cooldown(10,this.id);
        }
    }
}
class Mage extends BasicHero {
    constructor(id,keys){
        super(id,"mage",keys);
        this.ultimate_ready = true;
    }
    ultimate(){
        if (this.ultimate_ready) {
            let hero = this;
            let used = false;
            switch (this.direction) {
                case this.keys[0]:
                    if (game_field[this.x][this.y + 1].className === "") {
                        game_field[this.x][this.y + 1].className = "block";
                        used = true;
                    }
                    break;
                case this.keys[1]:
                    if (game_field[this.x][this.y - 1].className === "") {
                        game_field[this.x][this.y - 1].className = "block";
                        used = true;
                    }
                    break;
                case this.keys[2]:
                    if (game_field[this.x - 1][this.y].className === "") {
                        game_field[this.x - 1][this.y].className = "block";
                        used = true;
                    }
                    break;
                case this.keys[3]:
                    if (game_field[this.x + 1][this.y].className === "") {
                        game_field[this.x + 1][this.y].className = "block";

                        used = true;
                    }
                    break;
            }
            if (used) {
                this.ultimate_ready = false;
                setTimeout(function () {
                    hero.ultimate_ready = true
                }, 10000);
                print_cooldown(10, this.id);
            }
        }
    }
}
class Dwarf extends BasicHero {
    constructor(id,keys){
        super(id,"dwarf",keys);
        this.ultimate_ready = true;
    }
    ultimate() {
        if (this.ultimate_ready) {
            let hero = this;
            let used = false;
            switch (this.direction) {
                case this.keys[0]:
                    if (game_field[this.x][this.y + 1].className === "block") {
                        game_field[this.x][this.y + 1].className = "";
                        used = true;
                    }
                    break;
                case this.keys[1]:
                    if (game_field[this.x][this.y - 1].className === "block") {
                        game_field[this.x][this.y - 1].className = "";
                        used = true;
                    }
                    break;
                case this.keys[2]:
                    if (game_field[this.x - 1][this.y].className === "block") {
                        game_field[this.x - 1][this.y].className = "";
                        used = true;
                    }
                    break;
                case this.keys[3]:
                    if (game_field[this.x + 1][this.y].className === "block") {
                        game_field[this.x + 1][this.y].className = "";
                        used = true;
                    }
                    break;
            }
            if (used) {
                this.ultimate_ready = false;
                setTimeout(function () {
                    hero.ultimate_ready = true
                }, 10000);
                print_cooldown(10,this.id);
            }
        }
    }
}
class Elf extends BasicHero {
        constructor(id,keys){
            super(id,"elf",keys);
            this.ultimate_ready = true;
    }
    ultimate() {
        if (this.ultimate_ready) {
            let hero = this;
            let used = false;
            switch (this.direction) {
                case this.keys[0]:
                    new Arrow(this.x,this.y,0,1,"right").fly();
                    used = true;
                    break;
                case this.keys[1]:
                    new Arrow(this.x,this.y,0,-1,"left").fly();
                    used = true;
                    break;
                case this.keys[2]:
                    new Arrow(this.x,this.y,-1,0,"up").fly();
                    used = true;
                    break;
                case this.keys[3]:
                    new Arrow(this.x,this.y,1,0,"down").fly();
                    used = true;
                    break;
            }
            if (used) {
                this.ultimate_ready = false;
                setTimeout(function () {
                    hero.ultimate_ready = true
                }, 10000);
                print_cooldown(10, this.id);
            }
        }
    }

}
class Arrow{
    constructor(x,y,speed_x,speed_y,direction){
        this.x = x;
        this.y = y;
        this.x_speed = speed_x;
        this.y_speed = speed_y;
        if ((direction === "down") || (direction === "up"))
            this.name = "arrow_ver";
        else
            this.name = "arrow_hor";
    }
    fly(){
        if (game_field[this.x][this.y].className !== "block") {
            switch (game_field[this.x + this.x_speed][this.y + this.y_speed].className) {
                case "":
                    game_field[this.x + this.x_speed][this.y + this.y_speed].className = this.name;
                    if (game_field[this.x][this.y].className === this.name) {
                        game_field[this.x][this.y].className = "";
                    }
                    let arrow = this;
                    this.x += this.x_speed;
                    this.y += this.y_speed;
                    setTimeout(function () {
                        arrow.fly()
                    }, 100);
                    break;
                case "warrior":
                case "mage":
                case "elf":
                case "dwarf":
                case "warrior_rage":
                case "knight":
                    for (let j = 0; j < hero_list.length; j++) {
                        let coords = hero_list[j].getPosition();
                        if ((coords[0] === this.x + this.x_speed) && (coords[1] === this.y + this.y_speed)) {
                            player_clean(j);
                        }
                    }

                    if (game_field[this.x][this.y].className === this.name) {
                        game_field[this.x][this.y].className = "";
                    }
                    game_field[this.x + this.x_speed][this.y + this.y_speed].className = "";
                    break;
                case "block":

                    if (game_field[this.x][this.y].className === this.name) {
                        game_field[this.x][this.y].className = "";
                    }
                    game_field[this.x+this.x_speed][this.y+this.y_speed].className = "";
                    break;
                case "wall":

                    if (game_field[this.x][this.y].className === this.name) {
                        game_field[this.x][this.y].className = "";
                    }
            }
        }
}
}
function player_clean(id){
    hero_list[id].keys = [];
    hero_list.splice(id,1);
    if (hero_list.length === 1){
        window.location.href = "victory.html?"+hero_list[0].id;
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function print_cooldown(times,player_id){
    if (times > 0){
        let cooldown_field = document.getElementById(player_id);
        cooldown_field.innerText = times;
        setTimeout(print_cooldown,1000,times - 1, player_id);
    }
    if (times === 0){
        let cooldown_field = document.getElementById(player_id);
        cooldown_field.innerText = "Ready";
    }
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
                new_block.className = hero.name;
                hero.setPosition([i,j]);
            }
            else if ((j===21) && (i===21)){
                new_block.className = hero_2.name;
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
function prepare_hero(id,hero){
    document.getElementById("name_"+id).innerText = hero.name;
    document.getElementById("ability_"+id).src = "images/icons/"+hero.name+"_skill.png";
    document.getElementById("face_" + id).src = "images/icons/"+hero.name+".jpg";
}
let field = document.getElementById("field");
let game_field = [];
let hero_list = [];
let hero = new Warrior(1,["d","a","w","s","j","k"]);
let hero_2 = new Elf(2,["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","l","m"]);
hero_list.push(hero);
hero_list.push(hero_2);
prepare_hero(1,hero);
prepare_hero(2,hero_2);
document.addEventListener("keydown",function () {
    hero.move(event);
});
document.addEventListener("keydown",function () {
    hero_2.move(event);
});