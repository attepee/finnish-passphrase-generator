 var wordlist = null;

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
    var randCap = document.getElementById("randCap").checked
    var cap = document.getElementById("cap").checked

    for (var i = 0; i < wordCount; i++) {
        if (i < wordCount-1) {
            if (cap == true)
                pass += capitalize(getWord() + wordSeparator);
            else
                pass += getWord() + wordSeparator;
        }
        else {
            if (cap == true)
                pass += capitalize(getWord());
            else
                pass += getWord();
        }
    }

    if (randCap == true)
        pass = randomCapitalize(pass);

    document.getElementById("passphrase").innerHTML = pass;
}

function getWord() {
    return wordlist[getRandom(0, 94109)].childNodes[0].nodeValue
}

function getRandom(min, max) {
    return Math.floor((Math.random() * max) + min);
}

function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function randomCapitalize(str) {
    var capStr = str.split("").map(function(c) {
        return c[Math.round(Math.random())?"toUpperCase":"toLowerCase"]();
    }).join("");
    return capStr;
}