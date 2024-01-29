import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddBooks() {
  const [books, setBooks] = useState({
    title: '',
    desc: '',
    cover: null,
    price: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooks({ ...books, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post('http://localhost:8800/books', books).then((res) => {
      console.log(res.data);

      if (res.data.message.includes('succesfully')) {
        navigate('/');
      }
    });
  };
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <h1 className="font-bold text-4xl my-2">Add Books</h1>
      <form
        className="flex flex-col border-2 w-[30rem] h-[20rem] justify-center items-center gap-2 p-2 rounded-md border-green-600"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="title"
          type="text"
          name="title"
          onChange={handleChange}
          required
        />
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="desc"
          type="text"
          name="desc"
          onChange={handleChange}
          required
        />
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="cover"
          type="text"
          name="cover"
          onChange={handleChange}
          required
        />
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="price"
          type="text"
          name="price"
          onChange={handleChange}
          required
        />

        <div className="flex gap-5">
          <input
            className="w-[8rem] border-2 rounded-md bg-green-400 text-white font-semibold hover:bg-green-600 p-2 cursor-pointer"
            type="submit"
            value="Add books"
          />

          <button
            className="w-[8rem] border-2 rounded-md bg-green-400 text-white font-semibold hover:bg-green-600 p-2 cursor-pointer"
            onClick={() => navigate(-1)}
          >
            {' '}
            Go back
          </button>
        </div>
      </form>
    </div>
  );
}
