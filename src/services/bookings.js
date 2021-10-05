import axios from 'axios';

const baseUrl = 'https://p525ut58ek.execute-api.us-east-2.amazonaws.com/dev/bookings';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { getAll };
