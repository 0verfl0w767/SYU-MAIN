export default class Board {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("card", "card-3");
    this.render();
  }

  /**
   * 학교 글 데이터를 가져와 6개의 결과를 반환합니다.
   *
   * @async
   * @function
   * @returns {Promise<Array>} 가져온 데이터에서 6개의 항목을 포함하는 배열을 반환하는 Promise 객체입니다.
   *
   */
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

  /**
   * 신문사 글 데이터를 가져와 6개의 결과를 반환합니다.
   *
   * @async
   * @function
   * @returns {Promise<Array>}
   *
   */
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

  /**
   * fetchData1을 통해 데이터를 가져와 보드 항목을 생성하고 화면에 렌더링합니다.
   *
   * @param {Object} item - 보드 항목 객체
   * @param {string} item.href - 글 링크
   * @param {string} item.title - 글 제목
   * @param {string} item.author - 글 작성자
   * @param {string} item.date - 글 작성 날짜
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
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
              <div class="date">${item.date}</div>
            </div>
          </div>
        </a>
      `;

      boardContainer.appendChild(listItem);
    });
  }

  /**
   * fetchData2을 통해 데이터를 가져와 보드 항목을 생성하고 화면에 렌더링합니다.
   *
   * @param {Object} item - 보드 항목 객체
   * @param {string} item.href - 글 링크
   * @param {string} item.title - 글 제목
   * @param {string} item.imgUrl - 글 이미지 링크
   * @param {string} item.date - 글 작성 날짜
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
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
    this.element.innerHTML = `
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
      <div class="pagination-container">
        <div class="prev-button">이전</div>
        <div class="number-button-wrapper"><span class="number-button">1</span></div>
        <div class="next-button">이후</div>
      </div>
    `;

    await Promise.all([this.renderBoardItems1(), this.renderBoardItems2()]);

    this.activateTab(".board", "school");
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
}
