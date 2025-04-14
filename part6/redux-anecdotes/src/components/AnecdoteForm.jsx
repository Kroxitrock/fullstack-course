import {createNewAnecdoteAction} from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target[0].value
        event.target[0].value = ''

        dispatch(createNewAnecdoteAction(content))
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={create}>
                <div><input/></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm;