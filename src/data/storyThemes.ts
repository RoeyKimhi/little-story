export const CUSTOM_THEME_ID = "custom-theme";

export interface StoryTheme {
  id: string;
  title: string;
  description: string;
  accent: string;
  ring: string;
}

export const CUSTOM_THEME: StoryTheme = {
  id: CUSTOM_THEME_ID,
  title: "נושא אישי",
  description: "כתבו נושא משלכם לסיפור",
  accent: "from-violet-300 via-fuchsia-300 to-cyan-300",
  ring: "ring-fuchsia-400",
};

export const STORY_THEMES: StoryTheme[] = [
  {
    id: "adventure-quest",
    title: "Adventure Quest",
    description: "Exciting journeys and discoveries",
    accent: "from-amber-200 via-orange-300 to-rose-300",
    ring: "ring-amber-400",
  },
  {
    id: "friendship-tale",
    title: "Friendship Tale",
    description: "Stories about friends and teamwork",
    accent: "from-sky-200 via-cyan-200 to-teal-200",
    ring: "ring-cyan-400",
  },
  {
    id: "magical-world",
    title: "Magical World",
    description: "Enchanted lands and spells",
    accent: "from-violet-300 via-purple-400 to-fuchsia-400",
    ring: "ring-fuchsia-400",
  },
  {
    id: "space-explorer",
    title: "Space Explorer",
    description: "Adventures among the stars",
    accent: "from-indigo-950 via-violet-950 to-slate-900",
    ring: "ring-indigo-400",
  },
  {
    id: "ocean-adventure",
    title: "Ocean Adventure",
    description: "Underwater quests and sea creatures",
    accent: "from-cyan-300 via-sky-400 to-blue-500",
    ring: "ring-cyan-400",
  },
  {
    id: "forest-journey",
    title: "Forest Journey",
    description: "Nature and woodland adventures",
    accent: "from-lime-200 via-emerald-300 to-green-500",
    ring: "ring-emerald-400",
  },
  {
    id: "castle-kingdom",
    title: "Castle Kingdom",
    description: "Medieval tales and brave knights",
    accent: "from-slate-300 via-stone-400 to-amber-200",
    ring: "ring-stone-400",
  },
  {
    id: "dinosaur-discovery",
    title: "Dinosaur Discovery",
    description: "Prehistoric adventures",
    accent: "from-lime-300 via-yellow-400 to-orange-400",
    ring: "ring-lime-500",
  },
  {
    id: "pirate-adventure",
    title: "Pirate Adventure",
    description: "High seas and treasure hunts",
    accent: "from-sky-700 via-cyan-800 to-teal-900",
    ring: "ring-teal-400",
  },
  {
    id: "princess-tale",
    title: "Princess Tale",
    description: "Royal adventures and magic",
    accent: "from-pink-200 via-rose-300 to-fuchsia-300",
    ring: "ring-pink-400",
  },
  {
    id: "superhero-story",
    title: "Superhero Story",
    description: "Heroes with special powers",
    accent: "from-red-500 via-blue-600 to-indigo-800",
    ring: "ring-red-400",
  },
  CUSTOM_THEME,
];

export const isCustomTheme = (themeId: string) => themeId === CUSTOM_THEME_ID;

export const resolveStoryTheme = (themeId: string, customTheme?: string) => {
  if (isCustomTheme(themeId)) {
    return customTheme?.trim() ?? "";
  }

  return themeId;
};
