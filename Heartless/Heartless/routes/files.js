'use strict';

var path = require('path');
var fs = require('fs');

const rootpath = path.join(path.dirname(__dirname), 'files');

let middleware = (req, res, next) =>
{
    let a = req.originalUrl.split('/').slice(2)
    a.unshift("")
    if (a.length == 1)
    {
        a.unshift("")
    }

    let urlpath = a.join('/')
    let fullpath = path.join(rootpath, urlpath)

    fs.readdir(fullpath, (err, files) =>
    {
        if (err)
        {
            return console.log('Unable to scan directory: ' + err);
        }

        let fcontent = ""

        if (urlpath != '/')
        {
            let a = urlpath.split('/')
            a.pop()
            a.unshift("")
            a = a.join('/')

            fcontent += "<li><a href=\"/files" + (a == '/' ? "" : a) + "/\">...</a></li>"
        }

        files.forEach((file) =>
        {
            let filepath = path.join(fullpath, file);
            let isdir = fs.lstatSync(filepath).isDirectory()

            let fc = isdir ? "<li><a href=\"/files" + (urlpath == '/' ? "" : urlpath) + "/" + file + "\">" + file + "</a></li>"
                     : "<li>" + file + "</li>"

            fcontent += fc
            
            console.log(file);
        });
          
        let content = "<!DOCTYPE html><html><body><h1>" + urlpath + "</h1><ul>" + fcontent + "</ul></body></html>";

        res.send(content);
    });
}

module.exports = middleware;