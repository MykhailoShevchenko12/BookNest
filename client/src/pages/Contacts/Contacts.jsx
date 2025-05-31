import React from "react";

import "./Contacts.css";

export const Contacts = () => {
  return (
    <div className="contacts-main">
      <h2>Як нас знайти?</h2>
      <div className="contacts-info">
        <p>
          Клієнти можуть звернутися до магазину за допомогою телефону,
          електронної пошти або за адресою магазину.
        </p>
        <span>Контактна інформація:</span>
        <ul>
          <li>
            Номер телефону: <strong>0660054160</strong>
          </li>
          <li>
            Поштова скринька: <strong>mikhailshevchenko075@gmail.com</strong>
          </li>
          <li>
            Адреса магазину:{" "}
            <strong>м. Київ, вулиця Потужна 12Б, офіс №12</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};
