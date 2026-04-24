import { type Level } from "@/lib/types";

export const CURRICULUM: Level[] = [
  {
    id: "level-1", number: 1,
    title: "Foundations of Government",
    description: "Understand why governments exist, how India's system is structured, and what the Constitution means for everyday life.",
    lessons: [
      { id:"l1-1", levelId:"level-1", number:1, title:"What is a Government?",        learningGoal:"Explain in their own words why humans form governments and what a government's main job is.", xpReward:50, badgeId:"first-lesson", slides:[] },
      { id:"l1-2", levelId:"level-1", number:2, title:"Why Do We Have Rules?",         learningGoal:"Describe at least two reasons why rules are necessary for a society to function fairly.", xpReward:50, slides:[] },
      { id:"l1-3", levelId:"level-1", number:3, title:"How India's Government Works",  learningGoal:"Name the three branches of India's government and explain what each one does.", xpReward:75, slides:[] },
      { id:"l1-4", levelId:"level-1", number:4, title:"The Constitution Explained",    learningGoal:"Explain what the Constitution is and why it is the most important document in India.", xpReward:75, badgeId:"level-1-complete", slides:[] },
    ],
  },
  {
    id: "level-2", number: 2,
    title: "You and Your Government",
    description: "Explore the rights every Indian citizen holds, the duties that come with them, and how elections actually work.",
    lessons: [
      { id:"l2-1", levelId:"level-2", number:1, title:"Your Fundamental Rights",       learningGoal:"List three fundamental rights guaranteed to every Indian citizen and give a real-life example of each.", xpReward:75, slides:[] },
      { id:"l2-2", levelId:"level-2", number:2, title:"Duties of a Citizen",           learningGoal:"Identify at least three fundamental duties and explain how they contribute to a healthier society.", xpReward:75, slides:[] },
      { id:"l2-3", levelId:"level-2", number:3, title:"How Elections Work",            learningGoal:"Describe the process of an Indian general election from voting day to the formation of a government.", xpReward:100, slides:[] },
      { id:"l2-4", levelId:"level-2", number:4, title:"Local Government & Panchayat",  learningGoal:"Explain what a Panchayat is and why local government matters to everyday village and city life.", xpReward:100, badgeId:"level-2-complete", slides:[] },
    ],
  },
  {
    id: "level-3", number: 3,
    title: "Being an Active Citizen",
    description: "Learn how media shapes public opinion, how to think critically about news, and how ordinary people create change.",
    lessons: [
      { id:"l3-1", levelId:"level-3", number:1, title:"Media and Democracy",           learningGoal:"Explain the role a free press plays in holding a government accountable.", xpReward:100, slides:[] },
      { id:"l3-2", levelId:"level-3", number:2, title:"How to Spot Fake News",         learningGoal:"Apply at least two strategies to identify whether a news story is credible before sharing it.", xpReward:100, slides:[] },
      { id:"l3-3", levelId:"level-3", number:3, title:"How Citizens Make Change",      learningGoal:"Describe three ways ordinary citizens can legally influence government decisions.", xpReward:125, slides:[] },
      { id:"l3-4", levelId:"level-3", number:4, title:"Your First Vote",               learningGoal:"Explain the voting process in India and articulate why participating matters.", xpReward:150, badgeId:"level-3-complete", slides:[] },
    ],
  },
];

export const TOTAL_LESSONS = CURRICULUM.reduce(
  (acc, lvl) => acc + lvl.lessons.length, 0
);

export const TOTAL_XP = CURRICULUM.reduce(
  (acc, lvl) => acc + lvl.lessons.reduce((a, l) => a + l.xpReward, 0), 0
);


