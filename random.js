if(window.location.pathname.endsWith("viewRuns.html")){
}

// function displayQuote(data1) {
//     const quoteBody = document.createElement('h2')

//     // Set the text of the h2 element to the fetched quote
//     quoteBody.textContent = `"${data1[0].q}" - ${data1[0].a}`;

//     // Append the h2 element to the body of the document
//     document.body.appendChild(quoteBody);
// }


// MOTIVATIONAL QUOTES PAGE
if (window.location.pathname.endsWith("quotes.html")) {
    const generateQuoteButton = document.getElementById("generateQuoteButton");

    // funtion to load random quotes from json file
    generateQuoteButton.onclick = async function() {
        
        fetch("quotes.json").then(response => {
            return response.json();
        }).then(data => {
            displayQuote(data);
        }).catch(err => {
            console.log("Error")
        })
        
    };

    function displayQuote(data){
        // generate a random number

        // create a new html tag 

        // display new quote in html
    }

}


<div id="newRunModal" class="modal">
<div class="modal-content">
    <span id="closeNewRunModal">&times;</span>
    <h2>Modal Title</h2>
    <p>This is a simple modal example.</p>
</div>
</div>