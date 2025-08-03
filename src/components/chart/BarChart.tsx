import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {getEvaluation} from '@/utils/getEvaluation'; // 경로에 맞게 수정

type ChartData = {
  name: string;
  score: number;
};

type BarChartProps = {
  data: ChartData[];
};

const BarChart = ({data}: BarChartProps) => {
  const scoreSum = data.reduce((sum, item) => sum + item.score, 0);
  const evaluation = getEvaluation(scoreSum);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-sm text-gray-500 dark:text-gray-400">
        이번 달의 감정 기록이 없어요 😶
      </div>
    );
  }
  return (
    <div className="w-full mt-3">
      {/* 총점 & 평가 */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-800 dark:text-white font-semibold">
          총점: {scoreSum}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300 text-right">
          <span className="text-blue-500 font-semibold">파란색</span>: 긍정적인 감정,
          <span className="text-red-500 font-semibold ml-2">빨간색</span>: 부정적인 감정
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <ReBarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis type="number" domain={[0, 2]} tickCount={3}/>
          <YAxis type="category" dataKey="name" width={60}/>
          <Bar dataKey="score" radius={[0, 4, 4, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.score >= 0 ? '#60a5fa' : '#f87171'}
              />
            ))}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>

      {/* 평가 메시지 */}
      <p className="mt-2 text-sm text-center font-medium text-gray-700 dark:text-gray-300">
        {evaluation}
      </p>
    </div>
  );
};

export default BarChart;
