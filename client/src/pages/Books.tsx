import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateBooks from './UpdateBooks';

type Book = {
  id: number;
  title: string;
  desc: string;
  cover: string;
  price: string;
};

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [storeID, setStoreID] = useState<number>(0);

  const fetchBooks = async () => {
    await axios.get('http://localhost:8800/books').then((res) => {
      console.log(res.data);
      if (res.data) {
        setBooks(res.data);
      }
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8800/books/${id}`).then((res) => {
      if (res.status === 200) {
        fetchBooks();
      }
    });
  };

  const handleShowUpdate = (id: number) => {
    setShowUpdate(true);
    setStoreID(id);
  };

  return (
    <div className="relative flex justify-center items-center flex-col">
      <Link
        className="my-[2rem] font-bold text-2xl text-center bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        to="/add"
      >
        Add Book
      </Link>

      <div className="grid place-content-center items-center grid-cols-4 grid-rows-2 gap-4">
        {books.map((book, index) => {
          return (
            <div
              className="border-2 border-green-600 p-4 rounded-lg w-[20rem] h-[20rem] flex flex-col justify-between"
              key={index}
            >
              <h1 className="font-bold text-2xl">{book.title}</h1>
              <p>{book.desc}</p>

              {book.cover && <img src={book.cover} alt={book.title} />}
              <span className="font-bold inline-block">${book.price}</span>

              <div className="flex gap-2">
                <button
                  className="w-[8rem] border-2 rounded-md bg-green-400 text-white font-semibold hover:bg-green-600 p-2"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
                <button
                  className="w-[8rem] border-2 rounded-md bg-green-400 text-white font-semibold hover:bg-green-600 p-2"
                  onClick={() => handleShowUpdate(book.id)}
                >
                  Update
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showUpdate && storeID !== null && (
        <UpdateBooks id={storeID} setShowUpdate={setShowUpdate} />
      )}
    </div>
  );
}
