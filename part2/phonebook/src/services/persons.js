import axios from "axios";
const baseUrl = "https://yvd9dk.deta.dev/api/persons";

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((response) => response.data);
};

const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((response) => response.data);
};

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject);
  return req.then((response) => response.data);
};

const remove = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req.then((res) => res.data);
};

const exports = { getAll, create, update, remove };

export default exports;
