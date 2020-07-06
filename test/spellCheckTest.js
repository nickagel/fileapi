var expect = require('chai').expect
var spellCheck = require('./../helpers/spellCheck')

describe('Spellcheck request', function(){
    it('array no spelling errors', function(done){
        //arrange
        var wordsToCheck = ['test', 'test', 'test']

        //act
        spellCheck(wordsToCheck, function(misspelledWords){
        
        //assert
            expect(misspelledWords).to.be.empty
            done()
        })
    })

    it('array 1 spelling error', function(done){
        //arrange
        var wordsToCheck = ['tesst', 'test', 'test']

        //act
        spellCheck(wordsToCheck, function(misspelledWords){
        
        //assert
            expect(misspelledWords).to.deep.equal([ 'tesst' ])
            done()
        })
    })

    it('array 3 spelling error', function(done){
        //arrange
        var wordsToCheck = ['tesst', 'tessst', 'tessst']

        //act
        spellCheck(wordsToCheck, function(misspelledWords){
        
        //assert
            expect(misspelledWords).to.deep.equal(wordsToCheck)
            done()
        })
    })
})