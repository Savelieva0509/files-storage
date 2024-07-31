import { useState } from 'react';
import { FiFileText } from 'react-icons/fi';
import { FileTypes } from '../../types';
import Button from '../Button/Button';
import css from './File.module.scss';

type FileProps = {
  file: FileTypes;
};

const File = ({ file }: FileProps) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
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
    'Download count': 12 || 'N/A',
    Extension: file.extension,
    Description: file.description,
  };

  const handleOpenFile = () => {
    window.open(file.url, '_blank');
  };

  return (
    <div
      className={`${css.card} ${showInfo ? css.showInfo : ''}`}
      onClick={handleClick}
    >
      <div className={css.iconWrapper}>
        <FiFileText size={56} />
      </div>
      <h3 className={css.cardTitle}>{file.name}</h3>
      {showInfo && (
        <div className={css.cardInfo}>
          {Object.entries(fileInfo).map(([label, value]) => (
            <div className={css.infoItem} key={label}>
              <p className={css.label}>{label}</p>
              <p className={label === 'ID' ? css.idValue : css.value}>
                {value}
              </p>
            </div>
          ))}
          <Button
            type="button"
            onClick={handleOpenFile}
          >
            Open
          </Button>
        </div>
      )}
    </div>
  );
};

export default File;
