import { createServer } from "miragejs";

export function makeServer() {
    return createServer({
        routes() {
            this.namespace = "api";

            this.post("/execute", (schema, request) => {
                const { language, code } = JSON.parse(request.requestBody);
                
                
                if (!language || !code) {
                    return { status: "error", error: "Language and code are required" };
                }
                
                const supportedLanguages = ["javascript", "python", "typescript", "java", "php", "csharp"];

                if (!supportedLanguages.includes(language)) {
                    return { status: "error", error: `Unsupported language: ${language}` };
                }

                try {
                    
                    if (code.includes('System.out.println') ||
                        code.includes('print') ||
                        code.includes('console.log') ||
                        code.includes('echo') ||
                        code.includes('Console.WriteLine')) {
                        return { status: "success", output: ["Hello, world!\n"]};
                    } else {
                        throw new Error("SyntaxError: Unexpected token");
                    }
                } catch (err: any) {
                    return { status: "error", error: err.message };
                }
            });
        },
    });
}
