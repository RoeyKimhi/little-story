import { Rocket, Sparkles, Star, Crown, Castle, Skull } from "lucide-react";

const CATEGORIES = [
  {
    icon: Rocket,
    label: "Adventure",
    bgColor: "bg-gradient-to-br from-violet-100 to-purple-100",
    iconColor: "text-violet-600",
  },
  {
    icon: Sparkles,
    label: "Unicorns",
    bgColor: "bg-gradient-to-br from-pink-100 to-red-100",
    iconColor: "text-pink-600",
  },
  {
    icon: Star,
    label: "Fairies",
    bgColor: "bg-gradient-to-br from-purple-100 to-blue-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Crown,
    label: "Princess",
    bgColor: "bg-gradient-to-br from-pink-100 to-rose-100",
    iconColor: "text-red-600",
  },
  {
    icon: Castle,
    label: "Castle",
    bgColor: "bg-gradient-to-br from-blue-100 to-cyan-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Skull,
    label: "Pirates",
    bgColor: "bg-gradient-to-br from-teal-100 to-cyan-100",
    iconColor: "text-teal-600",
  },
];

const PopularCategories = () => {
  return (
    <section className="space-y-8">
      <h2 className="text-center text-4xl font-bold">
        Popular Story Categories
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {CATEGORIES.map((category, index) => (
          <div
            key={index}
            className={`flex flex-col items-center gap-4 rounded-2xl border border-border ${category.bgColor} p-8 shadow-sm transition hover:shadow-md cursor-pointer`}
          >
            <category.icon className={`h-12 w-12 ${category.iconColor}`} />
            <p className="text-lg font-semibold">{category.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
