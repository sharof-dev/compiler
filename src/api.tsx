import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants/constants";

const API = axios.create({
    // baseURL: "http://localhost:5174/api",
    baseURL: "https://emkc.org/api/v2/piston"

});

export const executeCode = async (language: string, code: string) => {

    try {
        // const response = await API.post("/execute", {
        //     language, 
        //     code,     
        // }); 
        const response = await API.post("/execute", {
            language: language,
            version: LANGUAGE_VERSIONS[language as keyof typeof LANGUAGE_VERSIONS],
            files: [
                {
                    content: code
                }
            ]
        })
        console.log(response.data)
        return response.data; 
    } catch (error: any) {
        console.log(error);
        
        throw new Error(error.response?.data?.error || "Kod ishlatishda xatolik");
    }
};