import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UpdateBooks({
  id,
  setShowUpdate,
}: {
  id: number;
  setShowUpdate: (value: boolean) => void;
}) {
  const [books, setBooks] = useState({
    title: '',
    desc: '',
    cover: null,
    price: '',
  });

  const fetchBook = async () => {
    await axios.get(`http://localhost:8800/books/${id}`).then((res) => {
      console.log(res.data);
      setBooks(res.data[0]);
    });
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooks({ ...books, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8800/books/update/${id}`, {
        ...books,
      })
      .then((res) => {
        console.log(res);

        if (res.data.message.includes('succesfully')) {
          setShowUpdate(false);
          window.location.reload();
        }
      });
  };
  return (
    <div className="w-full h-full flex justify-center items-center flex-col absolute top-0 bg-white bg-opacity-90">
      <h1 className="font-bold text-4xl my-2">Update Books</h1>
      <form
        className="flex flex-col border-2 w-[30rem] h-[20rem] bg-white justify-center items-center gap-2 p-2 rounded-md border-green-600"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="title"
          type="text"
          name="title"
          onChange={handleChange}
          required
          defaultValue={books.title}
        />
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="desc"
          type="text"
          name="desc"
          onChange={handleChange}
          defaultValue={books.desc}
          required
        />
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="cover"
          type="text"
          name="cover"
          onChange={handleChange}
          defaultValue={books.cover as unknown as string}
          required
        />
        <input
          className="border-2 w-full p-2 text-center rounded-md border-green-600 focus:outline-none"
          placeholder="price"
          type="text"
          name="price"
          onChange={handleChange}
          defaultValue={books.price}
          required
        />

        <div className="flex gap-5">
          <input
            className="w-[8rem] border-2 rounded-md bg-green-400 text-white font-semibold hover:bg-green-600 p-2 cursor-pointer"
            type="submit"
            value="Update"
          />

          <button
            className="w-[8rem] border-2 rounded-md bg-green-400 text-white font-semibold hover:bg-green-600 p-2 cursor-pointer"
            onClick={() => setShowUpdate(false)}
          >
            {' '}
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
