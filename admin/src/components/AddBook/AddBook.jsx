import React, { useState } from "react";
import "./AddBook.css";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/features/productSlice";

const AddBook = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [genres, setGenres] = useState("");
  const [pages, setPages] = useState("");
  const [format, setFormat] = useState("");
  const [author, setAuthor] = useState("");
  const [edition, setEdition] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const parseInputToArray = (input) => {
    return input
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("image", imageFile);
      data.append("title", title);

      data.append("category", parseInputToArray(category));
      data.append("genres", parseInputToArray(genres));

      data.append("pages", pages);
      data.append("format", format);
      data.append("author", author);
      data.append("edition", edition);
      data.append("price", price);
      data.append("quantity", quantity);
      data.append("description", description);

      const response = await dispatch(createProduct(data));
      if (response.payload && response.payload._id) {
        alert(`Продукт успішно додано: ${response.payload._id}`);
      } else {
        console.error("ID продукту не знайдено");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setTitle("");
    setCategory("");
    setGenres("");
    setPages("");
    setFormat("");
    setAuthor("");
    setEdition("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setImageName("");
    setImageFile("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageName(file.name);
    } else {
      setImageFile(null);
      setImageName("");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategory((prevCategories) => {
      const newCategory = [
        ...parseInputToArray(prevCategories),
        ...selectedCategories,
      ].join(", ");
      return newCategory;
    });
  };

  const handleGenresChange = (e) => {
    const selectedGenres = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setGenres((prevGenres) => {
      const newGenres = [
        ...parseInputToArray(prevGenres),
        ...selectedGenres,
      ].join(", ");
      return newGenres;
    });
  };

  return (
    <div className="add-book">
      <form className="addbook-form" onSubmit={submitHandler}>
        <div className="addbook-itemfield-img">
          <div className="addImage">
            <label htmlFor="fileInput" className="customFileLabel">
              Додати обкладинку:
            </label>
            <input
              type="file"
              id="fileInput"
              className="fileInput"
              onChange={handleFileChange}
            />
            <div className="fileName">
              {imageFile && (
                <img
                  className="outputImage"
                  src={URL.createObjectURL(imageFile)}
                  alt={imageName}
                />
              )}
              <div>{imageName || "Файл не вибрано"}</div>
            </div>
          </div>
        </div>

        <div className="addbook-itemfield">
          <p>Назва книги</p>
          <input
            type="text"
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="addbook-itemfield">
          <p>Категорії</p>
          <input
            type="text"
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="addbook-itemfield" style={{ textAlign: "center" }}>
          <span>Список категорій</span>
          <div className="selector-box">
            <select
              multiple
              name="category"
              className="addbook-selector"
              onChange={handleCategoryChange}
            >
              <option value="Художня література">Художня література</option>
              <option value="Фінанси та Економіка">Фінанси та Економіка</option>
              <option value="Саморозвиток">Саморозвиток</option>
              <option value="Психологія">Психологія</option>
              <option value="Комп'ютерна література">
                Комп'ютерна література
              </option>
              <option value="Енциклопедії">Енциклопедії</option>
              <option value="Історія">Історія</option>
              <option value="Медицина">Медицина</option>
              <option value="Філософія">Філософія</option>
              <option value="Політика">Політика</option>
              <option value="Релігія">Релігія</option>
              <option value="Наука">Наука</option>
              <option value="Право">Право</option>
              <option value="Дозвілля">Дозвілля</option>
              <option value="Книги для Дітей">Книги для Дітей</option>
            </select>
          </div>
        </div>

        <div className="addbook-itemfield">
          <p>Жанри</p>
          <input
            type="text"
            name="genres"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
        </div>

        <div className="addbook-itemfield" style={{ textAlign: "center" }}>
          <span>Список жанрів</span>
          <div className="selector-box">
            <select
              multiple
              name="genre"
              className="addbook-selector"
              onChange={handleGenresChange}
            >
              <option value="Роман">Роман</option>
              <option value="Драма">Драма</option>
              <option value="Комедія">Комедія</option>
              <option value="Проза">Проза</option>
              <option value="Поезія">Поезія</option>
              <option value="Фентезі">Фентезі</option>
              <option value="Фантастика">Фантастика</option>
              <option value="П'єса">П'єса</option>
              <option value="Трагедія">Трагедія</option>
              <option value="Трилер">Трилер</option>
              <option value="Детективи">Детективи</option>
              <option value="Бойовик">Бойовик</option>
              <option value="Бухгалтерія">Бухгалтерія</option>
              <option value="Економіка">Економіка</option>
              <option value="Підприємство">Підприємство</option>
              <option value="Маркетинг">Маркетинг</option>
              <option value="Реклама">Реклама</option>
              <option value="Менеджмент">Менеджмент</option>
              <option value="SoftSkills">SoftSkills</option>
              <option value="Інвестиції">Інвестиції</option>
              <option value="Трейдинг">Трейдинг</option>
              <option value="Харчування">Харчування</option>
              <option value="Спорт">Спорт</option>
              <option value="Здоров'я">Здоров'я</option>
              <option value="Наука">Наука</option>
              <option value="Право">Право</option>
              <option value="Маркетинг">Маркетинг</option>
              <option value="Медитація">Медитація</option>
              <option value="Мотивація">Мотивація</option>
              <option value="SoftSkills">SoftSkills</option>
              <option value="Гроші">Гроші</option>
              <option value="Взаємовідносини">Взаємовідносини</option>
              <option value="Дитяча психологія">Дитяча психологія</option>
              <option value="Суспільство">Суспільство</option>
              <option value="Психічне здоров'я">Психічне здоров'я</option>
              <option value="Прикладна психологія">Прикладна психологія</option>
              <option value="Психотерапія">Психотерапія</option>
              <option value="Суспільство">Суспільство</option>
              <option value="Держава">Держава</option>
              <option value="Культурологія">Культурологія</option>
              <option value="Казки">Казки</option>
              <option value="Виховання">Виховання</option>
              <option value="Дитяча психологія">Дитяча психологія</option>
              <option value="Технології">Технології</option>
              <option value="Дозвілля">Дозвілля</option>
              <option value="Релігія">Релігія</option>
            </select>
          </div>
        </div>

        <div className="addbook-itemfield">
          <p>Кількість сторінок</p>
          <input
            type="text"
            name="pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
          />
        </div>

        <div className="addbook-itemfield">
          <p>Формат</p>
          <input
            type="text"
            name="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />
        </div>

        <div className="addbook-itemfield">
          <p>Автор</p>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="addbook-itemfield">
          <p>Видання</p>
          <input
            type="text"
            name="edition"
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
          />
        </div>

        <div className="addbook-price">
          <div className="addbook-itemfield">
            <p>Ціна</p>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="addbook-itemfield">
          <p>Кількість на складі</p>
          <input
            type="number"
            name="countInStock"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
          />
        </div>

        <div className="addbook-itemfield">
          <p>Опис</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="addbook-btn">
          Додати
        </button>
        <button type="button" className="clearbook-btn" onClick={handleReset}>
          Очистити форму
        </button>
      </form>
    </div>
  );
};

export default AddBook;
