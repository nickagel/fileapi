/* 
  takes array of words and counts occurrences
  excludes words if passed
  returns one array with each word with corresponding occurrences
*/
function countEachArrayItem(wordsArray, excludedWords, callback) {
  var wordsWithCountArray = {}
    wordsArray.reduce(function(counter, word) {
      if(!excludedWords.includes(word)){
        counter[word] = counter.hasOwnProperty(word) ? counter[word] + 1 : 1;
      }
      return counter;
    }, wordsWithCountArray)
    callback(wordsWithCountArray)
}

module.exports = countEachArrayItem