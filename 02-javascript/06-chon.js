// const wakeUp = ms => {
//   setTimeout(() => {console.log('起きた');}, ms);
// };

// const greet = () =>{
//   console.log('おやすみ');
//   wakeUp(2000);
//   console.log('おはよう！');
// }

// greet();

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// const greet = () => {
//   console.log('おやすみ');

//   sleep(2000)
//     .then(() => {
//       console.log('起きた');
//       console.log('おはよう！');
//     })
//     .catch(err => {
//       console.error('睡眠不足です:', err);
//     })
// }

// greet();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const greet = async() => {
  console.log('おやすみ');

  try {
    await sleep(2000);
    console.log('起きた');
    console.log('おはよう！');
  }catch (err){
    console.log('睡眠例外です：', err)
  }
}

greet();
