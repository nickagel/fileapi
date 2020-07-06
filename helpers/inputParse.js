/*
    takes text input & exclude words string and converts to array 
 */
var async = require("async")
function inputParse(textInput, excludedWordsInput, callback){
    async.parallel({
        textArray: function(done) {
            inputToArray(textInput, function(err, textArray){
                done(err, textArray)
            })
        },
        excludedWordsArray: function(done) {
            inputToArray(excludedWordsInput, function(err, excludedWordsArray){
                done(err, excludedWordsArray)
            })
        }
    },
    function(err, results) {
        callback(err, results.textArray, results.excludedWordsArray)
    });
}

function inputToArray(input, callback){
    var array = []
    var err = null
    try{
        var sanitizedInput = input.replace(/[^a-zA-Z0-9- ']/g, '').toLowerCase() //only accept certain character input
        array = sanitizedInput.split(" ") //to array
    }catch(err){
       err = this.err
    }finally{
        callback(err, array)
    }
}

module.exports = inputParse