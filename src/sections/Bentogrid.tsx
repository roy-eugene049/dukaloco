import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const BentoGrid = () => {
  // State to manage countdown
  const [timeLeft, setTimeLeft] = useState({
    days: 73,
    hours: 3,
    minutes: 36,
    seconds: 11,
  });

  // Function to calculate the time remaining until a specific end date/time
  const calculateTimeLeft = () => {
    const endTime = new Date('2024-12-31T23:59:59').getTime(); // Update with your target end date/time
    const now = new Date().getTime();
    const difference = endTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative mt-12 bg-[#e6f7d9] border rounded-3xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left column - Product image */}
        <div className="bg-[#b5bec9] rounded-3xl relative overflow-hidden">
          <span className="absolute top-4 left-4 bg-[#e6f7d9] text-black text-xs font-semibold px-2 py-1 rounded-full">
            New
          </span>
          <img
            src="/placeholder.svg"
            alt="Blue Bluetooth speaker"
            className="w-full h-full object-contain p-8"
          />
        </div>

        {/* Middle column - Product details */}
        <div className="bg-[#e6f7d9] rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-1">Deal of the day</h2>
            <p className="text-sm mb-2">Hurry! Ends in</p>
            <div className="flex gap-2 mb-4">
              {[
                { value: timeLeft.days, unit: "Days" },
                { value: timeLeft.hours, unit: "Hrs" },
                { value: timeLeft.minutes, unit: "Mins" },
                { value: timeLeft.seconds, unit: "Secs" },
              ].map(({ value, unit }) => (
                <div key={unit} className="bg-[#c5e0a5] rounded-lg p-2 text-center flex-1">
                  <div className="font-bold text-lg">{value}</div>
                  <div className="text-xs">{unit}</div>
                </div>
              ))}
            </div>
            <h3 className="text-3xl font-bold mb-2">
              Sale <br />
              60% off
            </h3>
            <p className="font-semibold mb-1">Radiant</p>
            <p className="text-sm mb-2">
              Radiant's Bluetooth speaker provides 3 watts of power and up to 12 hours of playback wit...
            </p>
            <p className="text-3xl font-bold mb-4">$24.00</p>
          </div>
          <button className="w-full bg-white hover:bg-gray-100 flex items-center justify-center gap-2 border border-gray-300 px-4 py-2 rounded">
            View product
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right column - Limited deals and Find your fit */}
        <div className="flex flex-col gap-4">
          {/* Limited time deals card */}
          <div className="rounded-3xl overflow-hidden flex-1 relative bg-[#b5c9b1]">
            <div className="absolute inset-0 bg-lime-500 opacity-20"></div>
            <div className="relative h-full flex flex-col justify-between p-6">
              <h2 className="text-3xl font-bold text-[#1a3d45]">Limited time deals</h2>
              <img
                src="/placeholder.svg"
                alt="Smartwatch"
                className="w-[150px] h-[150px] self-end object-contain"
              />
            </div>
          </div>

          {/* Find your fit card */}
          <div className="rounded-3xl overflow-hidden flex-1 relative bg-[#d4e3c5]">
            <div className="absolute inset-0 bg-lime-500 opacity-20"></div>
            <div className="relative h-full flex flex-col justify-between p-6">
              <h2 className="text-3xl font-bold text-[#1a3d45]">Find your fit</h2>
              <img
                src="/placeholder.svg"
                alt="Hands holding earbuds"
                className="w-[200px] h-[100px] self-end object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BentoGrid;