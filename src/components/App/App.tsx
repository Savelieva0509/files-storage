import FileList from '../FileList/FileList';
import AddFileModal from '../Modal/Modal';
import css from'./App.module.scss';

function App() {
  return (
    <div className={css.container}>
      <AddFileModal />
      <FileList />
    </div>
  );
}
export default App;
