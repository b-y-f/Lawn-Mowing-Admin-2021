import { useEffect, useState } from 'react';

// material
import {
  MenuItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox
} from '@mui/material';
// service
import bookingService from '../../../services/bookings';
// ----------------------------------------------------------------------

const workersOption = ['Kitty', 'Jimmy', 'The Guy'];

export default function SelectWorkerMenu({ id, worker }) {
  const [selectedWorker, setSelectedWorker] = useState([]);
  //   console.log('selectedWorker', selectedWorker);

  useEffect(() => {
    setSelectedWorker(worker);
  }, [worker]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setSelectedWorker(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleConfirmWorker = (id, worker) => {
    // console.log('err');
    bookingService
      .assignWorker(id, worker)
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 230 }}>
        <InputLabel id="check-workers">Assign Worker</InputLabel>
        <Select
          labelId="check-workers"
          id="check-workers-select"
          multiple
          value={selectedWorker}
          onChange={handleChange}
          input={<OutlinedInput label="Assign Worker" />}
          renderValue={(selected) => selected.join(', ')}
          onClose={() => handleConfirmWorker(id, selectedWorker)}
        >
          {workersOption.map((worker) => (
            <MenuItem key={worker} value={worker}>
              <Checkbox checked={selectedWorker.indexOf(worker) > -1} />
              <ListItemText primary={worker} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
