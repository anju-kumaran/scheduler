import React from "react"

import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"

export default function InterviewerList(props){
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}    
      />

      // <InterviewerListItem
      //   key={interviewer.id}
      //   name={interviewer.name}
      //   avatar={interviewer.avatar}
      //   selected={interviewer.id === props.interviewer}
      //   setInterviewer={() => props.setInterviewer(interviewer.id)}
      // />
    );
  });

// export default function InterviewerList(props){
//   const interviewerItem = props.interviewers.map(interviewer => (
//     <InterviewerListItem
//       key={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}
//       selected={interviewer.id === props.interviewer}
//       // setInterviewer={props.setInterviewer}
//       setInterviewer={event => props.onChange(interviewer.id)}
//     />
//   ));

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  )
}
