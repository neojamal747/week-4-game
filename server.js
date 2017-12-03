//Dependencies
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const request = require('request');

const app = express();

//Express setup
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//Routing
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './index.html'));
});

//Listener
app.listen(PORT, () => {
	console.log(`Server is now listening on ${PORT}`);
});

/*SCRAP

				
*/

