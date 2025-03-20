"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import { Button } from "@/components/ui/button"

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col justify-center place-items-center gap-5">
            <Button
              size={'lg'}
              className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500 hover:cursor-pointer"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black goup-hover:to-black">
                Start For Free Today
              </span>
            </Button>
            <h1 className="text-8xl font-semibold text-black dark:text-white">
              Automate Your Work<br />
              <span className="text-8xl font-bold mt-1 leading-none">
                With Tactix
              </span>
            </h1>
          </div>
        }
      >
        <Image
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
