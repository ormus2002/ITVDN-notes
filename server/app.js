import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/databaseutils.js';

db.setUpConnection();

const app = express();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/notes', (req,res) => {
  db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req,res) => {
  db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req,res) => {
  db.deleteNote(req.params.id).then(data => res.send(data));
});

const server = app.listen(8080, () => {
  console.log(`Server is up and running on port ${serverPort}`);
});