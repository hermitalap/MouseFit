import React, { useState, useEffect } from 'react';
import { Card, CardContent, TextField, Select, MenuItem } from '@mui/material';
import useStore, { Mouse } from '../store';

interface Props {
  mouse: Mouse;
}

const MouseCard: React.FC<Props> = ({ mouse }) => {
  const updateMouse = useStore(state => state.updateMouse);
  const [data, setData] = useState(mouse);

  useEffect(() => {
    setData(mouse);
  }, [mouse]);

  const handleChange = (key: keyof Mouse, value: any) => {
    const updated = { ...data, [key]: value } as Mouse;
    setData(updated);
    updateMouse(updated);
  };

  return (
    <Card
      variant="outlined"
      draggable
      onDragStart={e => e.dataTransfer.setData('text/plain', mouse.id)}
      sx={{ minWidth: 200, mr: 2, p: 1 }}
    >
      <CardContent sx={{ p: 1 }}>
        <TextField
          label="耳标"
          fullWidth
          margin="dense"
          value={data.earTag}
          onChange={e => handleChange('earTag', e.target.value)}
        />
        <TextField
          label="品系"
          fullWidth
          margin="dense"
          value={data.strain}
          onChange={e => handleChange('strain', e.target.value)}
        />
        <Select
          fullWidth
          margin="dense"
          value={data.gender}
          onChange={e => handleChange('gender', e.target.value as 'M' | 'F')}
          sx={{ mt: 1 }}
        >
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="F">F</MenuItem>
        </Select>
        <TextField
          label="基因型"
          fullWidth
          margin="dense"
          value={data.genotypeStatus}
          onChange={e => handleChange('genotypeStatus', e.target.value)}
        />
        <TextField
          label="备注"
          fullWidth
          margin="dense"
          value={data.notes}
          onChange={e => handleChange('notes', e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default MouseCard;
