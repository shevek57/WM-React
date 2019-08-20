import React from 'react';

const Button = (props)=>{
  return(
    <div style={styles.viewContainer}>
      <p style={styles.textContainer}>{props.text}</p>
    </div>
  )
}
const styles={
  viewContainer:{
    borderWidth:2,
    borderStyle:"solid",
    backgroundColor:"#F8F8F8",
    borderColor:"#42A5F5",
    color:"#000",
    paddingLeft:5,
    paddingRight:5,
    width:"auto",
    height:"auto",
    cursor:"pointer"
  },
  textContainer:{
    fontSize:"calc(1px + 2vmin)",
    textTransform:"uppercase",
    textAlign:"center"
  }
}
export { Button }

