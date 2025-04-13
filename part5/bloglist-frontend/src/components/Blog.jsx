import {useState} from "react";
import blogService from "../services/blogs.js";

const Blog = ({blog, onDelete, onLike}) => {
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
                <button
                    id={`view-button-${blog.title}`}
                    onClick={(event) => {
                        event.preventDefault()
                        setView(!view)
                    }}>view
                </button>
            </div>
            {view && (
                <div>
                    <p>{blog.url}</p>
                    <p>{blog.likes} likes
                        <button onClick={async event => {
                            event.preventDefault()
                            onLike(blog)
                        }}>like
                        </button>
                    </p>
                    <p>{blog.user?.name}</p>
                    <button onClick={(event) => {
                        event.preventDefault()
                        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
                            blogService.remove(blog.id)
                                .then(() => {
                                    onDelete(blog.id)
                                })
                                .catch(error => {
                                    console.error('Error removing blog:', error)
                                })
                        }
                    }}>remove
                    </button>
                </div>
            )}
        </div>
    )
}

export default Blog