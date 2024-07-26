import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/home';
import CreateUser from '../components/createUser';
import UpdateUser from '../components/updateUser';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
        <Route path="/delete/:id" />
      </Routes>
    </Router>
  );
}

export default App;
