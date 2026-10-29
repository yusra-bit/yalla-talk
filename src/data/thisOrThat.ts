import type { ThisOrThatCategory } from './categories'
import { l, type Question } from './types'

export const THIS_OR_THAT_QUESTIONS: readonly Question<ThisOrThatCategory>[] = [
  // Food & drinks
  { id: 't04', category: 'food-drinks', prompt: l('Morning ritual', 'طقس الصباح'), options: [l('Coffee', 'قهوة'), l('Tea', 'شاي')] },
  { id: 't06', category: 'food-drinks', prompt: l('Snack craving', 'ماذا تشتهي؟'), options: [l('Sweet', 'حلو'), l('Salty', 'مالح')] },
  { id: 't11', category: 'food-drinks', prompt: l('The pizza debate', 'جدل البيتزا'), options: [l('Pineapple on pizza', 'أناناس على البيتزا'), l('No fruit on pizza', 'بيتزا بلا فاكهة')] },
  { id: 't12', category: 'food-drinks', prompt: l('Best meal of the day', 'أفضل وجبة في اليوم'), options: [l('Breakfast', 'الفطور'), l('Dinner', 'العشاء')] },
  { id: 't13', category: 'food-drinks', prompt: l('Tonight', 'هذه الليلة'), options: [l('Cook at home', 'أطبخ في البيت'), l('Order delivery', 'أطلب توصيلًا')] },
  { id: 't14', category: 'food-drinks', prompt: l('Dessert pick', 'اختيار الحلو'), options: [l('Chocolate', 'شوكولاتة'), l('Ice cream', 'آيس كريم')] },

  // Travel & lifestyle
  { id: 't01', category: 'travel-lifestyle', prompt: l('Weekend plans', 'خطط نهاية الأسبوع'), options: [l('Cozy night in', 'أمسية هادئة في البيت'), l('Big night out', 'سهرة كبيرة خارج البيت')] },
  { id: 't03', category: 'travel-lifestyle', prompt: l('Dream getaway', 'إجازة الأحلام'), options: [l('Beach', 'الشاطئ'), l('Mountains', 'الجبال')] },
  { id: 't09', category: 'travel-lifestyle', prompt: l('Favorite season', 'الفصل المفضل'), options: [l('Summer', 'الصيف'), l('Winter', 'الشتاء')] },
  { id: 't15', category: 'travel-lifestyle', prompt: l('Where to live', 'أين تفضّل العيش؟'), options: [l('Big city', 'مدينة كبيرة'), l('Quiet countryside', 'ريف هادئ')] },
  { id: 't16', category: 'travel-lifestyle', prompt: l('Type of trip', 'نوع الرحلة'), options: [l('Road trip', 'رحلة بالسيارة'), l('Flight to a faraway country', 'سفر بالطائرة إلى بلد بعيد')] },
  { id: 't17', category: 'travel-lifestyle', prompt: l('Holiday pace', 'إيقاع الإجازة'), options: [l('Relax all day', 'استرخاء طوال اليوم'), l('Explore non-stop', 'استكشاف بلا توقف')] },

  // Personality & habits
  { id: 't02', category: 'personality-habits', prompt: l('Your body clock', 'ساعتك البيولوجية'), options: [l('Early bird', 'أستيقظ مبكرًا'), l('Night owl', 'أسهر حتى وقت متأخر')] },
  { id: 't07', category: 'personality-habits', prompt: l('Travel style', 'أسلوب السفر'), options: [l('Plan everything', 'أخطط لكل شيء'), l('Go with the flow', 'أترك الأمور تسير كما تأتي')] },
  { id: 't10', category: 'personality-habits', prompt: l('Money mindset', 'نظرتك إلى المال'), options: [l('Save it', 'أدّخر'), l('Enjoy it', 'أستمتع بإنفاقه')] },
  { id: 't18', category: 'personality-habits', prompt: l('Your space', 'مساحتك الخاصة'), options: [l('Neat and organized', 'مرتّبة ومنظّمة'), l('Creative chaos', 'فوضى إبداعية')] },
  { id: 't19', category: 'personality-habits', prompt: l('In conversations', 'في الجلسات'), options: [l('I talk more', 'أتحدث أكثر'), l('I listen more', 'أستمع أكثر')] },
  { id: 't20', category: 'personality-habits', prompt: l('Big decisions', 'القرارات الكبيرة'), options: [l('Follow my heart', 'أتبع قلبي'), l('Follow my head', 'أتبع عقلي')] },

  // Entertainment
  { id: 't08', category: 'entertainment', prompt: l('Friends hangout', 'لقاء الأصدقاء'), options: [l('Movie night', 'سهرة أفلام'), l('Game night', 'سهرة ألعاب')] },
  { id: 't21', category: 'entertainment', prompt: l('Watching style', 'طريقة المشاهدة'), options: [l('Binge the whole season', 'الموسم كله دفعة واحدة'), l('One episode a day', 'حلقة واحدة يوميًا')] },
  { id: 't22', category: 'entertainment', prompt: l('Story time', 'وقت الحكايات'), options: [l('Read the book', 'قراءة الكتاب'), l('Watch the movie', 'مشاهدة الفيلم')] },
  { id: 't23', category: 'entertainment', prompt: l('Music mood', 'مزاج الموسيقى'), options: [l('Sing-along hits', 'أغانٍ نغنّيها معًا'), l('Chill instrumentals', 'موسيقى هادئة بلا كلمات')] },
  { id: 't24', category: 'entertainment', prompt: l('Movie night pick', 'اختيار فيلم الليلة'), options: [l('Comedy', 'كوميديا'), l('Thriller', 'تشويق')] },
  { id: 't25', category: 'entertainment', prompt: l('Cinema seat', 'مقعد السينما'), options: [l('Front rows', 'الصفوف الأمامية'), l('Back rows', 'الصفوف الخلفية')] },

  // Friendship & social situations
  { id: 't05', category: 'friends-social', prompt: l('Staying in touch', 'للبقاء على تواصل'), options: [l('Texting', 'الرسائل'), l('Calling', 'المكالمات')] },
  { id: 't26', category: 'friends-social', prompt: l('Group photos', 'صور الجماعة'), options: [l('Take lots of photos', 'ألتقط الكثير من الصور'), l('Just enjoy the moment', 'أستمتع باللحظة فقط')] },
  { id: 't27', category: 'friends-social', prompt: l('Hosting', 'الاستضافة'), options: [l('Host at my place', 'أستضيف في بيتي'), l("Go to someone else's", 'أزور بيت غيري')] },
  { id: 't28', category: 'friends-social', prompt: l('Size of the gathering', 'حجم الجلسة'), options: [l('Big party', 'حفلة كبيرة'), l('Small get-together', 'جلسة صغيرة')] },
  { id: 't29', category: 'friends-social', prompt: l('Gifts', 'الهدايا'), options: [l('Giving them', 'أحب تقديمها'), l('Receiving them', 'أحب تلقّيها')] },
  { id: 't30', category: 'friends-social', prompt: l('Type of friend', 'نوع الصديق'), options: [l('Brutally honest', 'صريح جدًا'), l('Always encouraging', 'مشجّع دائمًا')] },

  // Funny everyday dilemmas
  { id: 't31', category: 'everyday-dilemmas', prompt: l('Morning alarm', 'منبّه الصباح'), options: [l('Snooze five times', 'أؤجّله خمس مرات'), l('Jump out of bed', 'أقفز من السرير فورًا')] },
  { id: 't32', category: 'everyday-dilemmas', prompt: l('Shower time', 'وقت الاستحمام'), options: [l('Morning shower', 'استحمام الصباح'), l('Night shower', 'استحمام المساء')] },
  { id: 't33', category: 'everyday-dilemmas', prompt: l('Phone battery', 'بطارية الهاتف'), options: [l('Always above 50%', 'أبقيها فوق ٥٠٪'), l('Run it down to 1%', 'أتركها حتى ١٪')] },
  { id: 't34', category: 'everyday-dilemmas', prompt: l('Next-day food', 'أكل اليوم التالي'), options: [l('Cold leftovers', 'بقايا باردة'), l('Reheated leftovers', 'بقايا مسخّنة')] },
  { id: 't35', category: 'everyday-dilemmas', prompt: l('Replying to messages', 'الرد على الرسائل'), options: [l('Reply instantly', 'أرد فورًا'), l('Reply three days later', 'أرد بعد ثلاثة أيام')] },
  { id: 't36', category: 'everyday-dilemmas', prompt: l('Going up', 'الصعود إلى الأعلى'), options: [l('Elevator', 'المصعد'), l('Stairs', 'السلالم')] },
]
