var router = require('express').Router()
var async = require('async')
var http = require('request')
var upload = require('./../helpers/fileUpload')
var inputParse = require('./../helpers/inputParse')
var countEachArrayItem = require('./../helpers/countEachArrayItem')
var spellCheck = require('./../helpers/spellCheck')

router.post('/', function(req, res) {
    async.waterfall([
        function(callback) {
            upload(req, function(text, excludeWordsString) {
                callback(null, text, excludeWordsString);
            })
        },
        function(text, excludeWordsString, callback) {
            inputParse(text, excludeWordsString, function(err, textArray, excludedWordsArray) {
                callback(null, textArray, excludedWordsArray);
            })
        },
        function(textArray, excludedWordsArray, callback) {
            countEachArrayItem(textArray, excludedWordsArray, function(countedWordsArray) {
                var array = {}
                array["misspelledWords"] = {}
                array["countedWordsArray"] = countedWordsArray
                array["totalWordCount"] = textArray.length
                array['excludedWordsArray'] = excludedWordsArray
                callback(null, array)
            })
        }
    ], function(err, result) {
        if (err) {
            res.status(400)
        }
        res.status(201).json(result)
    });
})

router.post('/spellcheck', function(req, res) {
    async.waterfall([
        function(callback) {
            upload(req, function(text, excludeWordsString) {
                callback(null, text, excludeWordsString);
            })
        },
        function(text, excludeWordsString, callback) {
            inputParse(text, excludeWordsString, function(err, textArray, excludedWordsArray) {
                callback(null, textArray, excludedWordsArray);
            })
        },
        function(textArray, excludedWordsArray, callback) {
            async.parallel({
                    countArray: function(done) {
                        countEachArrayItem(textArray, excludedWordsArray, function(countedWordsArray) {
                            var array = {}
                            array["countedWordsArray"] = countedWordsArray
                            array['excludedWordsArray'] = excludedWordsArray
                            done(null, array)
                        })
                    },
                    misspelledWords: function(done) {
                        spellCheck(textArray, function(misspelledWordsArray) {
                            done(null, misspelledWordsArray)
                        })
                    }
                },
                function(err, results) {
                    if (err) {
                        callback(err, null)
                    }
                    results.countArray["totalWordCount"] = textArray.length
                    results.countArray["misspelledWords"] = results.misspelledWords
                    callback(null, results.countArray)
                });
        }
    ], function(err, result) {
        if (err) {
            res.status(400)
        }
        res.status(201).json(result)
    });
})

module.exports = router