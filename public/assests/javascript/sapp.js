



// if(text && href && blurb && byline)

$.getJSON("/api/articles", function (data) {
    // console.log(data)
    let count = 0;

    const counter = data.map(function (data) {
       
        $(".saved-articles")
            .append(`
           <h4 class="headline" data-id="${data._id}">
        <a class="link" href=${data.articleURL}> ${data.title}</a>
    </h4>
    <p class="blurb"> ${data.blurb} </p>
    <p class="byline"> ${data.byline} </p>
    
    <p>
        <button class="btn btn-primary noter" type="button" data-toggle="collapse" data-target="#collapseExample-${data._id}"
            aria-expanded="false" aria-controls="collapseExample-${data._id}" data-id="${data._id}">
            Add a Note
        </button>
    </p>
    <div class="collapse" id="collapseExample-${data._id}">
        <div class="card card-body">
            <div class="input-group mb-3">
                <input type="text" class="form-control note-body" data-id="${data._id}" placeholder="Enter Your Note"
                    aria-label="Recipient's username" aria-describedby="button-addon2">

                <div class="input-group-append">
                    <button class="btn btn-outline-secondary add-note" data-id="${data._id}" type="button">Add  Note</button>
                </div>
            </div>
            


        </div>

    </div> `)
    });
   
    
const noteGenrator = data.reduce(function (data, notes) {
    if(notes in data){
        console.log(notes.notes[data[notes].noteBody])
       
        data[notes]++
      

    }
    else{
        data[notes] = 1
    }
    // onsole.log(notes)
   return data
    // console.log(notes.notes[0].noteBody)
       

    // $(".saved-articles").append(` <div class = "notes-here"> ${data.note} </div>`)

});



           
          
    })

    // for (var i = 0; i < data.length; i++) {

    //     if (data[i].headline && data[i].href && data[i].blurb && data[i].byline && data[i].href) {
    //         // console.log(data[i]);
    //         count++;
    //         var articleData = {
    //             headline: data[i].headline,
    //             href: data[i].href,
    //             blurb: data[i].blurb,
    //             byline: data[i].byline
    //         }

    //         $(".articles").append(`
    //         <h4 class="headline" data-id="${count}"> <a class="link" data-id="${count}" href=${articleData.href}> ${articleData.headline}</a> </h4>
    //         <p class="blurb" data-id="${count}"> ${articleData.blurb} </p>
    //         <p class="byline" data-id="${count}"> ${articleData.byline} </p>
    //         <button type="button" data-id="${count}" class="save-button btn btn-dark"> Save Article </button>
    //         <br>
    //         <br>
    //         `)
    //     }
    // }

// const names = princesses.map(function(princess) {
//     return princess.name;
//   });
// console.log("cl")
// $.getJSON("/saved-articles", function (data) {
//     let count = 0;
//     console.log(data)
// //     const articleData = data.map(function(data){
// //         console.log(data.title)
// //     })

// //   articleData(); 
// })



// $(document).on("click", ".save-button", function () {
//     var articleId = $(this).attr("data-id");
//     // console.log(articleId);

//     var newArticle = {
//         title: $("h4.headline").attr("data-id", articleId)[articleId - 1].innerText,
//         articleUrl: $("a.link").attr("data-id", articleId)[articleId - 1].href,
//         blurb: $("p.blurb").attr("data-id", articleId)[articleId - 1].innerText,
//         byline: $("p.byline").attr("data-id", articleId)[articleId - 1].innerText,
//     }

//     $.ajax({
//         method: "POST",
//         url: "/api/article/save",
//         data: newArticle
//     })
//         .then(function (data) {
//             // console.log(data)
//             // console.log("New Article added")
//         })
// });


// //Get Notes 
$(document).on("click", ".noter", function (event) {


    var articleId = $(this).attr("data-id");
    console.log(articleId)
    $.ajax({
        method: "GET",
        url: "/api/articles/notes/" + articleId
    })
        .then(function (data) {
            console.log("bringin back data " + data)
            for (var i = 0; i < data.notes.length; i++) {
                const noteBody = data.notes[i].noteBody;
                const noteId = data.notes[i]._id;
                console.log(noteBody);
             
                $(".notes_here"+ i).append(`<div><p> ${noteBody} <button type="button" data-id=${noteId}">  X </button></p></div>`)
            }
        })
})

$(document).on("click", ".add-note", function (event) {

    var articleId = $(this).attr("data-id");
    var bodyText = $(this).closest(".input-group").find(".note-body").val()
    console.log(articleId)
    console.log("notes " + bodyText)

    $.ajax({
        method: "POST",
        url: "/api/new-note/" + articleId,
        data: {
            noteBody: bodyText
        }
    })
        .then(function (data) {
            console.log("data" + data)


        });


})