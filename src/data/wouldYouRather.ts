import type { WouldYouRatherCategory } from './categories'
import { l, type Localized, type Question } from './types'

/** Shared lead-in shown above every dilemma (kept as data so an entry can override it later). */
const LEAD: Localized = l('Would you rather…', 'هل تفضّل…')

export const WOULD_YOU_RATHER_QUESTIONS: readonly Question<WouldYouRatherCategory>[] = [
  // Funny hypothetical situations
  { id: 'w07', category: 'funny-hypotheticals', prompt: LEAD, options: [l('Eat breakfast food at every meal', 'أن تتناول أطعمة الفطور في كل وجبة'), l('Never eat breakfast food again', 'ألا تتناول أطعمة الفطور أبدًا')] },
  { id: 'w11', category: 'funny-hypotheticals', prompt: LEAD, options: [l('Sing everything you say for a day', 'أن تغنّي كل ما تقوله ليوم كامل'), l('Dance everywhere you walk for a day', 'أن ترقص أينما مشيت ليوم كامل')] },
  { id: 'w12', category: 'funny-hypotheticals', prompt: LEAD, options: [l('Wear a clown costume to a job interview', 'أن ترتدي زي مهرّج في مقابلة عمل'), l('Wear pajamas to a wedding', 'أن ترتدي البيجاما في حفل زفاف')] },
  { id: 'w13', category: 'funny-hypotheticals', prompt: LEAD, options: [l('Have your phone read every notification out loud', 'أن يقرأ هاتفك كل إشعار بصوت عالٍ'), l('Have your phone work only when you stand on one leg', 'ألا يعمل هاتفك إلا وأنت واقف على ساق واحدة')] },
  { id: 'w14', category: 'funny-hypotheticals', prompt: LEAD, options: [l('Own a parrot that repeats all your secrets', 'أن يكون لديك ببغاء يكرر كل أسرارك'), l('Own a cat that judges everything you do', 'أن تكون لديك قطة تنتقد بنظراتها كل ما تفعله')] },
  { id: 'w15', category: 'funny-hypotheticals', prompt: LEAD, options: [l('Only be able to whisper', 'ألا تستطيع الكلام إلا همسًا'), l('Only be able to shout', 'ألا تستطيع الكلام إلا صراخًا')] },
  { id: 'w16', category: 'funny-hypotheticals', prompt: LEAD, options: [l('Drink a glass of pickle juice', 'أن تشرب كوبًا من عصير المخلل'), l('Eat a raw onion like an apple', 'أن تأكل بصلة نيئة كأنها تفاحة')] },

  // Difficult but lighthearted choices
  { id: 'w02', category: 'tough-but-light', prompt: LEAD, options: [l('Always arrive 10 minutes early', 'أن تصل دائمًا قبل الموعد بعشر دقائق'), l('Always arrive 20 minutes late', 'أن تصل دائمًا بعد الموعد بعشرين دقيقة')] },
  { id: 'w04', category: 'tough-but-light', prompt: LEAD, options: [l('Never cook again', 'ألا تطبخ أبدًا'), l('Never wash dishes again', 'ألا تغسل الصحون أبدًا')] },
  { id: 'w08', category: 'tough-but-light', prompt: LEAD, options: [l('Relive your best day once', 'أن تعيش أجمل أيام حياتك مرة أخرى'), l('See one day of your future', 'أن ترى يومًا واحدًا من مستقبلك')] },
  { id: 'w17', category: 'tough-but-light', prompt: LEAD, options: [l('Lose your phone for a week', 'أن تفقد هاتفك لمدة أسبوع'), l('Lose your wallet for a week', 'أن تفقد محفظتك لمدة أسبوع')] },
  { id: 'w18', category: 'tough-but-light', prompt: LEAD, options: [l('Always feel a little too cold', 'أن تشعر دائمًا بالبرد قليلًا'), l('Always feel a little too hot', 'أن تشعر دائمًا بالحر قليلًا')] },
  { id: 'w19', category: 'tough-but-light', prompt: LEAD, options: [l('Eat your favorite meal only once a week', 'أن تتناول وجبتك المفضلة مرة واحدة فقط في الأسبوع'), l('Eat a good meal every day, but never your favorite', 'أن تتناول كل يوم وجبة لذيذة لكن ليست المفضلة')] },
  { id: 'w20', category: 'tough-but-light', prompt: LEAD, options: [l('Know the ending of every movie before watching it', 'أن تعرف نهاية كل فيلم قبل مشاهدته'), l('Never be able to finish a series', 'ألا تستطيع إنهاء أي مسلسل أبدًا')] },

  // Travel & lifestyle scenarios
  { id: 'w03', category: 'travel-lifestyle', prompt: LEAD, options: [l('Have a personal chef', 'أن يكون لديك طاهٍ خاص'), l('Have a personal driver', 'أن يكون لديك سائق خاص')] },
  { id: 'w06', category: 'travel-lifestyle', prompt: LEAD, options: [l('Live in a treehouse in the forest', 'أن تعيش في بيت على شجرة وسط الغابة'), l('Live above a busy city street', 'أن تعيش في شقة فوق شارع مزدحم في قلب المدينة')] },
  { id: 'w21', category: 'travel-lifestyle', prompt: LEAD, options: [l('Travel the world for a year on a tiny budget', 'أن تسافر حول العالم سنة كاملة بميزانية صغيرة'), l('Stay a month in one luxurious place', 'أن تقيم شهرًا في مكان فاخر واحد')] },
  { id: 'w22', category: 'travel-lifestyle', prompt: LEAD, options: [l('Live somewhere that is always sunny', 'أن تعيش في مكان مشمس دائمًا'), l('Live somewhere with snow every winter', 'أن تعيش في مكان تتساقط فيه الثلوج كل شتاء')] },
  { id: 'w23', category: 'travel-lifestyle', prompt: LEAD, options: [l('Work from a beach', 'أن تعمل من شاطئ'), l('Work from a cabin in the mountains', 'أن تعمل من كوخ في الجبال')] },
  { id: 'w24', category: 'travel-lifestyle', prompt: LEAD, options: [l('Take a long road trip with your friends', 'أن تقوم برحلة طويلة بالسيارة مع أصدقائك'), l('Take a short luxury trip alone', 'أن تسافر وحدك في رحلة قصيرة فاخرة')] },
  { id: 'w25', category: 'travel-lifestyle', prompt: LEAD, options: [l('Always pack more than you need', 'أن تحمل في سفرك أكثر مما تحتاج دائمًا'), l('Always forget something important', 'أن تنسى دائمًا شيئًا مهمًا عند السفر')] },

  // Friendship & social dilemmas
  { id: 'w09', category: 'friends-social', prompt: LEAD, options: [l('Always say exactly what you think', 'أن تقول دائمًا ما تفكر فيه بالضبط'), l("Never say anything you'll regret", 'ألا تقول أبدًا شيئًا تندم عليه')] },
  { id: 'w26', category: 'friends-social', prompt: LEAD, options: [l('Be the funniest person in the group', 'أن تكون أطرف شخص في المجموعة'), l('Be the smartest person in the group', 'أن تكون أذكى شخص في المجموعة')] },
  { id: 'w27', category: 'friends-social', prompt: LEAD, options: [l('Have a friend who is always late but fun', 'أن يكون لك صديق يتأخر دائمًا لكنه ممتع'), l('Have a friend who is always on time but boring', 'أن يكون لك صديق ملتزم بالمواعيد لكنه ممل')] },
  { id: 'w28', category: 'friends-social', prompt: LEAD, options: [l('Be the one who plans every trip', 'أن تكون من يخطط لكل الرحلات'), l('Be the one who just shows up and enjoys', 'أن تكون من يأتي فقط ويستمتع')] },
  { id: 'w29', category: 'friends-social', prompt: LEAD, options: [l('Let your friends read your search history', 'أن يقرأ أصدقاؤك سجل بحثك'), l('Let your friends read your messages for a day', 'أن يقرأ أصدقاؤك رسائلك ليوم واحد')] },
  { id: 'w30', category: 'friends-social', prompt: LEAD, options: [l('Have only three very close friends', 'أن يكون لك ثلاثة أصدقاء مقرّبين فقط'), l('Have hundreds of friendly acquaintances', 'أن يكون لك مئات المعارف الودودين')] },
  { id: 'w31', category: 'friends-social', prompt: LEAD, options: [l('Split every bill exactly', 'أن تقسّم كل فاتورة بدقة'), l('Take turns paying without counting', 'أن تتناوبوا على الدفع دون حساب')] },

  // Imaginative & surprising scenarios
  { id: 'w01', category: 'imaginative', prompt: LEAD, options: [l('Be able to fly anywhere you want', 'أن تستطيع الطيران إلى أي مكان'), l('Be invisible whenever you want', 'أن تصبح غير مرئي متى شئت')] },
  { id: 'w05', category: 'imaginative', prompt: LEAD, options: [l('Speak every language fluently', 'أن تتحدث كل لغات العالم بطلاقة'), l('Play every instrument perfectly', 'أن تعزف كل الآلات الموسيقية ببراعة')] },
  { id: 'w10', category: 'imaginative', prompt: LEAD, options: [l('Have a pause button for time', 'أن يكون لديك زر لإيقاف الوقت'), l('Have a rewind button for 10 minutes', 'أن يكون لديك زر للعودة عشر دقائق إلى الوراء')] },
  { id: 'w32', category: 'imaginative', prompt: LEAD, options: [l('Talk to animals', 'أن تتحدث مع الحيوانات'), l('Control the weather', 'أن تتحكم في الطقس')] },
  { id: 'w33', category: 'imaginative', prompt: LEAD, options: [l('Spend a day inside your favorite movie', 'أن تعيش يومًا داخل فيلمك المفضل'), l('Spend a day inside your favorite book', 'أن تعيش يومًا داخل كتابك المفضل')] },
  { id: 'w34', category: 'imaginative', prompt: LEAD, options: [l('Have a robot that does all your chores', 'أن يكون لديك روبوت ينجز كل أعمال المنزل'), l('Have a robot that gives perfect advice', 'أن يكون لديك روبوت يقدّم لك نصائح مثالية')] },
  { id: 'w35', category: 'imaginative', prompt: LEAD, options: [l('Be a secret superhero nobody knows about', 'أن تكون بطلًا خارقًا سريًّا لا يعرفه أحد'), l('Be famous for no clear reason', 'أن تكون مشهورًا دون سبب واضح')] },
]
