import {expect, test, vi} from "vitest";
import {act, fireEvent, render} from "@testing-library/react";
import CreateBlogForm from "./CreateBlogForm.jsx";

test("form submission calls event handler with correct data", () => {
    const mockHandler = vi.fn()
    const setShowCreateForm = vi.fn()
    const component = render(<CreateBlogForm handleCreateBlog={mockHandler} setShowCreateForm={setShowCreateForm}/>)
    const titleInput = component.getByTestId("title")
    const authorInput = component.getByTestId("author")
    const urlInput = component.getByTestId("url")

    act(() => {
        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(authorInput, { target: { value: "Test Author" } });
        fireEvent.change(urlInput, { target: { value: "https://example.com" } });
    })

    const button = component.getByText("create")
    act(() => button.click())
    expect(mockHandler.mock.calls).toHaveLength(1)

    expect(mockHandler.mock.calls[0][0].title).toEqual("Test Title")
    expect(mockHandler.mock.calls[0][0].author).toEqual("Test Author")
    expect(mockHandler.mock.calls[0][0].url).toEqual("https://example.com")
})