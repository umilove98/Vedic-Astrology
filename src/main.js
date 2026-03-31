/**
 * 베딕 작명 (Vedic Naming) - App Entry Point
 * 별이 알려주는 당신의 이름과 운명
 */
import './styles/global.css';
import './styles/animations.css';
import './styles/screens.css';

import { Starfield } from './canvas/Starfield.js';
import { Router } from './utils/router.js';
import { WelcomeScreen } from './screens/WelcomeScreen.js';
import { QnAScreen } from './screens/QnAScreen.js';
import { AnalysisScreen } from './screens/AnalysisScreen.js';
import { ProfileScreen } from './screens/ProfileScreen.js';
import { NamesScreen } from './screens/NamesScreen.js';
import { ResultScreen } from './screens/ResultScreen.js';

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

  // Start at welcome screen
  router.navigateTo('welcome');
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
