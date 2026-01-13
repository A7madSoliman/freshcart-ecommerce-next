"use client";

import { useState } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

export default function ResponsiveNav() {
  const [showNav, setShowNav] = useState(false);
  const handleNavShow = () => setShowNav(true);
  const handleCloseNav = () => setShowNav(false);

  return (
    <div>
      <Nav openNav={handleNavShow} />
      <MobileNav showNav={showNav} closeNav={handleCloseNav} />
    </div>
  );
}
