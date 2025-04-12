export default function Footer() {
  return (
    <footer className="w-full h-[10rem] px-[10%] py-10  bg-[linear-gradient(271.64deg,_#F94F26_2.11%,_#932F16_98.68%)] flex items-end justify-center">
      <p className="font-mono text-base">
        Copyright {new Date().getFullYear()} Voltis Labs
      </p>
    </footer>
  );
}
