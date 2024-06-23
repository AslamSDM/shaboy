"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, BugAntIcon } from "@heroicons/react/24/outline";
import { useOutsideClick } from "~~/hooks/scaffold-stark";
import { CustomConnectButton } from "~~/components/scaffold-stark/CustomConnectButton";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Marketplace",
    href: "/marketplace",
  },
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Suggest Game",
    href: "/suggest-game",
  },
  {
    label: "Create game",
    href: "/create",
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks.map(({ label, href }) => {
        const isActive = pathname === href;
        return (
          <li key={href}>
            <Link
              href={href}
              passHref
              className={`${isActive ? " shadow-md" : ""
                } hover:shadow-md active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
            >
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
      <li>
        <div
          className={`bg-[#f19d29] hover:shadow-md active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
          onClick={()=> {
            const shaboyplus = document.getElementById('shabow-plus') as HTMLDialogElement | null;
            if(shaboyplus != null) shaboyplus.showModal();
          }}
        >
          <span>Shaboy Plus</span>
        </div>
      </li>
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <div className="sticky lg:static top-0 navbar min-h-0 flex-shrink-0 justify-between z-20 p-[20px] sm:px-2" style={{ backdropFilter: 'blur(10px)', borderBottom: '1px solid #ffffff14' }}>
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"
              }`}
            onClick={() => {
              setIsDrawerOpen((prevIsOpenState) => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              <HeaderMenuLinks />
            </ul>
          )}
        </div>
        <Link
          href="/"
          passHref
          className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
        >
          <div className="flex relative w-[110px] h-[50px] ml-[10px]">
            <Image
              alt="SE2 logo"
              className="cursor-pointer"
              fill
              src="/logo.png"
            />
          </div>
          {/* <div className="flex flex-col">
            <span className="font-bold leading-tight">Scaffold-Stark</span>
            <span className="text-xs">Starknet dev stack</span>
          </div> */}
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">
          <HeaderMenuLinks />
        </ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <CustomConnectButton />
        {/* <FaucetButton /> */}
      </div>
    </div>
  );
};
