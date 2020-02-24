import React from "react";
import RecipeList from "../components/RecipeList";
import MenuAppBar from "../components/MenuAppBar";
// import { RecipeInputForm } from "../components/RecipeInputForm";

// const RecipeAddOptions = () => {
//   const [url, setUrl] = React.useState("");

//   const handleUrlScrape = e => {
//     e.preventDefault();
//     console.log(`do something with url:${url}`);
//     setUrl("");
//   };

//   return (
//     <form onSubmit={handleUrlScrape}>
//       <input
//         type="text"
//         name="url"
//         value={url}
//         onChange={e => setUrl(e.target.value)}
//         placeholder="paste recipe url here"
//       ></input>
//       <input type="submit" value="Grab this recipe!"></input>
//     </form>
//   );
// };

export default function recipe() {
  return (
    <div>
      <MenuAppBar title={"Recipes"} />
      {/* <RecipeAddOptions /> */}
      {/* <RecipeInputForm /> */}
      <div id="main-container">
        <RecipeList />
      </div>
    </div>
  );
}
