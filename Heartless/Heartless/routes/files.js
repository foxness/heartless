'use strict';

var path = require('path');
var fs = require('fs');

const rootpath = path.join(path.dirname(__dirname), 'files');

let middleware = (req, res, next) =>
{
    fs.readdir(rootpath, (err, files) =>
    {
        if (err)
        {
            return console.log('Unable to scan directory: ' + err);
        }

        let fcontent = ""

        let a = req.originalUrl.split('/').slice(2)
        a.unshift("")
        if (a.length == 1)
        {
            a.unshift("")
        }

        let urlpath = a.join('/')

        console.log(urlpath)

        files.forEach((file) =>
        {
            let fullpath = path.join(rootpath, file);
            let dir = fs.lstatSync(fullpath).isDirectory()

            let fc = dir ? "<li><a href=\"/files/" + file + "\">" + file + "</a></li>"
                     : "<li>" + file + "</li>"

            fcontent += fc
            
            console.log(file);
        });
          
        let content = "<!DOCTYPE html><html><body><h1>Files</h1><p>" + rootpath + "</p><ul>" + fcontent + "</ul></body></html>";

        res.send(content);
    });
}

module.exports = middleware;