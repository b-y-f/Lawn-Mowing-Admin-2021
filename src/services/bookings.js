import axios from 'axios';

const baseUrl = 'https://p525ut58ek.execute-api.us-east-2.amazonaws.com/dev/bookings';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const approveById = async (id) => {
  const res = await axios.put(`${baseUrl}/${id}`, { status: 'approved' });
  return res.data;
};

const declineById = async (id) => {
  const res = await axios.put(`${baseUrl}/${id}`, { status: 'declined' });
  return res.data;
};

const completeById = async (id) => {
  const res = await axios.put(`${baseUrl}/${id}`, { status: 'completed' });
  return res.data;
};

const assignWorker = async (id, worker) => {
  const filteredWorker = worker.filter((w) => w !== undefined && w !== null);
  const res = await axios.put(`${baseUrl}/${id}`, { worker: filteredWorker });
  return res.data;
};

export default { getAll, approveById, declineById, completeById, assignWorker };
