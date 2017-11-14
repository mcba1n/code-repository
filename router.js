var MainController = require('./controllers/MainController')

// Routes
module.exports = function(app){
     
    // Main Routes
     
    app.get('/index', MainController.Index);
    app.get('/reader', MainController.Reader);   
 
};
