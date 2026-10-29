import type { DirectCategory } from './categories'
import { l, type Question } from './types'

export const DIRECT_QUESTIONS: readonly Question<DirectCategory>[] = [
  // Funny & embarrassing moments
  { id: 'd11', category: 'funny-embarrassing', prompt: l("What's the most embarrassing thing that has happened to you in public?", 'ما أكثر موقف محرج حدث لك أمام الناس؟') },
  { id: 'd12', category: 'funny-embarrassing', prompt: l("Have you ever waved back at someone who wasn't waving at you? What happened?", 'هل لوّحت يومًا لشخص ظننت أنه يلوّح لك، ثم تبيّن أنه لا يقصدك؟ ماذا حدث؟') },
  { id: 'd13', category: 'funny-embarrassing', prompt: l("What's the funniest thing you've ever said by accident?", 'ما أطرف شيء قلته بالخطأ دون قصد؟') },
  { id: 'd14', category: 'funny-embarrassing', prompt: l("What's the worst excuse you've ever made up to get out of plans?", 'ما أسوأ عذر اخترعته لتلغي موعدًا مع أحدهم؟') },
  { id: 'd15', category: 'funny-embarrassing', prompt: l("What's the silliest thing you've ever cried over?", 'ما أسخف سبب جعلك تبكي يومًا؟') },
  { id: 'd16', category: 'funny-embarrassing', prompt: l('What song do you secretly love but would never admit to your friends?', 'ما الأغنية التي تحبها سرًّا ولا تعترف بها أمام أصدقائك؟') },

  // Friendship & memories
  { id: 'd02', category: 'friendship-memories', prompt: l("What's the best trip you've ever taken, and why?", 'ما أجمل رحلة قمت بها في حياتك، ولماذا؟') },
  { id: 'd04', category: 'friendship-memories', prompt: l('Which friend would you call at 3 a.m., and what is the story behind that?', 'أي صديق ستتصل به في الثالثة فجرًا؟ وما القصة وراء ذلك؟') },
  { id: 'd06', category: 'friendship-memories', prompt: l("What's the most memorable meal you've ever had?", 'ما أكثر وجبة لا تنساها في حياتك؟') },
  { id: 'd17', category: 'friendship-memories', prompt: l('Tell the group your favorite memory with the person sitting next to you.', 'احكِ للجميع عن ذكرى جميلة جمعتك بالشخص الجالس بجانبك.') },
  { id: 'd18', category: 'friendship-memories', prompt: l('What was the first thing you noticed about your closest friend when you met?', 'ما أول شيء لاحظته في أقرب أصدقائك عندما تعرّفت إليه؟') },
  { id: 'd19', category: 'friendship-memories', prompt: l("What's the best surprise anyone has ever planned for you?", 'ما أجمل مفاجأة حضّرها لك أحدهم؟') },

  // Personal opinions & habits
  { id: 'd01', category: 'opinions-habits', prompt: l("What's a small thing that instantly makes your day better?", 'ما الشيء الصغير الذي يحسّن يومك فورًا؟') },
  { id: 'd20', category: 'opinions-habits', prompt: l('What habit of yours do your friends always tease you about?', 'ما العادة التي يمازحك أصدقاؤك بسببها دائمًا؟') },
  { id: 'd21', category: 'opinions-habits', prompt: l("What's something everyone loves that you think is overrated?", 'ما الشيء الذي يحبه الجميع ويبدو لك مبالغًا في تقديره؟') },
  { id: 'd22', category: 'opinions-habits', prompt: l("What's your go-to comfort food after a terrible day?", 'ما الأكلة التي تلجأ إليها بعد يوم سيئ؟') },
  { id: 'd23', category: 'opinions-habits', prompt: l('Are you a planner or a last-minute person? Give an example.', 'هل تخطط لكل شيء مسبقًا أم تترك الأمور للحظة الأخيرة؟ أعطِ مثالًا.') },
  { id: 'd24', category: 'opinions-habits', prompt: l('What small rule do you follow that most people find weird?', 'ما القاعدة الصغيرة التي تلتزم بها ويراها معظم الناس غريبة؟') },

  // Dreams & ambitions
  { id: 'd05', category: 'dreams-ambitions', prompt: l('What skill do you secretly wish you had?', 'ما المهارة التي تتمنى سرًّا لو كانت لديك؟') },
  { id: 'd10', category: 'dreams-ambitions', prompt: l('What would you do with a free year and no money worries?', 'ماذا ستفعل لو حصلت على سنة كاملة فارغة دون أي هموم مالية؟') },
  { id: 'd25', category: 'dreams-ambitions', prompt: l('Where do you hope to be in five years, in the best version of your life?', 'أين تتمنى أن تكون بعد خمس سنوات في أجمل نسخة من حياتك؟') },
  { id: 'd26', category: 'dreams-ambitions', prompt: l("What's one thing you'd love to learn this year?", 'ما الشيء الذي تتمنى أن تتعلمه هذا العام؟') },
  { id: 'd27', category: 'dreams-ambitions', prompt: l('If you could start any business tomorrow, what would it be?', 'لو استطعت بدء أي مشروع غدًا، فما هو؟') },
  { id: 'd28', category: 'dreams-ambitions', prompt: l('What dream have you given up on, and would you ever try again?', 'ما الحلم الذي تخلّيت عنه، وهل تفكر في المحاولة من جديد؟') },

  // Thought-provoking conversations
  { id: 'd03', category: 'thought-provoking', prompt: l("What's something you've changed your mind about in the last few years?", 'ما الشيء الذي غيّرت رأيك فيه خلال السنوات الأخيرة؟') },
  { id: 'd07', category: 'thought-provoking', prompt: l('If you could relive one day of your life, which would it be?', 'لو استطعت أن تعيش يومًا واحدًا من حياتك مرة أخرى، فأي يوم تختار؟') },
  { id: 'd08', category: 'thought-provoking', prompt: l('What family tradition do you hope never disappears?', 'ما العادة العائلية التي تتمنى ألا تختفي أبدًا؟') },
  { id: 'd09', category: 'thought-provoking', prompt: l("What's the kindest thing a stranger has ever done for you?", 'ما ألطف شيء فعله لك شخص غريب؟') },
  { id: 'd29', category: 'thought-provoking', prompt: l('What do you wish people understood about you?', 'ما الشيء الذي تتمنى أن يفهمه الناس عنك؟') },
  { id: 'd30', category: 'thought-provoking', prompt: l('What is the biggest difference between you now and you five years ago?', 'ما أكبر فرق بينك الآن وبين نفسك قبل خمس سنوات؟') },

  // Lighthearted hypotheticals
  { id: 'd31', category: 'hypotheticals', prompt: l('If animals could talk, which one would be the rudest?', 'لو كانت الحيوانات تتكلم، فأي حيوان سيكون الأكثر وقاحة؟') },
  { id: 'd32', category: 'hypotheticals', prompt: l('If you could swap lives for a day with someone in this room, who would it be?', 'لو بدّلت حياتك ليوم واحد مع أحد الحاضرين هنا، فمن ستختار؟') },
  { id: 'd33', category: 'hypotheticals', prompt: l('If you were stuck in an elevator for an hour with a celebrity, who would you want it to be?', 'لو علقت في مصعد لمدة ساعة مع شخصية مشهورة، فمن تتمنى أن تكون؟') },
  { id: 'd34', category: 'hypotheticals', prompt: l('If you could only eat one dish for the rest of your life, what would it be?', 'لو اضطررت إلى أكل طبق واحد فقط بقية حياتك، فما هو؟') },
  { id: 'd35', category: 'hypotheticals', prompt: l('If you could add one new rule to the world, what would it be?', 'لو استطعت إضافة قانون واحد جديد للعالم، فما هو؟') },
  { id: 'd36', category: 'hypotheticals', prompt: l('If you won a big prize tomorrow, what is the first silly thing you would buy?', 'لو ربحت جائزة كبيرة غدًا، فما أول شيء مضحك ستشتريه؟') },
]
