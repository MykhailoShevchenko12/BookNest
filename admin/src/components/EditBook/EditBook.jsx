import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditBook.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    imageUrl: null,
    imageFile: null, // Додаємо для нового файлу
    title: "",
    category: "",
    genres: "",
    pages: "",
    format: "",
    author: "",
    edition: "",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    // Завантаження даних книги
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/api/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch book data");
        const data = await response.json();
        setProductData({
          ...data,
          imageFile: null, // Очищаємо попередній файл
        });
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Не вдалося завантажити дані книги");
      }
    };

    fetchBook();
  }, [id]);

  // Очищення URL після вибору файлу
  useEffect(() => {
    return () => {
      if (productData.imageUrl && typeof productData.imageUrl === "string") {
        URL.revokeObjectURL(productData.imageUrl);
      }
    };
  }, [productData.imageUrl]);

  // Зміна текстових полів
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Обробка вибору файлу
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev) => ({
        ...prev,
        imageFile: file,
        imageUrl: URL.createObjectURL(file), // Для попереднього перегляду
      }));
    }
  };

  // Відправка форми
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (productData.imageFile) formData.append("image", productData.imageFile);
    formData.append("title", productData.title);
    formData.append("category", productData.category);
    formData.append("genres", productData.genres);
    formData.append("pages", productData.pages);
    formData.append("format", productData.format);
    formData.append("author", productData.author);
    formData.append("edition", productData.edition);
    formData.append("price", Number(productData.price));
    formData.append("quantity", Number(productData.quantity));
    formData.append("description", productData.description);

    try {
      const response = await fetch(`http://localhost:3002/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      alert("Книгу оновлено!");
      navigate("/");
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Помилка оновлення книги");
    }
  };
  console.log("Image URL:", productData.imageUrl);
  return (
    <div className="add-book">
      <form className="addbook-form" onSubmit={handleSubmit}>
        <div className="addbook-itemfield-img">
          <label htmlFor="fileInput" className="customFileLabel">
            Оновити обкладинку:
          </label>
          {productData.imageUrl && (
            <img
              src={
                productData.imageUrl.startsWith("blob:")
                  ? productData.imageUrl
                  : `http://localhost:3002${productData.imageUrl}`
              }
              alt="Current Cover"
              style={{ width: "300px", height: "auto", borderRadius: "20px" }}
            />
          )}
          <p>Поточна обкладинка</p>
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            className="fileInput"
          />
        </div>
        <div className="addbook-itemfield">
          <p>Назва книги</p>
          <input
            type="text"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Категорії</p>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Жанри</p>
          <input
            type="text"
            name="genres"
            value={productData.genres}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Кількість сторінок</p>
          <input
            type="text"
            name="pages"
            value={productData.pages}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Формат</p>
          <input
            type="text"
            name="format"
            value={productData.format}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Автор</p>
          <input
            type="text"
            name="author"
            value={productData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Видання</p>
          <input
            type="text"
            name="edition"
            value={productData.edition}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Ціна</p>
          <input
            type="text"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Кількість на складі:</p>
          <input
            type="text"
            name="quantity"
            value={productData.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className="addbook-itemfield">
          <p>Опис</p>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="edit-btn" type="submit">
          Оновити книгу
        </button>
      </form>
    </div>
  );
};

export default EditBook;
