const Reader = require('./../Reader');
const myReader = new Reader();

// Index controller
exports.Index = function(req, res){
    // file reading
    myReader.searchDirectory('public/storage')
    .then(files => {
        res.render('index',  {"files": files});  // Render html
    });
};

// Reader controller
exports.Reader = function(req, res){
    let dir = req.param('f');
    let ext = myReader.getExtension(dir);
    let responseObject = {"contents": null, "dir": dir};

    if (ext == "jpg" || ext == "jpeg" || ext == "png") {    // supported extensions: .jpg and .png
        // display image
        responseObject["contents"] = `<img src='${dir}' />`;
        res.render('reader', responseObject);
    } else {
        // display code
        myReader.readFile(dir)
        .then(contents => {
            responseObject["contents"] = contents;
            res.render('reader', responseObject);
        });
    }
};
