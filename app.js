// Setup Express
const express = require('express');
const app = express();
app.use('/public', express.static('public'));   // use static directory
require('./router')(app);   // send app to router

// Setup Mustache view engine
const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');

// Interface with localhost on port 3000
port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('app listening on port %d!', port);
});