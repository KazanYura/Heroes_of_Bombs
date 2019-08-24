function print_champion() {
    let url = document.URL;
    let i = url.split("?")[1];
    console.log(i);
    document.getElementById("victory_message").innerHTML = "Victory to "+i+"  player";
}
