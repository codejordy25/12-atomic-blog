import { createContext, useState } from "react";
import { faker } from "@faker-js/faker";
function createRandomPost() {
  return {
    title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    body: faker.hacker.phrase(),
  };
}

//1) CREATE CONTEXT

const PostContext = createContext();
// Children c'est pour donner accés au consommateur d'avoir accés à ces donné
if (PostContext === undefined) {
  throw new Error("the value was used outside provider");
}
function PostProvider({ children }) {
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
    //2) PROVIDE VALUE TO CHILD COMPONENTS
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
    >
      {children}
    </PostContext.Provider>
  );
}
//avec cette methode on doit respecter la syntaxe de l'export dans le fichier  de l'mportation
// function usePosts() {
//   const context = useContext(PostContext);
//   return context;
// }
export { PostProvider, PostContext };
