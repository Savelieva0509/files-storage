import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allFiles } from '../../redux/files-operations';
import { getFiles } from '../../redux/selectors';
import File from '../File/File';
import css from './FileList.module.scss';

const FileList = () => {
  const dispatch = useDispatch() as any;
  const files = useSelector(getFiles);
  

  useEffect(() => {
    dispatch(allFiles());
  }, [dispatch]);

  // Функция для группировки файлов по дате
  const groupFilesByDate = (files: any[]) => {
    return files.reduce((groups: any, file: any) => {
      const date = new Date(file.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(file);
      return groups;
    }, {});
  };

  const groupedFiles = groupFilesByDate(files);

  return (
    <>
      {files.length ? (
        <div className={css.listContainer}>
          {Object.keys(groupedFiles).map(date => (
            <div key={date}>
              <p className={css.dateHeader}>{date}</p>
              <ul className={css.cardList}>
                {groupedFiles[date].map((file: any) => (
                  <li className={css.cardItem} key={file._id}>
                    <File file={file} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No files found</p>
      )}
    </>
  );
};

export default FileList;
