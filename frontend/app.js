const { useState, useEffect } = React;
const { Button, TextField, Container, Typography, Grid, Paper } = MaterialUI;

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async () => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) onLogin(); else alert('Login failed');
  };
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Login</Typography>
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={e => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" onClick={handleSubmit}>Login</Button>
    </Container>
  );
}

function CageList() {
  const [cages, setCages] = useState([]);
  const [newId, setNewId] = useState('');
  useEffect(() => { fetch('/api/cages').then(res => res.json()).then(setCages); }, []);
  const addCage = async () => {
    await fetch('/api/cages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: newId, status: '空闲' }) });
    const updated = await fetch('/api/cages').then(res => res.json());
    setCages(updated); setNewId('');
  };
  return (
    <Container>
      <Typography variant="h6">Cages</Typography>
      <Grid container spacing={2}>
        {cages.map(c => (
          <Grid item key={c.id}>
            <Paper sx={{ p:2 }}>
              <Typography>{c.id}</Typography>
              <Typography variant="body2">{c.status}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <TextField label="New Cage ID" value={newId} onChange={e => setNewId(e.target.value)} />
      <Button variant="contained" onClick={addCage}>Add Cage</Button>
    </Container>
  );
}

function MouseList() {
  const [mice, setMice] = useState([]);
  const [form, setForm] = useState({ id: '', strain: '', gender: '' });
  useEffect(() => { fetch('/api/mice').then(res => res.json()).then(setMice); }, []);
  const addMouse = async () => {
    await fetch('/api/mice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    const updated = await fetch('/api/mice').then(res => res.json());
    setMice(updated); setForm({ id: '', strain: '', gender: '' });
  };
  return (
    <Container sx={{ mt:4 }}>
      <Typography variant="h6">Mice</Typography>
      {mice.map(m => (<Typography key={m.id}>{m.id} - {m.strain} - {m.gender}</Typography>))}
      <TextField label="ID" value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
      <TextField label="Strain" value={form.strain} onChange={e => setForm({ ...form, strain: e.target.value })} />
      <TextField label="Gender" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} />
      <Button variant="contained" onClick={addMouse}>Add Mouse</Button>
    </Container>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;
  return (
    <div>
      <CageList />
      <MouseList />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
