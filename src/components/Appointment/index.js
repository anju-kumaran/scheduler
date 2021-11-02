import React from "react";
import axios from "axios";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log(mode);

  function onAdd(){
    transition(CREATE);
  }

  // function onSave(){
  //   transition(SAVING);
  // }

  function onCancel(){
    back();
  }

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview);
    axios
      .put(`/api/appointments/${props.id}`, {
        interview
      })
      .then(response => {
        transition(SHOW)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function cancelAppointment() {
    transition(DELETING);
    props.cancelInterview(props.id);
    transition(EMPTY);
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={onCancel}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message="Delete the appointment"
        onConfirm={cancelAppointment}
        onCancel={onCancel}
        />
      )}
    {mode === SAVING && <Status message='Saving' />}
    {mode === DELETING && <Status message='Deleting' />}
    </article>
  );
}

