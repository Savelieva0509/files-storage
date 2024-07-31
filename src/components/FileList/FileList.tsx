import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { allFiles } from '../../redux/files-operations';
import { getFiles } from '../../redux/selectors';
import File from '../File/File';
import css from './FileList.module.scss';

const FileList = () => {
  const dispatch = useDispatch() as any;
  const files = useSelector(getFiles);
  console.log(files);

  useEffect(() => {
    dispatch(allFiles());
  }, [dispatch]);

  return (
    <>
      {files.length ? (
        <ul className={css.cardList}>
          {files.map(file => (
            <li key={file._id} className={css.cardItem}>
              <File file={file} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No files found</p>
      )}
    </>
  );
};

export default FileList;
