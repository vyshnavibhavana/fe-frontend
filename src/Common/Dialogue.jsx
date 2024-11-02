import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './Dialogue.css';  // for custom styling
import { addPeople } from '../UI/Auth/Apps/DashboardService';

const AddPeopleToBoard = ({ show, handleClose, onAddEmail }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            onAddEmail(email);
            setEmail('');
            addPeople({ email }).then((res) => console.log(res));
            handleClose(false);
        }
    };

    const dialogFooter = (
        <div className="button-container">
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => handleClose(false)} />
            <Button
                label="Add Email"
                icon="pi pi-check"
                onClick={handleSubmit}
                className="p-button-primary"  // Primary color style for the button
                autoFocus
            />
        </div>
    );

    return (
        <>

            <Dialog
                header="Add people to the board"
                visible={show}
                style={{ width: '30vw' }}
                footer={dialogFooter}
                onHide={() => handleClose(false)}
                className="custom-dialog"
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-field">
                        <InputText
                            type="email"
                            placeholder="Enter the email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="custom-input"
                            style={{ width: '100%' }}  // Ensure the input is full-width
                            required
                        />
                    </div>
                </form>
            </Dialog>
        </>
    );
};

export default AddPeopleToBoard;
