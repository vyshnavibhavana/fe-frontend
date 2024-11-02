import React, { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AccountCircle, Email, Lock } from '@mui/icons-material';
import { updateRegister } from './DashboardService';

const Settings = () => {
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [data, setData] = useState({});
    const handleChange = (e) => {
        let { name, value } = e.target;
        let tmp = { ...data };
        tmp[name] = value;
        setData(tmp);
    }
    const handleToggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
    const handleToggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const handleClick = (data) => {
        updateRegister().then((res) => {
            console.log(res);
        })
    }
    return (
        <>
            <h4 style={{ textAlign: 'start', marginTop: '5px' }}>Settings</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', marginTop: '10px' }}>
                {/* Name Field */}
                <TextField
                    placeholder="Name"
                    variant="outlined"
                    fullWidth
                    size='small'
                    onChange={handleChange}
                    name='username'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Email Field */}
                <TextField
                    placeholder="Update Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name='email'
                    size='small'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Old Password Field */}
                <TextField
                    placeholder="Old Password"
                    type={showOldPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name='createPassword'
                    size='small'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleOldPasswordVisibility} edge="end">
                                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* New Password Field */}
                <TextField
                    placeholder="New Password"
                    type={showNewPassword ? 'text' : 'password'}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name='password'
                    size='small'
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleToggleNewPasswordVisibility} edge="end">
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Update Button */}
                <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
                    Update
                </Button>
            </div>
        </>
    )
}

export default Settings;