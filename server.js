'use strict';

const express = require('express');

// Constants
const PORT = process.env.SERVER_PORT || 8845;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/snapshot.jpg', (req, res) => {
  const { execSync } = require('child_process');
  const url = process.env.RTSP_URL
  execSync(`ffmpeg -y -loglevel panic -rtsp_transport tcp -i ${url} -f image2 -vframes 1 /tmp/snapshot.jpg`);
  res.sendfile('/tmp/snapshot.jpg');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
