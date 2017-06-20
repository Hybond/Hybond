var fs = require("fs");
var md = require("markdown").markdown;
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();

libMdPath = '../contents/css-pre-processor/less.md';
contentsPath = '../contents/'

// Tools

function foreachDir(path, foreach) {
    // console.log("\nLOG: List " + path + " dir");
    fs.readdir(path, function(err, files) {
       if (err) {
           return console.error(err);
       }
       // console.log(files);
       for (var i in files) {
           foreach(files[i], i, files);
       }
    });

}

function readMd(filePath, callback, mdJSON) {

    // console.log("\nLOG: readMd:" + filePath)
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

function readLibs(libMdPath) {

    // console.log('\nLOG: readLibs:' + libMdPath)

    mdJSON = {};

    function addMdTree(mdtree) {

        mdJSON = {
            'name': 'No name',
            'description': 'No description',
            'tabs': {},
        };

        var tempTabs;
        function addMdJSON(value, index, array) {
            if (index == 2) {
                mdJSON.description = value[1];
            } else if (value[1].level == 1) {
                mdJSON.name = value[2];
            } else if (value[1].level == 2) {
                tempTabs = value[2];
            } else {
                if ( tempTabs != undefined ) {
                    mdJSON.tabs[tempTabs] = md.toHTML(value[1]);
                }
            }
        }
        mdtree.forEach(addMdJSON);
        return mdJSON;

    }

    readMd(filePath, addMdTree, mdJSON);

}

// Read parts

function readParts(dirPath) {

    partsJSON = { 'libs': {} };
    foreachDir(dirPath, function(fileName, index, array){

        filePath = dirPath + '/' + fileName;

        if (fileName == '_meta.md') {
            readMd(filePath, function(mdtree){

                function addPartsJSON(value, index, array) {
                    if (index == 2) {
                        partsJSON.description = value[1];
                    } else if (value[1].level == 1) {
                        partsJSON.name = value[2];
                    }
                }
                mdtree.forEach(addPartsJSON);

            })

        } else {
            partsJSON.libs[fileName] = readLibs(filePath);
        }

        if (index == array.length - 1) { event.emit('eachend') }

    })

    event.on('eachend', function() {
        console.log(111111,partsJSON);
        return partsJSON;
    });

}

// Read contents

function readPartsOrder(fileName) {
    partsOrderJSON = JSON.parse(fs.readFileSync(fileName));
    return partsOrderJSON.partsOrder;
}

function readContents(fileName) {

    contentsJSON = {'parts': {}};

    filePath = contentsPath + fileName;
    console.log("\nLOG: readContents:" + filePath);
    if (fileName == 'parts.json') {
        contentsJSON.parstOrder = readPartsOrder(filePath);
    } else {
        contentsJSON.parts['fileName'] = readParts(filePath);
    }

    console.log(contentsJSON)
}

// Run read dir

contentstree = { 'partsOrder': [], 'parts': {} };
foreachDir(contentsPath, readContents);
// console.log("\nPrased contentstree:" + contentstree);
