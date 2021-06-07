import React, {useState, useEffect} from "react";
import "./styles/app.css"
import logo from "./assets/ecc.png"
import moment from 'moment';

function App(props) {

  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0, 
    deadline: "2021-07-01T00:00:00-04:00",
    actual: moment().format(),
    difference: 0
  });


  useEffect(() => {
    let {deadline} = state;
    let difference = moment(deadline).diff(moment(state.actual));

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const timeInterval = setInterval(() => {
        if(days > 0){
            if(seconds > 0){
                seconds--;
            }else if(seconds === 0){
              seconds = 59
              if(minutes === 0){
                minutes = 59;
                if(hours === 0){
                  hours = 24;
                  days--;
                }else{
                  hours--;
                }
              }else{
                minutes--;
              }
              
            }
        }else{
          days = 0; hours = 0; minutes = 0; seconds = 0;
        }
        setState(prevState=>({prevState, difference, days, hours, minutes, seconds}))
      // console.log(second);
    }, 1000);

    return () => clearInterval(timeInterval);   
  }, [])

  return (
    <div className = "container-app">
      <img className = "img" src = {logo}/>
      <div className = "message-container">
        <h1 className = "title">COMING SOON...</h1>
        <h3 className = "messages">
          ECC is a business process outsourcing company, which is created by old agents who have severals years in this industry.<br/>
        </h3>
        <h3 className = "messages">
          We a type of call center which modifies its contact center operations depending on the requirements of the client.<br/>
        </h3>
      </div>
      <div className = "timer-container">
        <div className = "timer-sub-container">
          <div className = "timer">
            <div className = "number">
              {state.days > 9 ? state.days : `0${state.days}` }
            </div>
            <div className = "category">
              {state.days > 1 ? "Days" : "Day"}
            </div>
          </div>
          <div className = "timer">
            <div className = "number">
              {state.hours > 9 ? state.hours : `0${state.hours}` }
            </div>
            <div className = "category">
              {state.hours > 1 ? "Hours" : "Hour"}
            </div>
          </div>
          <div className = "timer">
            <div className = "number">
              {state.minutes > 9 ? state.minutes : `0${state.minutes}` }
            </div>
            <div className = "category">
              {state.minutes > 1 ? "Minutes" : "Minute"}
            </div>
          </div>
          <div className = "timer">
            <div className = "number">
              {state.seconds > 9 ? state.seconds : `0${state.seconds}` }
            </div>
            <div className = "category">
              {state.seconds > 1 ? "Seconds" : "Second"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

