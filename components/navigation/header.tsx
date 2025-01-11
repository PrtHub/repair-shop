import Link from "next/link";
import { NavButton } from "./nav-button";
import { Home, Ticket, Users } from "lucide-react";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <header className="animate-slide bg-background h-12 p-2  border-b  sticky top-0 z-20">
      <section className=" w-full flex items-center justify-between h-8">
        <div className="flex items-start gap-2">
          <NavButton icon={Home} label="Home" href="/" />
          <Link
            href="/home"
            className="flex items-center justify-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-lg font-bold m-0  mt-1">
              Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton icon={Ticket} label="Tickets" href="/tickets" />
          <NavButton icon={Users} label="Users" href="/customers" />
          <ModeToggle />
        </div>
      </section>
    </header>
  );
};

export default Header;
