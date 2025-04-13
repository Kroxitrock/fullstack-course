import {useState} from "react";

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={(event) => {
            event.preventDefault()
            setView(!view)
          }}>view</button>
        </div>
        {view && (
          <div>
            <p>{blog.url}</p>
            <p>{blog.likes} likes<button>like</button></p>
            <p>{blog.user.name}</p>
          </div>
        )}
      </div>
  )
}

export default Blog