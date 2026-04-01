/**
 * 베딕 작명 (Vedic Naming) - App Entry Point
 * 별이 알려주는 당신의 이름과 운명
 */
import './styles/global.css';
import './styles/animations.css';
import './styles/screens.css';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { Starfield } from './canvas/Starfield.js';
import { Router } from './utils/router.js';
import { WelcomeScreen } from './screens/WelcomeScreen.js';
import { QnAScreen } from './screens/QnAScreen.js';
import { AnalysisScreen } from './screens/AnalysisScreen.js';
import { ProfileScreen } from './screens/ProfileScreen.js';
import { NamesScreen } from './screens/NamesScreen.js';
import { ResultScreen } from './screens/ResultScreen.js';
import { calculateMoonPosition } from './engine/astronomy.js';
import { getNakshatraFromDegree } from './engine/nakshatra.js';

// Initialize app
function init() {
  const starfieldCanvas = document.getElementById('starfield');
  const appEl = document.getElementById('app');

  // Start starfield background animation
  const starfield = new Starfield(starfieldCanvas);
  starfield.start();

  // Setup router
  const router = new Router(appEl);

  // Register screens
  router.register('welcome', new WelcomeScreen(router));
  router.register('qna', new QnAScreen(router, starfield));
  router.register('analysis', new AnalysisScreen(router, starfield));
  router.register('profile', new ProfileScreen(router));
  router.register('names', new NamesScreen(router));
  router.register('result', new ResultScreen(router));

  // Check for shared result link
  const shared = parseShareHash();
  if (shared) {
    const city = {
      name: shared.c, nameKr: shared.k,
      lat: shared.la, lng: shared.lo, timezone: shared.z,
    };
    const moonData = calculateMoonPosition(shared.d, shared.t, city.timezone);
    const nakshatraResult = getNakshatraFromDegree(moonData.siderealLongitude);
    const birthYear = parseInt(shared.d.split('-')[0]);

    router.data = {
      birthDate: shared.d, birthTime: shared.t,
      city, gender: shared.g,
      moonData, nakshatraResult, birthYear,
      selectedNames: [],
      isShared: true,
    };
    // Clear hash so refreshing doesn't loop
    history.replaceState(null, '', window.location.pathname);
    router.navigateTo('result');
  } else {
    router.navigateTo('welcome');
  }
}

function parseShareHash() {
  try {
    const hash = window.location.hash;
    if (!hash.startsWith('#s=')) return null;
    const json = decodeURIComponent(escape(atob(hash.slice(3))));
    return JSON.parse(json);
  } catch { return null; }
}

// Vercel Web Analytics & Speed Insights
inject();
injectSpeedInsights();

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
