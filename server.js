//Install express server
var sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');

const app = express();

app.use(sslRedirect());

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/tnf'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/tnf/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);