START APP
install Node.js
(open bash)
cd /fileapi
npm install
node server
(OPEN BROWSER)
localhost:3000

RUN TESTS
Make sure server is running for integration tests (node server)
cd /fileapi
npm test

SOLUTION
Accepts txt file < 10mb
Optional exclude word from being counted (word total count will still include excluded word occurrence)
Optional spellcheck
Sends post on submit
Returns 201 with response JSON
Display Results

File structure
/api : contains endpoints & router
/public : all web based files ex: css, js
/views : all html views ex: index.html
/helpers : contains logic broken into modules
/test : contains all test files
config.json : contains http token for bing api (would be excluded on git commit)

Explanation: 
Upload contains two different endpoints
I choose to use two endpoints /upload /upload/spellcheck for a cleaner and more readable look
It also allowed for a clean asynchronous execution of both tasks based on selection
/spellcheck endpoint is a true/false flag in the form (html)
I removed as much complex logic from endpoint layer as possible besides physically putting data into response array
I choose jQuery ajax call instead a more complex framework because as a one page application I didn't feel the need
