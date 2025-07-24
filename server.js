#!/usr/bin/env node
/**
 * Simple webserver with logging. By default, serves whatever files are
 * reachable from the directory where node is running.
 */
var fs = require('fs'),
antinode = require('./lib/antinode'),
sys = require('sys');

function isValidPath(filePath) {
    // Basic validation to prevent path traversal
    return !filePath.includes('..') && !filePath.startsWith('/');
}

var settingsPath = process.argv[2] || './settings.json';
if (!isValidPath(settingsPath)) {
    sys.puts('Invalid file path provided.');
    process.exit(1);
}

fs.readFile(settingsPath, function(err, data) {
    var settings = {};
    if (err) {
        sys.puts('No settings.json found ('+err+'). Using default settings');
    } else {
        try {
            settings = JSON.parse(data.toString('utf8',0,data.length));
        } catch (e) {
            sys.puts('Error parsing settings.json: '+e);
            process.exit(1);
        }
    }
    antinode.start(settings);
});
