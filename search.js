
const fs = require('fs');
const extPath = require('path');

// Get the argv variables from the user

var fileExt = process.argv[2]; 
var keyName = process.argv[3];

var flag = false;
var newPath;
var extName = null;
var myList = [];

function getFilesRecursively(path) {

    try {

        // Read all the files inside the dir with the given path
        files = fs.readdirSync(path);  
        files.forEach(function(file) {

            newPath = path + "\\" + file;

             // If this is a directory call recursively to the  getFilesRecursively function with the new path
            if (fs.statSync(newPath).isDirectory()) {
                myList = getFilesRecursively(newPath);
            } 
            //  If this is a file check the extension of the file with the input extention
            else {

                extName = extPath.extname(newPath);
                // Check if the user entered is equal to the extension we received
                if (fileExt == extName) { 
    
                   var data = fs.readFileSync(newPath, 'utf8');
                   // Check if the content of the file includes the key
                    if (data.includes(keyName)) { 
                        console.log(newPath);
                        if (!flag)
                            flag = true;
                    }
                } 
                myList.push(newPath);
            }
        });

        return myList;

    }
    catch(err) {
        console.log(err);
    }

}

if(fileExt && keyName) {
    // concut a "." to the given extention
    fileExt ="." + fileExt;

    var filesList = getFilesRecursively("C:\\MyFolder");
}
// If the user not pass any arguments      
else {
    console.log("USAGE: node search [EXT] [TEXT]");
    return;
}

// There are not files that contain the key 
if(!flag)
    console.log("No file was found");

