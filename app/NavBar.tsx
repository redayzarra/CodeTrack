"use client";

import { Avatar, Box, Container, DropdownMenu, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { BiLogInCircle } from "react-icons/bi";
import { Spinner } from "./components";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5">
      <Container>
        <div className="flex items-center justify-between space-x-6 h-14">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </div>

          <AuthStatus />
        </div>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900 font-medium": link.href == currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status == "unauthenticated") {
    return (
      <Link
        className="nav-link flex items-center space-x-1.5"
        href="/api/auth/signin"
      >
        <BiLogInCircle /> <Text>Login</Text>
      </Link>
    );
  } else if (status == "loading") {
    return (
      <div className="p-3 text-zinc-400">
        <Spinner />
      </div>
    );
  } else {
    return (
      <Box>
        {status == "authenticated" && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size="3"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size="2">{session!.user!.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item>
                <Link href="/api/auth/signout">Log Out</Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </Box>
    );
  }
};

export default NavBar;
