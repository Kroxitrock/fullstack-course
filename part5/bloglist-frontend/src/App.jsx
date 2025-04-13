import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from "./components/Notification.jsx";
import Toggleable from "./components/Toggleable.jsx";
import CreateBlogForm from "./components/CreateBlogForm.jsx";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState('')
    const [notificationType, setNotificationType] = useState('')
    const [showCreateForm, setShowCreateForm] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const onDelete = (id) => {
        setBlogs(blogs.filter(blog => blog.id !== id))
    }

    const onLike = async (blog) => {
        const updatedBlog = await blogService.incrementLikes(blog);
        updatedBlog.user = blog.user
        setBlogs(blogs
            .map(blog => blog.id === updatedBlog.id ? updatedBlog : blog)
            .sort((a, b) => b.likes - a.likes)
        )
    }

    if (user === null) {
        return (
            <div>
                <h2>login</h2>
                <Notification message={message} setMessage={setMessage}
                              notificationType={notificationType}></Notification>
                <form onSubmit={event => {
                    event.preventDefault()
                    const username = event.target.username.value
                    const password = event.target.password.value
                    blogService.login({username, password})
                        .then(user => {
                            setUser(user)
                            localStorage.setItem('user', JSON.stringify(user))
                            blogService.setToken(user.token)
                            event.target.username.value = ''
                            event.target.password.value = ''
                        })
                        .catch(error => {
                            setMessage('wrong username or password')
                            setNotificationType('error')
                            console.error('Login failed:', error)
                        })
                }}>
                    <div>
                        username
                        <input type="text" name="username" id="username"/>
                    </div>
                    <div>
                        password
                        <input type="password" name="password" id="password"/>
                    </div>
                    <button type="submit" id="login-button">login</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <Notification message={message} setMessage={setMessage}
                              notificationType={notificationType}></Notification>
                <h2>{user.name} logged in <button onClick={event => {
                    event.preventDefault()
                    window.localStorage.removeItem('user')
                    setUser(null)
                    blogService.setToken(null)
                }}>logout</button></h2>
                {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} onDelete={onDelete} onLike={onLike}/>
                )}
                <Toggleable buttonLabel="new blog" show={showCreateForm} setShowCreateForm={setShowCreateForm}>
                    <CreateBlogForm setShowCreateForm={setShowCreateForm} handleCreateBlog={blog => {
                        blogService.create(blog)
                            .then(newBlog => {
                                setBlogs(blogs.concat(newBlog))
                                setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
                                setShowCreateForm(false)
                                setNotificationType('success')
                            })
                            .catch(error => {
                                setMessage('blog creation failed')
                                setNotificationType('error')
                                console.error('Blog creation failed:', error)
                            })
                    }
                    }></CreateBlogForm>
                </Toggleable>
            </div>
        )
    }
}

export default App