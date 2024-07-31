
import { FiFileText } from 'react-icons/fi';
import { FileTypes } from '../../types';
import css from './File.module.scss';

type FileProps = {
  file: FileTypes;
};

const File = ({ file }: FileProps) => {
  return (
    <div className={css.card}>
      <div className={css.iconWrapper}>
        <FiFileText size={56} />
      </div>
      <div className={css.cardTitle}>{file.name}</div>
    </div>
  );
};

export default File;
