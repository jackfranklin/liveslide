import express from 'express';
import http from 'http';
import fs from 'fs';
import parse from './lib/parse';

const app = express();

app.use(express.static('public'));

app.get('/slides', (req, res) => {
  //TODO: give it a URL rather than just reading from slides.md
  const contents = fs.readFileSync('slides.md', { encoding: 'utf8' });
  res.json({ contents, slides: parse(contents) });
});

const server = http.createServer(app);

server.listen(8123);

server.on('listening', () => {
  console.log('Running on 8123');
});

