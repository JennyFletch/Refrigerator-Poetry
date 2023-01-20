// API INFO
const datamuseBaseUrl = "https://api.datamuse.com/words";

// datamuse samples 

// Nouns meaning pants, max of 10
// https://api.datamuse.com/words?mdp=n&ml=pants&max=10 

// Nouns about pants, max of 10
// https://api.datamuse.com/words?mdp=n&rel_trg=pants&max=10

// Nouns that rhyme with pants, max of 10
// https://api.datamuse.com/words?mdp=n&rel_rhy=pants&max=10


// GLOBAL VARIABLES
var staticFragmentsEl = document.getElementById("static-fragments");
var staticWordsEl = document.getElementById("static-words");
var findWordsBtnEl = document.getElementById("find-words-btn");
var wordsDynamicEl = document.getElementById("word-list-dynamic");
const wordsToRequest = 42;


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
        
        const fwPos = "u"; // document.getElementById("words-pos").value; 
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
                for(var i=0; i < wordsToRequest; i++) {
                    
                        var newDynamicWord = document.createElement("div");
                        newDynamicWord.className = "magnet";
                        newDynamicWord.innerHTML = data[i].word;
                        wordsDynamicEl.appendChild(newDynamicWord);
                }
            }
        });

    } else {
        alert("Please include a subject and try your search again.");
    }
});