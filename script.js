import React, { useState } from 'react';

const RailwaySystem = () => {
  const [trains, setTrains] = useState([]);
  
  const [number, setNumber] = useState('');
  const [h, setH] = useState('');
  const [m, setM] = useState('');
  const [s, setS] = useState('');
  const [destination, setDestination] = useState('');
  
  const [findNum, setFindNum] = useState('');
  const [findDest, setFindDest] = useState('');

  const addTrain = () => {
    const newTrain = {
      number: Number(number),
      h: Number(h),
      m: Number(m),
      s: Number(s),
      destination: destination
    };
    setTrains([...trains, newTrain]);
    setNumber('');
    setH('');
    setM('');
    setS('');
    setDestination('');
  };

  const editTime = () => {
    const updatedTrains = trains.map(t => {
      if (t.number === Number(number)) {
        return { ...t, h: Number(h), m: Number(m), s: Number(s) };
      }
      return t;
    });
    setTrains(updatedTrains);
  };

  const sortTrains = () => {
    const sorted = [...trains].sort((a, b) => {
      if (a.h !== b.h) return a.h - b.h;
      if (a.m !== b.m) return a.m - b.m;
      return a.s - b.s;
    });
    setTrains(sorted);
  };

  const saveToFile = () => {
    const data = JSON.stringify(trains);
    localStorage.setItem('trainsData', data);
    alert('Збережено');
  };

  const loadFromFile = () => {
    const data = localStorage.getItem('trainsData');
    if (data) {
      setTrains(JSON.parse(data));
    }
  };

  const filteredTrains = trains.filter(t => {
    if (findNum && t.number !== Number(findNum)) return false;
    if (findDest && t.destination !== findDest) return false;
    return true;
  });

  return (
    <div>
      <h2>Додати / Редагувати потяг</h2>
      <div>
        <input placeholder="Номер" value={number} onChange={e => setNumber(e.target.value)} />
        <input placeholder="Години" value={h} onChange={e => setH(e.target.value)} />
        <input placeholder="Хвилини" value={m} onChange={e => setM(e.target.value)} />
        <input placeholder="Секунди" value={s} onChange={e => setS(e.target.value)} />
        <input placeholder="Станція" value={destination} onChange={e => setDestination(e.target.value)} />
      </div>
      <div>
        <button onClick={addTrain}>Додати потяг</button>
        <button onClick={editTime}>Редагувати час (за номером)</button>
      </div>

      <h2>Керування</h2>
      <div>
        <button onClick={sortTrains}>Відсортувати за часом</button>
        <button onClick={saveToFile}>Записати в файл</button>
        <button onClick={loadFromFile}>Зчитати з файлу</button>
      </div>

      <h2>Пошук</h2>
      <div>
        <input placeholder="Знайти за номером" value={findNum} onChange={e => setFindNum(e.target.value)} />
        <input placeholder="Знайти за станцією" value={findDest} onChange={e => setFindDest(e.target.value)} />
      </div>

      <h2>Список потягів</h2>
      <ul>
        {filteredTrains.map((t, index) => (
          <li key={index}>
            Потяг №{t.number} | Час: {t.h}:{t.m}:{t.s} | Станція: {t.destination}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RailwaySystem;
