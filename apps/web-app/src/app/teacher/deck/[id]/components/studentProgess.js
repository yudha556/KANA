import Card from "@/components/ui/teacher/card";
import ProgressStatus from "@/components/ui/progressStatus"; 

const dummyProgress = [
  {
    id: 1,
    name: "Abdi Ramadhan",
    file: "Bismillah.pdf",
    status: "Completed",
    answered: 25,
    total: 25,
    correct: 23,
    accuracy: "92%",
    score: "92%",
  },
  {
    id: 2,
    name: "Siti Aminah",
    file: "Progress.docx",
    status: "InProgress",
    answered: 10,
    total: 25,
    correct: 7,
    accuracy: "70%",
    score: "40%",
  },
  {
    id: 3,
    name: "Joko Widodo",
    file: "TryAgain.pdf",
    status: "Failed",
    answered: 25,
    total: 25,
    correct: 10,
    accuracy: "40%",
    score: "40%",
  },
];

export default function StudentProgress() {
  return (
    <Card className="w-full flex flex-col gap-3 items-center px-4 md:px-6 lg:px-8 pb-6 md:pb-8">
      <div className="w-full items-start">
        <p className="text-xl md:text-2xl font-medium">Student Progress</p>
      </div>

      <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 w-full">
        {dummyProgress.map((student) => (
          <Card
            key={student.id}
            className="flex flex-col gap-4 md:gap-6 lg:gap-8 px-3 md:px-4 lg:px-5 py-3 md:py-4 border border-gray-300"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
              <div className="flex flex-row gap-3 md:gap-4 lg:gap-6 items-center">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-gray-500 flex items-center justify-center text-white flex-shrink-0">
                  <h1 className="text-sm md:text-base lg:text-lg">{student.id}</h1>
                </div>

                <div className="flex flex-col items-start min-w-0">
                  <h1 className="text-lg md:text-xl font-medium text-black truncate w-full">
                    {student.name}
                  </h1>
                  <p className="text-sm md:text-base lg:text-lg text-[#4B5563] truncate w-full">
                    ID: {student.file}
                  </p>
                </div>
              </div>

              <div className="flex justify-start sm:justify-end">
                <ProgressStatus status={student.status} />
              </div>
            </div>

            {/* Progress Info */}
            <div className="w-full flex flex-col gap-2">
              <p className="text-sm md:text-base lg:text-lg text-[#2D3E50]">
                Progress: {student.answered} of {student.total} Questions
              </p>

              {/* Progress Bar */}
              <div className="h-2 md:h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="bg-black h-2 md:h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${(student.answered / student.total) * 100}%`,
                  }}
                />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-0 lg:flex lg:flex-row lg:justify-between lg:items-center w-full lg:px-4 mt-2">
                <div className="flex flex-col gap-1 md:gap-2 items-start">
                  <h1 className="text-sm md:text-base lg:text-xl font-normal text-gray-700">
                    Questions Answered
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl font-medium">
                    {student.answered}/{student.total}
                  </p>
                </div>
                <div className="flex flex-col gap-1 md:gap-2 items-start">
                  <h1 className="text-sm md:text-base lg:text-xl font-normal text-gray-700">
                    Correct Answer
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl font-medium">
                    {student.correct}
                  </p>
                </div>
                <div className="flex flex-col gap-1 md:gap-2 items-start">
                  <h1 className="text-sm md:text-base lg:text-xl font-normal text-gray-700">
                    Accuracy
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl font-medium">
                    {student.accuracy}
                  </p>
                </div>
                <div className="flex flex-col gap-1 md:gap-2 items-start">
                  <h1 className="text-sm md:text-base lg:text-xl font-normal text-gray-700">
                    Score
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl font-medium">
                    {student.score}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}