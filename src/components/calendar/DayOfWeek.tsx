const DayOfWeek = () => {
  return (
    <div
      className="grid grid-cols-7 border-b
      border-gray-300 bg-gray-200 text-center text-xs/6 font-semibold text-gray-700
      dark:border-gray-500 dark:bg-gray-900 dark:text-gray-200"
    >
      {["월", "화", "수", "목", "금", "토", "일"].map((day, i) => (
        <div
          key={i}
          className="flex justify-center bg-white py-2 dark:bg-black dark:text-white"
        >
          <span>{day}</span>
          <span className="sr-only sm:not-sr-only">{day.slice(1)}</span>
        </div>
      ))}
    </div>
  );
};

export default DayOfWeek;
