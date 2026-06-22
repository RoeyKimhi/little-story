import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, LogIn, UserPlus, LogOut, User, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavMenu = ({ isOpen, onClose }: NavMenuProps) => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNavigate = (path: string) => {
    onClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute top-0 right-0 flex h-full w-72 flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 px-4 py-4 text-white">
          <span className="text-lg font-black">Menu</span>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="h-9 w-9 rounded-lg px-0 text-white hover:bg-white/30"
          >
            <X className="size-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Personal Area
          </p>

          {isAuthenticated && user ? (
            <>
              <div className="mb-2 flex items-center gap-3 rounded-lg bg-violet-50 px-3 py-3">
                <User className="size-5 text-violet-500" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate("/my-stories")}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground transition hover:bg-violet-50"
              >
                <Library className="size-5 text-violet-500" />
                My Stories
              </button>

              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                  navigate("/login");
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground transition hover:bg-violet-50"
              >
                <LogOut className="size-5 text-violet-500" />
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => handleNavigate("/login")}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground transition hover:bg-violet-50"
              >
                <LogIn className="size-5 text-violet-500" />
                Log In
              </button>

              <button
                type="button"
                onClick={() => handleNavigate("/register")}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground transition hover:bg-violet-50"
              >
                <UserPlus className="size-5 text-violet-500" />
                Sign Up
              </button>
            </>
          )}
        </nav>
      </aside>
    </div>
  );
};

export default NavMenu;
