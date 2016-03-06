const express = require('express');

express().use(express.static(__dirname + '/build')).listen(3000, () => console.log('PORT 3000'));
