import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-black text-white border-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href={"/"}>Img</Link>
          </div>

          {/* Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href={"/"}
                className="text-xl font-bold hover:text-green-400 transition-colors"
              >
                Home
              </Link>
              <Link
                href={"/about"}
                className="text-xl font-bold hover:text-green-400 transition-colors"
              >
                About
              </Link>
              <Link
                href={"/contact"}
                className="text-xl font-bold hover:text-green-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button>
              <Image
                width="48"
                height="48"
                src="https://img.icons8.com/liquid-glass/48/menu.png"
                alt="menu"
              />
            </button>
          </div>

          <div className="md:hidden">
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href={"/"}
                className="text-xl font-bold hover:text-green-400 transition-colors border-b-2"
              >
                Home
              </Link>
              <Link
                href={"/about"}
                className="text-xl font-bold hover:text-green-400 transition-colors border-b-2"
              >
                About
              </Link>
              <Link
                href={"/contact"}
                className="text-xl font-bold hover:text-green-400 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
