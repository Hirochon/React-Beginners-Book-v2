import React, { FC, useEffect, useState } from 'react';

import AppComponent from '../components/App';

// const 関数名 = (引数の変数名: 引数の型): [返り値１の型, 返り値２の関数] => {}
const useTimer = (limitSec: number): [number, () => void] => {
  const [timeLeft, setTimeLeft] = useState(limitSec);

  const reset = () => {
    setTimeLeft(limitSec);
  };

  // ①コンポーネントのレンダリング直前にtickとtimerIdが動く。
  useEffect(() => {
    const tick = () => {
      setTimeLeft(prevTime => (prevTime === 0 ? limitSec : prevTime - 1));
    };
    const timerId = setInterval(tick, 1000);

    return () => clearInterval(timerId);
  }, [limitSec]); // limitSecが変更されていれば、①が動き出す

  return [timeLeft, reset];
};

const AppContainer: FC = () => {
  const LIMIT = 60;
  const [timeLeft, reset] = useTimer(LIMIT);

  return <AppComponent timeLeft={timeLeft} reset={reset} />;
};

export default AppContainer;
