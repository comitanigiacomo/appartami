import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './Pages/home'
import {UserProfile} from './Pages/userProfile'
import {Users} from './Pages/users/users'
import {Layout} from './Layout'
import {SignUp} from './Pages/auth/signUp/signUp';
import { SignIn } from './Pages/auth/signIn/signIn';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/userProfile" element={<UserProfile/>} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/signIn" element={<SignIn/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
