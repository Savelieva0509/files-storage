import { useSelector } from 'react-redux';
import { getFiles } from '../../redux/selectors';
import File from '../File/File';
import css from './FileList.module.scss';

const FileList = () => {
  const files = useSelector(getFiles);

  return (
    <ul className={css.list}>
      {files.map(file => (
        <File key={file._id} file={file} />
      ))}
    </ul>
  );
};

export default FileList;
