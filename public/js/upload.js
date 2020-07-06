$('#submit').click(function(e) {
    e.preventDefault()
    var error = ""
    var file = $("#upload-input").get(0).files
    var exclude = $("#exclude").val()
    var spellcheck = $("#spellcheck").is(':checked')
    var postUrl = "/upload"

    if (file.length != 1) {//only allow one file to be uploaded
        error = "Please input only 1 file"
    } else if (file[0].size > 10000000) {//only allow a file with 10mb or less
        error = "file must be less than 10mb"
    } else if (file[0].name.slice(-3) != "txt") {//only allow txt files
        error = "file must be a .txt based file"
    } else if (file.length == 1) {//if only one file is inputed post it
        if (spellcheck) postUrl += "/spellcheck"
        var formData = new FormData()
        formData.append('excludeWordsString', exclude)
        formData.append('upload', file[0], file[0].name)

        $.ajax({
            url: postUrl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                var wordCounts = []
                var misspelledWords = []
                var excludedWords = []

                wordCounts.push('<tr id="word-header"><td>Total Words In File</td><td>' + data.totalWordCount + '</td></tr>') //creates html with word counts
                $.each(data.countedWordsArray, function(word, wordCount) {

                    wordCounts.push('<tr><td>' + word + '</td><td>' + wordCount + '</td></tr>')

                })

                if (data.misspelledWords.length > 0) { // creates html with misspelled words if any
                    misspelledWords.push('<li class="list-group-item list-group-item-danger">Misspelled Words</li>')
                    $.each(data.misspelledWords, function(i, word) {
                        misspelledWords.push('<li class="list-group-item">' + word + '</li>')
                    })
                }

                if (data.excludedWordsArray != "") { // create html with excluded words array if any
                    excludedWords.push('<li class="list-group-item list-group-item-info">Excluded Words</li>')
                    $.each(data.excludedWordsArray, function(i, word) {
                        excludedWords.push('<li class="list-group-item">' + word + '</li>')
                    })
                }

                $('#words, #misspelled, #excludedWords').empty()//clear previous values
                $('#words').append(wordCounts.join(''))
                $('#excludedWords').append(excludedWords.join(''))
                $('#misspelled').append(misspelledWords.join(''))
            }
        })

    } else {
        error = "file upload error"
    }

    if (error != "") {//check if error string
        $('#error').append(error).css("padding", "16px")
    } else {
        $('#error').empty().css("padding", "0")
    }
})