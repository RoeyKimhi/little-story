import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white shadow-lg shadow-violet-300/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex cursor-pointer items-center gap-3" onClick={() => navigate("/")}>
            <img src="/logo.svg" alt="LittleStory" className="h-8 w-8" />
            <span className="text-lg font-black tracking-wide">LittleStory</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate("/create")}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm hover:bg-white/90 focus-visible:ring-white/80"
              variant="default"
            >
              Create Story
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsMenuOpen(true)}
              className="h-10 w-10 rounded-lg px-0 text-white hover:bg-white/30"
            >
              <Menu className="size-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </header>

      <NavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default NavBar;
