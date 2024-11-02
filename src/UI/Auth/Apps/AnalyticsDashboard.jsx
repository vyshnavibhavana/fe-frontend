import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Grid2, Paper } from '@mui/material';
import { getAnalytics } from './DashboardService';
import { FaCircle } from 'react-icons/fa6';

const AnalyticsDashboard = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        getAnalytics().then((res) => {
            setData(res.data.data);
        })
    }, [])
    return (
        <>
            <h4 style={{ textAlign: 'start', marginTop: '5px' }}>Analytics</h4>
            <div className='row mt-6'>
                <div className='col-md-6'>
                    <Paper elevation={1} >

                        {data?.task?.map((el) => {
                            return (
                                <Grid2 container spacing={2}>
                                    <Grid2 item md={12} l={12} sx={{ width: '100%', padding: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <div className='d-flex align-items-center gap-2' style={{ fontFamily: 'Open sans-serif' }}>
                                                <FaCircle className='icon' color='#90C4CC' />
                                                <span>
                                                    {el.label}
                                                </span>
                                            </div>
                                            <div>{el.count}</div>
                                        </div>
                                    </Grid2>
                                </Grid2>
                            )
                        })
                        }
                    </Paper >
                </div >

                <div div className='col-md-6'>
                    <Paper elevation={1} >

                        {data?.priority?.map((el) => {
                            return (
                                <Grid2 container spacing={2}>
                                    <Grid2 item md={12} l={12} sx={{ width: '100%', padding: '10px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                            <div className='d-flex align-items-center gap-2' style={{ fontFamily: 'Open sans-serif' }}>
                                                <FaCircle className='icon' color='#90C4CC' />
                                                <span>
                                                    {el.label}
                                                </span>
                                            </div>
                                            <div>{el.count}</div>
                                        </div>
                                    </Grid2>
                                </Grid2>
                            )
                        })
                        }
                    </Paper>
                </div >
            </div>
        </>
    );
};

export default AnalyticsDashboard;
