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

const main = (dataset, centroid_no)=>{
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
   // console.log(cluster[0]);
  // console.log(cluster[1]);
  return {
    centroids,
    cluster
  };
}

let dataset = generateDataset();
// let dataset = [[4.9,3,1.4,0.2],[4.7,3.2,1.3,0.2],[4.6,3.1,1.5,0.2],[5,3.6,1.4,0.2],[5.4,3.9,1.7,0.4],[4.6,3.4,1.4,0.3],[5,3.4,1.5,0.2],[4.4,2.9,1.4,0.2],[4.9,3.1,1.5,0.1],[5.4,3.7,1.5,0.2],[4.8,3.4,1.6,0.2],[4.8,3,1.4,0.1],[4.3,3,1.1,0.1],[5.8,4,1.2,0.2],[5.7,4.4,1.5,0.4],[5.4,3.9,1.3,0.4],[5.1,3.5,1.4,0.3],[5.7,3.8,1.7,0.3],[5.1,3.8,1.5,0.3],[5.4,3.4,1.7,0.2],[5.1,3.7,1.5,0.4],[4.6,3.6,1,0.2],[5.1,3.3,1.7,0.5],[4.8,3.4,1.9,0.2],[5,3,1.6,0.2],[5,3.4,1.6,0.4],[5.2,3.5,1.5,0.2],[5.2,3.4,1.4,0.2],[4.7,3.2,1.6,0.2],[4.8,3.1,1.6,0.2],[5.4,3.4,1.5,0.4],[5.2,4.1,1.5,0.1],[5.5,4.2,1.4,0.2],[4.9,3.1,1.5,0.1],[5,3.2,1.2,0.2],[5.5,3.5,1.3,0.2],[4.9,3.1,1.5,0.1],[4.4,3,1.3,0.2],[5.1,3.4,1.5,0.2],[5,3.5,1.3,0.3],[4.5,2.3,1.3,0.3],[4.4,3.2,1.3,0.2],[5,3.5,1.6,0.6],[5.1,3.8,1.9,0.4],[4.8,3,1.4,0.3],[5.1,3.8,1.6,0.2],[4.6,3.2,1.4,0.2],[5.3,3.7,1.5,0.2],[5,3.3,1.4,0.2],[7,3.2,4.7,1.4],[6.4,3.2,4.5,1.5],[6.9,3.1,4.9,1.5],[5.5,2.3,4,1.3],[6.5,2.8,4.6,1.5],[5.7,2.8,4.5,1.3],[6.3,3.3,4.7,1.6],[4.9,2.4,3.3,1],[6.6,2.9,4.6,1.3],[5.2,2.7,3.9,1.4],[5,2,3.5,1],[5.9,3,4.2,1.5],[6,2.2,4,1],[6.1,2.9,4.7,1.4],[5.6,2.9,3.6,1.3],[6.7,3.1,4.4,1.4],[5.6,3,4.5,1.5],[5.8,2.7,4.1,1],[6.2,2.2,4.5,1.5],[5.6,2.5,3.9,1.1],[5.9,3.2,4.8,1.8],[6.1,2.8,4,1.3],[6.3,2.5,4.9,1.5],[6.1,2.8,4.7,1.2],[6.4,2.9,4.3,1.3],[6.6,3,4.4,1.4],[6.8,2.8,4.8,1.4],[6.7,3,5,1.7],[6,2.9,4.5,1.5],[5.7,2.6,3.5,1],[5.5,2.4,3.8,1.1],[5.5,2.4,3.7,1],[5.8,2.7,3.9,1.2],[6,2.7,5.1,1.6],[5.4,3,4.5,1.5],[6,3.4,4.5,1.6],[6.7,3.1,4.7,1.5],[6.3,2.3,4.4,1.3],[5.6,3,4.1,1.3],[5.5,2.5,4,1.3],[5.5,2.6,4.4,1.2],[6.1,3,4.6,1.4],[5.8,2.6,4,1.2],[5,2.3,3.3,1],[5.6,2.7,4.2,1.3],[5.7,3,4.2,1.2],[5.7,2.9,4.2,1.3],[6.2,2.9,4.3,1.3],[5.1,2.5,3,1.1],[5.7,2.8,4.1,1.3],[6.3,3.3,6,2.5],[5.8,2.7,5.1,1.9],[7.1,3,5.9,2.1],[6.3,2.9,5.6,1.8],[6.5,3,5.8,2.2],[7.6,3,6.6,2.1],[4.9,2.5,4.5,1.7],[7.3,2.9,6.3,1.8],[6.7,2.5,5.8,1.8],[7.2,3.6,6.1,2.5],[6.5,3.2,5.1,2],[6.4,2.7,5.3,1.9],[6.8,3,5.5,2.1],[5.7,2.5,5,2],[5.8,2.8,5.1,2.4],[6.4,3.2,5.3,2.3],[6.5,3,5.5,1.8],[7.7,3.8,6.7,2.2],[7.7,2.6,6.9,2.3],[6,2.2,5,1.5],[6.9,3.2,5.7,2.3],[5.6,2.8,4.9,2],[7.7,2.8,6.7,2],[6.3,2.7,4.9,1.8],[6.7,3.3,5.7,2.1],[7.2,3.2,6,1.8],[6.2,2.8,4.8,1.8],[6.1,3,4.9,1.8],[6.4,2.8,5.6,2.1],[7.2,3,5.8,1.6],[7.4,2.8,6.1,1.9],[7.9,3.8,6.4,2],[6.4,2.8,5.6,2.2],[6.3,2.8,5.1,1.5],[6.1,2.6,5.6,1.4],[7.7,3,6.1,2.3],[6.3,3.4,5.6,2.4],[6.4,3.1,5.5,1.8],[6,3,4.8,1.8],[6.9,3.1,5.4,2.1],[6.7,3.1,5.6,2.4],[6.9,3.1,5.1,2.3],[5.8,2.7,5.1,1.9],[6.8,3.2,5.9,2.3],[6.7,3.3,5.7,2.5],[6.7,3,5.2,2.3],[6.3,2.5,5,1.9],[6.5,3,5.2,2],[6.2,3.4,5.4,2.3],[5.9,3,5.1,1.8]];

const { centroids, cluster } = main(dataset, 3);

let clLen = '[ ';
for (var i = 0; i < cluster.length; i++) {
  clLen += cluster[i].length;
  if( i< cluster.length - 1){
    clLen += ', '
  }
}
clLen += ']';
console.log(clLen);
//
// const html = `<tr>
//                 <td>dataset</td>
//                 <td>${ dataset.length }</td>
//               </tr>
//               <tr>
//                 <td>centroids</td>
//                 <td>${ centroids.length }</td>
//               </tr>
//               <tr>
//                 <td>cluster</td>
//                 <td>${ clLen }</td>
//               </tr>`
// document.getElementById("json").innerHTML = html;
