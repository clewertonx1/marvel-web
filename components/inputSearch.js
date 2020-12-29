import React from "react"
import {AiOutlineSearch} from 'react-icons/ai'


const InputSearch = ({setInputSearchValue}) => {

  const handleWithKeyboardPress = () => {
    setInputSearchValue(document.getElementById("inputSearch").value)   
  }
  return(
    <div className={"search"}>
      <input onKeyPress={() => handleWithKeyboardPress()} id={"inputSearch"}/>
      <div className={"iconDivSearch"}>
        <AiOutlineSearch/>
      </div>
    </div>
  )

}

export default InputSearch