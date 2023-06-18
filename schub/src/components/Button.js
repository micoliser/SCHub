function Button ({ className, name, text, click }) {
  return (
    <button className={className} name={name} onClick={click}>
      {text}
    </button>
  );
}

export default Button;
