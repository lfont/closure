Closure
=======

A nodejs wrapper for calling Google closure tools.
This module can be use for writing build scripts for projects written with Google  
Closure Tools.
For the moment, it only contains a wrapper for closure-stylesheets and plovr.  

    closure.stylesheets(styleSheetsDir)
        .prettyPrint()
        .outputFile(path.join(buildDir, 'style.css'))
        .outputRenamingMap(path.join(buildDir, 'renaming_map.js'))
        .outputRenamingMapFormat('CLOSURE_UNCOMPILED')
        .rename('CLOSURE')
        .exec(function(error, command, stdout, stderr) {
            console.log('done');
        });  

About Me
--------
* License:           MIT (see included LICENSE file for full license)
* Original Author:   Loïc Fontaine (http://twitter.com/loic_fontaine)