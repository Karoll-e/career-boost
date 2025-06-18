import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import Logo from "../assets/logo.png";
import { SunIcon } from "lucide-react";

const Navbar = () => {
  return (
  
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-sm mx-auto rounded-xl">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 md:gap-6 cursor-pointer">
            <img src={Logo} alt="Logo" className="shrink-0" width={150} />
          </div>

          <div className="flex items-center gap-2">
            <Button size="icon" variant="outline">
              <SunIcon />
            </Button>
            <Button
              variant="outline"
              className="hidden sm:inline-flex"
            >
              Sign In
            </Button>
            <Button className="">Get Started</Button>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
