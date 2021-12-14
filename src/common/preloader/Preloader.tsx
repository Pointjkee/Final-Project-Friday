import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';


export const Preloader=()=> {
    return (
       <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
           <CircularProgress />
       </div>
    );
}