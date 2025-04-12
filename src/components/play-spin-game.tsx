"use client";

import cn from "@/utils/cn";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import weapons from "@/lib/data/weapons.json";
import leaderboard from "@/lib/data/leaderboard.json";
import Button from "./ui/button";
import Slider, { type Settings } from "react-slick";
import { useSwipeable } from "react-swipeable";
import formatTime from "@/utils/formatTimer";

type PopoverType = "change-weapon" | "leaderboard" | "game-over" | "";

type PopoverState = {
  open: boolean;
  popOverFor: PopoverType;
};

export default function PlaySpinGame() {
  const [readyToSpin, setReadyToSpin] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState<string>("");
  const [spinTime, setSpinTime] = useState(0);
  const [rotationPerMinute, setRotationPerMinute] = useState(0);
  const [highestRPM, setHighestRPM] = useState(0);
  const [spinTimeLeft, setSpinTimeLeft] = useState(0);
  const [spinStarted, setSpinStarted] = useState(false);
  const [spinFinished, setSpinFinished] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const weaponData = weapons.weapons;
  const leaderboardData = leaderboard.leaderboard;

  // for leaderboard table
  const leadersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  // Total pages based on the number of leaderboard items
  const totalPages = Math.ceil(leaderboardData.length / leadersPerPage);

  // Spinner rotation states
  const [rotation, setRotation] = useState(0);
  const lastSwipeTime = useRef(Date.now());
  const continuousRotationRef = useRef<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const sliderRef = useRef<Slider | null>(null);
  const [rotate, setRotate] = useState(false);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    // Before the slide changes, start the rotation.
    beforeChange: () => setRotate(true),
    // After the slide has changed, reset the rotation flag.
    afterChange: (currentSlide) => {
      setRotate(false);

      // currentSlide is the index of the first slide in the current page.
      // for leaderboard
      const newPage = Math.floor(currentSlide / leadersPerPage) + 1;
      setCurrentPage(newPage);
    },
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState<PopoverState>({
    open: false,
    popOverFor: "",
  });

  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = (type: PopoverType) => {
    if (isPopoverOpen.open && isPopoverOpen.popOverFor === type) {
      setIsPopoverOpen({ open: false, popOverFor: "" });
    } else {
      setIsPopoverOpen((prev) => ({
        open: !prev.open,
        popOverFor: type,
      }));
    }
  };

  // Setup swipe handlers for the spinner
  const handlers = useSwipeable({
    onSwiping: () => {
      setIsSpinning(true);
    },

    onSwiped: (eventData) => {
      const currentTime = Date.now();
      // const timeDiff = (currentTime - lastSwipeTime.current) / 1000;
      lastSwipeTime.current = currentTime;

      // Calculate the angle based on swipe velocity and direction
      // Adjust the multiplier to control spin sensitivity
      const swipeVelocity = Math.sqrt(Math.pow(eventData.velocity, 6));

      // Scale the angle based on velocity with higher multiplier for full 360 rotation
      // 360 multiplier ensures we can get a full rotation with a good swipe
      const angle = swipeVelocity * 360 * (eventData.dir === "Left" ? -1 : 1);

      // Calculate RPM based on the angle and time
      const calculatedRpm = Math.abs(angle / 6); // Convert degrees/sec to RPM (divide by 6)
      setRotationPerMinute(Math.round(calculatedRpm));

      // Update the rotation
      setRotation((prev) => prev + angle);

      // Increment spin count during gameplay
      if (spinStarted && !spinFinished) {
        setSpinCount((prev) => prev + 1);
      }

      // Start continuous rotation with decay
      startContinuousRotation(angle);
    },
    // preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  // Function to handle continuous rotation with decay
  const startContinuousRotation = (initialAngle: number) => {
    // Clear any existing animation
    if (continuousRotationRef.current) {
      cancelAnimationFrame(continuousRotationRef.current);
    }

    let velocity = initialAngle * 3; // Increased initial velocity for better momentum
    let lastTime = performance.now();
    const decay = 0.97; // Slightly slower decay for longer spin

    const animate = (time: number) => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      // Apply decay to velocity
      velocity *= decay;

      // Update rotation based on current velocity
      if (Math.abs(velocity) > 0.1) {
        setRotation((prev) => prev + velocity * deltaTime);

        // Update RPM
        const currentRpm = Math.abs(velocity / 6);
        setRotationPerMinute(Math.round(currentRpm));

        continuousRotationRef.current = requestAnimationFrame(animate);
      } else {
        // Stop animation when velocity is very low
        setIsSpinning(false);
      }
    };

    // Start the animation
    continuousRotationRef.current = requestAnimationFrame(animate);
  };

  // set highest RPM
  useEffect(() => {
    setHighestRPM((prevHighest) =>
      rotationPerMinute > prevHighest ? rotationPerMinute : prevHighest,
    );
  }, [rotationPerMinute]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (continuousRotationRef.current) {
        cancelAnimationFrame(continuousRotationRef.current);
      }
    };
  }, []);

  // Timer for game countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (spinStarted && spinTimeLeft > 0) {
      timer = setInterval(() => {
        setSpinTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setSpinFinished(true);
            setIsPopoverOpen({
              open: true,
              popOverFor: "game-over",
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [spinStarted, spinTimeLeft]);

  return (
    <div className="flex flex-col w-full h-full justify-center gap-3 relative">
      <div className="w-full h-max flex flex-col items-center justify-center">
        {!readyToSpin ? (
          <button
            type="button"
            className="font-comix-loud text-base cursor-pointer border border-[#FF842A] p-4 rounded-2xl transition-all hover:scale-107 beat"
            onClick={() => setReadyToSpin(true)}
          >
            PLAY WEB LEADERBOARDS
          </button>
        ) : (
          <div>
            <div className="flex gap-3 items-center font-comix-loud text-base cursor-pointer">
              <div className="relative">
                <button
                  type="button"
                  aria-label="30 seconds"
                  className={cn(
                    "cursor-pointer border border-transparent hover:border-[#FF842A] p-2 rounded-2xl transition-all hover:scale-107",
                    spinTime === 30 ? "text-[#FF842A]" : "",
                  )}
                  onClick={() => {
                    setSpinTime(30);
                    setSpinTimeLeft(30);
                    setSpinCount(0);
                  }}
                >
                  30 SEC
                </button>
                {spinTime === 30 && (
                  <p className="font-comfortaa absolute text-gray-500 text-[0.7rem] w-full text-center">
                    SELECTED
                  </p>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="1 minutes"
                  className={cn(
                    "cursor-pointer border border-transparent hover:border-[#FF842A] p-2 rounded-2xl transition-all hover:scale-107",
                    spinTime === 60 ? "text-[#FF842A]" : "",
                  )}
                  onClick={() => {
                    setSpinTime(60);
                    setSpinTimeLeft(60);
                    setSpinCount(0);
                  }}
                >
                  1 MIN
                </button>
                {spinTime === 60 && (
                  <p className="font-comfortaa absolute text-gray-500 text-[0.7rem] w-full text-center">
                    SELECTED
                  </p>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="2 minutes"
                  className={cn(
                    "cursor-pointer border border-transparent hover:border-[#FF842A] p-2 rounded-2xl transition-all hover:scale-107",
                    spinTime === 120 ? "text-[#FF842A]" : "",
                  )}
                  onClick={() => {
                    setSpinTime(120);
                    setSpinTimeLeft(120);
                    setSpinCount(0);
                  }}
                >
                  2 MIN
                </button>
                {spinTime === 120 && (
                  <p className="font-comfortaa absolute text-gray-500 text-[0.7rem] w-full text-center">
                    SELECTED
                  </p>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  aria-label="5 minutes"
                  className={cn(
                    "cursor-pointer border border-transparent hover:border-[#FF842A] p-2 rounded-2xl transition-all hover:scale-107",
                    spinTime === 300 ? "text-[#FF842A]" : "",
                  )}
                  onClick={() => {
                    setSpinTime(300);
                    setSpinTimeLeft(300);
                    setSpinCount(0);
                  }}
                >
                  5 MIN
                </button>
                {spinTime === 300 && (
                  <p className="font-comfortaa absolute text-gray-500 text-[0.7rem] w-full text-center">
                    SELECTED
                  </p>
                )}
              </div>
            </div>
            {readyToSpin && spinTime === 0 && (
              <p className="text-gray-500 text-[0.7rem] mt-3 w-full text-center">
                SELECT TIME
              </p>
            )}
          </div>
        )}
      </div>

      {spinStarted && !spinFinished && (
        <div className="w-full flex flex-col gap-1 items-center justify-center">
          <p className="font-comix-loud text-white text-[1rem] text-center mt-2">
            {formatTime(spinTimeLeft)}
          </p>
          <p className="text-yellow text-[1rem] text-center">
            Spins: {spinCount}
          </p>
        </div>
      )}

      {readyToSpin && (
        <p className="text-gray-500 text-[0.8rem] w-full text-center my-3">
          {rotationPerMinute} RPM
        </p>
      )}

      <div className="w-full flex items-center justify-center">
        {(() => {
          const weaponToShow =
            weaponData.find((weapon) => weapon.name === selectedWeapon) ||
            weaponData[0];

          return (
            <div
              {...handlers}
              className="my-5 w-[20rem] h-[18rem] cursor-pointer"
            >
              <Image
                src={weaponToShow.image || "/placeholder.svg"}
                alt={weaponToShow.name}
                width={300}
                height={300}
                className="w-full h-full object-cover"
                style={{
                  transform: `rotate(${rotation}deg)`,
                  transition: isSpinning
                    ? "none"
                    : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  transformOrigin: "center",
                  willChange: "transform",
                }}
                draggable={false}
              />
            </div>
          );
        })()}
      </div>

      <p className="text-gray-500 text-[0.8rem] w-full text-center my-3">
        Swipe to spin
      </p>

      {/* play game */}
      {spinTime > 0 && !spinStarted && (
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="font-comix-loud w-max text-base cursor-pointer border border-[#FF842A] p-3 rounded-2xl transition-all hover:scale-107"
            onClick={() => {
              setSpinStarted(true);
              setSpinCount(spinCount + 1);
              setSpinTimeLeft(spinTimeLeft - 1);
            }}
          >
            PLAY!
          </button>
        </div>
      )}

      <div className="flex items-center gap-[2rem] mt-2 self-center w-full justify-center">
        <Button
          className="w-[15rem] font-extrabold text-2xl"
          aria-controls="change-spinner-popover"
          aria-expanded={isPopoverOpen}
          aria-haspopup="dialog"
          onClick={() => togglePopover("change-weapon")}
        >
          CHANGE SPINNER
        </Button>
        <Button
          className="w-[15rem] font-extrabold text-2xl"
          aria-controls="leaderboard-popover"
          aria-expanded={isPopoverOpen}
          aria-haspopup="dialog"
          onClick={() => togglePopover("leaderboard")}
        >
          LEADERBOARDS
        </Button>

        {/* popover to change weapon */}
        {isPopoverOpen.popOverFor === "change-weapon" && (
          <div
            ref={popoverRef}
            role="dialog"
            id="change-spinner-popover"
            aria-modal="true"
            className="w-[60%] h-[34rem] flex flex-col items-center justify-between bg-[linear-gradient(109.69deg,_#FF842A_3.25%,_#FF5722_99.57%)] absolute -top-24 left-[50%] transform -translate-x-1/2 rounded-2xl shadow-lg p-4 z-20"
          >
            <div className="w-full mt-5 cursor-pointer">
              <Slider ref={sliderRef} {...settings}>
                {weaponData.map((weapon) => (
                  <div
                    key={weapon.id}
                    className={cn(
                      "w-max flex justify-center items-center flex-col pt-4 border border-transparent",
                      selectedWeapon === weapon.name
                        ? " border-white rounded-2xl"
                        : "",
                    )}
                    onClick={() => {
                      setSelectedWeapon(weapon.name);
                      setSpinStarted(false);
                      setSpinFinished(false);
                      setSpinCount(0);
                      setSpinTimeLeft(spinTime);
                    }}
                  >
                    <div className="w-full h-[3rem] flex items-center justify-center mb-2.5">
                      <h5 className="w-[10rem] leading-8 text-center text-black font-comix-loud uppercase">
                        {weapon.name}
                      </h5>
                    </div>
                    <Image
                      width={200}
                      height={200}
                      src={weapon.image || "/placeholder.svg"}
                      alt={weapon.name}
                      className={cn(
                        "w-[15rem] h-[15rem] object-cover transform transition-transform duration-800 ease-in-out",
                        rotate ? "rotate-360" : "",
                      )}
                    />
                  </div>
                ))}
              </Slider>
              <div className="w-full flex items-center justify-center gap-6 mt-6">
                <button
                  type="button"
                  aria-label="previous"
                  className="bg-yellow text-black font-semibold p-2 rounded-[0.9rem] cursor-pointer"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <svg
                    className="cursor-pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.30078 8.41211L3.01367 5.76562L7.30078 3.34375V0.599609L0.708984 4.67188V6.76172L7.30078 11.1465V8.41211Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="next"
                  className="bg-yellow text-black font-semibold p-2 rounded-[0.9rem] cursor-pointer"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <svg
                    className="cursor-pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.699219 8.41211L4.98633 5.76562L0.699219 3.34375V0.599609L7.29102 4.67188V6.76172L0.699219 11.1465V8.41211Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
              <div className="w-full flex items-center justify-center mt-10">
                <Button
                  className="w-[15rem] font-extrabold text-2xl"
                  onClick={() =>
                    setIsPopoverOpen({
                      open: false,
                      popOverFor: "",
                    })
                  }
                >
                  SELECT
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* popover to see leaders board */}
        {isPopoverOpen.popOverFor === "leaderboard" && (
          <div
            role="dialog"
            id="leaderboard-popover"
            aria-modal="true"
            className="w-[60%] h-[34rem] flex flex-col items-center justify-between bg-[linear-gradient(109.69deg,_#FF842A_3.25%,_#FF5722_99.57%)] absolute -top-24 left-[50%] transform -translate-x-1/2 rounded-2xl shadow-lg p-4 z-20"
          >
            <h3 className="font-comfortaa text-3xl font-bold">
              Leaderboards (Web)
            </h3>
            <div className="w-full">
              {/* Header for table */}
              <div className="flex justify-between px-4 py-2 font-bold">
                <span className="pr-6">#</span>
                <span>Username</span>
                <span>Top RPM</span>
              </div>
              {/* Slider with leaderboard items */}
              <div className="w-full mt-5 cursor-pointer p-3">
                <Slider
                  ref={sliderRef}
                  {...{
                    ...settings,
                    vertical: true,
                    verticalSwiping: true,
                    slidesToScroll: 4,
                  }}
                >
                  {leaderboardData.map((leader) => (
                    <div
                      key={leader.id}
                      className="w-full !flex items-center justify-between border-b border-gray-200 py-3"
                    >
                      <p>{leader.number}</p>
                      <p>{leader.name}</p>
                      <p>{leader.score}</p>
                    </div>
                  ))}
                </Slider>
              </div>
              {/* Pagination Controls */}
              <div className="w-full flex items-center justify-end gap-1 mt-2">
                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() =>
                        sliderRef.current?.slickGoTo(
                          (page - 1) * leadersPerPage,
                        )
                      }
                      className={cn(
                        "px-1 rounded cursor-pointer font-titan-one",
                        page === currentPage
                          ? " text-black font-bold"
                          : " text-gray-300",
                      )}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              <div className="w-full flex items-center justify-center gap-6 mt-6">
                <button
                  type="button"
                  aria-label="previous"
                  className="bg-yellow text-black font-semibold p-2 rounded-[0.9rem] cursor-pointer"
                  onClick={() => sliderRef.current?.slickPrev()}
                >
                  <svg
                    className="cursor-pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.30078 8.41211L3.01367 5.76562L7.30078 3.34375V0.599609L0.708984 4.67188V6.76172L7.30078 11.1465V8.41211Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="next"
                  className="bg-yellow text-black font-semibold p-2 rounded-[0.9rem] cursor-pointer"
                  onClick={() => sliderRef.current?.slickNext()}
                >
                  <svg
                    className="cursor-pointer"
                    width="20"
                    height="20"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.699219 8.41211L4.98633 5.76562L0.699219 3.34375V0.599609L7.29102 4.67188V6.76172L0.699219 11.1465V8.41211Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <Button
              className="w-[15rem] font-extrabold text-2xl"
              aria-controls="leaderboard-popover"
              aria-haspopup="dialog"
              onClick={() =>
                setIsPopoverOpen({
                  open: false,
                  popOverFor: "",
                })
              }
            >
              CLOSE
            </Button>
          </div>
        )}

        {/* popover when game is over */}
        {isPopoverOpen.popOverFor === "game-over" && (
          <div
            ref={popoverRef}
            role="dialog"
            id="game-over-popover"
            aria-modal="true"
            className="w-[40%] h-[25rem] mt-6 flex flex-col items-center justify-between bg-[linear-gradient(109.69deg,_#FF842A_3.25%,_#FF5722_99.57%)] absolute top-0 left-[50%] transform -translate-x-1/2 rounded-2xl shadow-lg p-4 z-20"
          >
            <div className="w-full h-full flex flex-col items-center justify-evenly gap-5">
              <h3 className="font-comix-loud text-2xl mt-3">COMPLETE!</h3>
              <p className="font-titan-one text-2xl">
                You finished with a top RPM score of
              </p>

              <p className="font-comix-loud text-2xl">{highestRPM} RPM</p>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <Button
                className="w-[8rem] font-semibold text-2xl"
                onClick={() => {
                  // update replace accordingly
                  setSpinStarted(false);
                  setSpinFinished(false);
                  setSpinCount(0);
                  setSpinTimeLeft(spinTime);
                  setIsPopoverOpen({
                    open: false,
                    popOverFor: "",
                  });
                }}
              >
                RETRY
              </Button>
              <Button
                className="w-[10rem] font-semibold text-2xl"
                onClick={() =>
                  // replace with Save function
                  {
                    setIsPopoverOpen({
                      open: false,
                      popOverFor: "",
                    });
                    setSpinStarted(false);
                    setSpinFinished(false);
                    setSpinCount(0);
                    setSpinTimeLeft(spinTime);
                  }
                }
              >
                SAVE
              </Button>
              <Button
                className="w-[8rem] font-semibold text-2xl"
                onClick={() => {
                  setIsPopoverOpen({
                    open: false,
                    popOverFor: "",
                  });
                  setSpinStarted(false);
                  setSpinFinished(false);
                  setSpinCount(0);
                  setSpinTimeLeft(spinTime);
                }}
              >
                EXIT
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
