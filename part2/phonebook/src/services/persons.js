import axios from "axios";
const baseUrl = "http://localhost:3000/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = newObject => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id, name) => {
  if (window.confirm(`Do you really want to delete ${name}?`)) {
    console.log("person", id, "is removed");
    return axios.delete(`${baseUrl}/${id}`);
  }
};

export default { getAll, create, update, remove };