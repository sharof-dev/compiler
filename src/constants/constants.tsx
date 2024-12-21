export const LANGUAGE_VERSIONS = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    php: "8.2.3",
};

export const CODE_SNIPPETS = {
    javascript: `function greet(name) {\n\tconsole.log("Hello, World!");\n}\n\ngreet("Alex");\n`,
    typescript: `function greet() {\n\tconsole.log("Hello, World!");\n}\n\ngreet();`,
    python: `def greet(name):\n\tprint("Hello, World!")\n\ngreet("Alex")\n`,
    java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello, World!");\n\t}\n}\n`,
    csharp:
        'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World");\n\t\t}\n\t}\n}\n',
    php: "<?php\n\n$log = 'Hello World';\necho $log;\n",
};
