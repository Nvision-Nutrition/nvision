import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const GlobalStateProvider = ({children, session}) => {
  const [theme, setTheme] = useState('light');
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    calorieGoal: 0,
    waterGoal: 0,
    weightGoal: 0
  });
  // userID should be set upon login/signup/session validation
  // when the database returns that userID to the client
  // (defaults to '1')

  const [userId, setUserId] = useState(0);
  const [calorieCount, setCalorieCount] = useState('20');
  const [waterCount, setWaterCount] = useState('20');
  const getCurrentCounts = () => {
    axios.get('/api/progress?type=day')
        .then(({data}) => {
          let today = new Date();
          today = today.toISOString().slice(0, 10);

          setCalorieCount(data[today].calorieSum);
          setWaterCount(data[today].waterSum);
        }).catch((err) => console.error(err));
  };

  useEffect(() => {
    getCurrentCounts();
    //weight not implemented in sign up form yet
    setUserInfo({
      firstName: session.user.firstname,
      lastName: session.user.lastname,
      email: session.user.email,
      username: session.user.username,
      calorieGoal: session.user.caloriegoal,
      waterGoal: session.user.watergoal,
      weightGoal: null
    })
    setUserId(session.user.id)
  }, []);

  return (
    <Context.Provider value={{
      theme,
      setTheme,
      userId,
      setUserId,
      calorieCount,
      setCalorieCount,
      waterCount,
      setWaterCount,
      userInfo,
      setUserInfo,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export const Context = React.createContext();
