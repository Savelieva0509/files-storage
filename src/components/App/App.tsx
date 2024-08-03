import FileList from '../FileList/FileList';
import Modal from '../Modal/Modal';

import css from'./App.module.scss';

function App() {
  return (
    <div className={css.container}>
      <Modal />
      <FileList />
    </div>
  );
}
export default App;
