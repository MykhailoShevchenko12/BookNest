import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  //Назва
  title: {
    type: String,
    required: true,
    unique: true,
  },
  //Опис
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  //Характеристики товару
  genres: {
    type: [String],
  }, //Жанри
  pages: {
    type: Number,
  }, // Кількість сторінок
  format: {
    type: String,
  }, // Формат
  author: {
    type: String,
  }, // Автор
  edition: {
    type: String,
  }, // Видання
  //Ціна товару
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
  },
});
export default mongoose.model("Product", ProductsSchema);
