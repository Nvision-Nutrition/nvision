/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import axios from 'axios';

export const GlobalStateProvider = ({children, session}) => {
  const [theme, setTheme] = useState('light');
  const [updateFlag, setUpdateFlag] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    calorieGoal: 0,
    waterGoal: 0,
    weightGoal: 0,
  });

  const [userId, setUserId] = useState(0);
  const [calorieCount, setCalorieCount] = useState(0);
  const [waterCount, setWaterCount] = useState(0);

  const [weightValue, setWeightValue] = useState(0);
  const getCurrentCounts = () => {
    axios.get(`/api/progress?type=day&userId=${userId}`)
        .then(({data}) => {
          const today = getCurrentDate();
          setCalorieCount(data[today].calorieSum);
          setWaterCount(data[today].waterSum);
        }).catch((err) => console.error(err));
  };

  const getCurrentDate = () => {
    const todayDate = new Date();
    // eslint-disable-next-line max-len
    const today = `${todayDate.getFullYear()}-${('0' + (todayDate.getMonth() + 1)).slice(-2)}-${('0' + todayDate.getDate()).slice(-2)}`;
    return today;
  };

  useEffect(() => {
    setUserInfo({
      firstName: session.user.firstname,
      lastName: session.user.lastname,
      email: session.user.email,
      username: session.user.username,
      calorieGoal: session.user.caloriegoal,
      waterGoal: session.user.watergoal,
      weightGoal: session.user.weightgoal,
    });
    setUserId(session.user.id);
  }, []);

  useEffect(() => {
    getCurrentCounts();
  }, [userId]);

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
      weightValue,
      setWeightValue,
      userInfo,
      setUserInfo,
      getCurrentDate,
      updateFlag,
      setUpdateFlag,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export const Context = React.createContext();
