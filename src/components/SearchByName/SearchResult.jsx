import "./SearchResult.css";

export const SearchResult = ({ result, id, onNameClick}) => {
  const handleNameClick = () => {
    onNameClick(id,result)
    console.log(id);
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
