export default class Footer {
  constructor() {
    this.element = document.createElement('footer');
    this.render();
  }

  render() {
    this.element.innerHTML = `
      <div class="footer-content">
        <ul class="links">
          <li><a href="#">공지사항</a></li>
          <li><a href="#">© SYU KR.</a></li>
        </ul>
      </div>
    `;
  }

  appendTo(parent) {
    parent.appendChild(this.element);
  }
}