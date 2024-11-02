import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

// Styled Components
const CardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;
  position: relative;
  transition: box-shadow 0.3s, border-color 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PriorityTag = styled.div`
  display: inline-block;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #fff;

  ${({ priority }) => priority === 'High' && `
    background-color: #ff4d4f;
  `}

  ${({ priority }) => priority === 'Moderate' && `
    background-color: #1890ff;
  `}

  ${({ priority }) => priority === 'Low' && `
    background-color: #52c41a;
  `}
`;

const Title = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Checklist = styled.div`
  margin-bottom: 1rem;
  transition: max-height 0.3s ease-in-out;
`;

const ChecklistItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  label {
    margin-left: 0.5rem;
    font-size: 0.9rem;
    color: #555;
    cursor: pointer;
  }
`;

const DueDateTag = styled.div`
  background-color: ${({ isOverdue }) => (isOverdue ? '#ff4d4f' : '#f0f0f0')};
  color: ${({ isOverdue }) => (isOverdue ? '#fff' : '#888')};
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  display: inline-block;
  margin-top: 1rem;
`;

const StatusButton = styled.button`
  background-color: #f0f0f0;
  color: #888;
  border: none;
  font-size: 0.75rem;
  padding: 0.3rem 0.5rem;
  margin-right: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const DropdownButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #888;
  cursor: pointer;
`;

const CollapseIcon = styled.span`
  margin-left: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  color: #888;
`;

const TaskCard = ({ task, columnIndex, onChecklistToggle, onStatusChange }) => {
  const [expanded, setExpanded] = useState(false);

  // Calculate if task is overdue
  const isOverdue = new Date(task.dueDate) < new Date();

  // Toggle checklist item
  const handleChecklistToggle = (index) => {
    onChecklistToggle(columnIndex, task.id, index);
  };

  return (
    <CardWrapper>
      {/* Priority Tag */}
      <PriorityTag priority={task.priority}>
        {task.priority.toUpperCase()} PRIORITY
      </PriorityTag>

      {/* Title & Dropdown */}
      <Title>
        {task.title}
        <CollapseIcon onClick={() => setExpanded(!expanded)}>
          {expanded ? '▲' : '▼'}
        </CollapseIcon>
      </Title>

      {/* Dropdown Content */}
      {expanded && (
        <Checklist>
          <strong>Checklist ({task.checklist && task.checklist?.filter(item => item.done).length}/{task.checklist && task.checklist.length})</strong>
          {task.checklist && task.checklist.map((item, index) => (
            <ChecklistItem key={index}>
              <AiOutlineCheckCircle
                color={item.done ? '#52c41a' : '#ccc'}
                onClick={() => handleChecklistToggle(index)}
              />
              <label onClick={() => handleChecklistToggle(index)}>{item.text}</label>
            </ChecklistItem>
          ))}
        </Checklist>
      )}

      {/* Due Date */}
      <DueDateTag isOverdue={isOverdue}>{task.dueDate}</DueDateTag>

      {/* Status Buttons */}
      <div style={{ marginTop: '0.5rem' }}>
        {['Backlog', 'To-do', 'In Progress', 'Done'].map((status) => (
          <StatusButton
            key={status}
            onClick={() => onStatusChange(task.id, status)}
            style={{
              backgroundColor: task.status === status ? '#6c757d' : '#f0f0f0',
              color: task.status === status ? '#fff' : '#888'
            }}
          >
            {status.toUpperCase()}
          </StatusButton>
        ))}
      </div>

      {/* More Options */}
      <DropdownButton>
        <FiMoreVertical />
      </DropdownButton>
    </CardWrapper>
  );
};

export default TaskCard;
