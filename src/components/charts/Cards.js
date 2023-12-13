import React from 'react'
import "../../styles/dashboard/dashboard.css";
import { AssignmentRounded, CheckCircle, HourglassEmptyOutlined, CancelOutlined } from '@mui/icons-material';    //AssignmentRoundedIcon
import { Card, CardContent, Grid, Typography, IconButton, useMediaQuery } from '@mui/material';



export default function Cards({ title, value, cardStyle }) {
    let icon = null;

    if (title === "Total") {
        icon = <AssignmentRounded className="Total" /* style={{ color: 'white', padding: '3px', fontSize: "large !important" }} */ />;
    } else if (title === "Completed") {
        icon = <CheckCircle className="Completed" /* style={{ color: 'white', padding: '3px', fontSize: "large !important" }}  */ />;
    } else if (title === "InProgress") {
        icon = <HourglassEmptyOutlined className="InProgress" /* style={{ color: 'white', padding: '3px' }} */ />;
    } else if (title === "Canceled") {
        icon = <CancelOutlined className="Canceled"/*  style={{ color: 'white', padding: '3px' }} */ />;
    }

    const isSmallScreen = useMediaQuery('(max-width:600px)');
    return (

        /*         <div
                className={
                    "d-flex flex-column justify-content-center align-items-center dahsboard-card " +
                    cardStyle
                }
            >
                <div className='d-flex justify-content-center'>
                    <span>{icon}</span>
                    <span>{title}</span>
                </div>
        
                <p>{value}</p>
            </div> */



        <Card className="card-status  mb-4 mb-xl-0" >
            <CardContent>
                <Grid container spacing={isSmallScreen ? 2 : 3}>
                    <Grid item xs={12} sm={isSmallScreen ? 12 : 8}>
                        <Typography variant="h5" color="textSecondary" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h2" component="div" fontWeight="bold">
                            {value}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={isSmallScreen ? 12 : 4}>
                        <IconButton className={`icon icon-shape text-white rounded-circle shadow ${cardStyle} `}>
                            {icon}
                        </IconButton>
                    </Grid>
                </Grid>
                <Typography variant="body2" color="textSecondary" className="mt-3 mb-0 text-muted text-sm">
                    <span className="text-nowrap">Since November 2022</span>
                </Typography>
            </CardContent>
        </Card>

    )
}
