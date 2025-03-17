const Contact = ({contact, deleteCallback}) => {

    return (<div>
        <span>{contact.name} {contact.number}</span>
        <button onClick={deleteCallback(contact.id)}> delete </button>
    </div>);
}

export default Contact;