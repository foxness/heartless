'use strict';
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

const rootpath = path.join(path.dirname(__dirname), 'files');

router.get('/', function (req, res)
{
    fs.readdir(rootpath, (err, files) =>
    {
        if (err)
        {
            return console.log('Unable to scan directory: ' + err);
        }

        let fcontent = ""

        console.log(req.baseUrl)

        files.forEach((file) =>
        {
            let fullpath = path.join(rootpath, file);
            let dir = fs.lstatSync(fullpath).isDirectory()
            fcontent += "<li>" + file + " " + dir + "</li>"
            
            console.log(file);
        });
          
        let content = "<!DOCTYPE html><html><body><h1>Files</h1><p>My first paragraph.</p><ul>" + fcontent + "</ul></body></html>";

        res.send(content);
    });
});

module.exports = router;