import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Events from './components/events/Events';
import Users from './components/users/Users';
import Auth from './components/auth/Auth.js';
import { useSelector } from 'react-redux';


function App() {
  const isloggedin = useSelector((state) => state.user.isloggedin);
  console.log("App")
  console.log(isloggedin);
  return (
    <div >
      <Navbar  />
      <section>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/events' element={<Events/>}/>
          <Route path='/user' element={<Users/>}/>
          <Route path='/auth' element={<Auth/>}/>
          

        </Routes>
      </section>

    </div>
  );
}

export default App;
