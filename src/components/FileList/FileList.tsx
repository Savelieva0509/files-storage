import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { searchFiles, allFiles } from '../../redux/files-operations';
import {
  getFiles,
  getCountFiles,
  getSearchQuery,
  getLoading,
} from '../../redux/selectors';
import File from '../File/File';
import Pagination from '../Pagination/Pagination';
import css from './FileList.module.scss';

const FileList = () => {
  const dispatch = useDispatch() as any;
  const files = useSelector(getFiles);
  const countFiles = useSelector(getCountFiles);
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const query = useSelector(getSearchQuery);
  const loading = useSelector(getLoading);

  const navigate = useNavigate();

  useEffect(() => {
    navigate(`?page=${currentPage}`, { replace: true });
  }, [currentPage, navigate]);

  useEffect(() => {
    if (query) {
     
      dispatch(searchFiles({ query, page: currentPage, limit: itemsPerPage }));
    } else {
     
      dispatch(allFiles({ page: currentPage, limit: itemsPerPage }));
    }
  }, [dispatch, query, currentPage, itemsPerPage]);

  const groupedFiles = useMemo(() => {
    if (!files.length) return {};
    const grouped = files.reduce((groups: any, file: any) => {
      const date = new Date(file.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(file);
      return groups;
    }, {});
    return grouped;
  }, [files]);

  const totalPages = Math.ceil(countFiles / itemsPerPage);

  return (
    <>
      {loading ? (
        <div className={css.spinnerContainer}>
          <ClipLoader size={150} color={'#ff8c8c'} loading={loading} />
        </div>
      ) : (
        <>
          {files.length ? (
            <div className={css.listContainer}>
              {Object.keys(groupedFiles).map(date => (
                <div key={date}>
                  <p className={css.dateHeader}>{date}</p>
                  <ul className={css.cardList}>
                    {groupedFiles[date].map((file: any) => (
                      <li className={css.cardItem} key={file._id}>
                        <File
                          file={file}
                          openFileId={openFileId}
                          setOpenFileId={setOpenFileId}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : (
            !loading && <p className={css.noResults}>No files found</p>
          )}
        </>
      )}
    </>
  );
};

export default FileList;
