import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { MdClose, MdEdit, MdSave, MdCancel } from 'react-icons/md';
import { Card, Form } from 'react-bootstrap';
import css from './Task.module.scss';
import { deleteTask, editTask } from '../../redux/tasks-operations';
import { TaskTypes } from '../../types';

type TaskProps = {
  task: TaskTypes;
  index: number;
};

const Task = ({ task, index }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [originalTitle, setOriginalTitle] = useState(task.title);
  const [editedText, setEditedText] = useState(task.text);
  const [originalText, setOriginalText] = useState(task.text);
  const [, setIsLoading] = useState(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const handleDelete = () =>
    dispatch(
      deleteTask({
        taskId: task._id,
        boardId: task.boardId,
      })
    );

  const handleEdit = async () => {
    if (isEditing) {
      if (editedTitle.trim() !== '') {
        setIsLoading(true);
        try {
          await dispatch(
            editTask({
              taskId: task._id,
              boardId: task.boardId,
              title: editedTitle,
              text: editedText,
              status: task.status,
            })
          );
          setIsEditing(false);
        } catch (error: any) {
          console.error('Failed to edit task', error.message);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      setIsEditing(true);
      setOriginalTitle(editedTitle);
      setOriginalText(editedText);
    }
  };

  const handleCancel = () => {
    setEditedTitle(originalTitle);
    setEditedText(originalText);
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'title') {
      setEditedTitle(event.target.value);
    } else if (event.target.name === 'text') {
      setEditedText(event.target.value);
    }
  };

  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className={css.card} style={{ width: '25rem' }}>
            <Card.Body>
              {isEditing ? (
                <Form>
                  <Form.Group controlId="formTaskTitle">
                    <Form.Control
                      type="text"
                      name="title"
                      value={editedTitle}
                      onChange={handleChange}
                      placeholder="Enter task title"
                    />
                  </Form.Group>
                  <Form.Group controlId="formTaskText">
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="text"
                      value={editedText}
                      onChange={handleChange}
                      placeholder="Enter task text"
                      className={css.textarea}
                    />
                  </Form.Group>
                </Form>
              ) : (
                <>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.text}</Card.Text>
                </>
              )}

              {isEditing ? (
                <div className={css.buttonWrapper}>
                  <button className={css.btn} onClick={handleEdit}>
                    <MdSave size={24} />
                  </button>
                  <button className={css.btn} onClick={handleCancel}>
                    <MdCancel size={24} />
                  </button>
                </div>
              ) : (
                <div className={css.buttonWrapper}>
                  <button className={css.btn} onClick={handleEdit}>
                    <MdEdit size={24} />
                  </button>
                  <button className={css.btn} onClick={handleDelete}>
                    <MdClose size={24} />
                  </button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
