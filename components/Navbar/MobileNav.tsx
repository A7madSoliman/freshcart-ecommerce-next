import { navlinks } from "@/lib/constant";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  showNav: boolean;
  closeNav: () => void;
};

export default function MobileNav({ showNav, closeNav }: Props) {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-50 bg-black opacity-70 w-full`}
      ></div>

      {/* Navlinks */}
      <div
        className={`text-white ${navOpen} fixed justify-center flex flex-col h-full
       transfrom transition-all duration-500 delay-300 w-[80%] sm:w-[60%]
        bg-red-900 space-y-6 z-50`}
      >
        {navlinks.map((link) => {
          return (
            <Link onClick={closeNav} key={link.id} href={link.url}>
              <p className="text-white w-fit text-[20px] ml-12 border-b-[1.5px] pb-1 border-white sm:text-[30px]">
                {link.label}
              </p>
            </Link>
          );
        })}

        {/* Close Button */}

        <X
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-10 h-10 cursor-pointer hover:text-blue-950 "
        />
      </div>
    </div>
  );
}
