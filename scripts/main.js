var wordlist = null;
var hasSymbol = false;
var forceSymbol = false;
var hasNumber = false;
var forceNumber = false;

function main() {
    if (wordlist != null)
        generatePassPhrase();
    else
        loadXMLDoc();
}

function loadXMLDoc() {
    var xmlHttpReq = new XMLHttpRequest();
    
    xmlHttpReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var xml = this.responseXML;
            wordlist = xml.getElementsByTagName("s");

            generatePassPhrase();
        }
    };
    xmlHttpReq.open("GET", "wordlist/kotus-sanalista_v1.xml", true);
    xmlHttpReq.send();
}
  
function generatePassPhrase() {
    var pass = "";
    var wordCount = document.getElementById("wordCount").value;
    var wordSeparator = document.getElementById("wordSeparator").value;
    var randCap = document.getElementById("randCap").checked;
    var cap = document.getElementById("cap").checked;
    var sym = document.getElementById("sym").checked;
    var num = document.getElementById("num").checked;
    hasSymbol = false;
    forceSymbol = false;
    hasNumber = false;
    forceNumber = false;

    for (var i = 0; i < wordCount; i++) {
        if (i+1 == wordCount && !hasSymbol)
            forceSymbol = true;
        else if (i+1 == wordCount && !hasNumber)
            forceNumber = true; 
        if (cap)
            pass += capitalize(getWord(sym, num));
        else if (randCap)
            pass += randomCapitalize(getWord(sym, num));
        else
            pass += getWord(sym, num);
        if (i < wordCount-1)
            pass += wordSeparator;
    }

    document.getElementById("passphrase").innerHTML = pass;
}

function getWord(sym, num) {
    var str = wordlist[getRandom(0, 94109)].childNodes[0].nodeValue;
    var r = Math.round(Math.random());

    if (sym && !hasSymbol && r || sym && forceSymbol) {
        hasSymbol = true;
        str = addSymbol(str);
    }

    r = Math.round(Math.random());

    if (num && !hasNumber && r || num && forceNumber) {
        hasNumber = true;
        str = addNumber(str);
    }
    else
        return str;

    return str;
}

function getRandom(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function randomCapitalize(str) {
    var capStr = str.split("").map(function(c) {
        return c[Math.round(Math.random())?"toUpperCase":"toLowerCase"]();
    }).join("");

    return capStr;
}

function addSymbol(str) {
    var sym = "!#%&?@";
    return str += sym[getRandom(0, sym.length)];
}

function addNumber(str) {
    return str += getRandom(0, 9);
}