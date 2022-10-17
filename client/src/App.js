
import './App.css';
import Register from './pages/Register';
import styled from 'styled-components';
import Login from './pages/Login';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// our stylying appear here
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
function App() {
  return (
   <Container>
    <Router>
      <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
   </Container>
  );
}

export default App;
