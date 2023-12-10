import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggler";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="bg-background sticky top-0 flex items-center justify-between border-b-2 px-12 py-2 text-center">
      <div className="flex items-center space-x-8">
        <Link
          href="/"
          className="mr-12 bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-xl font-bold tracking-wide text-transparent"
        >
          spark.
        </Link>
        <Link href="/about">about</Link>
        <Link href="/pricing">pricing</Link>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Button asChild variant="purple">
          <Link href="/login">login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
