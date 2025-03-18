const Notification = ({message, setMessage}) => {

    if (!message || message.trim() === '') {
        return null
    }

    setTimeout(() => {
        setMessage('')
    }, 5000);
    return (
        <div className='error'>
            {message}
        </div>
    )
}

export default Notification;