"use client";

import { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import Card from "@/components/ui/teacher/card";
import { Eye, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ConfirmModal from "@/components/ui/modalConfirmation";
import { getAllDecks } from "@/services/deckService";

export default function StudentList() {
  const router = useRouter();
  const [isopen, setIsOpen] = useState(false);
  const [deck, setDeck] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const res = await getAllDecks();
        setDeck(res.data || []);
      } catch (err) {
        console.error("Error fetching deck:", err)
      } finally {
        setLoading(false);
      }
    }
    fetchDeck();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 px-3 sm:px-4 lg:px-6">
      <div className="flex flex-row gap-2">
        <p className="text-xl sm:text-2xl font-medium">Quiz Deck</p>
        <p className="text-xl sm:text-2xl font-medium">({deck.length ?? 0})</p>
      </div>
      <form className="flex flex-row gap-3 sm:gap-4 w-full bg-[#F8FAFC] py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl">
        <Search className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5" />
        <input
          type="text"
          placeholder="Search Decks..."
          className="outline-none flex-1 bg-transparent text-sm sm:text-base"
        />
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 sm:gap-5 lg:gap-6 px-1 sm:px-2">
        {deck.map((card, index) => (
          <div key={index}>
            <Card className="p-4 sm:px-5 sm:py-4 border border-gray-200">
              <div className="flex flex-col gap-6 sm:gap-8 items-start">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-row justify-between items-start w-full">
                    <div className="flex-1 pr-3">
                      <p className="text-lg sm:text-xl font-normal text-black leading-tight break-words">
                        {deck.nama || "Untiled"}
                      </p>
                    </div>
                    <button 
                      onClick={() => setIsOpen(true)} 
                      className="cursor-pointer flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Trash2 size={20} className="sm:w-[22px] sm:h-[22px]" color="black" />
                    </button>
                  </div>
                  <p className="text-xs sm:text-sm font-normal text-[#6B7280] break-all">
                    From: {deck.id}
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-xs sm:text-sm font-normal text-[#6B7280]">
                      Quiz Progress
                    </p>
                    <div className="h-6 sm:h-7 w-12 sm:w-14 rounded-lg bg-primary flex items-center justify-center">
                      <p className="text-white text-xs sm:text-sm font-medium">67%</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-2.5 sm:h-3 bg-gray-200 rounded-full flex">
                    <div className="bg-black w-[67%] rounded-full" />
                  </div>
                </div>

                <Button
                  size="md"
                  variant="secondary"
                  onClick={() =>
                    router.push(`/teacher/deck/${card.id}`)
                  }
                  className="flex flex-row gap-3 sm:gap-4 items-center justify-center w-full border-2 border-gray-300 text-sm sm:text-base py-2.5 sm:py-3"
                >
                  <Eye size={18} className="sm:w-5 sm:h-5" />
                  <p className="font-normal text-sm ">View Detail & Progress</p>
                </Button>

                <ConfirmModal
                  isOpen={isopen}
                  onClose={() => setIsOpen(false)}
                  title="Konfirmasi Aksi"
                  description="Apakah kamu yakin ingin menghapus materi ini?"
                >
                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded bg-gray-200 text-sm sm:text-base"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 rounded bg-red-500 text-white text-sm sm:text-base"
                    >
                      Hapus
                    </button>
                  </div>
                </ConfirmModal>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}