import React, { useState } from 'react';

const streets = [
  "вул. Соборна",
  "вул. Київська",
  "вул. В'ячеслава Чорновола",
  "вул. Макарова",
  "вул. Дубенська",
  "вул. Відінська",
  "вул. Степана Бандери",
  "вул. Романа Шухевича",
  "вул. Льонокомбінатівська",
  "вул. Млинівська",
  "вул. Княгині Ольги",
  "вул. Михайла Грушевського"
];

const RivneStreets = () => {
  const [page, setPage] = useState(1);
  const limit = 4;

  const lastItem = page * limit;
  const firstItem = lastItem - limit;
  const showStreets = streets.slice(firstItem, lastItem);
  const allPages = Math.ceil(streets.length / limit);

  return (
    <div>
      <h2>Вулиці міста</h2>
      <ul>
        {showStreets.map((street, i) => (
          <li key={i}>{street}</li>
        ))}
      </ul>
      
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Попередня
        </button>
        <span> {page} / {allPages} </span>
        <button onClick={() => setPage(page + 1)} disabled={page === allPages}>
          Наступна
        </button>
      </div>
    </div>
  );
}

export default RivneStreets;
