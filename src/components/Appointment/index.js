import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

function shows(props){
  return( props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> :<Empty/>)}
export default function Appointment(props) {
  console.log(props)
  return (<article className="appointment">
   <Header time={props.time}/>
   {shows(props)}
  </article>);
}


