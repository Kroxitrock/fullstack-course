const ContactForm = ({props}) => {
    return <form onSubmit={e => props.handleSubmit(e)}>
        <div>
            name: <input onChange={e => props.setNewName(e.target.value)} value={props.newName}/>
        </div>
        <div>
            number: <input onChange={e => props.setNewNumber(e.target.value)} value={props.newNumber}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default ContactForm;