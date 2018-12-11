
// if(text && href && blurb && byline)

$.getJSON("/api/washingtonpost/scrape", function(data) {
    console.log(data)
    var count = 0;
    for(var i = 0; i < data.length; i++) {
       
        if(data[i].headline && data[i].href && data[i].blurb && data[i].byline && data[i].href){
            console.log(data[i]);
            count ++;
            var articleData = {
                headline: data[i].headline,
                href: data[i].href,
                blurb: data[i].blurb,
                byline: data[i].byline
            }
        
            $(".articles").append(`
            <h4 class="headline" data-id="${count}"> <a class="link" data-id="${count}" href=${articleData.href}> ${articleData.headline}</a> </h4>
            <p class="blurb" data-id="${count}"> ${articleData.blurb} </p>
            <p class="byline" data-id="${count}"> ${articleData.byline} </p>
            <button type="button" data-id="${count}" class="save-button btn btn-dark"> Save Article </button>
            <br>
            <br>
            `)
         }
    }
    
});



$(document).on("click", ".save-button", function(){
    var articleId = $(this).attr("data-id")
    console.log(articleId)

    var newArticle = {
    title: $("h4.headline").attr("data-id", articleId)[articleId-1].innerText,
    articleUrl: $("a.link").attr("data-id", articleId)[articleId-1].href,
    blurb: $("p.blurb").attr("data-id",articleId)[articleId-1].innerText,
    byline: $("p.byline").attr("data-id",articleId)[articleId-1].innerText,
    }

    console.log(newArticle.articleUrl);


$.ajax({
    method: "POST",
    url: "/api/article/save",
    data: newArticle
})
.then(function(data){
    console.log(data)
    console.log("New Article added")
})

});

