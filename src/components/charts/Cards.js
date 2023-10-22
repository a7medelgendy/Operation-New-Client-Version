import React from 'react'
import "../../styles/dashboard/dashboard.css";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Padding } from '@mui/icons-material';


export default function Cards({ title, value, cardStyle }) {
    let icon = null;

    if (title === "Completed") {
        icon = <CheckCircleOutlineIcon style={{ color: 'white', padding: '3px' }} />;
    } else if (title === "InProgress") {
        icon = <HourglassEmptyOutlinedIcon style={{ color: 'white', padding: '3px' }} />;
    } else if (title === "Canceled") {
        icon = <CancelOutlinedIcon style={{ color: 'white', padding: '3px' }} />;
    }

    return (
        <div
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
        </div>
    )
}
