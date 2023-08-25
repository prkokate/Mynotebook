import React from 'react'
import Notes from './Notes'

export default function Home(props) {
  const {Alert}=props;
  return (
    <div className="container">

      <Notes Alert={Alert} />
    </div>
    
  )
}
