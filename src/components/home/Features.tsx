import { Sparkles, Heart, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Unique Story",
    description:
      "Each story is written especially for your child with their name and personal details",
  },
  {
    icon: Heart,
    title: "Familiar Characters",
    description: "Add family members, friends, or pets to the story",
  },
  {
    icon: Star,
    title: "Exciting Themes",
    description: "Choose from adventures, fairies, unicorns, space and more",
  },
];

const Features = () => {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {FEATURES.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-purple-100">
            <feature.icon className="h-8 w-8 text-violet-600" />
          </div>
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="text-center text-sm text-muted-foreground">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Features;
