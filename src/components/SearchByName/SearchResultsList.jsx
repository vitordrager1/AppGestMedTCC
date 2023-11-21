import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results, onNameClick }) => {
  return (
    <div className="results-list">
      {results.map((result) => {
        return (
          <SearchResult
            key={result.IdPessoa}
            result={result.nome}
            id={result.IdPessoa}
            onNameClick={onNameClick}
          />
        );
      })}
    </div>
  );
};
