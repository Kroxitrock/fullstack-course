import PropTypes from "prop-types";

const Anecdote = ({anecdote, vote}) => {
    return (
        <div>
            <div>{anecdote.content}</div>
            <div>
                has {anecdote.votes} votes
                <button onClick={vote}>vote</button>
            </div>
        </div>
    )
}

Anecdote.propTypes = {
    anecdote: PropTypes.shape({
        content: PropTypes.string.isRequired,
        votes: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired,
    vote: PropTypes.func.isRequired
}

export default Anecdote;