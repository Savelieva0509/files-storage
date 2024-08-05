import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import { allFiles } from '../../redux/files-operations';
import { getFiles, getCountFiles, getSearchQuery,getLoading } from '../../redux/selectors';
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

  const totalPages = Math.ceil(countFiles / itemsPerPage);

   return (
     <>
       {loading ? (
         <div className={css.spinnerContainer}>
           <ClipLoader size={150} color={'#ff8c8c;'} loading={loading} />
         </div>
       ) : (
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
