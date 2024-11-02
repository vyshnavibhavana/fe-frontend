import React, { useEffect, useRef, useState } from 'react';
import { Modal, Form, } from 'react-bootstrap';
import { Button as Button1 } from 'primereact/button';
import { addUserTask, getAssignees } from '../UI/Auth/Apps/DashboardService';
import { FaCircle } from 'react-icons/fa6';
import { Checkbox } from 'primereact/checkbox';
import { addPeople } from '../helpers/data';
import dayjs from 'dayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Autocomplete, TextField } from '@mui/material';

const TaskModal = ({ show, handleClose, upDate }) => {
    // State for form data
    const [taskTitle, setTaskTitle] = useState('');
    const [priority, setPriority] = useState('High');
    const [date, setDate] = useState(dayjs());
    const assigneesRef = useRef([]);
    const [checklist, setChecklist] = useState([{ item: '', completed: false }]);
    const [selectedAssign, setSelectedAssign] = useState(null);
    const [assignDropdown, setAssigmDropdown] = useState()
    // Handlers for form fields
    const handleChecklistChange = (index, value) => {
        const newChecklist = [...checklist];
        newChecklist[index].item = value;
        setChecklist(newChecklist);
    };

    const handleAddChecklistItem = () => {
        setChecklist([...checklist, { item: '', completed: false }]);
    };

    const handleRemoveChecklistItem = (index) => {
        const newChecklist = checklist.filter((_, i) => i !== index);
        setChecklist(newChecklist);
    };
    const handleSave = async () => {
        try {
            console.log(selectedAssign, 'selectedAssign');
            // Process form data and save the task
            const taskData = {
                title: taskTitle,
                priority: priority,
                assignee_id: selectedAssign,
                due_date: date,
                status: 'Backlog',
                checklist: checklist,
            };

            const response = await addUserTask(taskData);
            console.log(response);
            handleClose(false);
            upDate(true);
        } catch (error) {
            // Log the error for debugging
            console.error('Error saving task:', error);
            handleClose(false);
        }
    };
    useEffect(() => {
        getAssignees().then((res) => {
            console.log(res.data, "response");
            let tmp = addPeople.filter((el) => el.name && el)
            tmp = tmp.map((el) => ({ name: el.name, value: el.name }));
            // assigneesRef.current = tmp; // Update the ref with the formatted data
            assigneesRef.current = Array.from(
                new Map(tmp.map(item => [item.name, item])).values()
            );
            setAssigmDropdown(tmp);
            console.log(assigneesRef.current, 'tmp')
        })
    }, []);

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>
                {/* Task Title */}
                <Form.Group controlId="taskTitle">
                    <Form.Label>Title <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Task Title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                </Form.Group>

                {/* Priority Selection */}
                <Form.Group controlId="priority d-flex">
                    <div className="d-flex mt-4">
                        <Form.Label style={{ marginRight: '2px' }}>Select Priority <span style={{ color: 'red' }}>*</span></Form.Label>
                        <div className="d-flex gap-3">
                            <Button1 label="High Priority" onClick={() => setPriority('High')} style={{ padding: '5px', fontSize: '12px', borderRadius: '08px' }} severity="danger" icon={<FaCircle className='icon' />} outlined />
                            <Button1 label="Moderate Priority" onClick={() => setPriority('Moderate')} style={{ padding: '5px', fontSize: '12px', borderRadius: '08px' }} severity="info" icon={<FaCircle className='icon' />} outlined />
                            <Button1 label="Low Priority" onClick={() => setPriority('Low')} style={{ padding: '5px', fontSize: '12px', borderRadius: '08px' }} severity="success" icon={<FaCircle className='icon' />} outlined />
                        </div>
                    </div>
                </Form.Group>

                {/* Assignee Input */}
                <Form.Group controlId="assignee">
                    <div className="d-flex mt-4">
                        <Form.Label style={{ width: '80x' }}>Assign to</Form.Label>
                        <Autocomplete
                            freeSolo
                            fullWidth
                            size='small'
                            id="free-solo-2-demo"
                            disableClearable
                            onChange={(e, v) => setSelectedAssign(v)}
                            options={assigneesRef.current.map((option) => option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder='Add a Assign'
                                    slotProps={{
                                        input: {
                                            ...params.InputProps,
                                            type: 'search',
                                        },
                                    }}
                                />
                            )}
                        />
                    </div>
                </Form.Group>

                {/* Checklist Section */}
                <Form.Group controlId="checklist">
                    <Form.Label>Checklist ({checklist.filter(item => item.completed).length}/{checklist.length}) <span style={{ color: 'red' }}>*</span></Form.Label>
                    {checklist.map((item, index) => (
                        <div className="d-flex align-items-center" style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', padding: '5px' }}>
                            <Checkbox inputId="task-checkbox" checked={item.completed} onChange={() => {
                                const newChecklist = [...checklist];
                                newChecklist[index].completed = !newChecklist[index].completed;
                                setChecklist(newChecklist);
                            }} className="mr-2" />
                            <Form.Control
                                type="text"
                                placeholder="Task to be done"
                                value={item.item}
                                onChange={(e) => handleChecklistChange(index, e.target.value)}
                            />
                            <Button1 icon="pi pi-trash" className="p-button-text p-button-danger p-0" onClick={() => handleRemoveChecklistItem(index)} />
                        </div>
                    ))}
                    <Button1 onClick={handleAddChecklistItem} label="+ Add New" severity="secondary" text />
                </Form.Group>
            </Modal.Body>
            {/* <Modal.Footer> */}
            <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-between' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDatePicker defaultValue={dayjs('2022-04-17')} value={date}
                        onChange={(newValue) => {
                            setDate(newValue); // Update state with new date
                        }}
                        renderInput={(params) => <TextField {...params} />} />
                </LocalizationProvider>
                {/* <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" placeholder='DOB' /> */}
                <div style={{ display: 'flex', padding: '10px', gap: '10px' }}>
                    <Button1 onClick={() => handleClose(false)} label="Cancel" severity="danger" outlined style={{ borderRadius: '8px' }} />
                    <Button1 onClick={handleSave} label="Save" severity="primary" style={{ borderRadius: '8px' }} />
                </div>
            </div>
        </Modal>
    );
};

export default TaskModal;
