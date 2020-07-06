var expect = require('chai').expect
var inputParse = require('./../helpers/inputParse')

describe('Input parse', function(){
    it('empty string', function(done){
        //arrange
        var emptyString = ""

        //act
        inputParse(emptyString, emptyString, function(err, textArray, excludedWordsArray){

        //assert
            expect(err).to.be.a('null');
            expect(textArray).to.eql([''])
            expect(excludedWordsArray).to.eql([''])
            done()
        })
    })

    it('empty exclude string, valid text string', function(done){
        //arrange
        var emptyString = ""
        var textString = "test test test abc 123"
        var expectedTextArray = ["test", "test", "test", "abc", "123"]

        //act
        inputParse(textString, emptyString, function(err, textArray, excludedWordsArray){

        //assert
            expect(err).to.be.a('null');
            expect(textArray).to.deep.equal(expectedTextArray)
            expect(excludedWordsArray).to.eql([''])
            done()
        })
    })

    it('empty input string, valid exclude string', function(done){
        //arrange
        var emptyString = ""
        var excludeString = "test test test abc 123"
        var expectedArray = ["test", "test", "test", "abc", "123"]

        //act
        inputParse(emptyString, excludeString, function(err, textArray, excludedWordsArray){

        //assert
            expect(err).to.be.a('null');
            expect(textArray).to.eql([''])
            expect(excludedWordsArray).to.eql(expectedArray)
            done()
        })
    })

    it('valid text string, valid word string', function(done){
        //arrange
        var wordsString = "test test test abc 123"
        var expectedArray = ["test", "test", "test", "abc", "123"]

        //act
        inputParse(wordsString, wordsString, function(err, textArray, excludedWordsArray){

        //assert
            expect(err).to.be.a('null');
            expect(textArray).to.deep.equal(expectedArray)
            expect(excludedWordsArray).to.eql(expectedArray)
            done()
        })
    })

    it('sanitize check valid text string, valid word string', function(done){
        //arrange
        var wordsString = "$#@%$#test test*%$#%@ test,@#$%#@$ abc@#$%#$% 123@"
        var expectedArray = ["test", "test", "test", "abc", "123"]

        //act
        inputParse(wordsString, wordsString, function(err, textArray, excludedWordsArray){

        //assert
            expect(err).to.be.a('null');
            expect(textArray).to.deep.equal(expectedArray)
            expect(excludedWordsArray).to.eql(expectedArray)
            done()
        })
    })
})