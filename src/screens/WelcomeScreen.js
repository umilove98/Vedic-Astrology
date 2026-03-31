/**
 * Welcome Screen - Landing page with starfield background
 * "별이 알려주는 당신의 이름과 운명"
 */
export class WelcomeScreen {
  constructor(router) {
    this.router = router;
    this.el = null;
  }

  render() {
    const div = document.createElement('div');
    div.className = 'screen welcome-screen';
    div.innerHTML = `
      <div class="logo-area">
        <span class="logo-symbol">✦</span>
      </div>
      <p class="intro-text">
        태어난 순간,<br/>
        하늘에 새겨진 별의 좌표가 있습니다.<br/><br/>
        그 별은 당신의 <em>소리</em>를 알고 있어요.
      </p>
      <button class="btn-primary" id="btn-start">
        별에게 물어보기
      </button>
    `;
    return div;
  }

  onEnter() {
    const btn = this.el.querySelector('#btn-start');
    btn.addEventListener('click', () => {
      this.router.navigateTo('qna');
    });
  }
}
