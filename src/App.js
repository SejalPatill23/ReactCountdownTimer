import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Card, Box, Grid, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';;

function App() {

  const currentDate = new Date('2024-12-31T23:59:59');
  const calculateTimeLeft = () => {
  const timedifference = +new Date(currentDate) - + new Date();
    let timeRemaining = {};

    if (timedifference > 0) {
      timeRemaining = {
        days: Math.floor(timedifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timedifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((timedifference / 1000 / 60) % 60),
        seconds: Math.floor((timedifference / 1000) % 60),
      };
    }

    return timeRemaining;
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeLeft());
  const [timerRunning, setTimerRunning] = useState(false);
  let timer;

  useEffect(() => {
    if (timerRunning) {
      timer = setTimeout(() => {
        setTimeRemaining(calculateTimeLeft());
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [timeRemaining, timerRunning]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
    clearTimeout(timer);
  };

  const addLeadingZero = value => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div>

      <Box sx={{ textAlign: 'center', mt: "10px", mb: "-5px" }}>
        {timeRemaining.days > 0 && (
          <Typography sx={{ fontSize: 25, fontWeight: "bold" }} >Countdown Timer</Typography>
        )}
      </Box>

      <Card sx={{ display: 'inline-block', mx: '250px', transform: 'scale(0.8)', backgroundColor: '#87CEEB', width: "1000px", height: "300px", borderRadius: "20px" }} >

        <Grid container xs={12} sx={{ mt: "40px" }} >

          <Grid xs={4}  >
            <Box sx={{ textAlign: 'center' }}  >
              <Typography sx={{ fontWeight: 'bold', fontSize: 40 }} >{addLeadingZero(timeRemaining.hours)}</Typography>
            </Box>
          </Grid>

          <Typography sx={{ fontWeight: 'bold', fontSize: 40 }} >:</Typography>

          <Grid xs={3} sx={{ textAlign: 'center' }} >
            <Typography sx={{ fontWeight: 'bold', fontSize: 40 }}>{addLeadingZero(timeRemaining.minutes)}</Typography>
          </Grid>

          <Typography sx={{ fontWeight: 'bold', fontSize: 40 }} >:</Typography>

          <Grid xs={4} sx={{ textAlign: 'center' }} >
            <Typography sx={{ fontWeight: 'bold', fontSize: 40 }}>{addLeadingZero(timeRemaining.seconds)}</Typography>
          </Grid>
        </Grid>

        <Grid xs={12} sx={{ textAlign: 'center', mt: "100px", mr: "10px", height: "100px" }}>
          {!timerRunning ? (
            <button style={{ padding: "20px", fontSize: 25, borderRadius: "20px", cursor: "pointer", backgroundColor: "green" }} onClick={startTimer}>Start</button>
          ) : (
            <button style={{ padding: "20px", fontSize: 25, borderRadius: "20px", cursor: "pointer", backgroundColor: "red" }} onClick={stopTimer}>Stop</button>
          )}
        </Grid>

      </Card>
    </div>
  );
}

export default App;
