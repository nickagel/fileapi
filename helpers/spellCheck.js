/*
    takes words sends post to bing api spellcheck request
    can make n number of requests based on number of words added
    RESTRICTION HANDLED: max request string length 2048 characters
*/
var request = require('request');
var async = require('async')
var config = require('./../config.json')

function spellCheckRequest(url, callback) {
    var options = {}
    options['headers'] = {}
    options['headers']['Ocp-Apim-Subscription-Key'] = config['bing_token']
    options['url'] = url

    request(options, function(error, response, body) {
        misspelledWords = new Array()
        body = JSON.parse(body)
        for (var i = 0; i < body.flaggedTokens.length; ++i) {
          if(body.flaggedTokens[i].type == "UnknownToken"){
            misspelledWords.push(body.flaggedTokens[i].token)
          }
        }

        callback(misspelledWords)
    });
}

function buildUrls(wordsToCheck, callback){
    var requestStrings = []
    var baseUrl = 'https://api.cognitive.microsoft.com/bing/v7.0/spellcheck?text='
    var buildingUrl = baseUrl
    for (var i = 0; i < wordsToCheck.length; ++i) {
        if (wordsToCheck[i].length + buildingUrl.length > 2048) { //CONSTRAINT: url < 2048 characters
            requestStrings.push(buildingUrl)
            buildingUrl = baseUrl
        }
        buildingUrl += "+" + wordsToCheck[i]
    }
    requestStrings.push(buildingUrl)
    callback(requestStrings)
}

function spellCheck(wordsToCheck, callback){
    var misspelledWords = new Array()
    buildUrls(wordsToCheck, function(urlStrings){
        async.forEachOf(urlStrings, function(url, index, callback) {
            spellCheckRequest(url, function(words) {
                misspelledWords = misspelledWords.concat(words)
                callback()
            })
        }, function(err) {
            callback(misspelledWords)
        });
    })
}

module.exports = spellCheck