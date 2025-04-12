import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between h-[6rem] px-[10%] py-4 text-white">
      <Link href="/" aria-label="Logo">
        <Image src={"/logo.png"} alt="Logo" width={60} height={60} />
      </Link>

      <nav className="flex gap-8 capitalize w-full items-center justify-center">
        <Link href="/support">Support</Link>
        <Link href="/about">About</Link>
        <Link href="/voltis">Voltis</Link>
      </nav>
    </header>
  );
}
