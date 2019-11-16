var jsonfile = require('jsonfile');
var mongoose = require('mongoose');

var malformed_error = () => console.log('Not the right arguments, it needs to be:\n' +
        'node x.js -db <database> -c <collection> -f <file> <options>\n' +
        'where options are:\n' +
        '-notArray :\tif the file is not an array');

function insert_at_db(db, c, f, is_array){
    mongoose.connect('mongodb://127.0.0.1/' + db, {useNewUrlParser: true, useUnifiedTopology: true});

    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        var mySchema;
        
        var MyModel = mongoose.model(c, new mongoose.Schema({}));
        
        jsonfile.readFileSync(f, (error, data) => {
            if(!error){
                console.dir(data);
                if(is_array)
                    MyModel.collection.insertMany(data, (error, docs) => {
                        if(error)
                            console.error(error);
                        else
                            console.log('Saved successfully');
                    });
                else
                    MyModel.collection.insertMany([data], (error, docs) => {
                        if(error)
                            console.error(error);
                        else
                            console.log('Saved successfully');
                    });
            }else{
                console.error(error);
            }
        });
    });
}

if(process.argv.length == 9 || process.argv.length == 8){

    var is_array = true;
    if(process.argv.length == 9 && process.argv[8] == '-notArray'){
        is_array = false;
    }
    
    var looking_at_db   = false;
    var looking_at_c    = false;
    var looking_at_f    = false;
    var db;
    var c;
    var f;

    process.argv.forEach((val, ind) => {
        switch(val){
            case '-db':
                looking_at_db = true;
                looking_at_c = false;
                looking_at_f = false;
                break;
            case '-c':
                looking_at_db = false;
                looking_at_c = true;
                looking_at_f = false;
                break;
            case '-f':
                looking_at_db = false;
                looking_at_c = false;
                looking_at_f = true;
                break;
            default:
                if(looking_at_db){
                    db = val;
                    looking_at_db = false;
                }else if(looking_at_c){
                    c = val;
                    looking_at_c = false;
                }else if(looking_at_f){
                    f = val;
                    looking_at_f = false;
                }
        }
    });

    if(typeof(db) == 'undefined' || 
        typeof(c) == 'undefined' || 
        typeof(f) == 'undefined'){
        malformed_error();
    }else{
        insert_at_db(db, c, f, is_array);
    }
}else{
    malformed_error();
}
