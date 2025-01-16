import Link from "next/link";
import { NavButton } from "./nav-button";
import { Home, Ticket, Users } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Header = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/home");
  }

  if (!user) {
    redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/home");
  }

  console.log(user);
  console.log("isAuthenticated", await isAuthenticated());

  return (
    <header className="animate-slide bg-background h-12 p-2  border-b  sticky top-0 z-20">
      <section className=" w-full flex items-center justify-between h-8">
        <div className="flex items-start">
          <NavButton icon={Home} label="Home" href="/" />
          <Link
            href="/home"
            className="flex items-center justify-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-lg font-bold m-0  mt-1">
              FixItFast
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton icon={Ticket} label="Tickets" href="/tickets" />
          <NavButton icon={Users} label="Users" href="/customers" />
          <ModeToggle />
          <div>

            {!await isAuthenticated() ? (
              <Button asChild>
                <LoginLink>Login</LoginLink>
              </Button>
            ) : (
              <Button asChild variant={'default'}>
                <LogoutLink>Logout</LogoutLink>
              </Button>
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
