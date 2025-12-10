export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

export function generateLastDaysLabel(days) {
  const arr = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    const bulan = MONTHS[d.getMonth()];
    const hari = d.getDate();

    arr.push(`${bulan} ${hari}`);
  }

  return arr.reverse();
}

export function generateDummySeries(days) {
  const arr = [];

  for (let i = 0; i < days; i++) {
    arr.push(Math.floor(Math.random() * 300) + 1);
  }

  return arr;
}

export function generateTwoYearDummy(days) {
  return [
    {
      name: "2024",
      data: generateDummySeries(days),
    },
    {
      name: "2025",
      data: generateDummySeries(days),
    },
  ];
}

export function generateCompareSeries(length = 12, min = 100, max = 500) {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );
}

export function generateLastDaysTable(days) {
  const labels = generateLastDaysLabel(days);

  return labels.map((date, i) => {
    const newStudent = Math.floor(Math.random() * 30) + 1;
    const newTeacher = Math.floor(Math.random() * 10) + 1;
    const totalNew = newStudent + newTeacher;
    const totalTeacher = Math.floor(Math.random() * 100) + 50;
    const totalStudent = Math.floor(Math.random() * 1000) + 500;

    return {
      id: i + 1,
      date,
      total: Math.floor(Math.random() * 300) + 100,
      newStudent,
      newTeacher,
      totalNew,
      totalTeacher,
      totalStudent,
    };
  });
}


