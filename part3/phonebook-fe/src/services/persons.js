import axios from "axios";

export const getAllPersons = () => {
    return axios.get("https://fullstack-course-aoco.onrender.com/api/persons");
}

export const addPerson = (newPerson) => {
    return axios.post("https://fullstack-course-aoco.onrender.com/api/persons", newPerson);
}

export const deletePerson = (id) => {
    return axios.delete(`https://fullstack-course-aoco.onrender.com/api/persons/${id}`);
}

export const updatePerson = (id, newPerson) => {
    return axios.put(`https://fullstack-course-aoco.onrender.com/api/persons/${id}`, newPerson);
}