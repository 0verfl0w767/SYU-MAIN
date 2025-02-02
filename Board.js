export default class Board {
  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("card", "card-3");
    
    this.currentPage = {
      school: 1,
      newspaper: 1,
    };
    this.itemsPerPage = 6;
    this.schoolData = [];
    this.newspaperData = [];

    this.render();
  }
  
  /**
   *
   * @async
   * @function
   * @returns {Promise<Array>}
   *
   */
  async fetchData1() {
    try {
      const response = await fetch("https://www.syu.kr/crawl1");
      const data = await response.json();
      this.schoolData = data.result;
    } catch (error) {
      console.error(error);
      this.schoolData = [];
    }
  }
  
  /**
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
      this.newspaperData = data.result;
    } catch (error) {
      console.error(error);
      this.newspaperData = [];
    }
  }

  /**
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
    const boardContainer = this.element.querySelector(".board-container");

    const paginatedData = this.paginate(this.schoolData, "school");

    boardContainer.innerHTML = '';

    paginatedData.forEach((item) => {
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
    const boardContainer = this.element.querySelector(".board-container");

    const paginatedData = this.paginate(this.newspaperData, "newspaper");

    boardContainer.innerHTML = '';

    paginatedData.forEach((item) => {
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

  paginate(data, type) {
    const startIndex = (this.currentPage[type] - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return data.slice(startIndex, endIndex);
  }
  
  updatePagination(totalItems, type) {
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    const prevButton = this.element.querySelector(".prev-button");
    const nextButton = this.element.querySelector(".next-button");
    const numberButtonWrapper = this.element.querySelector(".number-button-wrapper");

    numberButtonWrapper.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("span");
      button.classList.add("number-button");
      button.textContent = i;

      if (i === this.currentPage[type]) {
        button.classList.add("active");
      }

      button.addEventListener("click", () => this.changePage(i, type));

      numberButtonWrapper.appendChild(button);
    }

    prevButton.disabled = this.currentPage[type] === 1;
    nextButton.disabled = this.currentPage[type] === totalPages;
  }

  async changePage(page, type) {
    this.currentPage[type] = page;

    if (type === "school") {
      await this.renderBoardItems1();
    } else if (type === "newspaper") {
      await this.renderBoardItems2();
    }

    this.updatePagination(type === "school" ? this.schoolData.length : this.newspaperData.length, type); // 해당 탭에 맞는 데이터 길이로 페이지네이션 업데이트
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
        <div class="prev-button">< 이전</div>
        <div class="number-button-wrapper"></div>
        <div class="next-button">다음 ></div>
      </div>
    `;

    await Promise.all([this.fetchData1(), this.fetchData2()]);
    this.renderBoardItems1();
    this.updatePagination(this.schoolData.length, "school");
    this.setPaginationEventListeners("school");

    const tabs = this.element.querySelectorAll('.board');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.dataset.target;
        this.activateTab(".board", target);

        if (target === "school") {
          // 학교 탭 클릭 시
          this.renderBoardItems1();
          this.updatePagination(this.schoolData.length, "school");
          this.setPaginationEventListeners("school");
        } else if (target === "newspaper") {
          // 신문사 탭 클릭 시
          this.renderBoardItems2();
          this.updatePagination(this.newspaperData.length, "newspaper");
          this.setPaginationEventListeners("newspaper");
        }
      });
    });

    this.activateTab(".board", "school");
  }

  setPaginationEventListeners(target) {
    const prevButton = this.element.querySelector(".prev-button");
    const nextButton = this.element.querySelector(".next-button");

    prevButton.removeEventListener("click", this.prevPageHandler);
    nextButton.removeEventListener("click", this.nextPageHandler);

    if (target === "school") {
      this.prevPageHandler = () => {
        if (this.currentPage.school > 1) {
          this.changePage(this.currentPage.school - 1, "school");
        }
      };
      this.nextPageHandler = () => {
        if (this.currentPage.school < Math.ceil(this.schoolData.length / this.itemsPerPage)) {
          this.changePage(this.currentPage.school + 1, "school");
        }
      };
    } else if (target === "newspaper") {
      this.prevPageHandler = () => {
        if (this.currentPage.newspaper > 1) {
          this.changePage(this.currentPage.newspaper - 1, "newspaper");
        }
      };
      this.nextPageHandler = () => {
        if (this.currentPage.newspaper < Math.ceil(this.newspaperData.length / this.itemsPerPage)) {
          this.changePage(this.currentPage.newspaper + 1, "newspaper");
        }
      };
    }

    prevButton.addEventListener("click", this.prevPageHandler);
    nextButton.addEventListener("click", this.nextPageHandler);
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
