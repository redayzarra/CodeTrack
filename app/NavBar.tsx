"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Container } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="border-b mb-5 px-5 py-3 ">
      <Container>
        <div className="flex items-center justify-between space-x-6">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900 font-medium": link.href == currentPath,
                      "text-zinc-500": link.href != currentPath,
                      "hover:text-zinc-800 transition-all": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Box>
              {status == "authenticated" && (
                <Link href="/api/auth/signout">Log Out</Link>
              )}

              {status == "unauthenticated" && (
                <Link href="/api/auth/signin">Log In</Link>
              )}
            </Box>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
