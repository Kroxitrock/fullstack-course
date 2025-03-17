import axios from "axios";

export const getAllPersons = () => {
    return axios.get("http://localhost:3001/persons");
}

export const addPerson = (newPerson) => {
    return axios.post("http://localhost:3001/persons", newPerson);
}
