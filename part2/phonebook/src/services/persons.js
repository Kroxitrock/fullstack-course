import axios from "axios";

export const getAllPersons = () => {
    return axios.get("http://localhost:3001/persons");
}

export const addPerson = (newPerson) => {
    return axios.post("http://localhost:3001/persons", newPerson);
}

export const deletePerson = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`);
}

export const updatePerson = (id, newPerson) => {
    return axios.put(`http://localhost:3001/persons/${id}`, newPerson);
}