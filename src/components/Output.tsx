import { FC, useState } from "react";
import * as monaco from "monaco-editor";
import { executeCode } from "../api";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OutputProps {
  editorRef: monaco.editor.IStandaloneCodeEditor | null;
  language: string;
}

const showToast = (message: string, type: "error" | "success" | "info") => {
  toast(message, {
    position: "top-right",
    autoClose: 3000,
    theme: "dark",
    transition: Bounce,
    type,
  });
};

const Output: FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const source = editorRef?.getValue();
    if (!editorRef || !source) {
      showToast("Editor is not ready or source code is empty!", "info");
      return;
    }

    try {
      setIsLoading(true);
      // const res = await executeCode(language, source);
      const { run } = await executeCode(language, source);
      console.log(run);

      if (run) {
        setOutput(run.output ? run.output.split("\n") : []);
        setIsError(Boolean(run.error));
        if (run.error) {
          showToast(run.error, "error");
        } else {
          showToast("Code executed successfully!", "success");
        }
      } else {
        showToast("No output returned from the execution", "info");
      }
    } catch (error: any) {
      console.error(error);
      showToast(`${error?.message || "Unable to run code"}`, "error");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="flex gap-5 items-center">
        <h1 className="text-white mb-2">Output: </h1>
        <button
          onClick={runCode}
          disabled={isLoading}
          className={`border-green-300 border rounded-lg py-2 px-2 mb-4 text-white transition-colors duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-300"
            }`}
        >
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>
      <div
        className={`h-[30vh] w-full p-2 ${isError ? "border-red-500 text-red-500" : "border-green-300 text-white"
          } rounded-lg border overflow-y-auto`}
      >
        {Array.isArray(output) && output.length > 0
          ? output.map((line: string, i: number) => <p key={i}>{line}</p>)
          : "Click 'Run Code' to see the output"}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Output;
