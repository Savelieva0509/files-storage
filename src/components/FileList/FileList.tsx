import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from 'react-bootstrap/Pagination';
import { allFiles } from '../../redux/files-operations';
import { getFiles, getCountFiles, getSearchQuery } from '../../redux/selectors';
import File from '../File/File';
import css from './FileList.module.scss';

const FileList = () => {
  const dispatch = useDispatch() as any;
  const files = useSelector(getFiles);
  const countFiles = useSelector(getCountFiles);
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const query = useSelector(getSearchQuery);

  useEffect(() => {
    dispatch(allFiles({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage]);

  const filteredFiles = useMemo(() => {
    if (!query) return files;

    return files.filter(file =>
      file.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [files, query]);

  const groupedFiles = useMemo(() => {
    const grouped = filteredFiles.reduce((groups: any, file: any) => {
      const date = new Date(file.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(file);
      return groups;
    }, {});

    return grouped;
  }, [filteredFiles]);

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  return (
    <>
      {filteredFiles.length ? (
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
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      ) : (
        <div className={css.noResultsWpapper}>
          <p className={css.noResults}>No files found</p>
        </div>
      )}
    </>
  );
};

export default FileList;
