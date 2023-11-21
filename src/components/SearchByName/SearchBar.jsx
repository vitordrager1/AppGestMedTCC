import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import pessoaService from '../../services/pessoa.service'
import "./SearchBar.css";

export const SearchBar = ({setShowResults, setResults, setName}) => {
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
    })
    .catch(e => {
    console.log(e);
    });
} 

  const handleChange = (value) => {
    setInput(value);
    searchTitle(value);
  };

  function showResultsTrueHandleChange () {
    setShowResults(true)
  }
  function showResultsFalseChange () {
    setTimeout(() => {
      setShowResults(false)
    }, 250);
    
  }

  return (
    <div className="input-wrapper">
      
      <input
        onFocus={showResultsTrueHandleChange}
        onBlur={showResultsFalseChange}
        placeholder="Pesquisar por nome"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        
      />
    </div>
  );
};
