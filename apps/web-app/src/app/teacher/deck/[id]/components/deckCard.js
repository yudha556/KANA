import Card from "@/components/ui/teacher/card";

const dummyCards = [
  {
    id: 1,
    title: "Kerangka Kerja Project Assignment & Deskripsi Unit Kerja",
    points: [
      "Kerangka kerja Project Assignment mencakup sasaran, realisasi, dan identifikasi temuan seperti deviasi atau room for improvement.",
      "Tujuan kerangka kerja adalah mengidentifikasi 'gap' kritikal dan kekuatan/kelemahan yang memerlukan peningkatan melalui kepemimpinan bisnis.",
      "Bagian ini juga merinci struktur organisasi dan sumber daya yang dikelola, seperti luas lahan, kapasitas pabrik, dan jumlah sumber daya manusia.",
    ],
  },
  {
    id: 2,
    title: "Contoh Card Kedua",
    points: [
      "Isi dummy pertama.",
      "Isi dummy kedua.",
      "Isi dummy ketiga.",
    ],
  },
  {
    id: 3,
    title: "Kerangka Kerja Project Assignment & Deskripsi Unit Kerja",
    points: [
      "Kerangka kerja Project Assignment mencakup sasaran, realisasi, dan identifikasi temuan seperti deviasi atau room for improvement.",
      "Tujuan kerangka kerja adalah mengidentifikasi 'gap' kritikal dan kekuatan/kelemahan yang memerlukan peningkatan melalui kepemimpinan bisnis.",
      "Bagian ini juga merinci struktur organisasi dan sumber daya yang dikelola, seperti luas lahan, kapasitas pabrik, dan jumlah sumber daya manusia.",
    ],
  },
];

export default function DeckCard() {
  return (
    <Card className="w-full flex flex-col gap-3 items-center px-5 md:px-8 pb-8">
      <div className="w-full items-start">
        <p className="text-xl md:text-2xl">Card in this deck</p>
      </div>

      <div className="w-full md:px-3 flex flex-col gap-4">
        {dummyCards.map((item) => (
          <Card
            key={item.id}
            className="w-full border border-gray-300 flex flex-col gap-4 p-3"
          >
            <div className="flex flex-row gap-3 items-center">
              <div className="min-w-10 min-h-10 md:w-12 md:h-12 rounded-full bg-primary text-black flex justify-center items-center">
                <p className="text-xl md:text-2xl">{item.id}</p>
              </div>
              <h2 className="text-sm md:text-lg font-semibold">{item.title}</h2>
            </div>

            <ul className="gap-3 flex flex-col list-disc py-1 px-9 text-sm lg:text-lg">
              {item.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Card>
  );
}