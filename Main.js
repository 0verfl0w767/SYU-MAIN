import Board from './Board.js';

export default class Main {
  constructor() {
    this.element = document.createElement("main");
    this.render();
  }
  
  async render() {
    const sectionContainer = document.createElement("div");
    sectionContainer.classList.add("section-container");

    const section1 = document.createElement("div");
    section1.classList.add("section-1");
    section1.innerHTML = `
      <div class="card card-1">
        <h3>...</h3>
      </div>
      <div class="card card-2">
        <div class="service-tabs">
          <span class="title">서비스</span>
          <ul class="links">
            <li><a href="#" class="service" data-target="subject">과목</a></li>
            <li><a href="#" class="service" data-target="course">수강</a></li>
            <li><a href="#" class="service" data-target="bus">버스</a></li>
            <li><a href="#" class="service" data-target="etc">기타</a></li>
          </ul>
        </div>
        <div class="notice-section">
          <p>...</p>
        </div>
        <div class="service-container">
          <div class="service-item subject">
            <a href="#">시간표 마법사</a>
          </div>
          <div class="service-item subject">
            <a href="#">교양 과목</a>
          </div>
          <div class="service-item subject">
            <a href="#">일반 과목</a>
          </div>
          <div class="service-item course">
            <a href="#">모의 수강신청</a>
          </div>
          <div class="service-item course">
            <a href="#">경쟁률</a>
          </div>
          <div class="service-item course">
            <a href="#">폐강주의</a>
          </div>
          <div class="service-item bus">
            <a href="#">실시간 위치 1</a>
          </div>
          <div class="service-item bus">
            <a href="#">실시간 위치 2</a>
          </div>
          <div class="service-item bus">
            <a href="#">도착시간</a>
          </div>
          <div class="service-item etc">
            <a href="#">...</a>
          </div>
          <div class="service-item etc">
            <a href="#">...</a>
          </div>
          <div class="service-item etc">
            <a href="#">...</a>
          </div>
        </div>
      </div>
      <div class="card card-4">
        <h3>공지사항</h3>
        <div class="notice-table-container">
          <table class="notice-table">
            <tr>
              <td>공지사항 1</td>
            </tr>
            <tr>
              <td>공지사항 2</td>
            </tr>
            <tr>
              <td>공지사항 3</td>
            </tr>
            <tr>
              <td>공지사항 4</td>
            </tr>
            <tr>
              <td>공지사항 5</td>
            </tr>
            <tr>
              <td>공지사항 6</td>
            </tr>
            <tr>
              <td>공지사항 7</td>
            </tr>
          </table>
        </div>
      </div>
      <div id="notice" class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2 id="modal-title"></h2>
          <p id="modal-content-text"></p>
        </div>
      </div>
    `;

    const section2 = document.createElement("div");
    section2.classList.add("section-2");
    section2.innerHTML = `
      <div class="card card-7">
        <a href="#" class="login"><b>SYU KR</b> 로그인</a>
      </div>
      <div class="youtube card-5">
        <iframe
          width="100%"
          height="210"
          src="https://www.youtube.com/embed/FmBoAx7WzFg"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      </div>
      <div class="instagram card-6">
        <iframe
          src="https://www.instagram.com/reel/DFUBPsevYFI/embed"
          width="400"
          height="780"
          frameborder="0"
          scrolling="no"
          allowtransparency="true"
        ></iframe>
      </div>
    `;
    
    const board = new Board();
    const card4 = section1.querySelector(".card.card-4");
    card4.parentNode.insertBefore(board.element, card4);

    sectionContainer.appendChild(section1);
    sectionContainer.appendChild(section2);

    this.element.appendChild(sectionContainer);
  }

  addTabListener(title) {
    const tabs = document.querySelectorAll(title);
    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        const target = tab.getAttribute("data-target");
        this.activateTab(title, target);
      });
    });
  }

  activateTab(title, target) {
    const tabs = document.querySelectorAll(title);
    const gridItems = document.querySelectorAll(`${title}-item`);

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    document
      .querySelector(`${title}[data-target="${target}"]`)
      .classList.add("active");

    gridItems.forEach((item) => {
      item.classList.remove("show");
    });

    const targetItems = document.querySelectorAll(`${title}-item.${target}`);
    targetItems.forEach((item) => item.classList.add("show"));
  }

  addNoticeListener() {
    const noticeItems = this.element.querySelectorAll(".notice-table td");
    noticeItems.forEach((item) => {
      item.addEventListener("click", () => {
        const title = item.textContent.trim();
        this.openModal(title);
      });
    });

    this.element
      .querySelector(".close")
      .addEventListener("click", () => this.closeModal());

    window.onclick = (event) => {
      if (event.target == document.getElementById("notice")) {
        this.closeModal();
      }
    };
  }

  openModal(title) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-content-text").textContent =
      "테스트 문장입니다.";

    document.getElementById("notice").style.display = "block";
  }

  closeModal() {
    document.getElementById("notice").style.display = "none";
  }

  appendTo(parent) {
    parent.appendChild(this.element);

    this.addTabListener(".service");
    this.activateTab(".service", "subject");

    this.addTabListener(".board");
    // this.activateTab('.board', 'school');

    this.addNoticeListener();
  }
}