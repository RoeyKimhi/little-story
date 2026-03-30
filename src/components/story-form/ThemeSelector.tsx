import type { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import {
  Zap,
  Handshake,
  Sparkles,
  Rocket,
  Waves,
  Trees,
  Landmark,
  Bug,
  Skull,
  Crown,
} from "lucide-react";

interface StoryFormData {
  childName: string;
  childAge: string;
  childGender: string;
  theme: string;
  image: FileList;
}

interface ThemeSelectorProps {
  register: UseFormRegister<StoryFormData>;
  watch: UseFormWatch<StoryFormData>;
  errors: FieldErrors<StoryFormData>;
}

const THEMES = [
  {
    id: "adventure-quest",
    icon: Zap,
    title: "Adventure Quest",
    description: "Exciting journeys and discoveries",
  },
  {
    id: "friendship-tale",
    icon: Handshake,
    title: "Friendship Tale",
    description: "Stories about friends and teamwork",
  },
  {
    id: "magical-world",
    icon: Sparkles,
    title: "Magical World",
    description: "Enchanted lands and spells",
  },
  {
    id: "space-explorer",
    icon: Rocket,
    title: "Space Explorer",
    description: "Adventures among the stars",
  },
  {
    id: "ocean-adventure",
    icon: Waves,
    title: "Ocean Adventure",
    description: "Underwater quests and sea creatures",
  },
  {
    id: "forest-journey",
    icon: Trees,
    title: "Forest Journey",
    description: "Nature and woodland adventures",
  },
  {
    id: "castle-kingdom",
    icon: Landmark,
    title: "Castle Kingdom",
    description: "Medieval tales and brave knights",
  },
  {
    id: "dinosaur-discovery",
    icon: Bug,
    title: "Dinosaur Discovery",
    description: "Prehistoric adventures",
  },
  {
    id: "pirate-adventure",
    icon: Skull,
    title: "Pirate Adventure",
    description: "High seas and treasure hunts",
  },
  {
    id: "princess-tale",
    icon: Crown,
    title: "Princess Tale",
    description: "Royal adventures and magic",
  },
  {
    id: "superhero-story",
    icon: Zap,
    title: "Superhero Story",
    description: "Heroes with special powers",
  },
];

const ThemeSelector = ({ register, watch, errors }: ThemeSelectorProps) => {
  const selectedTheme = watch("theme");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Choose Theme</h3>
        <p className="mt-2 text-muted-foreground">
          Pick a theme for your story
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {THEMES.map((themeOption) => (
          <label
            key={themeOption.id}
            className={`flex flex-col gap-3 rounded-lg border-2 p-4 cursor-pointer transition ${
              selectedTheme === themeOption.id
                ? "border-violet-600 bg-violet-50 shadow-lg"
                : "border-border hover:bg-muted/30"
            }`}
          >
            <input
              type="radio"
              value={themeOption.id}
              className="hidden"
              {...register("theme", { required: "Theme is required" })}
            />
            <themeOption.icon className="h-8 w-8 text-current" />
            <div>
              <p className="font-semibold">{themeOption.title}</p>
              <p className="text-xs text-muted-foreground">
                {themeOption.description}
              </p>
            </div>
          </label>
        ))}
      </div>
      {errors.theme && <p className="mt-2 text-xs text-red-500">Theme is required</p>}
    </div>
  );
};

export default ThemeSelector;
