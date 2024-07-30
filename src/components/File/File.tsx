import { Card } from 'react-bootstrap';
import css from './File.module.scss';

import { FileTypes } from '../../types';

type FileProps = {
  file: FileTypes;
};

const File = (file: FileProps) => {
  return (
    <Card className={css.card} style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Title>name</Card.Title>
        <Card.Text>description</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default File;
