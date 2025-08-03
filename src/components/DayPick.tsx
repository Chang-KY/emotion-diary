import {DayPicker} from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import {ko} from 'date-fns/locale';

type CalendarProps = {
  selected?: Date;
  onSelect?: (date?: Date | undefined) => void;
};

const DayPick = ({selected, onSelect,}: CalendarProps) => {
  return (
    <div className="flex items-start justify-center min-h-[350px] w-full text-black dark:text-white">
      <DayPicker
        mode="single"
        selected={selected}
        navLayout="after"
        onSelect={onSelect}
        showOutsideDays
        locale={ko}
        weekStartsOn={0}
        classNames={{
          head_row: '',
          head_cell: 'text-xs text-gray-500 dark:text-gray-400 text-center',
          row: '',
          cell: 'text-center',
          day: 'text-sm w-10 h-10 rounded-full transition-colors hover:bg-amber-100 dark:hover:bg-amber-800',
          selected: 'bg-amber-500 text-white border !border-amber-500 rounded-full',
          today: 'bg-blue-300 dark:bg-blue-300 rounded-full border dark:border-amber-300',
          outside: 'text-gray-300 dark:text-gray-800',
          nav_button: 'text-xl text-gray-700 dark:text-white',
          nav_button_previous: 'mr-2',
          nav_button_next: 'ml-2',
        }}
      />
    </div>
  );
};


export default DayPick;
