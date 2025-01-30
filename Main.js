export default class Main {
  constructor() {
    this.element = document.createElement("main");
    this.render();
  }

  async fetchData1() {
    try {
      const response = await fetch("https://www.syu.kr/crawl1");
      const data = await response.json();
      return data.result.slice(0, 6);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async fetchData2() {
    try {
      const response = await fetch("https://www.syu.kr/crawl2");
      const data = await response.json();
      return data.result.slice(0, 6);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async renderBoardItems1() {
    const result = await this.fetchData1();
    const boardContainer = this.element.querySelector(".board-container");

    result.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("board-item", "school");

      listItem.innerHTML = `
        <a href="${item.href}" class="board-link" target="_blank">
          <img
            src="https://www.syu.ac.kr/wp-content/uploads/2020/01/%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%82%BC%EC%9C%A1%EB%8C%80%ED%95%99%EA%B5%90-%EB%A1%9C%EA%B3%A0-1.png"
            alt="${item.title}"
            class="board-image"
          />
          <div class="board-content">
            <h3>${item.title.replace(/\d{4}-\d{1,2}학기|\d{4}년 \d{1,2}학기|\d{4}학년도 \d{1,2}학기/g, "").trim()}</h3>
            <div class="board-detail">
              <div class="author">${item.author}</div>
              <!--<div class="category">${item.category}</div>-->
              <div class="date">${item.date}</div>
            </div>
          </div>
        </a>
      `;

      boardContainer.appendChild(listItem);
    });

    this.activateTab(".board", "school");
  }

  async renderBoardItems2() {
    const result = await this.fetchData2();
    const boardContainer = this.element.querySelector(".board-container");

    result.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.classList.add("board-item", "newspaper");

      listItem.innerHTML = `
        <a href="${item.href}" class="board-link" target="_blank">
          <img
            src="${item.imgUrl}"
            alt="${item.title}"
            class="board-image"
          />
          <div class="board-content">
            <h3>${item.title}</h3>
            <div class="board-detail">
              <div class="date">${item.date}</div>
            </div>
          </div>
        </a>
      `;

      boardContainer.appendChild(listItem);
    });
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
      <div class="card card-3">
        <div class="service-tabs">
          <span class="title">글</span>
          <ul class="links">
            <li><a href="#" class="board" data-target="school">학교</a></li>
            <li><a href="#" class="board" data-target="newspaper">신문사</a></li>
            <li><a href="#" class="board" data-target="news">기사</a></li>
          </ul>
        </div>
        <div class="notice-section">
          <p>..</p>
        </div>
        <ul class="board-container"></ul>
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

    sectionContainer.appendChild(section1);
    sectionContainer.appendChild(section2);

    this.element.appendChild(sectionContainer);

    await Promise.all([this.renderBoardItems1(), this.renderBoardItems2()]);
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
