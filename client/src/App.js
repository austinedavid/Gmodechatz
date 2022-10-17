
import './App.css';
import Register from './pages/Register';
import styled from 'styled-components';


// our stylying appear here
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`
function App() {
  return (
   <Container>
    <Register/>
   </Container>
  );
}

export default App;
