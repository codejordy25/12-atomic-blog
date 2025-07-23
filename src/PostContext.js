import { createContext, useContext, useState } from "react";
import { faker } from "@faker-js/faker";
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//1) CREATE CONTEXT

const PostContext = createContext();
function PostProvider() {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }
  return (
    //ici nous renvoyonns le contexte, mais nous ne faions rien avec les enfants
    //Nous allons le faire dans App.js
    <PostContext.Provider
      value={{
        posts: searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,
      }}
    ></PostContext.Provider>
  );
}
//avec cette methode on doit respecter la syntaxe de l'export dans le fichier  de l'mportation
function usePosts() {
  const context = useContext(PostContext);
  return context;
}
export { PostContext, usePosts };
