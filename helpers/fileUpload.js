/*
Uploads file to /upload directory
parses incoming req
uploads file
renames file
opens file 
returns contents along with req exclude words string
*/
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var async = require('async')

var uploadFile = function(req, callback) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '/../uploads')
    form.maxFieldsSize = 10240
    async.waterfall([
        function(done) {
            form.parse(req, function(err, fields, files) {
                done(null, fields.excludeWordsString, files.upload);
            })
        },
        function(excludeWordsString, file, done) {
            async.parallel({
                    function(finish) {
                        fs.rename(file.path, path.join(form.uploadDir, file.name), function(err) {
                            finish(null)
                        })
                    },
                    fileContents: function(finish) {
                        fs.readFile(path.join(form.uploadDir, file.name), 'utf8', function(err, contents) {
                            finish(null, contents)
                        });
                    }
                },
                function(err, results) {
                    if (err) {
                        done(err, null)
                    }
                    done(null, results.fileContents, excludeWordsString)
                });
        }
    ], function(err, fileContents, excludeWordsString) {
        callback(fileContents, excludeWordsString)
    });
}

module.exports = uploadFile