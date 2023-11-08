import React, { useCallback, useEffect, useState } from 'react';
import './Form.css';
import { useTelegram } from "../../hooks/useTelegram";

const Form = () => {
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [size, setSize] = useState('');
  const [url, setUrl] = useState('');
  const [subject, setSubject] = useState('shoes');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      username,
      city,
      size,
      url,
      subject
    };
    tg.sendData(JSON.stringify(data));
    // setUsername('');
    // setCity('');
    // setSize('');
    // setUrl('');
    // setSubject('shoes');
}, [username, city, size, url, subject]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить'
    });
  }, []);

  useEffect(() => {
    if (!city || !url || !username || !size) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [city, url, username, size]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const onChangeSize = (e) => {
    setSize(e.target.value);
  };

  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  return (
    <div className="form">
      <h3>Введите ваши данные</h3>
      <input
        className="input"
        id="username"
        type="text"
        placeholder="Ник в Telegram"
        value={username}
        onChange={onChangeUsername}
      />
      <input
        className="input"
        id="city"
        type="text"
        placeholder="Город отправки"
        value={city}
        onChange={onChangeCity}
      />
      <input
        className="input"
        id="size"
        type="text"
        placeholder="Размер"
        value={size}
        onChange={onChangeSize}
      />
      <input
        className="input"
        id="url"
        type="text"
        placeholder="Ссылка на товар с POIZON"
        value={url}
        onChange={onChangeUrl}
      />
      <select value={subject} onChange={onChangeSubject} className="select">
        <option value="shoes">Обувь</option>
        <option value="clothes">Одежда</option>
        <option value="acces">Аксессуары</option>
      </select>
    </div>
  );
};

export default Form;