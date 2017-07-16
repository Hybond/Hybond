var fs = require("fs");
var md = require("markdown").markdown;
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();


libMdPath = '../contents/css-pre-processor/less.md';
contentsPath = '../contents/'

// Tools

function foreachDir(contentsTree, path, read) {
    fs.readdir(path, function(err, files) {
       if (err) {
           return console.error(err);
       }
       for (var i in files) {
           read(contentsTree, files[i], i, files);
       }
    });

}

function readMd(filePath, callback) {

    fs.readFile(filePath, 'utf-8', function(err, mdfile) {

        if (err) {
            console.error(err);
        } else {
            mdtree = md.parse(mdfile);
            result = callback(mdtree);
        }

    })

}

// Read libs

function readLibs(contentsTree, dirPath, treePath) {

    console.log(1111,treePath)

    function addMdTree(mdtree) {

        mdJSON = {
            'name': 'No name',
            'description': 'No description',
            'tabs': {},
        };

        var tempTabs;
        function addMdJSON(value, index, array) {
            if (index == 2) {
                eval('contentsTree.' + treePath + '.description = value[1]');
            } else if (value[1].level == 1) {
                eval('contentsTree.' + treePath + '.name = value[2]');
            } else if (value[1].level == 2) {
                tempTabs = value[2];
            } else {
                if ( tempTabs != undefined ) {
                    eval('contentsTree.' + treePath + '.tabs.' + tempTabs + ' =  md.toHTML(value[1])');
                }
            }
        }
        mdtree.forEach(addMdJSON);

        eval('contentsTree.' + treePath + ' = mdJSON');

    }

    readMd(filePath, addMdTree);

}

// Read parts

function readParts(contentsTree, dirPath, treePath) {

    eval('contentsTree.' + treePath + ' = {}');

    foreachDir(contentsTree, dirPath, function(contentsTree, fileName, index, array){

        filePath = dirPath + '/' + fileName;

        if (fileName == '_meta.md') {
            readMd(filePath, function(mdtree){

                function addPartsJSON(value, index, array) {
                    if (index == 2) {
                        eval('contentsTree.' + treePath + '.description = value[1]');
                    } else if (value[1].level == 1) {
                        eval('contentsTree.' + treePath + '.name = value[2]');
                    }
                }
                mdtree.forEach(addPartsJSON);

                console.log(contentsTree);

            })

        } else {
            libTreePath = treePath + '.libs.' + fileName.substring(0,fileName.length - 3);
            eval('contentsTree.' + libTreePath + ' = {}');
            readLibs(contentsTree, filePath, libTreePath);
        }

    })

}

// Read contents

function readPartsOrder(contentsTree, filePath, treePath) {
    eval('contentsTree.' + treePath + ' = ' + fs.readFileSync(filePath));
}

function readContents(contentsTree, fileName, treePath) {

    filePath = contentsPath + fileName;
    if (fileName == 'parts.json') {
        readPartsOrder(contentsTree, filePath, 'partsOrder');
    } else {
        readParts(contentsTree, filePath, 'parts.'+fileName);
    }

}

// Run read dir

contentsTree = { 'partsOrder': [], 'parts': {} };
foreachDir(contentsTree, contentsPath, readContents);
