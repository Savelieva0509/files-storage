import FileList from '../FileList/FileList';
import { Container } from 'react-bootstrap';
import AddFileModal from '../Modal/Modal';
import './App.scss';


function App() {
  
  return (
    <Container className="mt-5">
    <AddFileModal/>
      <FileList />
    </Container>
  );
}
export default App;
