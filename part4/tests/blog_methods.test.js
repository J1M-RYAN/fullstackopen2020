const { totalLikes } = require("../utils/list_helper");
describe("total likes", () => {
  test("works on list with one post", () => {
    const post = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
    ];
    expect(totalLikes(post)).toBe(5);
  });

  test("works on many posts", () => {
    const posts = [
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url:
          "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f9",
        title: "Another title",
        author: "Some author",
        url: "http://www.google.ie",
        likes: 6,
        __v: 0,
      },
      {
        _id: "5a422aa71b54a676234d17f1",
        title: "A different title",
        author: "Some other author",
        url: "http://www.google.com",
        likes: 2,
        __v: 0,
      },
    ];
    expect(totalLikes(posts)).toBe(13);
  });

  test("works where there are no posts", () => {
    expect(totalLikes([])).toBe(0);
  });
});