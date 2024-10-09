import { useEffect, useRef } from 'react';

const Banner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const scroll = () => {
      if (banner.scrollLeft >= banner.scrollWidth / 2) {
        banner.scrollLeft = 0;
      } else {
        banner.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scroll, 20);

    return () => clearInterval(intervalId);
  }, []);

  const bannerText = "LIMITED TIME OFFER: 50% OFF SALE!";
  const repeatedText = `${bannerText} ${bannerText} ${bannerText} ${bannerText}`;

  return (
    <div className="w-full overflow-hidden bg-white text-blue-900 py-4 mt-12">
      <div
        ref={bannerRef}
        className="whitespace-nowrap text-xl font-bold animate-marquee"
      >
        <span className="inline-block">{repeatedText}</span>
      </div>
    </div>
  );
}

export default Banner;