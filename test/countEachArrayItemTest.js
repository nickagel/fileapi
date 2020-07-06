var countEachArrayItem = require('./../helpers/countEachArrayItem')
var expect = require('chai').expect

describe('Count occurences in array', function(){
    it('empty input', function(done){
        //arrange
        var emptyArray = []

        //act
        countEachArrayItem(emptyArray, emptyArray, function(results){
        
        //assert
            expect(results).to.be.empty
            done()
        })
    })

    it('words array, empty exclude array', function(done){
        //arrange
        var emptyArray = []
        var wordsArray = ['test', 'test', 'abc', 'abc', 'abc', '1']

        //act
        countEachArrayItem(wordsArray, emptyArray, function(results){
        
        //assert
            expect(results).to.deep.equal({ '1': 1, test: 2, abc: 3 })
            done()
        })
    })

    it('words array, exclude words array', function(done){
        //arrange
        var excludeArray = ['test']
        var wordsArray = ['test', 'test', 'abc', 'abc', 'abc', '1']

        //act
        countEachArrayItem(wordsArray, excludeArray, function(results){
        
        //assert
            expect(results).to.deep.equal({ '1': 1, abc: 3 })
            done()
        })
    })

    it('empyt word array, exclude words array', function(done){
        //arrange
        var emptyArray = []
        var excludeArray = ['test']

        //act
        countEachArrayItem(emptyArray, excludeArray, function(results){
        
        //assert
            expect(results).to.be.empty
            done()
        })
    })
})