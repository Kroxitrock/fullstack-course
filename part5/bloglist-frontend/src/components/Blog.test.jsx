import {expect, test, vi} from "vitest";
import Blog from "./Blog.jsx";
import {act, render} from "@testing-library/react";


const blog = {
    title: "Test Title",
    author: "Test Author",
    url: "https://example.com",
    likes: 5,
    user: {
        name: "Test User"
    }
}

test("renders correctly", () => {
    const component = render(<Blog blog={blog}/>)

    expect(component.container).toHaveTextContent("Test Title")
    expect(component.container).toHaveTextContent("Test Author")
    expect(component.container).not.toHaveTextContent("https://example.com")
    expect(component.container).not.toHaveTextContent("5 likes")
    expect(component.container).not.toHaveTextContent("Test User")
})

test("renders url and likes when view button is clicked", () => {
    const component = render(<Blog blog={blog}/>)
    const button = component.getByText("view")
    act(() => button.click())
    expect(component.container).toHaveTextContent("Test Title")
    expect(component.container).toHaveTextContent("Test Author")
    expect(component.container).toHaveTextContent("https://example.com")
    expect(component.container).toHaveTextContent("5 likes")
    expect(component.container).toHaveTextContent("Test User")
    expect(component.container).toHaveTextContent("remove")
})

test("clicking the like button twice calls event handler twice", async () => {
    const mockHandler = vi.fn()
    const component = render(<Blog blog={blog} onLike={mockHandler}/>)
    const viewButton = component.getByText("view")
    act(() => viewButton.click())
    const likeButton = component.getByText("like")
    act(() => likeButton.click())
    act(() => likeButton.click())
    expect(mockHandler.mock.calls).toHaveLength(2)
})