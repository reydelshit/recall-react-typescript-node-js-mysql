import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Books from './pages/Books';
import AddBooks from './pages/AddBooks';

function App() {
  return (
    <div className="flex w-screen h-screen justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<AddBooks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
