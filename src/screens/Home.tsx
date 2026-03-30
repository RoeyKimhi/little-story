import { Button } from "@/components/ui/button";
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

const Home = () => {
  return (
    <main className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo.svg" alt="LittleStory" className="h-12 w-12" />
          <h1 className="text-5xl font-black">LittleStory</h1>
        </div>
        <p className="max-w-2xl text-xl text-muted-foreground">
          Create a magical personalized story for your child
        </p>
      </section>

      {/* Feature Cards */}
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

      {/* CTA Button */}
      <section className="flex flex-col items-center gap-4 py-6">
        <Button
          size="lg"
          className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
        >
          Create Your Story Now ✨
        </Button>
        <p className="text-sm text-muted-foreground">
          Starting at $5 for 1 character and 5 pages
        </p>
      </section>
    </main>
  );
};

export default Home;
