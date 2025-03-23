const Notification = ({message, setMessage, notificationType}) => {

    if (!message || message.trim() === '') {
        return null
    }

    setTimeout(() => {
        setMessage('')
    }, 5000);
    return (
        <div className={notificationType === 'error'? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification;