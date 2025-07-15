import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
const DATA_FILE = path.join('./data.json');

function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ cages: [], mice: [], users: [{ username: 'admin', password: 'admin' }] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.use(express.static('../frontend'));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const data = loadData();
  const user = data.users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.get('/api/cages', (req, res) => {
  const data = loadData();
  res.json(data.cages);
});

app.post('/api/cages', (req, res) => {
  const cage = req.body;
  const data = loadData();
  data.cages.push(cage);
  saveData(data);
  res.json({ success: true });
});

app.get('/api/mice', (req, res) => {
  const data = loadData();
  res.json(data.mice);
});

app.post('/api/mice', (req, res) => {
  const mouse = req.body;
  const data = loadData();
  data.mice.push(mouse);
  saveData(data);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
