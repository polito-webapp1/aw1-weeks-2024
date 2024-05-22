const main = async() => {
  const response = await fetch('http://localhost:3001/api/questions');
  if(response.ok) {
    const data = await response.text();
    document.getElementById('results').innerText = data;
  }
}

main();