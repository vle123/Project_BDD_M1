
    obj = document.getElementsByClassName('resultat');
    html = document.getElementsByTagName('html')[0];
    nav = document.getElementsByTagName('nav')[0];
    objet = document.getElementsByClassName('objet');
    console.log(obj[0].offsetHeight+" "+obj[0].offsetWidth);

    var w = obj[0].offsetWidth;
    var h = html.offsetHeight-nav.offsetHeight;
    var W = parseInt(w/135);
    var H = parseInt(h/135)-1;
    var nb = H*W;
    console.log(H+" "+W);
    compt = nb-objet.length;
    console.log(compt);
    for (let i = 0; i < compt; i++) {
        var node = document.createElement("span");
        node.className = "objet";
        var n = objet[getRandomInt(objet.length)];
        document.getElementsByClassName('resultat')[0].insertBefore(node,n);
        
    }
    
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}