import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
    blogService.getAll().then(blogs =>
        setBlogs( blogs )
    )}, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    if (user === null) {
        return (
            <div>
                <h2>login</h2>
                <form onSubmit={event => {
                event.preventDefault()
                const username = event.target.username.value
                const password = event.target.password.value
                blogService.login({ username, password })
                    .then(user => {
                        setUser(user)
                        localStorage.setItem('user', JSON.stringify(user))
                        blogService.setToken(user.token)
                        event.target.username.value = ''
                        event.target.password.value = ''
                    })
                    .catch(error => {
                        console.error('Login failed:', error)
                    })
                }}>
                <div>
                    username
                    <input type="text" name="username" />
                </div>
                <div>
                    password
                    <input type="password" name="password" />
                </div>
                <button type="submit">login</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <h2>{user.name} logged in <button onClick={event => {
                    event.preventDefault()
                    window.localStorage.removeItem('user')
                    setUser(null)
                    blogService.setToken(null)
                }}>logout</button></h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )}
                <form onSubmit={event => {
                    event.preventDefault()
                    const title = event.target.title.value
                    const author = event.target.author.value
                    const url = event.target.url.value
                    blogService.create({ title, author, url })
                        .then(newBlog => {
                            setBlogs(blogs.concat(newBlog))
                            event.target.title.value = ''
                            event.target.author.value = ''
                            event.target.url.value = ''
                        })
                        .catch(error => {
                            console.error('Blog creation failed:', error)
                        })
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
                </form>
            </div>
        )
    }
}

export default App