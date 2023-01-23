// API INFO
const datamuseBaseUrl = "https://api.datamuse.com/words";

// GLOBAL VARIABLES
var staticFragmentsEl = document.getElementById("static-fragments");
var staticWordsEl = document.getElementById("static-words");
var findWordsBtnEl = document.getElementById("find-words-btn");
var wordsDynamicEl = document.getElementById("word-list-dynamic");
var poemContainerEl = document.getElementById("poem-container");
const wordsToRequest = 42;
var lineBreakTracker = 0;


function loadStaticWords() {

    for(var i=0; i < staticFragments.length; i++) {
        var newStaticFragment = document.createElement("div");
        newStaticFragment.className = "magnet";
        newStaticFragment.innerHTML = staticFragments[i];
        staticFragmentsEl.appendChild(newStaticFragment);
    }

    for(var i=0; i < staticWords.length; i++) {
        var newStaticWord = document.createElement("div");
        newStaticWord.className = "magnet";
        newStaticWord.innerHTML = staticWords[i];
        staticWordsEl.appendChild(newStaticWord);
    }
}

loadStaticWords();


findWordsBtnEl.addEventListener("click", function(e) {
    e.preventDefault();

    if(document.getElementById("words-subject").value) {

        while (wordsDynamicEl.firstChild) {
            wordsDynamicEl.removeChild(wordsDynamicEl.firstChild);
        }
        
        const fwPos = "u"; // document.getElementById("words-pos").value; <-- pos feature not reliable in API
        const fwBeh = document.getElementById("words-behavior").value;
        const fwSub = document.getElementById("words-subject").value;

        const requestUrl = `${datamuseBaseUrl}?mdp=${fwPos}&${fwBeh}=${fwSub}&max=${wordsToRequest}`;

        fetch(requestUrl) 
        .then(function (response) {
            // Check for response from datamuse request
            if(response.status === 200) {
            return response.json();
            } else { 
                console.log("Error receiving data: " + response.status);
            }
        })
        .then(function (data) {

            if(!data[0]) {
                alert("No words matched your search. Please try something else.");
            } else {

                data.forEach(obj => {
                    var newDynamicWord = document.createElement("div");
                    newDynamicWord.className = "magnet";
                    newDynamicWord.innerHTML = obj.word;
                    wordsDynamicEl.appendChild(newDynamicWord);
                });
            }
        });

    } else {
        alert("Please include a subject and try your search again.");
    }
});

function moveMagnet(e) {
    e.stopPropagation();
    var wordSelection = e.target.innerHTML;

    if(e.target.classList.contains("magnet")) {
        
        if(poemContainerEl.classList.contains("empty")) {
            poemContainerEl.classList.remove("empty");
            poemContainerEl.innerHTML = '';
        }
        if(wordSelection === "LINEBREAK") {
            lineBreakTracker++;
            var lineBreakIcon = document.createElement("span");
            lineBreakIcon.innerHTML = "X";
            lineBreakIcon.className = "lineBR";
            lineBreakIcon.setAttribute("data-id", lineBreakTracker);
            poemContainerEl.appendChild(lineBreakIcon);
            var lineBreak = document.createElement("br");
            lineBreak.setAttribute("data-id", lineBreakTracker);
            poemContainerEl.appendChild(lineBreak);
        } else {
            var poemWord = document.createElement("span");
            poemWord.className = "magnet";
            poemWord.innerHTML = wordSelection;
            poemContainerEl.appendChild(poemWord);
        }
    }
}


// listen for magnet clicks 
var magnetPanel1 = document.querySelector('#word-list-static');
if(magnetPanel1) {
    magnetPanel1.addEventListener('click', moveMagnet);
}
var magnetPanel2 = document.querySelector('#word-list-dynamic');
if(magnetPanel2) {
    magnetPanel2.addEventListener('click', moveMagnet);
}