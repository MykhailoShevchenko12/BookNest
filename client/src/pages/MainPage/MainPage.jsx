import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import "./MainPage.css";
import { BookItem } from "../../components/BookItem/BookItem";
import banner_img from "../../images/banner.jpg";

export const MainPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  // Здійснюємо запит до API для отримання товарів
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/products");
        if (!response.ok) {
          throw new Error("Не вдалося завантажити товари");
        }
        const data = await response.json();
        setAllProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchResults.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchResults.trim())}`);
    }
  };

  const handleEmailSubmit = async () => {
    if (!userEmail || !userEmail.includes("@")) {
      toast.warning("Будь ласка, введіть коректну адресу електронної пошти.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        setUserEmail(""); // Очистити інпут
      } else {
        toast.error("Сталася помилка під час надсилання пошти.");
      }

      toast.success(
        "Дуже добре, тепер ви будете отримувати цікаві добірки на свою поштову скриньку!"
      );
    } catch (error) {
      console.error("Помилка:", error);
      toast("Помилка з'єднання із сервером.");
    }
  };

  const latestProducts = [...allProducts]
    .sort((a, b) => b._id.localeCompare(a._id)) // за ID, Mongo генерує їх по часу
    .slice(0, 3);

  return (
    <div className="main-page">
      <div className="preview-section">
        <div className="banner">
          <img src={banner_img} alt="" />
          <div className="banner-text">
            <h1>Книжкова країна для справжніх читачів!</h1>
            <h3>Відкривай нові світи з кожною сторінкою.</h3>
            <input
              className="search-pannel"
              placeholder="Введіть назву книги або автора"
              value={searchResults}
              onChange={(e) => {
                setSearchResults(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
        <div className="special-offers">
          <span>Новинки</span>
          {latestProducts.map((book) => (
            <div className="offer" key={book._id}>
              <img
                src={`http://localhost:3002${book.imageUrl}`}
                alt={book.title}
                className="offer-book-img"
              />
              <div className="offer-title-price">
                <p>{book.title}</p>
                <p>{book.author}</p>
                <div className="offer-price">{book.price}₴</div>
              </div>
              <Link
                to={`/product/${book._id}`}
                key={book._id}
                style={{
                  textDecoration: "none",
                  color: "#222",
                  alignContent: "center",
                }}
              >
                <span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="custom-icon"
                  />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="bookcategory">
        <p className="bookcategorytext">Подорож у світи художніх творів</p>
        <Link to={"/products/fiction"} className="bookcategorylink">
          Переглянути інші
        </Link>
      </div>
      <div className="category-top">
        {allProducts
          .filter(
            (e) =>
              Array.isArray(e.category) &&
              e.category.some(
                (cat) => cat.trim().toLowerCase() === "художня література"
              )
          )
          .slice(0, 12)
          .map((e) => {
            return (
              <Link
                key={e._id}
                to={`/product/${e._id}`}
                style={{ textDecoration: "none" }}
              >
                <BookItem id={e._id} imageUrl={e.imageUrl} title={e.title} />
              </Link>
            );
          })}
      </div>
      <div className="bookcategory">
        <p className="bookcategorytext">Шлях до себе: книги для саморозвитку</p>
        <Link to={"/products/self-development"} className="bookcategorylink">
          Переглянути інші
        </Link>
      </div>
      <div className="category-top">
        {allProducts
          .filter(
            (e) =>
              Array.isArray(e.category) &&
              e.category.some(
                (cat) => cat.trim().toLowerCase() === "саморозвиток"
              )
          )
          .slice(0, 12)
          .map((e) => {
            return (
              <Link
                key={e._id}
                to={`/product/${e._id}`}
                style={{ textDecoration: "none" }}
              >
                <BookItem id={e._id} imageUrl={e.imageUrl} title={e.title} />
              </Link>
            );
          })}
      </div>
      <div className="bookcategory">
        <p className="bookcategorytext">Відновлення душевної рівноваги</p>
        <Link to={"/products/psychology"} className="bookcategorylink">
          Переглянути інші
        </Link>
      </div>

      <div className="category-top">
        {allProducts
          .filter(
            (e) =>
              Array.isArray(e.category) &&
              e.category.some(
                (cat) => cat.trim().toLowerCase() === "психологія"
              )
          )
          .slice(0, 12)
          .map((e) => {
            return (
              <Link
                key={e._id}
                to={`/product/${e._id}`}
                style={{ textDecoration: "none" }}
              >
                <BookItem id={e._id} imageUrl={e.imageUrl} title={e.title} />
              </Link>
            );
          })}
      </div>
      <div className="main-inspiration-emailnotification">
        <div className="inspiration">
          <h1>Кожна прочитана книга робить тебе краще!</h1>
          <p>
            Читання книг відкриває двері у нові світи, де кожен рядок дарує
            можливість поринути у пригоди, дізнаватися про інші культури та
            розширювати власний кругозір.Книги розвивають уяву і творчі
            здібності, дозволяючи бачити те, що іншим здається прихованим, та
            створювати нові реальності в своїй свідомості. Регулярне читання
            покращує пам'ять та концентрацію, допомагаючи тренувати мозок і
            підтримувати його активним, що важливо на всіх етапах життя. Читання
            сприяє особистісному зростанню, адже через книги ми вчимося
            аналізувати, розуміти людей та різні життєві ситуації. Книги
            допомагають розвинути емпатію, оскільки, читаючи про героїв з
            різними життєвими труднощами, ми вчимося краще розуміти почуття
            інших людей. Вивчення нових тем через книги дозволяє бути завжди в
            курсі подій, забезпечуючи глибоке розуміння різних аспектів
            сучасного світу. Читання допомагає зняти стрес, занурюючи нас у
            вигаданий світ і даючи змогу відволіктися від буденних турбот та
            проблем. Читання книг розширює словниковий запас, роблячи нашу мову
            багатшою та впевненішою, що сприяє покращенню комунікативних
            навичок.
          </p>
          <p>
            Книги — джерело мудрості й натхнення, здатні мотивувати нас до нових
            звершень та надавати нових ідей для самореалізації.
          </p>
          <p>
            Читання — це інвестиція у майбутнє, адже воно розвиває критичне
            мислення, відкриває нові перспективи та формує інтелектуальну базу
            для досягнення успіху.
          </p>
        </div>
        <div className="emailnotification">
          <h2>Залишайся з нами!</h2>
          <p>
            Якщо хочешь бути в курсі останніх новинок, залишай свою поштову
            адресу та отримуй ексклюзивні рекомендації книг, які змінять твій
            світогляд!
          </p>
          <div className="email-input">
            <input
              type="email"
              placeholder="Введіть адресу поштової скриньки"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
            <button onClick={handleEmailSubmit}>Отримувати рекомендації</button>
          </div>
        </div>
      </div>
    </div>
  );
};
