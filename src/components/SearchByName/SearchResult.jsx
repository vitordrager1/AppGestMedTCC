import "./SearchResult.css";

export const SearchResult = ({ result, id, onNameClick}) => {
  const handleNameClick = () => {
    onNameClick(id,result);
  };
  return (
    <div
      className="search-result" 
      onClick={handleNameClick}
    >
      {result}
    </div>
  );
};
