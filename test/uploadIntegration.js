var fs = require("fs");
var request = require("request");
var expect = require('chai').expect
var path = require('path')

describe('Integration Tests SERVER MUST BE RUNNING', function() {
    it('/upload exclusion string', function(done) {
        var filepath = path.join(__dirname, '/../test/test.txt')
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/upload',
            headers: {
                'postman-token': 'd6c9a7a3-e8ba-340c-cfc5-7c143d918435',
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData: {
                upload: {
                    value: fs.createReadStream(filepath),
                    options: {
                        filename: 'test.txt',
                        contentType: null
                    }
                },
                excludeWordsString: 'lorem'
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            expect(body).to.deep.equal('{"misspelledWords":{},"countedWordsArray":{"ipsum":4,"tesst":1,"is":1,"simply":1,"dummy":2,"text":2,"of":4,"the":6,"printing":1,"and":3,"typesetting":2,"industry":1,"has":2,"been":1,"industry\'s":1,"standard":1,"ever":1,"since":1,"1500s":1,"when":1,"an":1,"unknown":1,"printer":1,"took":1,"a":2,"galley":1,"type":2,"scrambled":1,"it":3,"to":1,"make":1,"specimen":1,"book":1,"survived":1,"not":1,"only":1,"five":1,"centuries":1,"but":1,"also":1,"leap":1,"into":1,"electronic":1,"remaining":1,"essentially":1,"unchanged":1,"was":1,"popularised":1,"in":1,"1960s":1,"with":2,"release":1,"letraset":1,"sheets":1,"containing":1,"passages":1,"more":1,"recently":1,"desktop":1,"publishing":1,"software":1,"like":1,"aldus":1,"pagemaker":1,"including":1,"versions":1},"totalWordCount":92,"excludedWordsArray":["lorem"]}')
            done()
        });

    })
    it('/upload no exclusion string', function(done) {
        var filepath = path.join(__dirname, '/../test/test.txt')
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/upload',
            headers: {
                'postman-token': 'd6c9a7a3-e8ba-340c-cfc5-7c143d918435',
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData: {
                upload: {
                    value: fs.createReadStream(filepath),
                    options: {
                        filename: 'test.txt',
                        contentType: null
                    }
                },
                excludeWordsString: ''
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            expect(body).to.deep.equal('{"misspelledWords":{},"countedWordsArray":{"lorem":4,"ipsum":4,"tesst":1,"is":1,"simply":1,"dummy":2,"text":2,"of":4,"the":6,"printing":1,"and":3,"typesetting":2,"industry":1,"has":2,"been":1,"industry\'s":1,"standard":1,"ever":1,"since":1,"1500s":1,"when":1,"an":1,"unknown":1,"printer":1,"took":1,"a":2,"galley":1,"type":2,"scrambled":1,"it":3,"to":1,"make":1,"specimen":1,"book":1,"survived":1,"not":1,"only":1,"five":1,"centuries":1,"but":1,"also":1,"leap":1,"into":1,"electronic":1,"remaining":1,"essentially":1,"unchanged":1,"was":1,"popularised":1,"in":1,"1960s":1,"with":2,"release":1,"letraset":1,"sheets":1,"containing":1,"passages":1,"more":1,"recently":1,"desktop":1,"publishing":1,"software":1,"like":1,"aldus":1,"pagemaker":1,"including":1,"versions":1},"totalWordCount":92,"excludedWordsArray":[""]}')
            done()
        });

    })
    it('/upload/spellcheck exclusion string', function(done) {
        var filepath = path.join(__dirname, '/../test/test.txt')
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/upload/spellcheck',
            headers: {
                'postman-token': '113b52d3-5d99-8bc4-e786-baab16e5ed36',
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData: {
                upload: {
                    value: fs.createReadStream(filepath),
                    options: {
                        filename: 'test.txt',
                        contentType: null
                    }
                },
                excludeWordsString: 'lorem'
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            expect(body).to.deep.equal('{"countedWordsArray":{"ipsum":4,"tesst":1,"is":1,"simply":1,"dummy":2,"text":2,"of":4,"the":6,"printing":1,"and":3,"typesetting":2,"industry":1,"has":2,"been":1,"industry\'s":1,"standard":1,"ever":1,"since":1,"1500s":1,"when":1,"an":1,"unknown":1,"printer":1,"took":1,"a":2,"galley":1,"type":2,"scrambled":1,"it":3,"to":1,"make":1,"specimen":1,"book":1,"survived":1,"not":1,"only":1,"five":1,"centuries":1,"but":1,"also":1,"leap":1,"into":1,"electronic":1,"remaining":1,"essentially":1,"unchanged":1,"was":1,"popularised":1,"in":1,"1960s":1,"with":2,"release":1,"letraset":1,"sheets":1,"containing":1,"passages":1,"more":1,"recently":1,"desktop":1,"publishing":1,"software":1,"like":1,"aldus":1,"pagemaker":1,"including":1,"versions":1},"excludedWordsArray":["lorem"],"totalWordCount":92,"misspelledWords":["tesst","popularised","letraset"]}')
            done()
        });
    })
    it('/upload/spellcheck noexclusion string', function(done) {
        var filepath = path.join(__dirname, '/../test/test.txt')
        var options = {
            method: 'POST',
            url: 'http://localhost:3000/upload/spellcheck',
            headers: {
                'postman-token': '113b52d3-5d99-8bc4-e786-baab16e5ed36',
                'cache-control': 'no-cache',
                'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
            },
            formData: {
                upload: {
                    value: fs.createReadStream(filepath),
                    options: {
                        filename: 'test.txt',
                        contentType: null
                    }
                },
                excludeWordsString: ''
            }
        };

        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            expect(body).to.deep.equal('{"countedWordsArray":{"lorem":4,"ipsum":4,"tesst":1,"is":1,"simply":1,"dummy":2,"text":2,"of":4,"the":6,"printing":1,"and":3,"typesetting":2,"industry":1,"has":2,"been":1,"industry\'s":1,"standard":1,"ever":1,"since":1,"1500s":1,"when":1,"an":1,"unknown":1,"printer":1,"took":1,"a":2,"galley":1,"type":2,"scrambled":1,"it":3,"to":1,"make":1,"specimen":1,"book":1,"survived":1,"not":1,"only":1,"five":1,"centuries":1,"but":1,"also":1,"leap":1,"into":1,"electronic":1,"remaining":1,"essentially":1,"unchanged":1,"was":1,"popularised":1,"in":1,"1960s":1,"with":2,"release":1,"letraset":1,"sheets":1,"containing":1,"passages":1,"more":1,"recently":1,"desktop":1,"publishing":1,"software":1,"like":1,"aldus":1,"pagemaker":1,"including":1,"versions":1},"excludedWordsArray":[""],"totalWordCount":92,"misspelledWords":["tesst","popularised","letraset"]}')
            done()
        });
    })
})