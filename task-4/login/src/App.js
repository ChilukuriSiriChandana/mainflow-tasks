
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from './components';
import { Login } from './components/login';
import { Signup } from './components/signup';
import { UserDash } from './components/userdash';


function App() {
  return (
    
  <div className="todo-background">
    <BrowserRouter>
        
        <header>
          <h2 className='text-center fs-1 p-1 text-bg-success'>Welcome to Task-4 login and signup </h2>
        </header>

        <section>
          <Routes>
              <Route path='/' element={<Index/>} />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
              <Route path='user-dash' element={<UserDash/>}/>
              <Route path='*' element={"404 page not found"}/>

          </Routes>
        </section>

    </BrowserRouter>
  </div>
  );
}

export default App;
