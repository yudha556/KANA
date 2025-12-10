"use client";

import Button from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import GridDeck from "./components/gridView";
import DeckCard from "./components/deckCard";
import StudentProgress from "./components/studentProgress";

export default function DeckDetails() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="w-full flex  flex-row justify-between  items-center">
        <div className="flex flex-row gap-6 justify-between items-center  ">
          <Button
            size="md:md"
            variant="secondary"
            className="px-6 h-14 flex flex-row items-center gap-3"
            onClick={() => router.push("/teacher/deck")}
          >
            <ArrowLeft size={25} />
            Back To Decks
          </Button>
          <div className="flex flex-row items-center gap-3">
            <div className="flex flex-col items-start">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Bismilah.pdf
              </h1>
              <p className="text-sm md:text-lg text-[#4A5565] font-normal">
                From: {id}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <GridDeck />
      </div>

      <div className="w-full">
        <DeckCard />
      </div>

      <div className="w-full">
        <StudentProgress />
      </div>
    </div>
  );
}