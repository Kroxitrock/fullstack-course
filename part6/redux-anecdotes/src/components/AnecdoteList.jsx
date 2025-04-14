import {useDispatch, useSelector} from "react-redux";
import {createVoteAction} from "../reducers/anecdoteReducer.js";
import Anecdote from "./Anecdote.jsx";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(createVoteAction(id));
    }
    return <>
        {anecdotes.map(anecdote =>
            <Anecdote key={anecdote.id} anecdote={anecdote} vote={() => vote(anecdote.id)}></Anecdote>
        )}
    </>
}

export default AnecdoteList;