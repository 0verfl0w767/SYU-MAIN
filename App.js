import Header from './Header.js';
import Main from './Main.js'
import Footer from './Footer.js';

class App {
  constructor() {
    this.root = document.querySelector('#root');
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();
  }

  render() {
    this.header.appendTo(this.root);
    this.main.appendTo(this.root);
    this.footer.appendTo(this.root);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.render();
});