/**
 * Q&A Screen - Interactive birth data collection
 * Chat-like interface with step-based back navigation
 */
import { typewrite, contemplationPause } from '../utils/typewriter.js';
import { searchCities, searchCitiesLocal } from '../engine/geocoding.js';

export class QnAScreen {
  constructor(router, starfield) {
    this.router = router;
    this.starfield = starfield;
    this.el = null;
    this.container = null;
    this.selectedCity = null;
    this._rejectInput = null; // for cancelling current input on back
  }

  render() {
    const div = document.createElement('div');
    div.className = 'screen qna-screen';
    div.innerHTML = `<div class="qna-container" id="qna-container"></div>`;
    return div;
  }

  async onEnter() {
    this.container = this.el.querySelector('#qna-container');

    // Override back button for in-step navigation
    const backBtn = this.el.querySelector('.back-btn');
    if (backBtn) {
      const newBtn = backBtn.cloneNode(true);
      backBtn.replaceWith(newBtn);
      newBtn.addEventListener('click', () => {
        if (this._rejectInput) {
          this._rejectInput();
        } else {
          this.router.goBack();
        }
      });
    }

    await this.runConversation();
  }

  async runConversation() {
    const stepMarkers = [];
    let step = 0;
    const answers = {};

    while (step <= 4) {
      stepMarkers[step] = this.container.children.length;

      try {
        switch (step) {
          case 0: {
            await this.addAstrologerBubble('당신이 태어난 날을 알려주세요.');
            await contemplationPause(600);
            await this.addConceptBubble(
              '베딕 점성술에서는 태어난 순간의 하늘이 당신의 운명을 결정합니다. 이를 \'쿤달리(Kundali, 출생 차트)\'라 부릅니다.'
            );
            answers.birthDate = await this.askDate();
            this.starfield?.pulse();
            await this.addUserBubble(formatDateKr(answers.birthDate));
            await contemplationPause(800);
            break;
          }
          case 1: {
            await this.addAstrologerBubble('별들이 정렬하던 그 시각은 기억하시나요?');
            await contemplationPause(600);
            await this.addConceptBubble(
              '정확한 출생 시각은 \'라그나(Lagna, 상승점)\'를 결정합니다. 같은 날 태어나도 시각에 따라 운명이 달라지는 이유예요.'
            );
            answers.birthTime = await this.askTime();
            this.starfield?.pulse();
            await this.addUserBubble(answers.birthTime === '06:00' ? '정확히 모르겠어요' : formatTimeKr(answers.birthTime));
            await contemplationPause(800);
            break;
          }
          case 2: {
            await this.addAstrologerBubble('어느 하늘 아래 태어나셨나요?');
            await contemplationPause(600);
            await this.addConceptBubble(
              '출생 장소에 따라 같은 시각이라도 하늘의 별 배치가 달라집니다. 베딕 점성술은 관측 위치를 중요하게 여겨요.'
            );
            answers.city = await this.askCity();
            this.starfield?.pulse();
            await this.addUserBubble(answers.city.nameKr);
            await contemplationPause(800);
            break;
          }
          case 3: {
            await this.addAstrologerBubble('마지막으로, 성별을 알려주시겠어요?');
            await contemplationPause(400);
            await this.addConceptBubble(
              '이름 추천에 참고됩니다. 건너뛰셔도 괜찮아요.'
            );
            answers.gender = await this.askGender();
            this.starfield?.pulse();
            await this.addUserBubble(answers.gender === 'male' ? '남성' : answers.gender === 'female' ? '여성' : '상관없음');
            await contemplationPause(600);
            break;
          }
          case 4: {
            await this.addAstrologerBubble('별의 기록을 읽어보겠습니다...');
            await contemplationPause(1200);
            this.router.navigateTo('analysis', {
              birthDate: answers.birthDate,
              birthTime: answers.birthTime,
              city: answers.city,
              gender: answers.gender,
            });
            return;
          }
        }
        step++;
      } catch (e) {
        if (e === 'back') {
          if (step > 0) {
            step--;
            // Remove everything from the previous step's start
            while (this.container.children.length > stepMarkers[step]) {
              this.container.lastChild.remove();
            }
          } else {
            this.router.goBack();
            return;
          }
        }
      }
    }
  }

  // === Bubble helpers ===

  async addAstrologerBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble astrologer';
    bubble.innerHTML = '<div class="label">✦ 별의 안내자</div><div class="text"></div>';
    this.container.appendChild(bubble);
    this.scrollToBottom();
    await typewrite(bubble.querySelector('.text'), text, 35);
  }

  async addConceptBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble concept';
    bubble.textContent = text;
    this.container.appendChild(bubble);
    this.scrollToBottom();
    await contemplationPause(300);
  }

  async addUserBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.textContent = text;
    this.container.appendChild(bubble);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  // === Input prompts (with back/cancel support) ===

  askDate() {
    return new Promise((resolve, reject) => {
      const area = document.createElement('div');
      area.className = 'qna-input-area';
      area.innerHTML = `
        <input type="text" id="birth-date" placeholder="예: 1990.3.15 또는 1990-03-15" autocomplete="off" />
        <div class="input-hint" style="font-size:0.78rem;color:var(--text-secondary);margin-top:6px">숫자로 자유롭게 입력하세요 (예: 19900315, 1990.3.15, 1990/03/15)</div>
        <button class="btn-next" id="btn-date">확인</button>
      `;
      this.container.appendChild(area);
      this.scrollToBottom();

      this._rejectInput = () => { this._rejectInput = null; area.remove(); reject('back'); };

      const input = area.querySelector('#birth-date');
      const btn = area.querySelector('#btn-date');

      const tryResolve = () => {
        const parsed = parseDateText(input.value);
        if (parsed) {
          this._rejectInput = null;
          area.remove();
          resolve(parsed);
        } else {
          input.style.borderColor = 'var(--accent-rose)';
          setTimeout(() => { input.style.borderColor = ''; }, 1000);
        }
      };

      btn.addEventListener('click', tryResolve);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryResolve(); });
    });
  }

  askTime() {
    return new Promise((resolve, reject) => {
      const area = document.createElement('div');
      area.className = 'qna-input-area';
      area.innerHTML = `
        <input type="text" id="birth-time" placeholder="예: 오후 2시 30분, 14:30, 1430" autocomplete="off" />
        <div class="input-hint" style="font-size:0.78rem;color:var(--text-secondary);margin-top:6px">자유롭게 입력하세요 (예: 오전 8시, 14:30, 새벽 3시)</div>
        <button class="btn-next" id="btn-time">확인</button>
        <button class="btn-skip" id="btn-skip-time">정확히 모르겠어요 (일출 시각 사용)</button>
      `;
      this.container.appendChild(area);
      this.scrollToBottom();

      this._rejectInput = () => { this._rejectInput = null; area.remove(); reject('back'); };

      const input = area.querySelector('#birth-time');
      const btn = area.querySelector('#btn-time');

      const tryResolve = () => {
        const parsed = parseTimeText(input.value);
        if (parsed) {
          this._rejectInput = null;
          area.remove();
          resolve(parsed);
        } else {
          input.style.borderColor = 'var(--accent-rose)';
          setTimeout(() => { input.style.borderColor = ''; }, 1000);
        }
      };

      btn.addEventListener('click', tryResolve);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') tryResolve(); });

      area.querySelector('#btn-skip-time').addEventListener('click', () => {
        this._rejectInput = null;
        area.remove();
        resolve('06:00');
      });
    });
  }

  askCity() {
    return new Promise((resolve, reject) => {
      const area = document.createElement('div');
      area.className = 'qna-input-area';
      area.style.position = 'relative';
      area.innerHTML = `
        <input type="text" id="city-input" placeholder="도시 이름을 입력하세요 (예: 서울)" autocomplete="off" />
        <div class="city-suggestions" id="city-suggestions" style="display:none"></div>
        <button class="btn-next" id="btn-city" style="display:none">확인</button>
      `;
      this.container.appendChild(area);
      this.scrollToBottom();

      this._rejectInput = () => { this._rejectInput = null; area.remove(); reject('back'); };

      const input = area.querySelector('#city-input');
      const suggestions = area.querySelector('#city-suggestions');
      const btnCity = area.querySelector('#btn-city');
      let debounceTimer = null;

      input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        const query = input.value.trim();

        if (query.length < 1) {
          suggestions.style.display = 'none';
          return;
        }

        // Instant local search
        const local = searchCitiesLocal(query);
        this.renderSuggestions(suggestions, local, (city) => {
          this.selectedCity = city;
          input.value = city.nameKr;
          suggestions.style.display = 'none';
          btnCity.style.display = 'block';
        });

        // Debounced online search
        debounceTimer = setTimeout(async () => {
          const results = await searchCities(query);
          if (input.value.trim() === query) {
            this.renderSuggestions(suggestions, results, (city) => {
              this.selectedCity = city;
              input.value = city.nameKr;
              suggestions.style.display = 'none';
              btnCity.style.display = 'block';
            });
          }
        }, 400);
      });

      btnCity.addEventListener('click', () => {
        if (this.selectedCity) {
          this._rejectInput = null;
          area.remove();
          resolve(this.selectedCity);
        }
      });
    });
  }

  renderSuggestions(container, cities, onSelect) {
    if (cities.length === 0) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'block';
    container.innerHTML = '';
    for (const city of cities) {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = `${city.nameKr}${city.country !== 'KR' ? ` (${city.name})` : ''}`;
      item.addEventListener('click', () => onSelect(city));
      container.appendChild(item);
    }
  }

  askGender() {
    return new Promise((resolve, reject) => {
      const area = document.createElement('div');
      area.className = 'qna-input-area';
      area.innerHTML = `
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn-next gender-btn" data-gender="male">남성</button>
          <button class="btn-next gender-btn" data-gender="female">여성</button>
          <button class="btn-skip" data-gender="neutral">상관없음</button>
        </div>
      `;
      this.container.appendChild(area);
      this.scrollToBottom();

      this._rejectInput = () => { this._rejectInput = null; area.remove(); reject('back'); };

      area.querySelectorAll('[data-gender]').forEach(btn => {
        btn.addEventListener('click', () => {
          this._rejectInput = null;
          area.remove();
          resolve(btn.dataset.gender);
        });
      });
    });
  }
}

// === Parsing helpers ===

function parseDateText(text) {
  if (!text) return null;
  const s = text.trim().replace(/\s+/g, '');

  let m = s.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m) return validateDate(m[1], m[2], m[3]);

  m = s.match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/);
  if (m) return validateDate(m[1], m[2], m[3]);

  m = s.match(/^(\d{4})년(\d{1,2})월(\d{1,2})일?$/);
  if (m) return validateDate(m[1], m[2], m[3]);

  m = s.match(/^(\d{2})(\d{2})(\d{2})$/);
  if (m) {
    const yy = parseInt(m[1]);
    const year = yy > 30 ? 1900 + yy : 2000 + yy;
    return validateDate(String(year), m[2], m[3]);
  }

  return null;
}

function validateDate(y, m, d) {
  const year = parseInt(y), month = parseInt(m), day = parseInt(d);
  if (year < 1900 || year > 2030 || month < 1 || month > 12 || day < 1 || day > 31) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)}`;
}

function parseTimeText(text) {
  if (!text) return null;
  const s = text.trim();

  let m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (m) return validateTime(parseInt(m[1]), parseInt(m[2]));

  m = s.match(/^(\d{2})(\d{2})$/);
  if (m) return validateTime(parseInt(m[1]), parseInt(m[2]));

  m = s.match(/^(\d{1,2})$/);
  if (m) return validateTime(parseInt(m[1]), 0);

  m = s.match(/(오전|오후|새벽|밤|아침|저녁|낮)?\s*(\d{1,2})\s*시\s*(\d{1,2})?\s*분?/);
  if (m) {
    let h = parseInt(m[2]);
    const min = m[3] ? parseInt(m[3]) : 0;
    const period = m[1];

    if (period === '오후' || period === '밤' || period === '저녁') {
      if (h < 12) h += 12;
    } else if (period === '오전' || period === '아침') {
      if (h === 12) h = 0;
    } else if (period === '새벽') {
      if (h === 12) h = 0;
    } else if (period === '낮') {
      if (h < 12 && h !== 12) h += 12;
    }
    return validateTime(h, min);
  }

  return null;
}

function validateTime(h, m) {
  if (h < 0 || h > 23 || m < 0 || m > 59) return null;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}`;
}

function formatDateKr(dateStr) {
  const [y, m, d] = dateStr.split('-');
  return `${y}년 ${parseInt(m)}월 ${parseInt(d)}일`;
}

function formatTimeKr(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  const period = h < 12 ? '오전' : '오후';
  const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${period} ${displayH}시 ${m}분`;
}
