import React from "react";
import { useState, useRef } from "react";

const Header = (props) => {
  const headerStyle = {
    background: "orange",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
  };
  const [id, setId] = useState(0);
  const addProduct = props.addProductFunc;

  const inputRef = useRef();

  const changeId = (event) => {
    setId(event.target.value);
    // console.log(event.target.value)
  };

  const addSingleProduct = (event) => {
    event.preventDefault();
    inputRef.current.value = "";
    inputRef.current.focus();
    addProduct(id);
    setId(0);
  };

  return (
    <header style={headerStyle}>
      <h1>支払いページ</h1>
      <form className="input-group">
        <input
          type="text"
          name="id"
          ref={inputRef}
          className="form-control"
          placeholder="idを入力"
          onChange={changeId}
        />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={addSingleProduct}
        >
          探す
        </button>
      </form>
    </header>
  );
};

export default Header;
