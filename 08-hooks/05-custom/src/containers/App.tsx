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

    return () => clearInterval(timerId);  // コンポーネントのアンマウント時にcrearIntervalを実行。時間経過を止める??
  }, [limitSec]); // 再レンダリング時にlimitSecが変更されていれば、①に戻る。

  return [timeLeft, reset];
};

const AppContainer: FC = () => {
  const LIMIT = 60;
  const [timeLeft, reset] = useTimer(LIMIT);

  return <AppComponent timeLeft={timeLeft} reset={reset} />;
};

export default AppContainer;
