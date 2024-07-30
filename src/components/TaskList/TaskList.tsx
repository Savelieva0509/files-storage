import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { getTasks } from '../../redux/selectors';
import { TaskStatus } from '../../redux/constants';
import { moveTask, fetchTasksForBoard } from '../../redux/tasks-operations';
import Task from '../Task/Task';
import css from './TaskList.module.scss';

const TaskList = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const params = useParams<{ dashboardId?: string }>();
  const dashboardId = params.dashboardId;

  useEffect(() => {
    if (dashboardId) {
      dispatch(fetchTasksForBoard(dashboardId));
    }
  }, [dispatch, dashboardId]);

  const tasks = useSelector(getTasks);

  const todoTasks = tasks.filter(
    task => task.boardId === dashboardId && task.status === TaskStatus.TODO
  );
  const inProgressTasks = tasks.filter(
    task =>
      task.boardId === dashboardId && task.status === TaskStatus.IN_PROGRESS
  );

  const doneTasks = tasks.filter(
    task => task.boardId === dashboardId && task.status === TaskStatus.DONE
  );

  const tasksByStatus = {
    [TaskStatus.TODO]: todoTasks,
    [TaskStatus.IN_PROGRESS]: inProgressTasks,
    [TaskStatus.DONE]: doneTasks,
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId && dashboardId) {
      dispatch(
        moveTask({
          boardId: dashboardId,
          taskId: result.draggableId,
          status: destination.droppableId as TaskStatus,
        })
      ).then(() => {
        dispatch(fetchTasksForBoard(dashboardId));
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row>
        {Object.entries(tasksByStatus).map(([status, tasks], index) => (
          <Col key={status} md={4} className={css.column}>
            <Droppable droppableId={status} key={status}>
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <h3 className={css.columnTitle}>{status.toUpperCase()}</h3>
                  <ul className={css.list} id={status}>
                    {tasks.map((task, index) => (
                      <Task key={task._id} task={task} index={index} />
                    ))}
                  </ul>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        ))}
      </Row>
    </DragDropContext>
  );
};

export default TaskList;
