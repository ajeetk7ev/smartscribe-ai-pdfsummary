'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ModeToggle } from '../mode-toggle';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { Brain, Menu } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Your Summary', href: '/summary' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-100 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-700 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="text-xl font-semibold text-blue-600 dark:text-blue-400">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            <span className="leading-none">SmartScribe</span>
          </div>
        </Link>



        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side: Desktop Controls */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <ModeToggle />
          <MobileNavbar navItems={navItems} pathname={pathname} />
        </div>
      </div>
    </header>
  );
}

type MobileNavbarProps = {
  navItems: { label: string; href: string }[];
  pathname: string;
};

const MobileNavbar = ({ navItems, pathname }: MobileNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64 p-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-blue-600 dark:text-blue-400">
            SmartScribe
          </SheetTitle>

        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-base font-medium',
                  pathname === item.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400'
                )}
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}

          <div className="mt-6">

          </div>

          <div className="mt-4">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="w-full mt-2">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
