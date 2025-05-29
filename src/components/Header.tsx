import React from "react";
import { Link } from "react-router-dom";
import { Github, Code } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-xl font-medium text-foreground">
          AGHPB Archive
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github size={16} />
            <span>20.9k stars</span>
          </a>
          <a
            href="https://github.com/matheusaudibert/aghpb-archive"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Code size={16} />
            <span>Open Source</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
