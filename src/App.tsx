import CodeEditor from "./components/CodeEditor";
import DescriptionWidget from "./components/Description";
import { makeServer } from "./mirage/index"; 

if ("development") {
  console.log("server start");
  
    makeServer(); 
}

const App = () => {

  return (
    <div
      className="min-h-screen grid grid-cols-2 gap-5 py-5 px-5
      bg-gray-800 dark:bg-gray-800 text-black dark:text-white 
      transition-colors duration-300"
      >
      <DescriptionWidget />
      <CodeEditor />
    </div>
  );
};

export default App;
