import axios from 'axios';

const baseUrl = 'https://j1ktcuphqg.execute-api.us-east-2.amazonaws.com/dev/quotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const remove = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  return res.data;
};

const updateReplyState = async (id, hasReplied) => {
  const res = await axios.put(`${baseUrl}/${id}`, hasReplied);
  return res.data;
};

export default { getAll, remove, updateReplyState };
