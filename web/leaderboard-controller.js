(async () => {
  const awslambda = '/glacier/snake/score/top'

  const resp = await fetch(awslambda).then(r => r.json());

  // [{'name': 'glacier-001', 'point': 36.8, 'time': 36.997}]
  var names = resp.map(s => s.name)
  var scores = resp;

  let ln = document.getElementById('loadnotif');
  ln.textContent = "Loading and sorting leaderboard data...      This might take a few seconds, we have "+names.length+" entries to sort";

  let points = [];
  let times = [];
  let i = 0;
  while (i < scores.length){
    points.push(scores[i].point);
    times.push(scores[i].time);
    i += 1;
  }

  // now we need to order it properly
  var rankscores = [];
  i = 0;
  while (i < names.length){
    rankscores.push(parseFloat(points[i])+parseFloat(times[i])/1000);
    i += 1;
  }

  var ranks = [];
  var subjlist = [];
  i = 0;
  while (i < rankscores.length){
    subjlist.push(rankscores[i]);
    i += 1;
  }

  let ranker = 1;
  //console.log(subjlist);
  while (subjlist.length > 0){
    let max = (subjlist.reduce(function(a, b) {
      return Math.max(a, b);
    }, -Infinity));

    //console.log('max '+max);
    //console.log('index '+rankscores.indexOf(max));
    //console.log('lst '+subjlist);
    ranks.push(rankscores.indexOf(max));
    subjlist.splice(subjlist.indexOf(max),1);

    // add the div

    i = rankscores.indexOf(max);

    if ((rankscores[i] != 0 && points[i] != 0)){
      let display = document.getElementById('leaderboard generated');
      let bgclr;
      if (ranker == 1){
        bgclr = "rgb(100,100,0)";
      } else if (ranker == 2){
        bgclr = "rgb(170,170,170)";
      } else if (ranker == 3 ){
        bgclr = "rgb(85,85,85)";
      } else {
        bgclr = "black";
      }

      //255*3 = 765

      if (ranker == 1){
        const div = document.createElement('div');
        div.innerHTML = `
          <div style="background-color: `+bgclr+`" class="fullwidth">
          <div id="d1" style="background: linear-gradient(to right, rgb(255,0,0), rgb(0,0,255));" class="left-container">
            <h1 style="color: black">`+ranker+`</h1>
          </div>
          <div id="d2" style="background-color: `+bgclr+`;" class="right-container">
            <h1 style="color: black">`+names[i].substring(0, 23)+`</h1>
          </div>
          <div id="d3" style="background-color: `+bgclr+`" class="mid-container">
            <h1 style="color: black">`+points[i]+`</h1>
          </div>
          <div id="d4" style="background-color: `+bgclr+`" class="mid-container">
            <h1 style="color: black">`+times[i]+`</h1>
          </div>
          <div id="d5" style="background-color: `+bgclr+`" class="center-container">
            <h1 style="color: black">`+rankscores[i]+`</h1>
          </div>
        </div>
        <br>`;
        display.appendChild(div);
      } else if (names[i] == ' ' || names[i] == ''){
        const div = document.createElement('div');
        div.innerHTML = `
        <div style="background-color: `+bgclr+`" class="fullwidth">
        <div style="background-color: `+bgclr+`" class="left-container">
          <h1>`+ranker+`</h1>
        </div>
        <div style="background-color: `+bgclr+`" class="right-container">
          <h1>`+names[i].substring(0, 23)+`</h1>
        </div>
        <div style="background-color: `+bgclr+`" class="mid-container">
          <h1>`+points[i]+`</h1>
        </div>
        <div style="background-color: `+bgclr+`" class="mid-container">
          <h1>`+times[i]+`</h1>
        </div>
        <div style="background-color: `+bgclr+`" class="center-container">
          <h1>`+rankscores[i]+`</h1>
        </div>
        </div>
        <br>`;
        display.appendChild(div);

    } else {
      const div = document.createElement('div');
      div.innerHTML = `<div style="background-color: `+bgclr+`" class="fullwidth">
      <div style="background-color: `+bgclr+`" class="left-container">
        <h1>`+ranker+`</h1>
      </div>
      <div style="background-color: `+bgclr+`" class="right-container">
        <h1>`+names[i].substring(0, 23)+`</h1>
      </div>
      <div style="background-color: `+bgclr+`" class="mid-container">
        <h1>`+points[i]+`</h1>
      </div>
      <div style="background-color: `+bgclr+`" class="mid-container">
        <h1>`+times[i]+`</h1>
      </div>
      <div style="background-color: `+bgclr+`" class="center-container">
        <h1>`+rankscores[i]+`</h1>
      </div>
    </div>
    <br>`;
      display.appendChild(div);
        
    }
    ranker += 1;
  }
  }

  //console.log(rankscores);
  //console.log(ranks);

  // i = 0;
  // while (i < names.length){
  //   let display = document.getElementById('leaderboard generated');
  //   display.innerHTML += `
  //   <div class="fullwidth">
  //   <div class="left-container">
  //     <h1>Rank</h1>
  //   </div>
  //   <div class="right-container">
  //     <h1>`+names[i]+`</h1>
  //   </div>
  //   <div class="mid-container">
  //     <h1>`+points[i]+`</h1>
  //   </div>
  //   <div class="mid-container">
  //     <h1>`+times[i]+`</h1>
  //   </div>
  //   <div class="center-container">
  //     <h1>`+rankscores[i]+`</h1>
  //   </div>
  // </div>
  // <br>`;
  //   i += 1;
  // }

  const sleep = ms => new Promise(res => setTimeout(res, ms));
  (async () => {
    let loader = document.getElementById('loader');
    loader.style.display="none"
    let clr = -765;
    let dir = 'left';
    while (true){
      let d = document.getElementById("d1");
      d.style.background = "linear-gradient(to right, rgb("+Math.abs(255-clr)+","+Math.abs(510-clr)+","+(Math.abs(765-clr)+Math.abs(0-clr))+"), rgb("+Math.abs(255-(clr+153))+","+Math.abs(510-(clr+153))+","+(Math.abs(765-(clr+153))+Math.abs(-255-(clr+153)))+")";
      d = document.getElementById("d2");
      d.style.background = "linear-gradient(to right, rgb("+Math.abs(255-(clr+153))+","+Math.abs(510-(clr+153))+","+(Math.abs(765-(clr+153))+Math.abs(0-(clr+153)))+"), rgb("+Math.abs(255-(clr+306))+","+Math.abs(510-(clr+306))+","+(Math.abs(765-(clr+306))+Math.abs(-255-(clr+306)))+")";
      d = document.getElementById("d3");
      d.style.background = "linear-gradient(to right, rgb("+Math.abs(255-(clr+306))+","+Math.abs(510-(clr+306))+","+(Math.abs(765-(clr+306))+Math.abs(0-(clr+306)))+"), rgb("+Math.abs(255-(clr+459))+","+Math.abs(510-(clr+459))+","+(Math.abs(765-(clr+459))+Math.abs(-255-(clr+459)))+")";
      d = document.getElementById("d4");
      d.style.background = "linear-gradient(to right, rgb("+Math.abs(255-(clr+459))+","+Math.abs(510-(clr+459))+","+(Math.abs(765-(clr+459))+Math.abs(0-(clr+459)))+"), rgb("+Math.abs(255-(clr+612))+","+Math.abs(510-(clr+612))+","+(Math.abs(765-(clr+612))+Math.abs(-255-(clr+612)))+")";
      d = document.getElementById("d5");
      d.style.background = "linear-gradient(to right, rgb("+Math.abs(255-(clr+612))+","+Math.abs(510-(clr+612))+","+(Math.abs(765-(clr+612))+Math.abs(0-(clr+612)))+"), rgb("+Math.abs(255-(clr+765))+","+Math.abs(510-(clr+765))+","+(Math.abs(765-(clr+765))+Math.abs(-255-(clr+765)))+")";


      if (clr >= 765){
        clr = -765;
      }
      clr += 0.5;
      await sleep(2);
    }
  })();

})();