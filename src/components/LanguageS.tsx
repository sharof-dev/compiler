import { FC } from "react";
import { LANGUAGE_VERSIONS } from "../constants/constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
interface LanguageSProps {
    language: string | undefined;
    onSelect: (lang: string) => void;
}

const LanguageS: FC<LanguageSProps> = ({ language, onSelect }) => {
    return (
        <div className="ml-2 mb-4">
            <h1 className="mb-2 text-lg text-white">Language:</h1>
            <div className="relative w-64">
                <select
                    className="block appearance-none w-full bg-gray-800 text-white border border-gray-600 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={language || ""}
                    onChange={(e) => onSelect(e.target.value)}
                >
                    {languages.map(([lang, version]) => (
                        <option
                            key={lang}
                            value={lang}
                            className={
                                lang === language
                                    ? "bg-gray-700 text-blue-400"
                                    : "bg-gray-800 text-white"
                            }
                        >
                            {lang} ({version})
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default LanguageS;
