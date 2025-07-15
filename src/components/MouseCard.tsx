import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, TextField } from '@mui/material';
import useStore, { Mouse } from '../store';

interface Props {
  mouse: Mouse;
}

const MouseCard: React.FC<Props> = ({ mouse }) => {
  const updateMouse = useStore(state => state.updateMouse);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(mouse);

  const handleSave = () => {
    updateMouse(data);
    setOpen(false);
  };

  return (
    <>
      <Card
        draggable
        onDragStart={e => e.dataTransfer.setData('text/plain', mouse.id)}
        sx={{ minWidth: 200, mr: 2 }}
      >
        <CardContent onDoubleClick={() => setOpen(true)} sx={{ p: 1 }}>
          <Typography variant="subtitle1">耳标: {mouse.earTag}</Typography>
          <Typography variant="body2">品系: {mouse.strain}</Typography>
          <Typography variant="body2">性别: {mouse.gender}</Typography>
          <Typography variant="body2">基因型: {mouse.genotypeStatus}</Typography>
          <Typography variant="body2">{mouse.notes}</Typography>
          <Button size="small" onClick={() => setOpen(true)} sx={{ mt: 1 }}>
            编辑
          </Button>
        </CardContent>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <CardContent sx={{ minWidth: 250 }}>
          <TextField
            label="耳标"
            fullWidth
            margin="dense"
            value={data.earTag}
            onChange={e => setData({ ...data, earTag: e.target.value })}
          />
          <TextField
            label="品系"
            fullWidth
            margin="dense"
            value={data.strain}
            onChange={e => setData({ ...data, strain: e.target.value })}
          />
          <TextField
            label="性别"
            fullWidth
            margin="dense"
            value={data.gender}
            onChange={e => setData({ ...data, gender: e.target.value as 'M' | 'F' })}
          />
          <TextField
            label="基因型"
            fullWidth
            margin="dense"
            value={data.genotypeStatus}
            onChange={e => setData({ ...data, genotypeStatus: e.target.value })}
          />
          <TextField
            label="备注"
            fullWidth
            margin="dense"
            value={data.notes}
            onChange={e => setData({ ...data, notes: e.target.value })}
          />
          <Button variant="contained" onClick={handleSave} sx={{ mt: 1, mr: 1 }}>
            保存
          </Button>
          <Button onClick={() => setOpen(false)} sx={{ mt: 1 }}>
            取消
          </Button>
        </CardContent>
      </Dialog>
    </>
  );
};

export default MouseCard;
