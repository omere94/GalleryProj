'use stirct';

var gProjs;

function init() {
  makeProjs();
  renderProjs();
  //$('.contact-form button').on('click', onSubmit);
}

function makeProjs() {
  gProjs = [
    {
      id: "1",
      name: "Touch nums",
      title: "Touch Nums Game",
      desc: "Touch the Numbers is a simple game for training your reflexes",
      url: "/projects/touchNums/index.html",
      picUrl: "01-thumbnail.jpg",
      picUrlFull: "/img/portfolio/01-full.jpg",
      publishedAt: 07022022,
      labels: ["Matrixes", "keyboard events"],
    },
    {
      id: "2",
      name: "Pacman",
      title: "Pacman",
      desc: "Pacman is an action maze chase video game",
      url: "/projects/Pacman/index.html",
      picUrl: "02-thumbnail.png",
      picUrlFull: "/img/portfolio/02-full.jpg",
      publishedAt: 07022022,
      labels: ["Matrixes", "keyboard events"],
    },
    {
      id: "3",
      name: "Minsweeper",
      title: "Minsweeper",
      desc: "Minesweeper is a puzzle video game",
      url: "/projects/Minesweeper/index.html",
      picUrl: "03-thumbnail.png",
      picUrlFull: "/img/portfolio/03-full.jpg",
      publishedAt: 07022022,
      labels: ["Matrixes", "keyboard events"],
    },
    {
      id: "4",
      name: "In Picture",
      title: "In Picture",
      desc: "Who is in the picture",
      url: "/projects/inPicture/index.html",
      picUrl: "04-thumbnail.jpg",
      picUrlFull: "/img/portfolio/04-full.png",
      publishedAt: 07022022,
      labels: ["Matrixes", "keyboard events"],
    },
    {
      id: "5",
      name: "Chess Board",
      title: "Chess Board",
      desc: "A chessboard is the type of gameboard ",
      url: "/projects/chess-board/index.html",
      picUrl: "05-thumbnail.jpg",
      picUrlFull: "/img/portfolio/05-full.jpg",
      publishedAt: 07022022,
      labels: ["Matrixes", "keyboard events"],
    },
    {
      id: "6",
      name: "Book Store",
      title: "Book Store",
      desc: "Choose your own book",
      url: "/projects/book-shop/index.html",
      picUrl: "06-thumbnail.jpg",
      picUrlFull: "/img/portfolio/06-full.jpg",
      publishedAt: 07022022,
      labels: ["Matrixes", "keyboard events"],
    },
  ]
}

function renderProjs() {
  var projs = gProjs;
  var strHtml = '';
  projs.map(project => {
    strHtml += `<div class="col-md-4 col-sm-6 portfolio-item">
    <a class="portfolio-link ${project.id}" onclick="onProjClicked('${project.id}')" data-toggle="modal" href="#portfolioModal">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${project.picUrl}" alt="">
        </a>
        <div class="portfolio-caption">
        <h4>${project.title}</h4>
        <a href="${project.url}" target="_blank">to project</a>
        <p class="text-muted">${project.desc}</p>
      </div>
    </div>`
  });
  document.querySelector('.projects-view').innerHTML = strHtml;
}

function onProjClicked(id) {
  var project = gProjs.find(project => project.id === id);
  document.querySelector('.modal-body h2').innerText = project.title;
  document.querySelector(' .modal-body p').innerText = project.desc;
  document.querySelector(' .discription').innerText = project.desc;
  document.querySelector(' .full-pic').src = project.picUrlFull;
  //document.querySelector(' .to-page').href = project.url;
}

function onSubmit() {
  var $elSubjectVal = $('.subject-value').val();
  var $elBodyVal = $('.body-value').val();
//var resSubject = $elSubjectVal.split(' ').join('20%');
//var resText = $elTextVal.split(' ').join('20%');
window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=omere653@gmail.com&su=${$elSubjectVal}&body=${$elBodyVal}`, '_blank')
}

