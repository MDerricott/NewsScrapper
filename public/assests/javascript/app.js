
// if(text && href && blurb && byline)

$.getJSON("/api/washingtonpost/scrape", function(data) {
    console.log(data)
    
    for(var i = 0; i < data.length; i++) {
        if(data[i].headline && data[i].href && data[i].blurb && data[i].byline && data[i].href){
            console.log(data[i]);
            $(".articles").append(`
            <h4> <a href=${data[i].href}> ${data[i].headline}</a> </h4>
            <p> ${data[i].blurb} </p>
            <p> ${data[i].byline} </p>
            <button type="button" class="btn btn-dark"> Save Article </button>
            <br>
            <br>
            `)
         }
    }
});