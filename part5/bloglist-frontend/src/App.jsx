import {useEffect, useState} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
          {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
          )}
        </div>
    )
  }
}

export default App