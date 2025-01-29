export default class Header {
  constructor() {
    this.element = document.createElement('header');
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="logo">
        <h1>SYU KR</h1>
        <p>삼육대학교 재학생을 위한 서비스를 제공합니다.</p>
      </div>
    `;
  }

  appendTo(parent) {
    parent.appendChild(this.element);
  }
}