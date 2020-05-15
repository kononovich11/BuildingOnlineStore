
async function getData() {
  const response = await fetch('http://localhost:3000');
  console.log(response.json());
}

// function endReg() {
//   alert('Вы зарегестрированы!');
// }

// async function getDataFormReg() {
//   const response = await fetch('http://localhost:3000');
//   console.log(response);
// }