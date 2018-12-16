// if(text && href && blurb && byline)
const start = function () {
    $.getJSON("/api/articles", function (data) {
        // console.log(data)
        let count = 0;

        const counter = data.map(function (data) {
            count++

            $(".saved-articles")
                .append(`<row>
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
        
    </div> 
   <br>
  <strong>Notes for this Article</strong>
   
    <div class="notes${count} p-2"> 
            
    </div>
    <row>
    <br>
    <br>`)

        });
        renderNotes()
    
    
    });

};

start()

const renderNotes = function () {

    $(".notesClass").empty();
    $.getJSON("/api/articles", function (data) {

        var newnotes = [];
        // console.log(data[0].notes[0].noteBody)
        for (var i = 0; i < data.length; i++) {

            for (var j = 0; j < data[i].notes.length; j++) {


                $(".notes" + (1 + i)).prepend(`
              
            
                    <div class="row p-3 delete${data[i].notes[j]._id} notesClass shadow-sm p-3 bg-white rounded">
                       <div class="col-sm">
                            <span class="strong">${data[i].notes[j].noteBody} </span>
                        </div>
                        <div class="col-sm">
                           <button type="button" class="removal-button float-right" data-id="${data[i].notes[j]._id}">  X </button> 
                        </div>   
                    </div>
                    <br>
            
            `)
                newnotes.push(data[i].notes[j].noteBody)

            }
            //    $(".notes"+i + 1).append(`<div><p> ${newnotes} <button type="button" data-id=${data[i].notes}">  X </button></p></div>`)

        }
    
    });

};


        // //Get Notes 
        $(document).on("click", ".noter", function (event) {


            var articleId = $(this).attr("data-id");
            console.log(articleId)
            $.ajax({
                    method: "GET",
                    url: "/api/articles/notes/" + articleId
                })
                .then(function (data) {

                    // for (var i = 0; i < data.notes.length; i++) {
                    //     const noteBody = data.notes[i].noteBody;
                    //     const noteId = data.notes[i]._id;
                    //     console.log(noteBody);

                    //     $(".notes_here"+ i).append(`<div><p> ${noteBody} <button type="button" data-id=${noteId}">  X </button></p></div>`)
                    // }
                })
        })


        //Add a Note
        $(document).on("click", ".add-note", function (event) {

            var articleId = $(this).attr("data-id");
            var bodyText = $(this).closest(".input-group").find(".note-body").val().trim()
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
                    console.log(data)

                })
            $(this).closest(".input-group").find(".note-body").val(" ")

            renderNotes();

        })

        $(document).on("click", ".removal-button", function (event) {

            var noteId = $(this).attr("data-id");
            console.log(noteId);

            $.ajax({
                    method: "DELETE",
                    url: "/api/delete/" + noteId,
                })
                .then(function (data) {
                    console.log("data" + data)

                });
            console.log("remove");

            $(".delete" + noteId).remove();
        });