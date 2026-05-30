import React, { useState, createContext, useContext } from 'react';

const CartContext = createContext();

const Header = ({ setPage }) => {
  const { cart } = useContext(CartContext);
  
  return (
    <header style={{ display: 'flex', justifyContent: 'space-around', background: '#ccc', padding: '15px' }}>
      <h2>Web App</h2>
      <nav style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => setPage('shop')}>Товари</button>
        <button onClick={() => setPage('cart')}>Корзина ({cart.length})</button>
        <button onClick={() => setPage('rivne')}>Рівне (38 шкіл)</button>
      </nav>
    </header>
  );
};

const products = [
  { id: 1, name: 'Клавіатура', price: 800 },
  { id: 2, name: 'Мишка', price: 400 },
  { id: 3, name: 'Монітор', price: 4500 }
];

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Магазин</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        {products.map(p => (
          <div key={p.id} style={{ border: '1px solid black', padding: '15px' }}>
            <h3>{p.name}</h3>
            <p>{p.price} грн</p>
            <button onClick={() => addToCart(p)}>Додати</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  
  return (
    <div style={{ padding: '20px' }}>
      <h2>Корзина</h2>
      {cart.length === 0 ? <h3>Пусто</h3> : null}
      <ul>
        {cart.map((item, i) => (
          <li key={i} style={{ margin: '10px 0' }}>
            {item.name} - {item.price} грн 
            <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: '15px' }}>Видалити</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const schools = [
  "ЗОШ №1", "ЗОШ №2", "ЗОШ №3", "ЗОШ №4", 
  "ЗОШ №5", "ЗОШ №6", "ЗОШ №7", "ЗОШ №8",
  "ЗОШ №9", "ЗОШ №10", "ЗОШ №11", "ЗОШ №12"
];

const Rivne = () => {
  const [page, setPage] = useState(1);
  const limit = 4;

  const lastItem = page * limit;
  const firstItem = lastItem - limit;
  const currentSchools = schools.slice(firstItem, lastItem);
  const pagesCount = Math.ceil(schools.length / limit);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Школи Рівного</h2>
      <ul>
        {currentSchools.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Попередня</button>
        <span style={{ margin: '0 10px' }}>{page} з {pagesCount}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === pagesCount}>Наступна</button>
      </div>
    </div>
  );
};

const App = () => {
  const [activePage, setActivePage] = useState('shop');
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <div>
        <Header setPage={setActivePage} />
        {activePage === 'shop' && <Shop />}
        {activePage === 'cart' && <Cart />}
        {activePage === 'rivne' && <Rivne />}
      </div>
    </CartContext.Provider>
  );
};

export default App;
