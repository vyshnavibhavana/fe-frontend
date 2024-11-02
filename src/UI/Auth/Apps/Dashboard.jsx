import { useEffect, useState } from "react";
import TaskCard, { Column } from "../../../Common/TaskManager";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../../../Common/TaskManager.css"
import { response } from "../../../helpers/data";
import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FiUserPlus, FiPlus, FiCopy } from 'react-icons/fi';
import TaskModal from "../../../Common/TaskModal";
import AddPeopleToBoard from "../../../Common/Dialogue";
import { getBoardDetails } from "./DashboardService";

const Dashboard = () => {
    const [boardData, setBoardData] = useState(response.board.columns);
    const [update, setUpdate] = useState(false);
    const [userName, setUserNmae] = useState("");
    useEffect(() => {
        let tmp = JSON.parse(localStorage.getItem('user'));
        console.log(tmp.user.username);
        setUserNmae(tmp.user.username);
        getBoardDetails().then((res) => {
            setBoardData(res.data.board.columns || response.board.columns)
        });
    }, [update])
    return (
        <WelcomeBoard boardData={boardData} setBoardData={setBoardData} upDate={setUpdate} userName={userName} />
    )
}
export default Dashboard;

// Styled Components
const BoardContainer = styled(Container)`
  padding: 2rem;
  background-color: #f8f9fa;
  min-height: 100vh;
  min-width:100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .add-people {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #6c757d;
    font-size: 1rem;
  }

  .add-people-icon {
    margin-right: 0.5rem;
  }
`;

const BoardColumn = styled(Card)`
  background-color: #edf2f7;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  min-height: 60vh;
  max-height: 80vh;
  overflow-y: auto;
  margin-bottom: 2rem;

  .column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .column-header-icons {
    display: flex;
    gap: 0.5rem;
  }
`;
export const WelcomeBoard = ({ boardData, setBoardData, upDate, userName }) => {
    const [openModal, setOpenModal] = useState(false);
    const [addEmailModal, setAddEmailModal] = useState(false);
    const [addEmail, setAddEmail] = useState();
    const handleChecklistToggle = (columnIndex, taskId, checklistIndex) => {
        const updatedBoardData = boardData.map((column, idx) => {
            if (idx === columnIndex) {
                const updatedTasks = column.tasks.map((task) => {
                    if (task.id === taskId) {
                        return {
                            ...task,
                            checklist: task.checklist.map((item, i) =>
                                i === checklistIndex ? { ...item, done: !item.done } : item
                            )
                        };
                    }
                    return task;
                });
                return { ...column, tasks: updatedTasks };
            }
            return column;
        });
        setBoardData(updatedBoardData);
    };

    const handleStatusChange = (taskId, newStatus) => {
        const updatedBoardData = [...boardData];
        let taskToMove = null;
        let sourceColumnIndex = null;

        updatedBoardData.forEach((column, columnIndex) => {
            const taskIndex = column.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                taskToMove = column.tasks.splice(taskIndex, 1)[0];
                sourceColumnIndex = columnIndex;
            }
        });

        if (taskToMove) {
            const targetColumnIndex = updatedBoardData.findIndex(col => col.name.toLowerCase() === newStatus.toLowerCase());
            if (targetColumnIndex !== -1) {
                updatedBoardData[targetColumnIndex].tasks.push(taskToMove);
            } else {
                updatedBoardData[sourceColumnIndex].tasks.push(taskToMove);
            }
        }

        setBoardData(updatedBoardData);
    };

    return (
        <BoardContainer fluid>
            <Header>
                <div className="title">Welcome! {userName}</div>
                <div className="add-people" onClick={() => setAddEmailModal(true)}>
                    <FiUserPlus className="add-people-icon" />
                    Add People
                </div>
            </Header>
            <Row>
                {boardData?.map((column, columnIndex) => (
                    <Col key={columnIndex} md={3} sm={6}>
                        <BoardColumn>
                            <div className="column-header">
                                <span>{column.name}</span>
                                <div className="column-header-icons">
                                    {column.name === 'To-do' && <span onClick={() => setOpenModal(true)}>
                                        <FiPlus />
                                    </span>}
                                    <FiCopy />
                                </div>
                            </div>

                            {/* Render tasks inside the column */}
                            {column.tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    columnIndex={columnIndex}
                                    onChecklistToggle={handleChecklistToggle}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </BoardColumn>
                    </Col>
                ))}
            </Row>
            {addEmailModal && <AddPeopleToBoard show={addEmailModal} handleClose={setAddEmailModal} onAddEmail={setAddEmail} />}
            {openModal && <TaskModal show={openModal} handleClose={setOpenModal} upDate={upDate} />}
        </BoardContainer>
    );
};
