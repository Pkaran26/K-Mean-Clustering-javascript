const generateNumber = ()=>{
  const rand = Math.random() * 100;
  return parseFloat(rand.toFixed(2))
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
  for (var i = 0; i < 100; i++) {
    dataset = [...dataset, generateRow()]
  }
  return dataset;
}

const getCentroids = (value, dataset)=>{
  let centroids = [];
  for (var i = 0; i < value; i++) {
    centroids = [...centroids, dataset[parseInt(generateNumber())]]
  }
  // centroids = [
  //   dataset[0],
  //   dataset[50],
  //   dataset[100]
  // ]
  return centroids;
}

class Person{

}

const calEquDistance = (centroid, row)=>{
  let val = 0;
  for (var i = 0; i < centroid.length; i++) {
    val += Math.pow((row[i] - centroid[i]), 2);
  }
  return parseFloat(Math.sqrt(val).toFixed(2));
}

const compareDistance = (results)=>{
  let min = results[0];
  let index = 0;
  for (var i = 1; i < results.length; i++) {
    if(min > results[i]){
        min = results[i];
        index = i;
    }
  }
  return index;
}

const calMean = (centroid, rows)=>{
  let cent = [[0], [0], [0], [0]];
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < rows[i].length; j++) {
      cent[j] = Number(cent[j] + parseFloat(rows[i][j]))
    }
  }
  for (var i = 0; i < cent.length; i++) {
    cent[i] = parseFloat((cent[i] / (rows.length)).toFixed(2));
  }
  return cent;
}

const displayInTable = (data)=>{
  let html = '';
  data.map((row, i)=>{
    html += '<tr>';
    row.map((col, j)=>{
      html += `<td>${ col }</td>`;
    })
    html += '</tr>';
  })
  return html;
}

const main = (centroid_no, dataset=null)=>{
  if(!dataset){
    dataset = generateDataset();
  }
  let centroids = getCentroids(centroid_no, dataset);
  console.log(centroids);
  let cluster = [];
  for (var x = 0; x < 100; x++) {
    cluster = [[], [], [], []]
    dataset.map((row, i)=>{
      let distance = [];
      centroids.map((centroid, j)=>{
        distance = [...distance, calEquDistance(row, centroid)];
      })
      let index = compareDistance(distance);
      cluster[index] = [...cluster[index], row];
      centroids[index] = calMean(centroids[index], cluster[index]);
    })
  }
   console.log(centroids);
  return {
    centroids,
    cluster
  };
}

module.exports = main
// const { centroids, cluster } = main(3);
