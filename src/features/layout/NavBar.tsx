import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <header className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-violet-300/40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <span className="text-lg font-black tracking-wide">LittleStory</span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm hover:bg-white/90 focus-visible:ring-white/80"
            variant="default"
          >
            Create Story
          </Button>
          <Button
            variant="ghost"
            className="h-10 w-10 rounded-lg px-0 text-white hover:bg-white/30"
          >
            <span aria-hidden="true">≡</span>
            <span className="sr-only">Open menu</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
