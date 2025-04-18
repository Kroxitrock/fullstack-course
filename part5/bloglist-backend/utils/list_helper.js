const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current);
}

const mostBlogs = (blogs) => {
    const authorBlogCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1;
        return acc;
    }, {});

    const authors = Object.keys(authorBlogCount);
    if (authors.length === 0) {
        return null;
    }

    const mostBlogsAuthor = authors.reduce((a, b) => authorBlogCount[a] > authorBlogCount[b] ? a : b);
    return {author: mostBlogsAuthor, blogs: authorBlogCount[mostBlogsAuthor]};
}

const mostLikes = (blogs) => {
    const authorLikeCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {});

    const authors = Object.keys(authorLikeCount);
    if (authors.length === 0) {
        return null;
    }

    const mostLikesAuthor = authors.reduce((a, b) => authorLikeCount[a] > authorLikeCount[b] ? a : b);
    return {author: mostLikesAuthor, likes: authorLikeCount[mostLikesAuthor]};
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};