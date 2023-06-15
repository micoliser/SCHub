function Button ({ name, text, click }) {
  return (
    <button name={name} onClick={click}>
      {text}
    </button>
  );
}

export default Button;
