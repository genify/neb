#!/usr/bin/env node

var main = require('../main.js');

(new (require('../lib/util/args.js'))({
    message:require('./shell.json'),
    package:require('../package.json'),
    msg:function(){
        process.exit(0);
    },
    start:function(event){
        main.start();
    }
})).exec(
    process.argv.slice(2)
);