import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const{day, days} = state;

  const setDay = day => setState({ ...state, day });
 
  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then(all=>{
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState(prev => ({
        ...prev,
         days,
         appointments,
         interviewers
        }))
    })
  }, []);

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios
    .put(`/api/appointments/${id}`, appointment
    )
    .then(response => {
      //console.log('++++',response)
      setState({
        ...state,
        appointments
      });
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  function cancelInterview(id){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then(response => {
      //console.log('++++',response)
      setState({
        ...state,
        appointments
      });
      
    })
    .catch(error => {
      console.log(error)
    })
  }

  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  const schedule = appointments.map((appointment) => {
  //const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={getInterview(state, appointment.interview)}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });
 
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={days} value={day} setDay={setDay} />
        {/* <DayList days={state.days} value={state.day} setDay={setDay} /> */}
          
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {/* {dailyAppointments.map(appointment=>
          <Appointment
          key={appointment.id}
          {...appointment}
        />)} */}
        {/* <Appointment key="last" time="5pm" /> */}
      </section>
    </main>
  );
}
