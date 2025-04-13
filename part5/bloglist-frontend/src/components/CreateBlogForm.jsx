import {useState} from "react";

const CreateBlogForm = ({ handleCreateBlog, setShowCreateForm }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        handleCreateBlog({ title, author, url })
        setShowCreateForm(false)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (<form onSubmit={event => handleSubmit(event)}>
        <h2>create new</h2>
        <div>
            title
            <input type="text" name="title" data-testid="title" value={title} id="title"
                   onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div>
            author
            <input type="text" name="author" data-testid="author" value={author} id="author"
                   onChange={(event) => setAuthor(event.target.value)} />
        </div>
        <div>
            url
            <input type="text" name="url" data-testid="url" value={url} id="url"
                   onChange={(event) => setUrl(event.target.value)} />
        </div>
        <button type="submit" id="create-button">create</button>
    </form>)
}

export default CreateBlogForm