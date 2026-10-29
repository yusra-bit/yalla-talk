export type Language = 'en' | 'ar'
export type GameModeId = 'direct' | 'thisOrThat' | 'wouldYouRather'

export interface Translation {
  languageName: string
  switchTo: string
  headline: string
  subtitle: string
  modesHeading: string
  modes: Record<GameModeId, { title: string; description: string; hint: string; tagline: string; steps: [string, string, string] }>
  ui: {
    back: string
    startPlaying: string
    howItWorks: string
    homeLink: string
    chooseAnother: string
    numerals: [string, string, string]
    preview: { a: string; b: string; or: string; q: string }
    game: {
      reveal: string
      next: string
      skip: string
      backToGames: string
      progress: string
      hiddenTitle: string
      hiddenHint: string
      selected: string
      doneTitle: string
      doneBody: string
      shuffleAgain: string
      nicePick: string
      boldPick: string
      changedMind: string
      restart: string
      restartAsk: string
      restartSafe: string
      restartYes: string
      restartCancel: string
      doneFavorites: string
      doneTip: string
    }
    favorites: {
      link: string
      title: string
      subtitle: string
      countLabel: string
      save: string
      remove: string
      savedMsg: string
      removedMsg: string
      undoHint: string
      emptyTitle: string
      emptyBody: string
      emptyCta: string
      viewAll: string
    }
    skipToContent: string
  }
  footer: string
}

export const translations: Record<Language, Translation> = {
  en: {
    languageName: 'English',
    switchTo: 'العربية',
    headline: "Let's get talking.",
    subtitle:
      'Pick a style, pass the phone around, and reveal one question at a time. Great for dinners, road trips and late nights.',
    modesHeading: 'Choose your game',
    modes: {
      direct: {
        title: 'Direct Questions',
        description: 'Honest, open questions that start real conversations.',
        hint: 'Say it straight',
        tagline: 'One question. Everyone answers.',
        steps: ['Reveal one question at a time.', 'Everyone answers in turn.', 'Ask "why?" and keep it going.'],
      },
      thisOrThat: {
        title: 'This or That',
        description: 'Two options, no overthinking. Pick one and defend it.',
        hint: 'Quick picks',
        tagline: 'Two choices. One gut call.',
        steps: ['Two options appear together.', 'Everyone picks one, fast.', 'Compare picks and defend yours.'],
      },
      wouldYouRather: {
        title: 'Would You Rather?',
        description: 'Tricky choices that get the whole table arguing.',
        hint: 'Pick your poison',
        tagline: 'Two wild scenarios. Pick your fate.',
        steps: ['Two scenarios show up.', "Choose the one you'd take.", 'Explain yourself. The table decides.'],
      },
    },
    ui: {
      back: 'Back',
      startPlaying: 'Start Playing',
      howItWorks: 'How it works',
      homeLink: 'Yalla Talk — go to home screen',
      chooseAnother: 'Pick another game',
      numerals: ['1', '2', '3'],
      preview: { a: 'A', b: 'B', or: 'or', q: '?' },
      game: {
        reveal: 'Reveal Question',
        next: 'Next Question',
        skip: 'Skip',
        backToGames: 'Back to Games',
        progress: '{n} / {total}',
        hiddenTitle: 'Ready?',
        hiddenHint: 'Reveal the question when everyone is listening.',
        selected: 'Selected',
        doneTitle: "That's the whole deck!",
        doneBody: "You've been through all {total} questions. Shuffle for another round, or try a different game.",
        shuffleAgain: 'Shuffle again',
        nicePick: 'Nice pick! Now defend it.',
        boldPick: 'Bold choice! Explain yourself.',
        changedMind: 'Changed your mind? Fair enough.',
        restart: 'Restart',
        restartAsk: 'Restart this game?',
        restartSafe: 'Your favorites stay saved.',
        restartYes: 'Yes, restart',
        restartCancel: 'Cancel',
        doneFavorites: 'Favorites saved from this game: {n}',
        doneTip: 'Tip: tap the heart on a question to save it for next time.',
      },
      favorites: {
        link: 'Favorites',
        title: 'Favorites',
        subtitle: "Questions you've saved for your next get-together.",
        countLabel: 'Saved: {n}',
        save: 'Save to favorites',
        remove: 'Remove from favorites',
        savedMsg: 'Saved to favorites',
        removedMsg: 'Removed from favorites',
        undoHint: 'Removed. Tap the heart to save it again.',
        emptyTitle: 'No favorites yet',
        emptyBody: 'Tap the heart on any question to keep it here for next time.',
        emptyCta: 'Choose a game',
        viewAll: 'View favorites',
      },
      skipToContent: 'Skip to content',
    },
    footer: 'Made for good company.',
  },
  ar: {
    languageName: 'العربية',
    switchTo: 'English',
    headline: 'يلا نحكي!',
    subtitle:
      'اختار نوع اللعبة، مرّر الجوال بين الشلّة، واكشف سؤال واحد كل مرة. مناسبة للعشاء والسفر والسهرات.',
    modesHeading: 'اختار لعبتك',
    modes: {
      direct: {
        title: 'أسئلة مباشرة',
        description: 'أسئلة صريحة تفتح أحاديث حقيقية بين الأصحاب.',
        hint: 'قول اللي في قلبك',
        tagline: 'سؤال واحد، والكل يجاوب.',
        steps: ['اكشف سؤال واحد كل مرة.', 'كل واحد يجاوب بدوره.', 'اسألوا بعض «ليش؟» وكمّلوا الحوار.'],
      },
      thisOrThat: {
        title: 'هذا ولا ذاك',
        description: 'خيارين بس، بدون تفكير كثير. اختار واحد ودافع عنه.',
        hint: 'اختيارات سريعة',
        tagline: 'خيارين، وقرار سريع.',
        steps: ['يطلع لكم خيارين مع بعض.', 'كل واحد يختار بسرعة.', 'قارنوا اختياراتكم ودافعوا عن اختيارك.'],
      },
      wouldYouRather: {
        title: 'تفضّل إيش؟',
        description: 'خيارات صعبة تخلّي الكل يتناقش ويتحمّس.',
        hint: 'اختار أهون الشرّين',
        tagline: 'موقفين غريبين، واختار مصيرك.',
        steps: ['يطلع لكم موقفين.', 'اختار اللي كنت بتاخذه.', 'برّر اختيارك والشلّة تحكم.'],
      },
    },
    ui: {
      back: 'رجوع',
      startPlaying: 'ابدأ اللعب',
      howItWorks: 'كيف تلعبون؟',
      homeLink: 'يلا نحكي — الصفحة الرئيسية',
      chooseAnother: 'اختار لعبة ثانية',
      numerals: ['١', '٢', '٣'],
      preview: { a: 'أ', b: 'ب', or: 'ولا', q: '؟' },
      game: {
        reveal: 'اكشف السؤال',
        next: 'السؤال التالي',
        skip: 'تخطّي',
        backToGames: 'رجوع للألعاب',
        progress: '{n} / {total}',
        hiddenTitle: 'جاهزين؟',
        hiddenHint: 'اكشفوا السؤال لما الكل يكون منتبه.',
        selected: 'مختار',
        doneTitle: 'خلّصتوا كل الأسئلة!',
        doneBody: 'مرقتوا على {total} سؤال. بدكم جولة ثانية بترتيب جديد، أو تجرّبوا لعبة ثانية؟',
        shuffleAgain: 'اخلطوا من جديد',
        nicePick: 'اختيار موفق! والآن دافع عنه.',
        boldPick: 'اختيار جريء! اشرح لنا السبب.',
        changedMind: 'غيّرت رأيك؟ لا بأس.',
        restart: 'إعادة البدء',
        restartAsk: 'هل تريد إعادة اللعبة من البداية؟',
        restartSafe: 'مفضلتك ستبقى محفوظة.',
        restartYes: 'نعم، أعد البدء',
        restartCancel: 'إلغاء',
        doneFavorites: 'الأسئلة المحفوظة في المفضلة من هذه اللعبة: {n}',
        doneTip: 'نصيحة: اضغط على القلب في أي سؤال لتحفظه للمرة القادمة.',
      },
      favorites: {
        link: 'المفضلة',
        title: 'المفضلة',
        subtitle: 'أسئلة حفظتها لجلستك القادمة.',
        countLabel: 'المحفوظ: {n}',
        save: 'أضف إلى المفضلة',
        remove: 'احذف من المفضلة',
        savedMsg: 'تمت الإضافة إلى المفضلة',
        removedMsg: 'تمت الإزالة من المفضلة',
        undoHint: 'تمت الإزالة. اضغط على القلب لحفظه من جديد.',
        emptyTitle: 'لا توجد أسئلة مفضلة بعد',
        emptyBody: 'اضغط على القلب في أي سؤال لتحتفظ به هنا للمرة القادمة.',
        emptyCta: 'اختر لعبة',
        viewAll: 'عرض المفضلة',
      },
      skipToContent: 'انتقل إلى المحتوى',
    },
    footer: 'صُنعت لأحلى اللمّات.',
  },
}

export const LANGUAGE_META: Record<Language, { dir: 'ltr' | 'rtl' }> = {
  en: { dir: 'ltr' },
  ar: { dir: 'rtl' },
}
