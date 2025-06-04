import React from "react";
import { Link } from "react-router-dom";
import { GitHubItem } from "../services/githubService";

interface LanguageCardProps {
  language: GitHubItem;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ language }) => {
  const formatLanguageName = (name: string) => {
    return name.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <Link
      to={`/language/${encodeURIComponent(language.name)}`}
      className="block p-6 border border-border rounded-lg bg-background hover:bg-muted transition-colors"
    >
      <h3 className="font-medium text-foreground mb-1">
        {formatLanguageName(language.name)}
      </h3>
      <p className="text-sm text-muted-foreground">
        Anime Girls Holding {formatLanguageName(language.name)} Books
      </p>
    </Link>
  );
};

export default LanguageCard;
