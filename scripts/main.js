window.wordlist = null;

function loadXMLDoc() {
    var xmlHttpReq = new XMLHttpRequest();
    
    xmlHttpReq.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            generatePassPhrase(this);
        }
    };
    xmlHttpReq.open("GET", "wordlist/kotus-sanalista_v1.xml", true);
    xmlHttpReq.send();
}
  
function generatePassPhrase(xmlRes) {
    var xml = xmlRes.responseXML;
    var pass = "";
    var wordCount = document.getElementById("wordCount").value;
    var wordSeparator = document.getElementById("wordSeparator").value;

    window.wordlist = xml.getElementsByTagName("s");

    for (var i = 0; i < wordCount; i++) {
        if (i < wordCount-1)
            pass += window.wordlist[getRandom()].childNodes[0].nodeValue + wordSeparator;
        else
            pass += window.wordlist[getRandom()].childNodes[0].nodeValue;
    }
    document.getElementById("passphrase").innerHTML = pass;
}

function getRandom() {
    return Math.floor((Math.random() * 94109) + 0);
}