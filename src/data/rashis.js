/**
 * 12 Rashis (Zodiac Signs) - 라시 데이터
 * 베딕 점성술의 12 별자리 (사이드리얼 기준)
 */
export const RASHIS = [
  {
    id: 0, name: 'Aries', nameKr: '메샤 (양자리)', nameSanskrit: 'Mesha',
    symbol: '♈', startDeg: 0, endDeg: 30,
    element: '불 (Fire)', elementKr: '불', quality: 'Cardinal',
    ruler: 'Mars', rulerKr: '화성 (망갈)',
    description: '시작과 도전의 에너지를 가진 별자리예요. 용기와 리더십이 넘치며 새로운 것을 개척하는 힘이 있어요.',
    traits: ['용기', '리더십', '독립심', '열정']
  },
  {
    id: 1, name: 'Taurus', nameKr: '브리샤바 (황소자리)', nameSanskrit: 'Vrishabha',
    symbol: '♉', startDeg: 30, endDeg: 60,
    element: '흙 (Earth)', elementKr: '흙', quality: 'Fixed',
    ruler: 'Venus', rulerKr: '금성 (슈크라)',
    description: '안정과 풍요를 상징하는 별자리예요. 아름다움을 사랑하고 물질적 안정을 중시하며 인내심이 강해요.',
    traits: ['안정감', '감각적', '인내심', '풍요']
  },
  {
    id: 2, name: 'Gemini', nameKr: '미투나 (쌍둥이자리)', nameSanskrit: 'Mithuna',
    symbol: '♊', startDeg: 60, endDeg: 90,
    element: '바람 (Air)', elementKr: '바람', quality: 'Mutable',
    ruler: 'Mercury', rulerKr: '수성 (부다)',
    description: '소통과 지성의 별자리예요. 호기심이 많고 다재다능하며 언어와 커뮤니케이션에 재능이 있어요.',
    traits: ['지성', '소통', '다재다능', '호기심']
  },
  {
    id: 3, name: 'Cancer', nameKr: '카르카 (게자리)', nameSanskrit: 'Karka',
    symbol: '♋', startDeg: 90, endDeg: 120,
    element: '물 (Water)', elementKr: '물', quality: 'Cardinal',
    ruler: 'Moon', rulerKr: '달 (찬드라)',
    description: '감정과 돌봄의 별자리예요. 직관이 뛰어나고 가족과 가정을 소중히 여기며 보호 본능이 강해요.',
    traits: ['돌봄', '직관', '감수성', '보호']
  },
  {
    id: 4, name: 'Leo', nameKr: '심하 (사자자리)', nameSanskrit: 'Simha',
    symbol: '♌', startDeg: 120, endDeg: 150,
    element: '불 (Fire)', elementKr: '불', quality: 'Fixed',
    ruler: 'Sun', rulerKr: '태양 (수리야)',
    description: '자신감과 창조의 별자리예요. 빛나는 존재감으로 주변을 밝히며 예술적 재능과 관대함을 가지고 있어요.',
    traits: ['자신감', '창조력', '관대함', '카리스마']
  },
  {
    id: 5, name: 'Virgo', nameKr: '칸야 (처녀자리)', nameSanskrit: 'Kanya',
    symbol: '♍', startDeg: 150, endDeg: 180,
    element: '흙 (Earth)', elementKr: '흙', quality: 'Mutable',
    ruler: 'Mercury', rulerKr: '수성 (부다)',
    description: '분석과 봉사의 별자리예요. 섬세한 관찰력과 완벽주의적 성향으로 실용적인 문제 해결에 뛰어나요.',
    traits: ['분석력', '섬세함', '실용적', '봉사']
  },
  {
    id: 6, name: 'Libra', nameKr: '툴라 (천칭자리)', nameSanskrit: 'Tula',
    symbol: '♎', startDeg: 180, endDeg: 210,
    element: '바람 (Air)', elementKr: '바람', quality: 'Cardinal',
    ruler: 'Venus', rulerKr: '금성 (슈크라)',
    description: '균형과 조화의 별자리예요. 관계를 중시하고 미적 감각이 뛰어나며 공정함을 추구해요.',
    traits: ['균형', '조화', '미적 감각', '외교']
  },
  {
    id: 7, name: 'Scorpio', nameKr: '브리쉬치카 (전갈자리)', nameSanskrit: 'Vrishchika',
    symbol: '♏', startDeg: 210, endDeg: 240,
    element: '물 (Water)', elementKr: '물', quality: 'Fixed',
    ruler: 'Mars', rulerKr: '화성 (망갈)',
    description: '변환과 깊이의 별자리예요. 강렬한 통찰력과 의지력으로 진실을 꿰뚫어 보며 깊은 유대를 형성해요.',
    traits: ['통찰력', '의지력', '변환', '깊이']
  },
  {
    id: 8, name: 'Sagittarius', nameKr: '다누 (궁수자리)', nameSanskrit: 'Dhanu',
    symbol: '♐', startDeg: 240, endDeg: 270,
    element: '불 (Fire)', elementKr: '불', quality: 'Mutable',
    ruler: 'Jupiter', rulerKr: '목성 (구루)',
    description: '탐구와 지혜의 별자리예요. 모험을 사랑하고 철학적 사고와 낙관적 에너지로 넓은 세계를 향해 나아가요.',
    traits: ['모험', '지혜', '낙관', '자유']
  },
  {
    id: 9, name: 'Capricorn', nameKr: '마카라 (염소자리)', nameSanskrit: 'Makara',
    symbol: '♑', startDeg: 270, endDeg: 300,
    element: '흙 (Earth)', elementKr: '흙', quality: 'Cardinal',
    ruler: 'Saturn', rulerKr: '토성 (샤니)',
    description: '성취와 책임의 별자리예요. 근면하고 야망이 있으며 시간이 지날수록 빛나는 대기만성형이에요.',
    traits: ['근면', '책임감', '야망', '인내']
  },
  {
    id: 10, name: 'Aquarius', nameKr: '쿰바 (물병자리)', nameSanskrit: 'Kumbha',
    symbol: '♒', startDeg: 300, endDeg: 330,
    element: '바람 (Air)', elementKr: '바람', quality: 'Fixed',
    ruler: 'Saturn', rulerKr: '토성 (샤니)',
    description: '혁신과 인류애의 별자리예요. 독창적인 사고와 진보적 가치관으로 세상을 더 나은 곳으로 만들려 해요.',
    traits: ['혁신', '독창성', '인류애', '진보']
  },
  {
    id: 11, name: 'Pisces', nameKr: '미나 (물고기자리)', nameSanskrit: 'Meena',
    symbol: '♓', startDeg: 330, endDeg: 360,
    element: '물 (Water)', elementKr: '물', quality: 'Mutable',
    ruler: 'Jupiter', rulerKr: '목성 (구루)',
    description: '영성과 공감의 별자리예요. 풍부한 상상력과 깊은 공감 능력으로 보이지 않는 세계를 느끼고 표현해요.',
    traits: ['영성', '공감', '상상력', '직관']
  },
];

/**
 * Get Rashi from sidereal degree
 */
export function getRashiFromDegree(degree) {
  const idx = Math.floor(degree / 30) % 12;
  return RASHIS[idx];
}
