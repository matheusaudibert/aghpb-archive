import { useState, useEffect } from "react";

export interface GitHubItem {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

// Lista de linguagens/diretórios disponíveis
const AVAILABLE_LANGUAGES = [
  "A++",
  "ABAP",
  "AI",
  "APL",
  "ASM",
  "Ada",
  "Agda",
  "Algorithms",
  "Angular",
  "Architecture",
  "Beef",
  "C",
  "CSharp",
  "C++",
  "CMake",
  "CSS",
  "Clojure",
  "Cobol",
  "CoffeeScript",
  "Compilers",
  "Computer Graphics",
  "Cuda",
  "D",
  "Dart",
  "Delphi",
  "Design Patterns",
  "Editors",
  "Elixir",
  "Elm",
  "Erlang",
  "FSharp",
  "FORTH",
  "Fortran",
  "GDScript",
  "Git",
  "Go",
  "Godot",
  "Haskell",
  "HoTT",
  "HolyC",
  "Idris",
  "Java",
  "Javascript",
  "Julia",
  "Kotlin",
  "Linux",
  "Lisp",
  "Lua",
  "MUMPS",
  "Math",
  "Memes",
  "Mixed",
  "MongoDB",
  "Nim",
  "NodeJs",
  "OCaml",
  "Objective-C",
  "Orchestrator",
  "Other",
  "PHP",
  "Perl",
  "Personification",
  "PowerShell",
  "Prolog",
  "Purescript",
  "Python",
  "Quantum Computing",
  "R",
  "ReCT",
  "RayTracing",
  "Racket",
  "Regex",
  "Ruby",
  "Rust",
  "SICP",
  "SQL",
  "Scala",
  "Shell",
  "Smalltalk",
  "Solidity",
  "Swift",
  "Systems",
  "Typescript",
  "UEFI",
  "Uncategorized",
  "Unity",
  "Unreal",
  "V",
  "VHDL",
  "VueJS",
  "Verilog",
  "Visual Basic",
  "Vulkan",
  "WebGL",
];

export const useFetchDirectories = () => {
  const [directories, setDirectories] = useState<GitHubItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirectories = async () => {
      try {
        setLoading(true);

        // Simula a estrutura da API do GitHub para os diretórios
        const dirs = AVAILABLE_LANGUAGES.map((language, index) => ({
          name: language,
          path: language,
          sha: `sha-${index}`,
          size: 0,
          url: "",
          html_url: "",
          git_url: "",
          download_url: null,
          type: "dir" as const,
          _links: {
            self: "",
            git: "",
            html: "",
          },
        }));

        setDirectories(dirs);
      } catch (err) {
        console.error("Error fetching directories:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch directories"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDirectories();
  }, []);

  return { directories, loading, error };
};

export const useFetchImages = (language: string) => {
  const [images, setImages] = useState<GitHubItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!language) return;

      try {
        setLoading(true);

        // Usa import.meta.glob para carregar todas as imagens de uma pasta
        const imageModules = import.meta.glob(
          "/src/assets/**/*.{png,jpg,jpeg,gif,webp}",
          {
            eager: true,
            as: "url",
          }
        );

        console.log("All image modules:", imageModules);

        // Filtra apenas as imagens da linguagem específica
        const languageImages: GitHubItem[] = [];

        Object.entries(imageModules).forEach(([path, url]) => {
          // Extrai o nome da pasta do caminho
          const pathMatch = path.match(/\/src\/assets\/([^\/]+)\/(.+)/);
          if (pathMatch) {
            const [, folderName, fileName] = pathMatch;

            console.log(
              `Checking: ${folderName} === ${language}`,
              folderName === language
            );

            if (folderName === language) {
              languageImages.push({
                name: fileName,
                path: `${language}/${fileName}`,
                sha: `img-${fileName}`,
                size: 0,
                url: "",
                html_url: "",
                git_url: "",
                download_url: url as string,
                type: "file",
                _links: {
                  self: "",
                  git: "",
                  html: "",
                },
              });
            }
          }
        });

        console.log(
          `Found ${languageImages.length} images for ${language}:`,
          languageImages
        );
        setImages(languageImages);
      } catch (err) {
        console.error(`Error fetching images for ${language}:`, err);
        setError(
          err instanceof Error
            ? err.message
            : `Failed to fetch images for ${language}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [language]);

  return { images, loading, error };
};
