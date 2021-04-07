import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const GlobalStateProvider = (props) => {
  const [theme, setTheme] = useState('light');
  const [userInfo, setUserInfo] = useState({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janeDoe@email.com',
    username: 'username',
    weightGoal: 150,
  });
  // userID should be set upon login/signup/session validation
  // when the database returns that userID to the client
  // (defaults to '1')
  const [userId, setUserId] = useState(1);
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
    }}
    >
      {props.children}
    </Context.Provider>
  );
};

export const Context = React.createContext();
