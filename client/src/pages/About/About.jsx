import React, { useState, useEffect } from "react";

import "./About.css";
import banner2 from "../../images/banner2.jpg";
import banner3 from "../../images/banner3.jpeg";
import banner4 from "../../images/banner4.webp";

export const About = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [banner2, banner3, banner4];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="about-main">
      <div className="about-container">
        <h1>BookNest — твоє книжкове гніздечко</h1>
        <div className="about-text">
          <p>
            У кожного є місце, куди хочеться повертатися. Де затишно, де звучать
            історії, що надихають. BookNest — саме таке місце. Ми створили наш
            магазин як гніздечко для всіх, хто шукає більше, ніж просто книгу.
            Ми — спільнота читачів, які вірять у силу слова.
          </p>
          <span>📖 Хто ми?</span>
          <p>
            BookNest — це команда людей, які шалено люблять книжки. Ми читаємо
            їх уранці з кавою, ввечері перед сном і трохи між справами. Ми
            обираємо лише найкращі видання: художні романи, нон-фікшн, дитячі
            історії, поезію й ті книги, що змінюють життя.
          </p>
          <span>🧭 Наша місія</span>
          <p>
            Наша мета — допомогти тобі знайти саме ту книжку, яка потрібна саме
            зараз. Ми віримо, що у кожного читача є своя книга. І ми тут, аби
            допомогти вам зустрітися.
          </p>
          <span>🕊️ Наші цінності</span>
          <ul>
            <li>Тепло: ми дбаємо про кожного клієнта як про друга.</li>
            <li>Якість: тільки добірні видання й перевірені видавництва.</li>
            <li>
              Зручність: швидкий пошук, просте замовлення, уважна доставка.
            </li>
          </ul>
          <span>🧡 Чому ми називаємось BookNest?</span>
          <p>
            Бо для нас книжка — як пташина пір’їнка: легка, але здатна збудувати
            цілий світ. Наше гніздечко — це місце, де кожна сторінка має сенс, а
            кожен відвідувач — бажаний гість.
          </p>
          <div className="about-banners">
            <button onClick={prevImage} className="img-btn">
              ←
            </button>
            <img src={images[currentImage]} alt="" className="about-img" />
            <button onClick={nextImage} className="img-btn">
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
