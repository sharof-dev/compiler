import { Editor, OnMount } from "@monaco-editor/react";
import { useRef, useState } from "react";
import * as monaco from "monaco-editor";
import LanguageS from "./LanguageS";
import { CODE_SNIPPETS } from "../constants/constants";
import Output from "./Output";

const CodeEditor = () => {
  const [value, setValue] = useState<string | undefined>(CODE_SNIPPETS["javascript"] || "");
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<string | undefined>("javascript");

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language: string | undefined) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language as keyof typeof CODE_SNIPPETS] || "");
    if (editorRef.current) {
      monaco.editor.setModelLanguage(
        editorRef.current.getModel() as monaco.editor.ITextModel,
        language || "plaintext"
      );
    }
  };

  return (
    <div className="flex flex-col w-full lg:gap-7">
      <div>
        <LanguageS language={language} onSelect={onSelect} />
        <Editor
          height="40vh"
          language={language}
          onMount={onMount}
          theme="vs-dark"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
      <div>
        <Output editorRef={editorRef.current} language={language || "javascript"} />
      </div>
    </div>
  );
};

export default CodeEditor;
