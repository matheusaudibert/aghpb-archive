import React from "react";
import Header from "../components/Header";
import LanguageCard from "../components/LanguageCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { useFetchDirectories } from "../services/githubService";

const Index: React.FC = () => {
  const { directories, loading, error } = useFetchDirectories();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              AGHPB Archive
            </h1>
            <p className="text-muted-foreground text-base max-w-3xl mx-auto leading-relaxed">
              A web-based version of the iconic GitHub repository{" "}
              <a
                href="https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Anime Girls Holding Programming Books
              </a>{" "}
              created by{" "}
              <a
                href="https://github.com/cat-milk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                cat-milk
              </a>
              . A curated gallery that celebrates the intersection of
              programming, open-source, and anime culture.
            </p>
          </div>

          {loading && (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <ErrorMessage
                message={error}
                onRetry={() => window.location.reload()}
              />
            </div>
          )}

          {!loading && !error && (
            <div className="card-container">
              {directories.map((dir) => (
                <LanguageCard key={dir.sha} language={dir} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
