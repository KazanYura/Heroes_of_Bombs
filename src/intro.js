let heroes = ["dwarf","elf","mage","warrior"];
let select = 0;
let hero1 = "";
let hero2 = "";
function prepare(){
    let images = document.getElementsByClassName("hero_picture");
    for (let i = 0; i < images.length; i++){
        images[i].src = "images/icons/"+heroes[i]+".jpg";
        images[i].alt = heroes[i];
        images[i].onclick = function () {
            switch (select){
                case 0:
                document.getElementById("player_1").style.visibility = "visible";
                document.getElementById("player_1").src = images[i].src;
                select += 1;
                hero1 = images[i].alt;
                document.getElementById("name_1").innerText = images[i].alt[0].toUpperCase() + images[i].alt.slice(1,images[i].alt.length);
                document.getElementById("ability_1").src = "images/icons/"+heroes[i]+"_skill.png";
                document.getElementById("ability_1").style.visibility="visible";
                break;
            case 1:
                document.getElementById("player_2").style.visibility = "visible";
                document.getElementById("player_2").src = images[i].src;
                select += 1;
                hero2 = images[i].alt;
                document.getElementById("name_2").innerText = images[i].alt[0].toUpperCase() + images[i].alt.slice(1,images[i].alt.length);
                document.getElementById("ability_2").src = "images/icons/"+heroes[i]+"_skill.png";
                document.getElementById("ability_2").style.visibility="visible";
                break;
            }
            if (hero1 && hero2){
                window.location.href = "game_main.html?"+hero1 + "?" + hero2;
            }
        };
    }

}