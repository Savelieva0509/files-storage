import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiFileText } from 'react-icons/fi';
import { FileTypes } from '../../types';
import Button from '../Button/Button';
import { updateDownloadCount } from '../../redux/files-operations';
import css from './File.module.scss';

type FileProps = {
  file: FileTypes;
  openFileId: string | null;
  setOpenFileId: (id: string | null) => void;
};

const File = ({ file, openFileId, setOpenFileId }: FileProps) => {
  const [downloadCount, setDownloadCount] = useState(file.downloadCount || 0);

  const dispatch = useDispatch() as any;

  const handleClick = () => {
    if (openFileId === file._id) {
      setOpenFileId(null);
    } else {
      setOpenFileId(file._id);
    }
  };

  type FileInfoKeys =
    | 'Size'
    | 'ID'
    | 'Download count'
    | 'Extension'
    | 'Description';

  const formatFileSize = (sizeInBytes: number) => {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return `${sizeInMB.toFixed(2)} MB`;
  };

  const fileInfo: Record<FileInfoKeys, string | number> = {
    Size: formatFileSize(file.size),
    ID: file._id,
    'Download count': downloadCount,
    Extension: file.extension,
    Description: file.description,
  };

  const handleOpenFile = async () => {
    window.open(file.url, '_blank');

    setDownloadCount(prevCount => prevCount + 1);

    await dispatch(updateDownloadCount({ id: file._id, count: downloadCount }));
  };

  return (
    <div
      className={`${css.card} ${openFileId === file._id ? css.showInfo : ''}`}
      onClick={handleClick}
    >
      <div className={css.iconWrapper}>
        <FiFileText size={56} />
      </div>
      <h3 className={css.cardTitle}>{file.name}</h3>
      {openFileId === file._id && (
        <div className={css.cardInfo}>
          {Object.entries(fileInfo).map(([label, value]) => (
            <div className={css.infoItem} key={label}>
              <p className={css.label}>{label}</p>
              <p className={css.value}>{value}</p>
            </div>
          ))}
          <Button type="button" onClick={handleOpenFile}>
            Open
          </Button>
        </div>
      )}
    </div>
  );
};

export default File;
