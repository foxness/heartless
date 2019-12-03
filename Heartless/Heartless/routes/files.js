'use strict';
var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');

const rootpath = path.join(path.dirname(__dirname), 'files');

/* GET users listing. */
router.get('/', function (req, res)
{
    //passsing directoryPath and callback function
    fs.readdir(rootpath, (err, files) =>
    {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
        });
    });

    res.send('respond with a resource');
});



module.exports = router;