const generateNumber = ()=>{
  const rand = Math.random() * 100;
  return rand.toFixed(2)
}

const generateRow = ()=>{
  let row = [];
  for (var i = 0; i < 4; i++) {
    row = [...row, generateNumber()]
  }
  return row
}

const generateDataset = ()=>{
  let dataset = [];
  for (var i = 0; i < 1000; i++) {
    dataset = [...dataset, generateRow()]
  }
  return dataset;
}

let dataset = generateDataset();
console.log(dataset);
