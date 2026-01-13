"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

// Static target date (replace with desired date)
const TARGET_DATE = new Date("2026-01-20T00:00:00");

// Function to calculate the time remaining
const calculateTimeRemaining = (targetDate: Date) => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
  };
};

const DealCountDown = () => {
  const [time, setTime] = useState<ReturnType<typeof calculateTimeRemaining>>();

  useEffect(() => {
    //Calculate initial time on client
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        clearInterval(timerInterval);
      }

      return () => clearInterval(timerInterval);
    }, 1000);
  }, []);

  if (!time) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-2 my-20'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'> Loading Countdown...</h3>
        </div>
      </section>
    );
  }

  if (
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0
  ) {
    return (
      <section className='grid grid-cols-1 md:grid-cols-2 my-20 shadow-xl rounded-2xl p-4'>
        <div className='flex flex-col gap-2 justify-center'>
          <h3 className='text-3xl font-bold'>Deal Has Ended</h3>
          <p>
            This deal is no longer available. Check out our latest promotions!
          </p>
          <div className='text-center'>
            <Button asChild>
              <Link href='/search'>View Products</Link>
            </Button>
          </div>
        </div>
        <div className='flex justify-center'>
          <Image
            src='/images/promo.jpg'
            alt='promotion'
            width={300}
            height={200}
          />
        </div>
      </section>
    );
  }

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4'>
      <div className='flex flex-col gap-6 justify-center order-2 md:order-1'>
        <div className='space-y-3'>
          <h3 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Deal Of The Month
          </h3>
          <p className='text-muted-foreground text-lg leading-relaxed'>
            Get ready for a shopping experience like never before with our Deals
            of the Month! Every purchase comes with exclusive perks and offers,
            making this month a celebration of savvy choices and amazing deals.
            Don&apos;t miss out! 🎁🛒
          </p>
        </div>
        <ul className='grid grid-cols-4 gap-3 md:gap-4'>
          <StatBox lable='Days' value={time.days} />
          <StatBox lable='Hours' value={time.hours} />
          <StatBox lable='Minutes' value={time.minutes} />
          <StatBox lable='Seconds' value={time.seconds} />
        </ul>
        <div className='pt-4'>
          <Button asChild size='lg' className='w-full md:w-auto'>
            <Link href='/search'>Shop Now</Link>
          </Button>
        </div>
      </div>
      <div className='flex justify-center items-center order-1 md:order-2'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl'></div>
          <Image
            src='/images/promo.jpg'
            alt='promotion'
            width={400}
            height={300}
            className='relative rounded-2xl shadow-2xl object-cover'
          />
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ lable, value }: { lable: string; value: number }) => (
  <li className='p-4 md:p-6 w-full text-center bg-card border-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105'>
    <p className='text-3xl md:text-4xl font-bold text-primary mb-1'>
      {String(value).padStart(2, "0")}
    </p>
    <p className='text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide'>
      {lable}
    </p>
  </li>
);

export default DealCountDown;
