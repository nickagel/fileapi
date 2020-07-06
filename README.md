# File Upload App

### Installation
File Upload App requires [Node.js](https://nodejs.org/).

Install the dependencies and start the server.

```sh
$ npm install
$ node server
Open browser 
localhost:3000
```



### Enpoints

/upload
/upload/spellcheck

sample request
```sh
{ 
    method: 'POST',
    url: 'http://localhost:3000/upload/spellcheck',
    headers: 
    { 
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' 
    },
    formData: 
    { 
        upload: 
        { 
            value: 'fs.createReadStream("test.txt")',
            options: 
            { 
                filename: 'test.txt',
                contentType: null 
            }
        },
        excludeWordsString: 'lorem' 
    } 
}
```

sample response if all options chosen
```sh
{ 
    misspelledWords: 
    [
        'tesst'
    ],
    countedWordsArray: 
    {   
        ipsum: 4,
        is: 1,
        simply: 1,
        dummy: 2,
        text: 2,
        of: 4,
        the: 6,
        printing: 1,
        and: 3,
        versions: 1,
        tesst: 1 
    },
        totalWordCount: 91,
        excludedWordsArray: 
        [ 
            'lorem' 
        ]
}
```


### Technology

File Web App uses a number of open source projects to work properly:

* [Async] - utility module for asynchronous JavaScript
* [Body Parser] - body parsing middleware
* [Express] - Fast, unopinionated minimalist framework
* [Formidable] - A Node.js module for parsing form data, especially file uploads.
* [FS] - This module make file opertaion apis simple
* [Morgan] - HTTP request logger middleware for node.js
* [Path] - Build absolute pathes
* [Readline] - Read file line by line
* [Request] - Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
* [Blanket] - A seamless JavaScript code coverage library.
* [Chai] - Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.
* [Mocha] - Mocha is a simple, flexible, fun JavaScript test framework for node.js

   [Body Parser]: <https://github.com/expressjs/body-parser>
   [Express]: <http://expressjs.com>
   [Async]: <https://caolan.github.io/async/>
   [Formidable]: https://www.npmjs.com/package/formidable
   [FS]: https://www.npmjs.com/package/file-system
   [Morgan]:https://www.npmjs.com/package/morgan
   [Path]:https://www.npmjs.com/package/path
   [Readline]:https://www.npmjs.com/package/readline
   [Request]:https://www.npmjs.com/package/request
   [Blanket]:https://www.npmjs.com/package/blanket
   [Chai]:https://www.npmjs.com/package/chai
   [Mocha]:https://www.npmjs.com/package/mocha
