import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { allFiles } from '../../redux/files-operations';
import { getFiles } from '../../redux/selectors';

import File from '../File/File';

const FileList = () => {
  const dispatch = useDispatch() as any;
  const files = useSelector(getFiles);
  console.log(files);

  useEffect(() => {
    dispatch(allFiles());
  }, [dispatch]);

  return (
    <Container>
      <Row className="gx-4 gy-4">
        {files.length ? (
          files.map(file => (
            <Col
              className="gx-4 gy-4"
               key={file._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <File file={file} />
            </Col>
          ))
        ) : (
          <p>No files found</p>
        )}
      </Row>
    </Container>
  );
};

export default FileList;
