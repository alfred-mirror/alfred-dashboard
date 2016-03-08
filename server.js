const express = require('express');

const app = express();

app.use(express.static(__dirname + '/build'));

app.get('*', (req, res) => {
	res.status(404).json({
		msg: 'Not Found.'
	});
});

app.listen(3000, () => console.log('PORT 3000'));
