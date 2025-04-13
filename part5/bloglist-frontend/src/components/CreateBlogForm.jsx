const CreateBlogForm = ({ handleCreateBlog, setShowCreateForm }) => {
    return (<form onSubmit={event => {
        handleCreateBlog(event)
        setShowCreateForm(false)
        }}>
        <h2>create new</h2>
        <div>
            title
            <input type="text" name="title" />
        </div>
        <div>
            author
            <input type="text" name="author" />
        </div>
        <div>
            url
            <input type="text" name="url" />
        </div>
        <button type="submit">create</button>
    </form>)
}

export default CreateBlogForm