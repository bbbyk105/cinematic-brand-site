import Link from "next/link";

const footerNavigation = [
  { name: "Services", href: "/services" },
  { name: "Works", href: "/works" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-[#1a1a1a]">
      {/* Desktop Footer */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1920px] px-[80px] py-12">
          <div className="flex items-center justify-between">
            {/* Logo & Copyright */}
            <div className="space-y-2">
              <Link
                href="/"
                className="font-inter font-medium text-[14px] text-[#f2f2f2] hover:opacity-80 transition-opacity"
              >
                BK
              </Link>
              <p className="font-inter font-normal text-[11px] text-[#6a6a6a]">
                © 2026 Byakko Kondo. All rights reserved.
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-20">
              {footerNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-inter font-normal text-[12px] text-[#6a6a6a] hover:text-[#f2f2f2] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden">
        <div className="px-6 py-8 space-y-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-inter font-bold text-[16px] text-[#f2f2f2] hover:opacity-80 transition-opacity"
          >
            BK
          </Link>

          {/* Navigation Links - Vertical Stack */}
          <nav className="space-y-4">
            {footerNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block font-inter font-normal text-[15px] text-[#6a6a6a] hover:text-[#f2f2f2] transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-inter font-normal text-[12px] text-[#6a6a6a] pt-4 border-t border-[#2a2a2a]">
            © 2026 Byakko Kondo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}