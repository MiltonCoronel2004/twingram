import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Feed from './views/Feed';
import ProtectedRoutes from './Components/ProtectedRoutes';
import UnprotectedRoutes from './Components/UnprotectedRoutes'


const App = () => {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<ProtectedRoutes auth={token} redirectPath='/' />}>
          <Route path='/feed' element={<Feed />} />
        </Route>

        <Route element={<UnprotectedRoutes auth={token} redirectPath='/feed' />}>
          <Route path='/:verifyToken?' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Route>
    
      </Routes>
    </BrowserRouter>
  );
};

export default App;
