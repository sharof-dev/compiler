import { createServer, Response, Request } from "miragejs";

export function makeServer() {
    return createServer({
        routes() {
            this.namespace = "api";

            this.post("/execute", (schema, request: Request) => {
                const { language, code } = JSON.parse(request.requestBody);
                console.log(schema);
                
                if (!language || !code) {
                    return new Response(400, {}, { status: "error", error: "Language and code are required" });
                }

                const supportedLanguages = ["javascript", "python", "typescript", "java", "php", "csharp"];

                if (!supportedLanguages.includes(language)) {
                    return new Response(400, {}, { status: "error", error: `Unsupported language: ${language}` });
                }

                try {
                    if (
                        code.includes("System.out.println") ||
                        code.includes("print") ||
                        code.includes("console.log") ||
                        code.includes("echo") ||
                        code.includes("Console.WriteLine")
                    ) {
                        return new Response(200, {}, { status: "success", output: ["Hello, world!\n"] });
                    } else {
                        throw new Error("SyntaxError: Unexpected token");
                    }
                } catch (err: any) {
                    return new Response(500, {}, { status: "error", error: err.message });
                }
            });
        },
    });
}
