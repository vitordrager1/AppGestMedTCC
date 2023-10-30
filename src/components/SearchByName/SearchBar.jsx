import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import pessoaService from '../../services/pessoa.service'
import "./SearchBar.css";

export const SearchBar = ({ setResults, setName}) => {
  const [input, setInput] = useState("");
  
  useEffect(() => {
    if (setName) {
      setInput(setName);
    }
  }, [setName]);

  function searchTitle(name) {
    pessoaService.findByName(name)
    .then(response => {
      
      setResults(response.data)
      
      console.log(response.data.map((data)=>data.nome))
    })
    .catch(e => {
    console.log(e);
    });
} 

  const handleChange = (value) => {
    setInput(value);
    searchTitle(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Pesquisar por nome"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        
      />
    </div>
  );
};
