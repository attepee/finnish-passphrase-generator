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

    for (var i = 0; i < wordCount; i++) {
        if (i < wordCount-1)
            pass += wordlist[getRandom()].childNodes[0].nodeValue + wordSeparator;
        else
            pass += wordlist[getRandom()].childNodes[0].nodeValue;
    }
    document.getElementById("passphrase").innerHTML = pass;
}

function getRandom() {
    return Math.floor((Math.random() * 94109) + 0);
}