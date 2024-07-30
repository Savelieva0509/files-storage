import { Card } from 'react-bootstrap';
import css from './File.module.scss';
import { FileTypes } from '../../types';

type FileProps = {
  file: FileTypes;
};

const File = ({ file }: FileProps) => {
  return (
    <Card className={css.card}>
      <img
        src="/public/icons/frame.png"
        alt="File icon"
        className={css.cardImg} // Используйте этот класс для стилизации изображения
      />
      <Card.Body>
        <Card.Title>{file.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default File;
