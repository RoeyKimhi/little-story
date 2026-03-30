import { Button } from "@/components/ui/button";

interface CallToActionProps {
  onClick?: () => void;
}

const CallToAction = ({ onClick }: CallToActionProps) => {
  return (
    <section className="flex flex-col items-center gap-4 py-6">
      <Button
        size="lg"
        className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
        onClick={onClick}
      >
        Create Your Story Now ✨
      </Button>
      <p className="text-sm text-muted-foreground">
        Starting at $5 for 1 character and 5 pages
      </p>
    </section>
  );
};

export default CallToAction;
