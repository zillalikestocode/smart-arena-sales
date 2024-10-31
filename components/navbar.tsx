import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Add, Logout } from "iconsax-react";
import { logout } from "@/app/actions";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            {/* <Logo /> */}
            <p className="font-bold text-inherit">SMART ARENA</p>
          </NextLink>
        </NavbarBrand>
        {/* <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul> */}
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="end">
        <Link href="/bar-codes">QR Codes</Link>
        <ThemeSwitch />
        <Link href="/create">
          <Button
            endContent={<Add size={16} />}
            radius="full"
            className="text-sm font-medium"
            color="primary"
          >
            Create Branch
          </Button>
        </Link>
        <form action={logout}>
          <Button
            type="submit"
            endContent={<Logout size={16} />}
            radius="full"
            className="text-sm font-medium"
            color="danger"
          >
            Log out
          </Button>
        </form>
      </NavbarContent>
    </NextUINavbar>
  );
};
