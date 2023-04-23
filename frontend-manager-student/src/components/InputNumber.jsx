const InputNumber = ({ number, setNumber }) => {
  const updateQuantity = (type) => {
    if (type === 'minus') {
      setNumber(number - 1 < 1 ? 1 : number - 1);
    } else {
      setNumber(number + 1);
    }
  };

  return (
    <div className="cart__item__info__quantity">
      <span className="product__info__item__quantity">
        <div className="product__info__item__quantity__btn minus" onClick={() => updateQuantity('minus')}>
          <i className="bx bx-minus"></i>
        </div>
        <div className="product__info__item__quantity__input">{number}</div>
        <div className="product__info__item__quantity__btn" onClick={() => updateQuantity('plus')}>
          <i className="bx bx-plus"></i>
        </div>
      </span>
    </div>
  );
};

export default InputNumber;
