import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative w-full h-[120vh] sm:h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-900/70" />

      {/* Video */}
      <video
        src="/video/video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="px-4 text-center"
          data-aos="fade-up"
          suppressHydrationWarning
        >
          <h1 className="text-[24px] sm:text-[30px] md:text-[38px] lg:text-[48px] tracking-[0.35rem] sm:tracking-[0.55rem] text-white font-bold uppercase">
            Upgrade Your Look & Your Gear.
          </h1>

          <p className="mt-3 text-base sm:text-lg text-white/90 font-normal">
            Curated outfits and devices that fit your lifestyle.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 transition"
            >
              Shop Fashion
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto rounded-xl border border-white/60 bg-transparent px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Shop Tech
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
