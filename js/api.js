let urlTeam;
let urlClasement;

const tokenApi = 'a97d836f073d4d6d845a49eb6014e7dd';

const fetchApi = (url) =>{
  return fetch(url,{
    headers:{
      'X-Auth-Token' : tokenApi
    }
  })
}

const getBgColor = (index) => {
  const color = ["primary","secondary","info","dark"];
  return color[index];
}

const getRankColor = (rank) => {
  const color = ["dark","danger","warning","info"]
  return color> 3?color[0]:color[rank];
}

const getDataBola = (id) =>{
  urlClasement = `https://api.football-data.org/v2/competitions/${id}/standings`;
  fetchApi(urlClasement).then((response) => {
    return response.json();
  }).then((data) => {
    // console.log(data);
    // console.log(`${data.competition.name},${data.season.startDate},${data.season.endDate},${data.competition.area.name}`)
    let indexColor = Math.floor(Math.random()*4);
    let bgColor = getBgColor(indexColor);
    const titleData = `
    <div class="col-md-12 my-3 text-white">">
        <div class="card titleLeague bg-${bgColor}">
          <div class="card-body">
            <h2 class="card-title">${data.competition.name}</h2>
            <span class="card-text">Start Date : ${data.season.startDate}</span><br>
            <span class="card-text">End Date  : ${data.season.endDate}</span>
            <span class="countryLeague">Country : ${data.competition.area.name}</span>
          </div>
        </div>
    </div>`
    document.querySelector("#contentHome").innerHTML = titleData;

    let clubsData = '';
    data.standings[0].table.forEach((club) => {
      let colorRank = getRankColor(club.position);
      clubsData+=`
      <div class="col-md-12 col-sm-12 my-3 col-12">
        <div class="card cardTeam bg-white" >
          <div class="row no-gutters">
            <div class="col-md-2 col-sm-3 pt-5 col-12 text-center">
              <img src="${club.team.crestUrl}" class="card-img imgTeam"alt="${club.team.name}">
            </div>
            <div class="col-md-10 col-sm-9 col-12">
              <div class="card-body">
                <span class="card-title nameTeam">${club.team.name} -<b> ${club.points} pts</b></span>
                <span class="card-text rankTeam text-${colorRank}">#${club.position}</span><br>
                <span class="statusTeam bg-success text-white"><b>Won : ${club.won}</b></span>
                <span class="statusTeam bg-warning text-white"><b>Draw : ${club.draw}</b></span>
                <span class="statusTeam bg-danger text-white"><b>Lost : ${club.lost}</b></span><br>
                <span class="card-text "><b><i class="far fa-clock"></i> Jumlah Pertandingan : ${club.playedGames}</b></span><br>
                <span class="card-text "><b><i class="far fa-futbol"></i> Goals : ${club.goalsFor}</b></span><br>
                <span class="btn text-white" style="background-color:#00A9CE;" onclick="getDataTeam(${club.team.id})"><b><i class="fas fa-info-circle"></i> Detail Team</b></span><br>
              </div>
            </div>
          </div>
        </div>
      </div>`
    })
    document.querySelector("#contentTim").innerHTML=clubsData;
  })
}

const getDataTeam = (idTeam) => {
  document.querySelector("#contentHome").innerHTML=`
  <center>
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </center>`;
  document.querySelector("#contentTim").innerHTML='';
  urlTeam = `https://api.football-data.org/v2/teams/${idTeam}`;
  fetchApi(urlTeam).then((response) => {
    return response.json();
  }).then((data) => {
    let id = document.querySelector(".active").getAttribute("id");
    let goalKeeper='', defender='', midfielder='', attacker='', pelatih='';
    const teamData = `
    <div class="card titleLeague my-3 text-white" id="bodyNavbar">
      <div class="row no-gutters">
        <div class="col-md-3 col-sm-3 col-4 text-center p-4">
          <img src="${data.crestUrl}" class="card-img imgTitle" id="imgTitle" alt="${data.name}">
        </div>
        <div class="col-md-9 col-sm-9 col-8">
          <div class="card-body">
            <h1 class="cardName">${data.name}</h1>
            <table class="text-white cardInfo">
                <tr>
                  <th scope="row" width="25%">Address</th>
                  <td>${data.address}</td>
                </tr>
                <tr>
                  <th scope="row">Venue</th>
                  <td>${data.venue}</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td>${data.phone}</td>
                </tr>
                <tr>
                  <th scope="row">Website</th>
                  <td><a href="${data.website}">${data.website}</a></td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td >${data.email}</td>
                </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    `
    document.querySelector("#contentHome").innerHTML = teamData;

    data.squad.forEach((player) => {
      if (player.position == "Goalkeeper") {
        goalKeeper += `<div class="col-12 col-md-6 col-sm-12 pt-2 playerInfo" >
        <img src="img/noFoto.png" alt="" class="rounded-circle imgPlayer" />
        <span > ${player.name}</span>
      </div>`;
      }else if (player.position == "Defender") {
        defender += `<div class="col-12 col-md-6 col-sm-12 pt-2 playerInfo" >
        <img src="img/noFoto.png" alt="" class="rounded-circle imgPlayer" />
        <span > ${player.name}</span>
      </div>`;
      }else if (player.position == "Midfielder") {
        midfielder += `<div class="col-12 col-md-6 col-sm-12 pt-2 playerInfo" >
        <img src="img/noFoto.png" alt="" class="rounded-circle imgPlayer" />
        <span > ${player.name}</span>
      </div>`;
      }else if (player.position == "Attacker") {
        attacker += `<div class="col-12 col-md-6 col-sm-12 pt-2 playerInfo" >
        <img src="img/noFoto.png" alt="" class="rounded-circle imgPlayer" />
        <span > ${player.name}</span>
      </div>`;
      }else{
        pelatih += `<div class="col-12 col-md-6 col-sm-12 pt-2 playerInfo" >
        <img src="img/noFoto.png" alt="" class="rounded-circle imgPlayer" width="100px"/>
        <span > ${player.name}</span>
      </div>`;
      }
    })
    const playersData = `
    <h3 id="bodyNavbar" class="text-white pl-3">Goalkeeper</h3>
    <div class="row" >`+goalKeeper+`</div>
    <h3 id="bodyNavbar" class="text-white pl-3 mt-3">Defender</h3>
    <div class="row" >`+defender+`</div>
    <h3 id="bodyNavbar" class="text-white pl-3 mt-3">Midfielder</h3>
    <div class="row" >`+midfielder+`</div>
    <h3 id="bodyNavbar" class="text-white pl-3 mt-3">Attacker</h3>
    <div class="row" >`+attacker+`</div>
    <h3 id="bodyNavbar" class="text-white pl-3 mt-3">Coach</h3>
    <div class="row" >`+pelatih+`</div>
    <div class="row"></div>
    <center>
      <span class="btn text-white" style="background-color:#00A9CE;" onclick="loadContent(${id})">BACK</span>
    </center>
    `;
    document.querySelector("#contentTim").innerHTML=playersData;
  }) 
}