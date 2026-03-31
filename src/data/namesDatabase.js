/**
 * namesDatabase.js
 * Pre-curated name lists for each of the 27 Nakshatras.
 * Each Nakshatra has Indian/Sanskrit names and English names,
 * with male, female, and neutral categories.
 * All meaning/origin fields are in Korean.
 */

export const VEDIC_NAMES = {
  // -------------------------------------------------------
  // 0: Ashwini — Pada syllables: Chu, Che, Cho, La
  // -------------------------------------------------------
  0: {
    indian: {
      male: [
        { name: "Chethan", meaning: "활기찬, 의식적인", origin: "Che 파다에서 유래" },
        { name: "Chetan", meaning: "영혼, 생명력", origin: "Che 파다에서 유래" },
        { name: "Chandan", meaning: "백단향, 고귀한", origin: "Ch 음절과 공명" },
        { name: "Lakshman", meaning: "행운의 표시를 가진 자", origin: "La 파다에서 유래" },
        { name: "Lalit", meaning: "아름다운, 우아한", origin: "La 파다에서 유래" },
        { name: "Chokkalingam", meaning: "빛나는 신성", origin: "Cho 파다에서 유래" }
      ],
      female: [
        { name: "Chhaya", meaning: "그림자, 보호", origin: "Ch 파다에서 유래" },
        { name: "Chetna", meaning: "의식, 각성", origin: "Che 파다에서 유래" },
        { name: "Lata", meaning: "덩굴, 아름다운 여인", origin: "La 파다에서 유래" },
        { name: "Lalita", meaning: "우아한, 매력적인", origin: "La 파다에서 유래" },
        { name: "Lavanya", meaning: "우아함, 아름다움", origin: "La 파다에서 유래" }
      ],
      neutral: [
        { name: "Charu", meaning: "아름다운, 매력적인", origin: "Ch 파다에서 유래" },
        { name: "Lakshya", meaning: "목표, 목적", origin: "La 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Chester", meaning: "요새, 수호자", origin: "'Che' 음절과 공명" },
        { name: "Charles", meaning: "자유로운 사람", origin: "'Ch' 음절과 공명" },
        { name: "Lance", meaning: "창, 기사", origin: "'La' 음절과 공명" },
        { name: "Larry", meaning: "월계관을 쓴 자", origin: "'La' 음절과 공명" }
      ],
      female: [
        { name: "Chelsea", meaning: "항구, 안식처", origin: "'Che' 음절과 공명" },
        { name: "Laura", meaning: "월계수, 승리", origin: "'La' 음절과 공명" },
        { name: "Charlotte", meaning: "자유로운 여인", origin: "'Ch' 음절과 공명" },
        { name: "Lacey", meaning: "쾌활한, 밝은", origin: "'La' 음절과 공명" }
      ],
      neutral: [
        { name: "Chase", meaning: "추구하는 자", origin: "'Ch' 음절과 공명" },
        { name: "Lane", meaning: "좁은 길, 통로", origin: "'La' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 1: Bharani — Pada syllables: Li, Lu, Le, Lo
  // -------------------------------------------------------
  1: {
    indian: {
      male: [
        { name: "Likhit", meaning: "기록된, 운명지어진", origin: "Li 파다에서 유래" },
        { name: "Lokesh", meaning: "세계의 주인", origin: "Lo 파다에서 유래" },
        { name: "Lokendra", meaning: "세상의 왕", origin: "Lo 파다에서 유래" },
        { name: "Luv", meaning: "라마의 아들", origin: "Lu 파다에서 유래" },
        { name: "Lekhraj", meaning: "글의 왕", origin: "Le 파다에서 유래" }
      ],
      female: [
        { name: "Lila", meaning: "신성한 놀이", origin: "Li 파다에서 유래" },
        { name: "Lipi", meaning: "문자, 기록", origin: "Li 파다에서 유래" },
        { name: "Leela", meaning: "신의 유희", origin: "Le 파다에서 유래" },
        { name: "Lopa", meaning: "학식 있는 여인", origin: "Lo 파다에서 유래" },
        { name: "Lopamudra", meaning: "현명한 여인", origin: "Lo 파다에서 유래" }
      ],
      neutral: [
        { name: "Likhita", meaning: "기록된", origin: "Li 파다에서 유래" },
        { name: "Lochan", meaning: "눈, 시야", origin: "Lo 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Liam", meaning: "강인한 수호자", origin: "'Li' 음절과 공명" },
        { name: "Luke", meaning: "빛을 가져오는 자", origin: "'Lu' 음절과 공명" },
        { name: "Leo", meaning: "사자, 용감한", origin: "'Le' 음절과 공명" },
        { name: "Logan", meaning: "작은 골짜기", origin: "'Lo' 음절과 공명" }
      ],
      female: [
        { name: "Lily", meaning: "백합, 순수함", origin: "'Li' 음절과 공명" },
        { name: "Lucy", meaning: "빛, 밝음", origin: "'Lu' 음절과 공명" },
        { name: "Leah", meaning: "지친 자, 인내", origin: "'Le' 음절과 공명" },
        { name: "Lola", meaning: "슬픔의 여인, 강인함", origin: "'Lo' 음절과 공명" }
      ],
      neutral: [
        { name: "Lee", meaning: "목초지, 평화", origin: "'Le' 음절과 공명" },
        { name: "Loren", meaning: "월계수", origin: "'Lo' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 2: Krittika — Pada syllables: A, I, U, E
  // -------------------------------------------------------
  2: {
    indian: {
      male: [
        { name: "Aarav", meaning: "평화로운, 지혜로운", origin: "A 파다에서 유래" },
        { name: "Arjun", meaning: "밝은, 빛나는", origin: "A 파다에서 유래" },
        { name: "Ishaan", meaning: "태양, 동쪽 방향", origin: "I 파다에서 유래" },
        { name: "Uday", meaning: "일출, 시작", origin: "U 파다에서 유래" },
        { name: "Eklavya", meaning: "뛰어난 제자", origin: "E 파다에서 유래" }
      ],
      female: [
        { name: "Ananya", meaning: "독특한, 유일한", origin: "A 파다에서 유래" },
        { name: "Isha", meaning: "여신, 보호자", origin: "I 파다에서 유래" },
        { name: "Uma", meaning: "파르바티 여신", origin: "U 파다에서 유래" },
        { name: "Aadhya", meaning: "최초의, 근원", origin: "A 파다에서 유래" },
        { name: "Esha", meaning: "소망, 욕구", origin: "E 파다에서 유래" }
      ],
      neutral: [
        { name: "Akash", meaning: "하늘, 무한", origin: "A 파다에서 유래" },
        { name: "Indra", meaning: "신들의 왕", origin: "I 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Adam", meaning: "땅의 사람", origin: "'A' 음절과 공명" },
        { name: "Ian", meaning: "하느님의 은총", origin: "'I' 음절과 공명" },
        { name: "Ethan", meaning: "강한, 확고한", origin: "'E' 음절과 공명" },
        { name: "Aaron", meaning: "높은 산, 고귀한", origin: "'A' 음절과 공명" }
      ],
      female: [
        { name: "Alice", meaning: "고귀한, 품위 있는", origin: "'A' 음절과 공명" },
        { name: "Irene", meaning: "평화", origin: "'I' 음절과 공명" },
        { name: "Uma", meaning: "빛, 평온", origin: "'U' 음절과 공명" },
        { name: "Eva", meaning: "생명, 살아있는", origin: "'E' 음절과 공명" }
      ],
      neutral: [
        { name: "Alex", meaning: "수호자", origin: "'A' 음절과 공명" },
        { name: "Eden", meaning: "낙원, 기쁨", origin: "'E' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 3: Rohini — Pada syllables: O, Va, Vi, Vu
  // -------------------------------------------------------
  3: {
    indian: {
      male: [
        { name: "Om", meaning: "우주의 근원 소리", origin: "O 파다에서 유래" },
        { name: "Varun", meaning: "물의 신", origin: "Va 파다에서 유래" },
        { name: "Vivek", meaning: "분별력, 지혜", origin: "Vi 파다에서 유래" },
        { name: "Vinay", meaning: "겸손, 예의", origin: "Vi 파다에서 유래" },
        { name: "Vasudev", meaning: "크리슈나의 아버지", origin: "Va 파다에서 유래" }
      ],
      female: [
        { name: "Omisha", meaning: "미소의 여신", origin: "O 파다에서 유래" },
        { name: "Varsha", meaning: "비, 우기", origin: "Va 파다에서 유래" },
        { name: "Vidya", meaning: "지식, 배움", origin: "Vi 파다에서 유래" },
        { name: "Vani", meaning: "말, 사라스와티", origin: "Va 파다에서 유래" },
        { name: "Vibha", meaning: "빛나는, 밝은", origin: "Vi 파다에서 유래" }
      ],
      neutral: [
        { name: "Omkar", meaning: "옴의 형태", origin: "O 파다에서 유래" },
        { name: "Vimal", meaning: "순수한, 깨끗한", origin: "Vi 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Oliver", meaning: "올리브 나무, 평화", origin: "'O' 음절과 공명" },
        { name: "Vincent", meaning: "정복하는 자", origin: "'Vi' 음절과 공명" },
        { name: "Victor", meaning: "승리자", origin: "'Vi' 음절과 공명" }
      ],
      female: [
        { name: "Olivia", meaning: "올리브, 평화의 상징", origin: "'O' 음절과 공명" },
        { name: "Vanessa", meaning: "나비, 변화", origin: "'Va' 음절과 공명" },
        { name: "Vivian", meaning: "생명력 넘치는", origin: "'Vi' 음절과 공명" },
        { name: "Victoria", meaning: "승리의 여인", origin: "'Vi' 음절과 공명" }
      ],
      neutral: [
        { name: "Owen", meaning: "젊은 전사", origin: "'O' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 4: Mrigashira — Pada syllables: Ve, Vo, Ka, Ki
  // -------------------------------------------------------
  4: {
    indian: {
      male: [
        { name: "Veer", meaning: "용감한, 영웅", origin: "Ve 파다에서 유래" },
        { name: "Karan", meaning: "귀, 관대한 전사", origin: "Ka 파다에서 유래" },
        { name: "Kishore", meaning: "젊은이, 청춘", origin: "Ki 파다에서 유래" },
        { name: "Kartik", meaning: "전쟁의 신", origin: "Ka 파다에서 유래" },
        { name: "Kiran", meaning: "빛줄기", origin: "Ki 파다에서 유래" }
      ],
      female: [
        { name: "Veena", meaning: "현악기, 음악", origin: "Ve 파다에서 유래" },
        { name: "Kavita", meaning: "시, 문학", origin: "Ka 파다에서 유래" },
        { name: "Kirti", meaning: "명성, 영광", origin: "Ki 파다에서 유래" },
        { name: "Kamala", meaning: "연꽃", origin: "Ka 파다에서 유래" },
        { name: "Kiran", meaning: "빛줄기", origin: "Ki 파다에서 유래" }
      ],
      neutral: [
        { name: "Kavi", meaning: "시인, 현자", origin: "Ka 파다에서 유래" },
        { name: "Kiran", meaning: "빛줄기", origin: "Ki 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Kevin", meaning: "잘생긴, 고귀한", origin: "'Ke/Ve' 음절과 공명" },
        { name: "Karl", meaning: "자유로운 사람", origin: "'Ka' 음절과 공명" },
        { name: "Keith", meaning: "숲, 바람", origin: "'Ki' 음절과 공명" }
      ],
      female: [
        { name: "Vera", meaning: "진실, 믿음", origin: "'Ve' 음절과 공명" },
        { name: "Karen", meaning: "순수한", origin: "'Ka' 음절과 공명" },
        { name: "Kira", meaning: "빛, 태양의", origin: "'Ki' 음절과 공명" },
        { name: "Katherine", meaning: "순수한, 깨끗한", origin: "'Ka' 음절과 공명" }
      ],
      neutral: [
        { name: "Kit", meaning: "그리스도를 품은 자", origin: "'Ki' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 5: Ardra — Pada syllables: Ku, Gha, Ng, Chha
  // -------------------------------------------------------
  5: {
    indian: {
      male: [
        { name: "Kumar", meaning: "왕자, 젊은이", origin: "Ku 파다에서 유래" },
        { name: "Kunal", meaning: "연꽃, 아름다운 눈", origin: "Ku 파다에서 유래" },
        { name: "Kushagra", meaning: "총명한, 날카로운", origin: "Ku 파다에서 유래" },
        { name: "Ghanshyam", meaning: "구름색 크리슈나", origin: "Gha 파다에서 유래" },
        { name: "Chhatrapal", meaning: "왕국의 수호자", origin: "Chha 파다에서 유래" }
      ],
      female: [
        { name: "Kumari", meaning: "공주, 처녀", origin: "Ku 파다에서 유래" },
        { name: "Kumud", meaning: "수련, 연꽃", origin: "Ku 파다에서 유래" },
        { name: "Kunti", meaning: "마하바라타의 여왕", origin: "Ku 파다에서 유래" },
        { name: "Kusumita", meaning: "꽃이 핀", origin: "Ku 파다에서 유래" }
      ],
      neutral: [
        { name: "Kusum", meaning: "꽃", origin: "Ku 파다에서 유래" },
        { name: "Kush", meaning: "신성한 풀, 라마의 아들", origin: "Ku 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Kurt", meaning: "정중한, 예의바른", origin: "'Ku' 음절과 공명" },
        { name: "Curtis", meaning: "정중한 사람", origin: "'Ku' 음절과 공명" },
        { name: "Grant", meaning: "위대한", origin: "'Gha' 음절과 공명" }
      ],
      female: [
        { name: "Gwen", meaning: "흰색, 축복받은", origin: "'Gha' 음절과 유사" },
        { name: "Kumiko", meaning: "오래 살아온 아름다움", origin: "'Ku' 음절과 공명" },
        { name: "Crystal", meaning: "수정, 맑은", origin: "'K' 음절과 공명" }
      ],
      neutral: [
        { name: "Quinn", meaning: "지혜로운, 현명한", origin: "'Ku' 음절과 유사" }
      ]
    }
  },

  // -------------------------------------------------------
  // 6: Punarvasu — Pada syllables: Ke, Ko, Ha, Hi
  // -------------------------------------------------------
  6: {
    indian: {
      male: [
        { name: "Keshav", meaning: "크리슈나, 풍성한 머리카락", origin: "Ke 파다에서 유래" },
        { name: "Hari", meaning: "비슈누, 초록색", origin: "Ha 파다에서 유래" },
        { name: "Hitesh", meaning: "모두에게 좋은 것을 원하는 자", origin: "Hi 파다에서 유래" },
        { name: "Komal", meaning: "부드러운, 섬세한", origin: "Ko 파다에서 유래" },
        { name: "Harish", meaning: "비슈누의 이름", origin: "Ha 파다에서 유래" }
      ],
      female: [
        { name: "Hema", meaning: "금, 아름다운", origin: "He 파다와 공명" },
        { name: "Hina", meaning: "헤나, 향기로운", origin: "Hi 파다에서 유래" },
        { name: "Ketki", meaning: "향기로운 꽃", origin: "Ke 파다에서 유래" },
        { name: "Komal", meaning: "부드러운, 섬세한", origin: "Ko 파다에서 유래" },
        { name: "Himani", meaning: "눈의 여신", origin: "Hi 파다에서 유래" }
      ],
      neutral: [
        { name: "Harshal", meaning: "행복한, 기쁜", origin: "Ha 파다에서 유래" },
        { name: "Keya", meaning: "꽃, 몬순의 꽃", origin: "Ke 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Kenneth", meaning: "잘생긴, 불에서 태어난", origin: "'Ke' 음절과 공명" },
        { name: "Henry", meaning: "가정의 통치자", origin: "'He' 음절과 공명" },
        { name: "Harrison", meaning: "해리의 아들", origin: "'Ha' 음절과 공명" },
        { name: "Hugo", meaning: "지성, 정신", origin: "'H' 음절과 공명" }
      ],
      female: [
        { name: "Heidi", meaning: "고귀한, 명랑한", origin: "'Hi' 음절과 공명" },
        { name: "Hannah", meaning: "은총, 은혜", origin: "'Ha' 음절과 공명" },
        { name: "Keira", meaning: "어두운, 신비로운", origin: "'Ke' 음절과 공명" }
      ],
      neutral: [
        { name: "Harper", meaning: "하프 연주자", origin: "'Ha' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 7: Pushya — Pada syllables: Hu, He, Ho, Da
  // -------------------------------------------------------
  7: {
    indian: {
      male: [
        { name: "Hemant", meaning: "겨울, 금빛의", origin: "He 파다에서 유래" },
        { name: "Darshan", meaning: "시야, 신의 모습", origin: "Da 파다에서 유래" },
        { name: "Daksh", meaning: "유능한, 능력있는", origin: "Da 파다에서 유래" },
        { name: "Hoshiar", meaning: "지혜로운, 영리한", origin: "Ho 파다에서 유래" },
        { name: "Dayaram", meaning: "자비로운 라마", origin: "Da 파다에서 유래" }
      ],
      female: [
        { name: "Hema", meaning: "금, 아름다운", origin: "He 파다에서 유래" },
        { name: "Daksha", meaning: "능력있는 여인", origin: "Da 파다에서 유래" },
        { name: "Hemal", meaning: "금빛의", origin: "He 파다에서 유래" },
        { name: "Daya", meaning: "자비, 연민", origin: "Da 파다에서 유래" }
      ],
      neutral: [
        { name: "Hemang", meaning: "금빛 몸", origin: "He 파다에서 유래" },
        { name: "Dakshata", meaning: "능력, 기술", origin: "Da 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Hugh", meaning: "마음, 정신", origin: "'Hu' 음절과 공명" },
        { name: "Howard", meaning: "높은 수호자", origin: "'Ho' 음절과 공명" },
        { name: "Daniel", meaning: "하느님은 나의 심판관", origin: "'Da' 음절과 공명" },
        { name: "David", meaning: "사랑받는 자", origin: "'Da' 음절과 공명" }
      ],
      female: [
        { name: "Helen", meaning: "밝은 빛, 횃불", origin: "'He' 음절과 공명" },
        { name: "Holly", meaning: "호랑가시나무, 성스러운", origin: "'Ho' 음절과 공명" },
        { name: "Dahlia", meaning: "꽃, 우아함", origin: "'Da' 음절과 공명" }
      ],
      neutral: [
        { name: "Dale", meaning: "계곡", origin: "'Da' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 8: Ashlesha — Pada syllables: Di, Du, De, Do
  // -------------------------------------------------------
  8: {
    indian: {
      male: [
        { name: "Dinesh", meaning: "태양, 낮의 신", origin: "Di 파다에서 유래" },
        { name: "Dilip", meaning: "보호자, 왕", origin: "Di 파다에서 유래" },
        { name: "Durga", meaning: "접근하기 어려운", origin: "Du 파다에서 유래" },
        { name: "Devendra", meaning: "신들의 왕", origin: "De 파다에서 유래" },
        { name: "Doleshwar", meaning: "시바신의 이름", origin: "Do 파다에서 유래" }
      ],
      female: [
        { name: "Divya", meaning: "신성한, 빛나는", origin: "Di 파다에서 유래" },
        { name: "Deepa", meaning: "빛, 등불", origin: "De 파다에서 유래" },
        { name: "Durga", meaning: "접근하기 어려운 여신", origin: "Du 파다에서 유래" },
        { name: "Dipti", meaning: "빛, 광채", origin: "Di 파다에서 유래" },
        { name: "Devika", meaning: "작은 여신", origin: "De 파다에서 유래" }
      ],
      neutral: [
        { name: "Deva", meaning: "신성한 존재", origin: "De 파다에서 유래" },
        { name: "Deepak", meaning: "등불, 빛", origin: "De 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Dean", meaning: "계곡, 지도자", origin: "'De' 음절과 공명" },
        { name: "Dominic", meaning: "주님의", origin: "'Do' 음절과 공명" },
        { name: "Diego", meaning: "가르치는 자", origin: "'Di' 음절과 공명" }
      ],
      female: [
        { name: "Diana", meaning: "신성한, 달의 여신", origin: "'Di' 음절과 공명" },
        { name: "Deborah", meaning: "벌, 부지런한", origin: "'De' 음절과 공명" },
        { name: "Dorothy", meaning: "신의 선물", origin: "'Do' 음절과 공명" },
        { name: "Donna", meaning: "여성, 귀부인", origin: "'Do' 음절과 공명" }
      ],
      neutral: [
        { name: "Dylan", meaning: "바다의 아들", origin: "'Di' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 9: Magha — Pada syllables: Ma, Mi, Mu, Me
  // -------------------------------------------------------
  9: {
    indian: {
      male: [
        { name: "Manish", meaning: "마음의 주인, 지혜로운", origin: "Ma 파다에서 유래" },
        { name: "Mihir", meaning: "태양", origin: "Mi 파다에서 유래" },
        { name: "Mukesh", meaning: "무카 악마를 물리친 자", origin: "Mu 파다에서 유래" },
        { name: "Mehul", meaning: "비, 구름", origin: "Me 파다에서 유래" },
        { name: "Manoj", meaning: "마음에서 태어난", origin: "Ma 파다에서 유래" }
      ],
      female: [
        { name: "Maya", meaning: "환영, 신비한 힘", origin: "Ma 파다에서 유래" },
        { name: "Mira", meaning: "바다, 경계", origin: "Mi 파다에서 유래" },
        { name: "Mukta", meaning: "진주, 해방된", origin: "Mu 파다에서 유래" },
        { name: "Meera", meaning: "크리슈나의 헌신자", origin: "Me 파다에서 유래" },
        { name: "Madhuri", meaning: "달콤한, 매력적인", origin: "Ma 파다에서 유래" }
      ],
      neutral: [
        { name: "Manu", meaning: "인류의 조상", origin: "Ma 파다에서 유래" },
        { name: "Milan", meaning: "만남, 합일", origin: "Mi 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Matthew", meaning: "하느님의 선물", origin: "'Ma' 음절과 공명" },
        { name: "Michael", meaning: "하느님과 같은 자", origin: "'Mi' 음절과 공명" },
        { name: "Marcus", meaning: "전사, 화성의", origin: "'Ma' 음절과 공명" }
      ],
      female: [
        { name: "Maya", meaning: "환영, 물", origin: "'Ma' 음절과 공명" },
        { name: "Megan", meaning: "강한, 유능한", origin: "'Me' 음절과 공명" },
        { name: "Miranda", meaning: "경이로운", origin: "'Mi' 음절과 공명" },
        { name: "Melody", meaning: "노래, 멜로디", origin: "'Me' 음절과 공명" }
      ],
      neutral: [
        { name: "Morgan", meaning: "바다의 수호자", origin: "'M' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 10: Purva Phalguni — Pada syllables: Mo, Ta, Ti, Tu
  // -------------------------------------------------------
  10: {
    indian: {
      male: [
        { name: "Mohan", meaning: "매력적인, 크리슈나", origin: "Mo 파다에서 유래" },
        { name: "Tarun", meaning: "젊은, 부드러운", origin: "Ta 파다에서 유래" },
        { name: "Tilak", meaning: "이마의 표시, 장식", origin: "Ti 파다에서 유래" },
        { name: "Tushar", meaning: "이슬, 눈", origin: "Tu 파다에서 유래" },
        { name: "Mohit", meaning: "매료된, 매혹적인", origin: "Mo 파다에서 유래" }
      ],
      female: [
        { name: "Mohini", meaning: "가장 매력적인 여인", origin: "Mo 파다에서 유래" },
        { name: "Tara", meaning: "별", origin: "Ta 파다에서 유래" },
        { name: "Tithi", meaning: "음력 날짜", origin: "Ti 파다에서 유래" },
        { name: "Tulsi", meaning: "성스러운 바질", origin: "Tu 파다에서 유래" },
        { name: "Tanvi", meaning: "섬세한, 아름다운", origin: "Ta 파다에서 유래" }
      ],
      neutral: [
        { name: "Moksha", meaning: "해탈, 자유", origin: "Mo 파다에서 유래" },
        { name: "Tanu", meaning: "몸, 섬세한", origin: "Ta 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Moses", meaning: "물에서 건진 자", origin: "'Mo' 음절과 공명" },
        { name: "Taylor", meaning: "재단사", origin: "'Ta' 음절과 공명" },
        { name: "Timothy", meaning: "하느님을 존경하는 자", origin: "'Ti' 음절과 공명" },
        { name: "Tucker", meaning: "천을 다루는 자", origin: "'Tu' 음절과 공명" }
      ],
      female: [
        { name: "Monica", meaning: "조언자, 유일한", origin: "'Mo' 음절과 공명" },
        { name: "Tanya", meaning: "요정의 여왕", origin: "'Ta' 음절과 공명" },
        { name: "Tiffany", meaning: "신의 현현", origin: "'Ti' 음절과 공명" }
      ],
      neutral: [
        { name: "Taylor", meaning: "재단사", origin: "'Ta' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 11: Uttara Phalguni — Pada syllables: Te, To, Pa, Pi
  // -------------------------------------------------------
  11: {
    indian: {
      male: [
        { name: "Tejas", meaning: "빛, 광채", origin: "Te 파다에서 유래" },
        { name: "Toshi", meaning: "만족, 기쁨", origin: "To 파다에서 유래" },
        { name: "Pankaj", meaning: "연꽃", origin: "Pa 파다에서 유래" },
        { name: "Pinak", meaning: "시바신의 활", origin: "Pi 파다에서 유래" },
        { name: "Parth", meaning: "아르주나, 전사", origin: "Pa 파다에서 유래" }
      ],
      female: [
        { name: "Tejal", meaning: "빛나는, 광채나는", origin: "Te 파다에서 유래" },
        { name: "Pallavi", meaning: "새싹, 새로운 잎", origin: "Pa 파다에서 유래" },
        { name: "Pinki", meaning: "분홍빛의", origin: "Pi 파다에서 유래" },
        { name: "Payal", meaning: "발찌", origin: "Pa 파다에서 유래" },
        { name: "Piya", meaning: "사랑하는, 연인", origin: "Pi 파다에서 유래" }
      ],
      neutral: [
        { name: "Param", meaning: "최고의, 궁극의", origin: "Pa 파다에서 유래" },
        { name: "Tejasvi", meaning: "빛나는, 에너지 넘치는", origin: "Te 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Terry", meaning: "부족의 통치자", origin: "'Te' 음절과 공명" },
        { name: "Patrick", meaning: "고귀한 사람", origin: "'Pa' 음절과 공명" },
        { name: "Peter", meaning: "바위, 돌", origin: "'Pi/Pe' 음절과 공명" },
        { name: "Todd", meaning: "여우, 영리한", origin: "'To' 음절과 공명" }
      ],
      female: [
        { name: "Teresa", meaning: "수확하는 여인", origin: "'Te' 음절과 공명" },
        { name: "Patricia", meaning: "고귀한 여인", origin: "'Pa' 음절과 공명" },
        { name: "Piper", meaning: "피리 부는 자", origin: "'Pi' 음절과 공명" }
      ],
      neutral: [
        { name: "Parker", meaning: "공원 관리인", origin: "'Pa' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 12: Hasta — Pada syllables: Pu, Sha, Na, Tha
  // -------------------------------------------------------
  12: {
    indian: {
      male: [
        { name: "Puneet", meaning: "순수한, 깨끗한", origin: "Pu 파다에서 유래" },
        { name: "Shankar", meaning: "시바, 행복을 주는 자", origin: "Sha 파다에서 유래" },
        { name: "Naresh", meaning: "사람들의 왕", origin: "Na 파다에서 유래" },
        { name: "Tharun", meaning: "젊은, 새로운", origin: "Tha 파다에서 유래" },
        { name: "Pushkar", meaning: "푸른 연꽃, 성지", origin: "Pu 파다에서 유래" }
      ],
      female: [
        { name: "Puja", meaning: "예배, 기도", origin: "Pu 파다에서 유래" },
        { name: "Shakti", meaning: "힘, 에너지 여신", origin: "Sha 파다에서 유래" },
        { name: "Nalini", meaning: "연꽃", origin: "Na 파다에서 유래" },
        { name: "Shanti", meaning: "평화", origin: "Sha 파다에서 유래" },
        { name: "Nandini", meaning: "기쁨을 주는 여인", origin: "Na 파다에서 유래" }
      ],
      neutral: [
        { name: "Pushp", meaning: "꽃", origin: "Pu 파다에서 유래" },
        { name: "Naman", meaning: "경배, 인사", origin: "Na 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Shane", meaning: "하느님의 선물", origin: "'Sha' 음절과 공명" },
        { name: "Nathan", meaning: "선물, 주는 자", origin: "'Na' 음절과 공명" },
        { name: "Thaddeus", meaning: "용감한 마음", origin: "'Tha' 음절과 공명" }
      ],
      female: [
        { name: "Shannon", meaning: "오래된 강", origin: "'Sha' 음절과 공명" },
        { name: "Nancy", meaning: "은총, 은혜", origin: "'Na' 음절과 공명" },
        { name: "Natalie", meaning: "탄생일, 크리스마스", origin: "'Na' 음절과 공명" },
        { name: "Sharon", meaning: "평야, 비옥한 땅", origin: "'Sha' 음절과 공명" }
      ],
      neutral: [
        { name: "Shawn", meaning: "하느님의 은총", origin: "'Sha' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 13: Chitra — Pada syllables: Pe, Po, Ra, Ri
  // -------------------------------------------------------
  13: {
    indian: {
      male: [
        { name: "Ravi", meaning: "태양", origin: "Ra 파다에서 유래" },
        { name: "Ritesh", meaning: "진리의 왕", origin: "Ri 파다에서 유래" },
        { name: "Prem", meaning: "사랑", origin: "Pe 파다에서 유래" },
        { name: "Rajesh", meaning: "왕들의 왕", origin: "Ra 파다에서 유래" },
        { name: "Rishi", meaning: "현자, 성자", origin: "Ri 파다에서 유래" }
      ],
      female: [
        { name: "Rani", meaning: "여왕", origin: "Ra 파다에서 유래" },
        { name: "Riya", meaning: "가수, 우아한", origin: "Ri 파다에서 유래" },
        { name: "Pooja", meaning: "예배", origin: "Po 파다에서 유래" },
        { name: "Prerna", meaning: "영감", origin: "Pe/Pr 파다에서 유래" },
        { name: "Rishika", meaning: "성스러운 여인", origin: "Ri 파다에서 유래" }
      ],
      neutral: [
        { name: "Ritika", meaning: "흐름, 전통의", origin: "Ri 파다에서 유래" },
        { name: "Raj", meaning: "왕, 통치", origin: "Ra 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Peter", meaning: "바위, 돌", origin: "'Pe' 음절과 공명" },
        { name: "Raymond", meaning: "지혜로운 보호자", origin: "'Ra' 음절과 공명" },
        { name: "Richard", meaning: "강한 통치자", origin: "'Ri' 음절과 공명" },
        { name: "Porter", meaning: "문지기", origin: "'Po' 음절과 공명" }
      ],
      female: [
        { name: "Rachel", meaning: "어린 양", origin: "'Ra' 음절과 공명" },
        { name: "Penelope", meaning: "직조하는 여인", origin: "'Pe' 음절과 공명" },
        { name: "Rita", meaning: "진주, 진리", origin: "'Ri' 음절과 공명" }
      ],
      neutral: [
        { name: "Riley", meaning: "용감한, 활기찬", origin: "'Ri' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 14: Swati — Pada syllables: Ru, Re, Ro, Ta
  // -------------------------------------------------------
  14: {
    indian: {
      male: [
        { name: "Rudra", meaning: "시바, 울부짖는 자", origin: "Ru 파다에서 유래" },
        { name: "Rohit", meaning: "빨간색, 태양의 첫 빛", origin: "Ro 파다에서 유래" },
        { name: "Reyansh", meaning: "태양의 빛줄기", origin: "Re 파다에서 유래" },
        { name: "Tanay", meaning: "아들", origin: "Ta 파다에서 유래" },
        { name: "Rupesh", meaning: "아름다움의 왕", origin: "Ru 파다에서 유래" }
      ],
      female: [
        { name: "Rupa", meaning: "아름다운, 은빛의", origin: "Ru 파다에서 유래" },
        { name: "Rekha", meaning: "선, 예술", origin: "Re 파다에서 유래" },
        { name: "Rohini", meaning: "별, 아름다운 여인", origin: "Ro 파다에서 유래" },
        { name: "Tara", meaning: "별", origin: "Ta 파다에서 유래" },
        { name: "Ruchi", meaning: "빛, 아름다움", origin: "Ru 파다에서 유래" }
      ],
      neutral: [
        { name: "Rohan", meaning: "오르는, 성장하는", origin: "Ro 파다에서 유래" },
        { name: "Ruhi", meaning: "영혼, 감동적인", origin: "Ru 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Robert", meaning: "빛나는 명성", origin: "'Ro' 음절과 공명" },
        { name: "Russell", meaning: "빨간 머리", origin: "'Ru' 음절과 공명" },
        { name: "Thomas", meaning: "쌍둥이", origin: "'Ta' 음절과 공명" }
      ],
      female: [
        { name: "Rose", meaning: "장미꽃", origin: "'Ro' 음절과 공명" },
        { name: "Ruth", meaning: "동반자, 친구", origin: "'Ru' 음절과 공명" },
        { name: "Renee", meaning: "다시 태어난", origin: "'Re' 음절과 공명" },
        { name: "Tabitha", meaning: "가젤, 우아한", origin: "'Ta' 음절과 공명" }
      ],
      neutral: [
        { name: "Robin", meaning: "빛나는 명성", origin: "'Ro' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 15: Vishakha — Pada syllables: Ti, Tu, Te, To
  // -------------------------------------------------------
  15: {
    indian: {
      male: [
        { name: "Tilak", meaning: "이마의 표시", origin: "Ti 파다에서 유래" },
        { name: "Tushar", meaning: "서리, 눈", origin: "Tu 파다에서 유래" },
        { name: "Tejas", meaning: "빛, 광채", origin: "Te 파다에서 유래" },
        { name: "Torsha", meaning: "갈망, 만족", origin: "To 파다에서 유래" },
        { name: "Tirth", meaning: "성지, 순례지", origin: "Ti 파다에서 유래" }
      ],
      female: [
        { name: "Tisha", meaning: "기쁨, 행복", origin: "Ti 파다에서 유래" },
        { name: "Tulika", meaning: "붓, 예술가", origin: "Tu 파다에서 유래" },
        { name: "Tejashri", meaning: "빛나는 여신", origin: "Te 파다에서 유래" },
        { name: "Toshani", meaning: "시바의 배우자", origin: "To 파다에서 유래" },
        { name: "Tithi", meaning: "음력 날짜", origin: "Ti 파다에서 유래" }
      ],
      neutral: [
        { name: "Tirtha", meaning: "성지", origin: "Ti 파다에서 유래" },
        { name: "Tulya", meaning: "동등한, 균형 잡힌", origin: "Tu 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Timothy", meaning: "하느님을 존경하는 자", origin: "'Ti' 음절과 공명" },
        { name: "Tyler", meaning: "타일 만드는 자", origin: "'Ti/Tu' 음절과 공명" },
        { name: "Tobias", meaning: "하느님은 선하다", origin: "'To' 음절과 공명" }
      ],
      female: [
        { name: "Tina", meaning: "강, 작은", origin: "'Ti' 음절과 공명" },
        { name: "Teresa", meaning: "수확하는 여인", origin: "'Te' 음절과 공명" },
        { name: "Tori", meaning: "승리의 여인", origin: "'To' 음절과 공명" }
      ],
      neutral: [
        { name: "Terry", meaning: "부족의 통치자", origin: "'Te' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 16: Anuradha — Pada syllables: Na, Ni, Nu, Ne
  // -------------------------------------------------------
  16: {
    indian: {
      male: [
        { name: "Nakul", meaning: "판다바의 넷째 아들", origin: "Na 파다에서 유래" },
        { name: "Nikhil", meaning: "완전한, 전체의", origin: "Ni 파다에서 유래" },
        { name: "Neeraj", meaning: "연꽃", origin: "Ne 파다에서 유래" },
        { name: "Naveen", meaning: "새로운", origin: "Na 파다에서 유래" },
        { name: "Nitin", meaning: "올바른 길의 주인", origin: "Ni 파다에서 유래" }
      ],
      female: [
        { name: "Nandita", meaning: "즐거운, 행복한", origin: "Na 파다에서 유래" },
        { name: "Nisha", meaning: "밤", origin: "Ni 파다에서 유래" },
        { name: "Neha", meaning: "사랑, 비", origin: "Ne 파다에서 유래" },
        { name: "Nirmala", meaning: "순수한, 깨끗한", origin: "Ni 파다에서 유래" },
        { name: "Namrata", meaning: "겸손한", origin: "Na 파다에서 유래" }
      ],
      neutral: [
        { name: "Naren", meaning: "인류의 왕", origin: "Na 파다에서 유래" },
        { name: "Neel", meaning: "파란색, 사파이어", origin: "Ne 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Nathan", meaning: "선물, 주는 자", origin: "'Na' 음절과 공명" },
        { name: "Nicholas", meaning: "사람들의 승리", origin: "'Ni' 음절과 공명" },
        { name: "Neil", meaning: "구름, 챔피언", origin: "'Ne' 음절과 공명" }
      ],
      female: [
        { name: "Naomi", meaning: "기쁨, 쾌적한", origin: "'Na' 음절과 공명" },
        { name: "Nicole", meaning: "사람들의 승리", origin: "'Ni' 음절과 공명" },
        { name: "Nina", meaning: "작은 소녀, 꿈", origin: "'Ni' 음절과 공명" },
        { name: "Nellie", meaning: "빛나는, 밝은", origin: "'Ne' 음절과 공명" }
      ],
      neutral: [
        { name: "Noel", meaning: "크리스마스, 탄생", origin: "'N' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 17: Jyeshtha — Pada syllables: No, Ya, Yi, Yu
  // -------------------------------------------------------
  17: {
    indian: {
      male: [
        { name: "Yogesh", meaning: "요가의 신", origin: "Yo 파다와 공명" },
        { name: "Yash", meaning: "명성, 영광", origin: "Ya 파다에서 유래" },
        { name: "Yudhishthir", meaning: "전쟁에서 확고한", origin: "Yu 파다에서 유래" },
        { name: "Yuvraj", meaning: "왕자, 후계자", origin: "Yu 파다에서 유래" },
        { name: "Yatin", meaning: "금욕자, 수행자", origin: "Ya 파다에서 유래" }
      ],
      female: [
        { name: "Yamini", meaning: "밤, 야행성의", origin: "Ya 파다에서 유래" },
        { name: "Yukta", meaning: "집중된, 주의 깊은", origin: "Yu 파다에서 유래" },
        { name: "Yashoda", meaning: "명성을 주는 여인", origin: "Ya 파다에서 유래" },
        { name: "Yogita", meaning: "마법에 걸린, 몰두한", origin: "Yo 파다와 공명" }
      ],
      neutral: [
        { name: "Yogi", meaning: "수행자, 명상가", origin: "Yo 파다와 공명" },
        { name: "Yukti", meaning: "지혜, 전략", origin: "Yu 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Noah", meaning: "휴식, 위안", origin: "'No' 음절과 공명" },
        { name: "Yale", meaning: "비옥한 고지대", origin: "'Ya' 음절과 공명" },
        { name: "Yuri", meaning: "농부, 빛", origin: "'Yu' 음절과 공명" }
      ],
      female: [
        { name: "Nora", meaning: "빛, 명예", origin: "'No' 음절과 공명" },
        { name: "Yasmine", meaning: "자스민 꽃", origin: "'Ya' 음절과 공명" },
        { name: "Yvette", meaning: "활의 나무", origin: "'Y' 음절과 공명" }
      ],
      neutral: [
        { name: "Nolan", meaning: "고귀한, 유명한", origin: "'No' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 18: Mula — Pada syllables: Ye, Yo, Bha, Bhi
  // -------------------------------------------------------
  18: {
    indian: {
      male: [
        { name: "Yogendra", meaning: "요가의 왕", origin: "Yo 파다에서 유래" },
        { name: "Bharat", meaning: "인도, 보호된 자", origin: "Bha 파다에서 유래" },
        { name: "Bhim", meaning: "강력한, 두려운", origin: "Bhi 파다에서 유래" },
        { name: "Bhavin", meaning: "존재하는, 살아있는", origin: "Bha 파다에서 유래" },
        { name: "Yeshwant", meaning: "영광스러운", origin: "Ye 파다에서 유래" }
      ],
      female: [
        { name: "Yogini", meaning: "여성 수행자", origin: "Yo 파다에서 유래" },
        { name: "Bhavna", meaning: "감정, 느낌", origin: "Bha 파다에서 유래" },
        { name: "Bhairavi", meaning: "음악의 라가", origin: "Bha 파다에서 유래" },
        { name: "Bhina", meaning: "다른, 독특한", origin: "Bhi 파다에서 유래" },
        { name: "Yesha", meaning: "명성", origin: "Ye 파다에서 유래" }
      ],
      neutral: [
        { name: "Bhanu", meaning: "태양, 빛", origin: "Bha 파다에서 유래" },
        { name: "Yogi", meaning: "수행자", origin: "Yo 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "York", meaning: "멧돼지 농장", origin: "'Yo' 음절과 공명" },
        { name: "Yves", meaning: "활의 나무", origin: "'Ye' 음절과 공명" },
        { name: "Blake", meaning: "빛나는, 어두운", origin: "'Bha' 음절과 유사" }
      ],
      female: [
        { name: "Yvonne", meaning: "활의 나무", origin: "'Y' 음절과 공명" },
        { name: "Beth", meaning: "하느님의 집", origin: "'Bh' 음절과 유사" },
        { name: "Bianca", meaning: "흰색, 순수한", origin: "'Bhi' 음절과 유사" }
      ],
      neutral: [
        { name: "Blair", meaning: "평야, 들판", origin: "'Bha' 음절과 유사" }
      ]
    }
  },

  // -------------------------------------------------------
  // 19: Purva Ashadha — Pada syllables: Bhu, Dha, Pha, Dha
  // -------------------------------------------------------
  19: {
    indian: {
      male: [
        { name: "Bhushan", meaning: "장식, 장신구", origin: "Bhu 파다에서 유래" },
        { name: "Dhanush", meaning: "활, 궁수자리", origin: "Dha 파다에서 유래" },
        { name: "Phalguni", meaning: "아르주나의 이름", origin: "Pha 파다에서 유래" },
        { name: "Dharma", meaning: "의무, 정의", origin: "Dha 파다에서 유래" },
        { name: "Bhuvan", meaning: "세계, 궁전", origin: "Bhu 파다에서 유래" }
      ],
      female: [
        { name: "Bhumi", meaning: "대지, 땅", origin: "Bhu 파다에서 유래" },
        { name: "Dhanya", meaning: "감사한, 축복받은", origin: "Dha 파다에서 유래" },
        { name: "Phalika", meaning: "열매를 맺는", origin: "Pha 파다에서 유래" },
        { name: "Dharini", meaning: "대지, 참는 여인", origin: "Dha 파다에서 유래" },
        { name: "Bhuvana", meaning: "세계", origin: "Bhu 파다에서 유래" }
      ],
      neutral: [
        { name: "Dhruv", meaning: "북극성, 변치 않는", origin: "Dha 파다에서 유래" },
        { name: "Bhuvi", meaning: "천국", origin: "Bhu 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Phillip", meaning: "말을 사랑하는 자", origin: "'Pha' 음절과 공명" },
        { name: "Dalton", meaning: "계곡의 마을", origin: "'Dha' 음절과 유사" },
        { name: "Phoenix", meaning: "불사조", origin: "'Pha' 음절과 공명" }
      ],
      female: [
        { name: "Phoebe", meaning: "빛나는, 밝은", origin: "'Pha' 음절과 공명" },
        { name: "Fiona", meaning: "아름다운, 흰색의", origin: "'Pha' 음절과 유사" },
        { name: "Dahlia", meaning: "달리아 꽃", origin: "'Dha' 음절과 유사" }
      ],
      neutral: [
        { name: "Phoenix", meaning: "불사조, 재탄생", origin: "'Pha' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 20: Uttara Ashadha — Pada syllables: Bhe, Bho, Ja, Ji
  // -------------------------------------------------------
  20: {
    indian: {
      male: [
        { name: "Jai", meaning: "승리", origin: "Ja 파다에서 유래" },
        { name: "Jitesh", meaning: "승리의 신", origin: "Ji 파다에서 유래" },
        { name: "Jayant", meaning: "승리하는 자", origin: "Ja 파다에서 유래" },
        { name: "Jignesh", meaning: "지적 호기심", origin: "Ji 파다에서 유래" },
        { name: "Bhoj", meaning: "왕, 관대한", origin: "Bho 파다에서 유래" }
      ],
      female: [
        { name: "Jaya", meaning: "승리", origin: "Ja 파다에서 유래" },
        { name: "Jigna", meaning: "지적 호기심", origin: "Ji 파다에서 유래" },
        { name: "Janaki", meaning: "시타, 자나카의 딸", origin: "Ja 파다에서 유래" },
        { name: "Jivika", meaning: "생명의 원천", origin: "Ji 파다에서 유래" },
        { name: "Jayashri", meaning: "승리의 여신", origin: "Ja 파다에서 유래" }
      ],
      neutral: [
        { name: "Jeevan", meaning: "생명, 삶", origin: "Ji 파다에서 유래" },
        { name: "Jayesh", meaning: "승리의 주", origin: "Ja 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Jacob", meaning: "뒤따르는 자", origin: "'Ja' 음절과 공명" },
        { name: "James", meaning: "뒤따르는 자", origin: "'Ja' 음절과 공명" },
        { name: "Jim", meaning: "뒤따르는 자의 축약", origin: "'Ji' 음절과 공명" }
      ],
      female: [
        { name: "Jane", meaning: "하느님의 은총", origin: "'Ja' 음절과 공명" },
        { name: "Jill", meaning: "젊은, 아이", origin: "'Ji' 음절과 공명" },
        { name: "Jasmine", meaning: "자스민 꽃", origin: "'Ja' 음절과 공명" },
        { name: "Julia", meaning: "젊은, 활기찬", origin: "'J' 음절과 공명" }
      ],
      neutral: [
        { name: "Jordan", meaning: "흐르는 강", origin: "'J' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 21: Shravana — Pada syllables: Ju, Je, Jo, Gha
  // -------------------------------------------------------
  21: {
    indian: {
      male: [
        { name: "Jugal", meaning: "한 쌍, 커플", origin: "Ju 파다에서 유래" },
        { name: "Jeevan", meaning: "생명", origin: "Je 파다에서 유래" },
        { name: "Johar", meaning: "보석", origin: "Jo 파다에서 유래" },
        { name: "Ghanshyam", meaning: "구름빛 크리슈나", origin: "Gha 파다에서 유래" },
        { name: "Jeetendra", meaning: "승리의 왕", origin: "Je 파다에서 유래" }
      ],
      female: [
        { name: "Juhi", meaning: "자스민 꽃", origin: "Ju 파다에서 유래" },
        { name: "Jemima", meaning: "비둘기", origin: "Je 파다에서 유래" },
        { name: "Joshita", meaning: "기쁜, 즐거운", origin: "Jo 파다에서 유래" },
        { name: "Jharna", meaning: "시냇물, 폭포", origin: "Jha 파다와 공명" }
      ],
      neutral: [
        { name: "Jyoti", meaning: "빛, 불꽃", origin: "J 파다에서 유래" },
        { name: "Jeel", meaning: "호수", origin: "Je 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Julian", meaning: "젊은, 솜털의", origin: "'Ju' 음절과 공명" },
        { name: "Jeffrey", meaning: "하느님의 평화", origin: "'Je' 음절과 공명" },
        { name: "Joseph", meaning: "하느님이 더하시리라", origin: "'Jo' 음절과 공명" },
        { name: "John", meaning: "하느님의 은총", origin: "'Jo' 음절과 공명" }
      ],
      female: [
        { name: "Julia", meaning: "젊은, 활기찬", origin: "'Ju' 음절과 공명" },
        { name: "Jennifer", meaning: "아름다운 환영", origin: "'Je' 음절과 공명" },
        { name: "Josephine", meaning: "하느님이 더하시리라", origin: "'Jo' 음절과 공명" }
      ],
      neutral: [
        { name: "Jesse", meaning: "선물", origin: "'Je' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 22: Dhanishta — Pada syllables: Ga, Gi, Gu, Ge
  // -------------------------------------------------------
  22: {
    indian: {
      male: [
        { name: "Ganesh", meaning: "군대의 주인, 장애물 제거자", origin: "Ga 파다에서 유래" },
        { name: "Girish", meaning: "산의 주인, 시바", origin: "Gi 파다에서 유래" },
        { name: "Gulab", meaning: "장미", origin: "Gu 파다에서 유래" },
        { name: "Gaurav", meaning: "자부심, 명예", origin: "Ga 파다에서 유래" },
        { name: "Guru", meaning: "스승, 안내자", origin: "Gu 파다에서 유래" }
      ],
      female: [
        { name: "Gauri", meaning: "파르바티, 빛나는", origin: "Ga 파다에서 유래" },
        { name: "Gita", meaning: "노래, 바가바드기타", origin: "Gi 파다에서 유래" },
        { name: "Gunjan", meaning: "벌의 윙윙소리", origin: "Gu 파다에서 유래" },
        { name: "Gayatri", meaning: "베다의 성스러운 찬가", origin: "Ga 파다에서 유래" }
      ],
      neutral: [
        { name: "Gagan", meaning: "하늘", origin: "Ga 파다에서 유래" },
        { name: "Garv", meaning: "자부심", origin: "Ga 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Gabriel", meaning: "하느님의 전사", origin: "'Ga' 음절과 공명" },
        { name: "Gilbert", meaning: "빛나는 서약", origin: "'Gi' 음절과 공명" },
        { name: "Gustavo", meaning: "왕실의 지팡이", origin: "'Gu' 음절과 공명" }
      ],
      female: [
        { name: "Gabriella", meaning: "하느님의 여전사", origin: "'Ga' 음절과 공명" },
        { name: "Gina", meaning: "여왕", origin: "'Gi' 음절과 공명" },
        { name: "Gemma", meaning: "보석", origin: "'Ge' 음절과 공명" }
      ],
      neutral: [
        { name: "Gale", meaning: "즐거운, 활기찬", origin: "'Ga' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 23: Shatabhisha — Pada syllables: Go, Sa, Si, Su
  // -------------------------------------------------------
  23: {
    indian: {
      male: [
        { name: "Govind", meaning: "크리슈나, 소의 보호자", origin: "Go 파다에서 유래" },
        { name: "Sagar", meaning: "바다", origin: "Sa 파다에서 유래" },
        { name: "Siddharth", meaning: "목표를 달성한 자, 붓다", origin: "Si 파다에서 유래" },
        { name: "Suresh", meaning: "신들의 왕", origin: "Su 파다에서 유래" },
        { name: "Sahil", meaning: "해안, 가이드", origin: "Sa 파다에서 유래" }
      ],
      female: [
        { name: "Gopika", meaning: "소치는 여인, 크리슈나의 친구", origin: "Go 파다에서 유래" },
        { name: "Sarita", meaning: "강", origin: "Sa 파다에서 유래" },
        { name: "Sita", meaning: "라마의 배우자", origin: "Si 파다에서 유래" },
        { name: "Sunita", meaning: "좋은 도덕의", origin: "Su 파다에서 유래" },
        { name: "Simran", meaning: "명상, 기억", origin: "Si 파다에서 유래" }
      ],
      neutral: [
        { name: "Suman", meaning: "꽃, 쾌활한", origin: "Su 파다에서 유래" },
        { name: "Sahaj", meaning: "자연스러운, 쉬운", origin: "Sa 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Gordon", meaning: "큰 언덕", origin: "'Go' 음절과 공명" },
        { name: "Samuel", meaning: "하느님이 들으셨다", origin: "'Sa' 음절과 공명" },
        { name: "Simon", meaning: "듣는 자", origin: "'Si' 음절과 공명" }
      ],
      female: [
        { name: "Sarah", meaning: "공주", origin: "'Sa' 음절과 공명" },
        { name: "Sylvia", meaning: "숲의 여인", origin: "'Si' 음절과 공명" },
        { name: "Susan", meaning: "백합, 연꽃", origin: "'Su' 음절과 공명" },
        { name: "Sienna", meaning: "붉은 갈색", origin: "'Si' 음절과 공명" }
      ],
      neutral: [
        { name: "Sam", meaning: "듣는 자", origin: "'Sa' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 24: Purva Bhadrapada — Pada syllables: Se, So, Da, Di
  // -------------------------------------------------------
  24: {
    indian: {
      male: [
        { name: "Sehaj", meaning: "자연스러운, 편안한", origin: "Se 파다에서 유래" },
        { name: "Soham", meaning: "나는 그이다", origin: "So 파다에서 유래" },
        { name: "Daksh", meaning: "유능한, 능력있는", origin: "Da 파다에서 유래" },
        { name: "Dinesh", meaning: "태양, 낮의 신", origin: "Di 파다에서 유래" },
        { name: "Som", meaning: "달, 넥타", origin: "So 파다에서 유래" }
      ],
      female: [
        { name: "Seema", meaning: "경계, 한계", origin: "Se 파다에서 유래" },
        { name: "Sonali", meaning: "금빛의", origin: "So 파다에서 유래" },
        { name: "Disha", meaning: "방향", origin: "Di 파다에서 유래" },
        { name: "Dakshina", meaning: "유능한, 남쪽", origin: "Da 파다에서 유래" },
        { name: "Divya", meaning: "신성한, 빛나는", origin: "Di 파다에서 유래" }
      ],
      neutral: [
        { name: "Soham", meaning: "나는 그이다", origin: "So 파다에서 유래" },
        { name: "Dakshit", meaning: "시바의 이름", origin: "Da 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Sean", meaning: "하느님의 은총", origin: "'Se' 음절과 공명" },
        { name: "Solomon", meaning: "평화로운", origin: "'So' 음절과 공명" },
        { name: "Diego", meaning: "가르치는 자", origin: "'Di' 음절과 공명" }
      ],
      female: [
        { name: "Selena", meaning: "달의 여신", origin: "'Se' 음절과 공명" },
        { name: "Sophia", meaning: "지혜", origin: "'So' 음절과 공명" },
        { name: "Diana", meaning: "달의 여신, 신성한", origin: "'Di' 음절과 공명" }
      ],
      neutral: [
        { name: "Sage", meaning: "현자, 지혜로운", origin: "'Se' 음절과 유사" }
      ]
    }
  },

  // -------------------------------------------------------
  // 25: Uttara Bhadrapada — Pada syllables: Du, Tha, Jha, Da
  // -------------------------------------------------------
  25: {
    indian: {
      male: [
        { name: "Durjoy", meaning: "정복하기 어려운", origin: "Du 파다에서 유래" },
        { name: "Thapar", meaning: "위엄있는", origin: "Tha 파다에서 유래" },
        { name: "Jhankar", meaning: "음악적 소리", origin: "Jha 파다에서 유래" },
        { name: "Darpan", meaning: "거울", origin: "Da 파다에서 유래" },
        { name: "Dulal", meaning: "사랑받는", origin: "Du 파다에서 유래" }
      ],
      female: [
        { name: "Durga", meaning: "접근하기 어려운 여신", origin: "Du 파다에서 유래" },
        { name: "Jhanvi", meaning: "갠지스 강", origin: "Jha 파다에서 유래" },
        { name: "Daya", meaning: "자비, 연민", origin: "Da 파다에서 유래" },
        { name: "Thara", meaning: "별", origin: "Tha 파다에서 유래" },
        { name: "Dulari", meaning: "사랑받는 여인", origin: "Du 파다에서 유래" }
      ],
      neutral: [
        { name: "Daksh", meaning: "능숙한", origin: "Da 파다에서 유래" },
        { name: "Dushyant", meaning: "고대 인도의 왕", origin: "Du 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Duncan", meaning: "어두운 전사", origin: "'Du' 음절과 공명" },
        { name: "Thatcher", meaning: "지붕 이는 자", origin: "'Tha' 음절과 공명" },
        { name: "Dustin", meaning: "용감한 전사", origin: "'Du' 음절과 공명" }
      ],
      female: [
        { name: "Dulcie", meaning: "달콤한", origin: "'Du' 음절과 공명" },
        { name: "Thalia", meaning: "꽃이 피는, 번영", origin: "'Tha' 음절과 공명" },
        { name: "Daisy", meaning: "데이지 꽃", origin: "'Da' 음절과 공명" }
      ],
      neutral: [
        { name: "Dallas", meaning: "계곡의 집", origin: "'Da' 음절과 공명" }
      ]
    }
  },

  // -------------------------------------------------------
  // 26: Revati — Pada syllables: De, Do, Cha, Chi
  // -------------------------------------------------------
  26: {
    indian: {
      male: [
        { name: "Devesh", meaning: "신들의 신", origin: "De 파다에서 유래" },
        { name: "Chandan", meaning: "백단향", origin: "Cha 파다에서 유래" },
        { name: "Chirag", meaning: "등불, 빛", origin: "Chi 파다에서 유래" },
        { name: "Chinmay", meaning: "순수한 의식", origin: "Chi 파다에서 유래" },
        { name: "Doshi", meaning: "지식인", origin: "Do 파다에서 유래" }
      ],
      female: [
        { name: "Devi", meaning: "여신", origin: "De 파다에서 유래" },
        { name: "Charu", meaning: "아름다운, 사랑스러운", origin: "Cha 파다에서 유래" },
        { name: "Chithra", meaning: "그림, 예술", origin: "Chi 파다에서 유래" },
        { name: "Chandni", meaning: "달빛", origin: "Cha 파다에서 유래" },
        { name: "Deepika", meaning: "작은 빛, 등불", origin: "De 파다에서 유래" }
      ],
      neutral: [
        { name: "Chaitanya", meaning: "의식, 생명력", origin: "Cha 파다에서 유래" },
        { name: "Deva", meaning: "신성한 존재", origin: "De 파다에서 유래" }
      ]
    },
    english: {
      male: [
        { name: "Derek", meaning: "사람들의 통치자", origin: "'De' 음절과 공명" },
        { name: "Charles", meaning: "자유로운 사람", origin: "'Cha' 음절과 공명" },
        { name: "Christopher", meaning: "그리스도를 품은 자", origin: "'Chi' 음절과 공명" },
        { name: "Donald", meaning: "세계의 통치자", origin: "'Do' 음절과 공명" }
      ],
      female: [
        { name: "Delia", meaning: "델로스 섬 출신", origin: "'De' 음절과 공명" },
        { name: "Charlotte", meaning: "자유로운 여인", origin: "'Cha' 음절과 공명" },
        { name: "Christine", meaning: "그리스도를 따르는", origin: "'Chi' 음절과 공명" },
        { name: "Dolores", meaning: "슬픔, 고통", origin: "'Do' 음절과 공명" }
      ],
      neutral: [
        { name: "Charlie", meaning: "자유로운 사람", origin: "'Cha' 음절과 공명" }
      ]
    }
  }
};

/**
 * Helper: Get names for a specific Nakshatra index
 * @param {number} nakshatraIndex - 0 to 26
 * @returns {Object|null} Name data for the Nakshatra
 */
export function getNamesForNakshatra(nakshatraIndex) {
  return VEDIC_NAMES[nakshatraIndex] || null;
}

/**
 * Helper: Get names filtered by language and gender
 * @param {number} nakshatraIndex - 0 to 26
 * @param {string} language - 'indian' or 'english'
 * @param {string} gender - 'male', 'female', or 'neutral'
 * @returns {Array} Array of name objects
 */
export function getFilteredNames(nakshatraIndex, language, gender) {
  const data = VEDIC_NAMES[nakshatraIndex];
  if (!data || !data[language] || !data[language][gender]) {
    return [];
  }
  return data[language][gender];
}

/**
 * Helper: Get all names (all languages, all genders) for a Nakshatra
 * @param {number} nakshatraIndex - 0 to 26
 * @returns {Array} Flat array of all name objects with added language/gender fields
 */
export function getAllNamesForNakshatra(nakshatraIndex) {
  const data = VEDIC_NAMES[nakshatraIndex];
  if (!data) return [];

  const results = [];
  for (const language of Object.keys(data)) {
    for (const gender of Object.keys(data[language])) {
      for (const nameObj of data[language][gender]) {
        results.push({ ...nameObj, language, gender });
      }
    }
  }
  return results;
}
