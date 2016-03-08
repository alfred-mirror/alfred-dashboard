const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('build'));

// app.get('*', (req, res) => {
// 	res.status(404).json({
// 		msg: 'Not Found.'
// 	});
// });

app.listen(PORT, () => console.log('PORT ' + PORT));
