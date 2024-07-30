import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allFiles } from '../../redux/files-operations';
import { getFiles } from '../../redux/selectors';

const FileList = () => {
  const dispatch = useDispatch() as any;
  const files = useSelector(getFiles);
  console.log(files);

  useEffect(() => {
    dispatch(allFiles());
  }, [dispatch]);

  return (
    <div>
      <h1>Files</h1>
      {files.length ? (
        <ul>
          {files.map(file => (
            <li key={file._id}>{file.name}</li>
          ))}
        </ul>
      ) : (
        <p>No files found</p>
      )}
    </div>
  );
};

export default FileList;
