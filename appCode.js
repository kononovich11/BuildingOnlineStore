
async function getData() {
  const response = await fetch('http://localhost:3000');
  console.log(response.json());
}
