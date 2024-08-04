import FileList from '../FileList/FileList';
import AppBar from '../AppBar/AppBar';
import css from './App.module.scss';

function App() {
  return (
    <div className={css.appContainer}>
      <AppBar />
      <FileList />
    </div>
  );
}
export default App;
