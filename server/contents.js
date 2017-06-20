var fs = require("fs");
var md = require("markdown").markdown;

libMdPath = '../../contents/css-pre-processor/less.md';
contentsPath = '../../contents/'

// Tools

function foreachDir(path, foreach) {
    console.log("\nLOG: List " + path + " dir");
    fs.readdir(path, function(err, files) {
       if (err) {
           return console.error(err);
       }
       console.log(files);
       files.forEach(foreach);
    });
}

function readMd(filePath, callback) {

    console.log("\nLOG: readMd:" + filePath)
    fs.readFile(filePath, 'utf-8', function(err, mdfile) {

        if (err) {
            console.error(err);
        } else {

            // console.log("\nNOTE: fs open successed.");
            // console.log("\nLOG: Markdown file contents:");
            // console.log(mdfile);

            mdtree = md.parse(mdfile);
            console.log("\nLOG: Markdown tree prased:");
            console.log(mdtree);

            callback(mdtree);

        }

    })

}

// Read libs

function readLibs(libMdPath) {

    console.log('\nLOG: readLibs:' + libMdPath)

    var mdJSON;
    readMd(filePath, function() {

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

            console.log("\nLOG: JSON prased:");
            console.log(mdJSON);

    })

    return mdJSON;

}

// Read parts

function readParts(dirPath) {

    var partsJSON;
    foreachDir(dirPath, function(filename){
        filePath = dirPath + '/' + filename;
        console.log("\nLOG: readParts:" + filePath);
        if (filename == '_meta.md') {
            readMd(filePath, function(mdtree){
                console.log(mdtree);
            })
        } else {
            readLibs(filePath);
        }
        console.log();
    })

    return partsJSON;

}

// Read contents

function readPartsArr() {
    console.log('\nLOG: readPartsArr');
}

function readContents(fileName) {
    filePath = contentsPath + fileName;
    console.log("\nLOG: readContents:" + filePath);
    if (fileName == 'parts.json') {
        readPartsArr(filePath);
    } else {
        readParts(filePath);
    }
}

// Run read dir

var contentstree = {};
foreachDir(contentsPath, readContents);
console.log("\nPrased contentstree:" + contentstree);
