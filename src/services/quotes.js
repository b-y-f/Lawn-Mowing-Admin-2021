import axios from 'axios';

const baseUrl = 'https://j1ktcuphqg.execute-api.us-east-2.amazonaws.com/dev/quotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export default { getAll };
