import {useDispatch, useSelector} from 'react-redux'
import {createVoteAction} from "./reducers/anecdoteReducer.js";
import AnecdoteForm from "./components/AnecdoteForm.jsx";

const App = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(createVoteAction(id));
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
            <AnecdoteForm></AnecdoteForm>
        </div>
    )
}

export default App