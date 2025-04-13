import {useState} from "react";
import blogService from "../services/blogs.js";

const Blog = ({blog}) => {
    const [blogView, setBlogView] = useState(blog)
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
                {blogView.title} {blogView.author}
                <button onClick={(event) => {
                    event.preventDefault()
                    setView(!view)
                }}>view
                </button>
            </div>
            {view && (
                <div>
                    <p>{blogView.url}</p>
                    <p>{blogView.likes} likes
                        <button onClick={async event => {
                            event.preventDefault()
                            const updatedBlog = await blogService.incrementLikes(blogView);
                            updatedBlog.user = blogView.user;
                            setBlogView(updatedBlog);
                        }}>like
                        </button>
                    </p>
                    <p>{blogView.user?.name}</p>
                </div>
            )}
        </div>
    )
}

export default Blog