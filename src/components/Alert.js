import React from 'react'

export default function Alert(props) {
    const {alert}=props;
  return (
    <div style={{display:alert.disp,height:"50px",position:"absolute",zIndex:"50",width:"100%"}} className={`alert alert-${alert.type} my-5`} role="alert">
         {alert.msg}
</div>
  )
}
