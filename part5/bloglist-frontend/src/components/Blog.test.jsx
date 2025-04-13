import {expect, test} from "vitest";
import Blog from "./Blog.jsx";
import {render} from "@testing-library/react";


test("renders correctly", () => {
    const blog = {
        title: "Test Title",
        author: "Test Author",
        url: "https://example.com",
        likes: 5,
        user: {
            name: "Test User"
        }
    }
    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent("Test Title")
    expect(component.container).toHaveTextContent("Test Author")
    expect(component.container).not.toHaveTextContent("https://example.com")
    expect(component.container).not.toHaveTextContent("5 likes")
    expect(component.container).not.toHaveTextContent("Test User")
})