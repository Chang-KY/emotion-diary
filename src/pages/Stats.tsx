import {getDonutChartData} from "@/utils/getDonutChartData.ts";
import DonutChart from "@/components/chart/DonutChart.tsx";
import {useMonthDaily} from "@/hooks/useMonthDaily.ts";
import {useMemo, useState} from "react";
import {useMyProfile} from "@/hooks/useMyProfile.ts";
import {getBarChartData} from "@/utils/getBarChart";
import BarChart from "@/components/chart/BarChart.tsx";
import Loading from "@/components/loading/Loading.tsx";

const Stats = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const myProfile = useMyProfile();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const {data: emotionData = [], isLoading} = useMonthDaily(currentYear, currentMonth, myProfile?.id);
  const donutData = useMemo(() => getDonutChartData(emotionData), [emotionData]);
  const barData = useMemo(() => getBarChartData(emotionData), [emotionData]);
  const [chartType, setChartType] = useState<'donut' | 'bar'>('donut');

  if (isLoading) {
    return (<div className='flex items-center justify-center'><Loading/></div>)
  }
  return (
    <div className="py-4 px-3 bg-white dark:bg-black max-w-7xl mx-auto">
      <div className='flex items-center justify-between'>
        <select
          value={`${currentYear}-${currentMonth + 1}`}
          onChange={(e) => {
            const [year, month] = e.target.value.split('-').map(Number);
            setCurrentDate(new Date(year, month - 1));
          }}
          className="text-sm dark:bg-black dark:text-white"
        >
          {[...Array(12)].map((_, idx) => {
            const date = new Date();
            date.setMonth(date.getMonth() - idx);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            return (
              <option key={idx} value={`${year}-${month}`} className=''>
                {year}년 {month}월의 감정분포
              </option>
            );
          })}
        </select>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as 'donut' | 'bar')}
          className="text-sm dark:bg-black dark:text-white"
        >
          <option value="donut">원형 차트</option>
          <option value="bar">감정 점수 막대 차트</option>
        </select>
      </div>
      <div className=''>
        {chartType === 'donut' ? (
          <DonutChart data={donutData}/>
        ) : (
          <BarChart data={barData}/>
        )}
      </div>
    </div>
  );
};

export default Stats;


