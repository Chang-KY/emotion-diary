import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from 'recharts';

const COLORS = ['#fbbf24', '#94a3b8', '#f87171']; // 긍정, 중립, 부정

type ChartData = {
  name: string;
  score: number;
};

type BarChartProps = {
  data: ChartData[];
};

const getEvaluation = (score: number) => {
  if (score >= 15) return '이번 달은 아주 긍정적인 달이었어요!';
  if (score >= 5) return '이번 달은 꽤 괜찮았어요.';
  if (score >= -5) return '이번 달은 그럭저럭이었어요.';
  return '이번 달은 힘든 시간이 많았네요.';
};

const DonutChart = ({data}: BarChartProps) => {
  const total = data.reduce((sum, item) => sum + Math.abs(item.score), 0);
  const scoreSum = data.reduce((sum, item) => sum + item.score, 0);
  const evaluation = getEvaluation(scoreSum);

  if (data.length === 0 || data.every(item => item.score === 0)) {
    return (
      <div className="flex flex-col items-center justify-center h-[250px] text-sm text-gray-500 dark:text-gray-400">
        이번 달의 감정 기록이 없어요 😶
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="score"     // score로 통일
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            isAnimationActive={false}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
            ))}
            <Label
              value={`${total}일\n총점 ${scoreSum}`}
              position="center"
              className="text-sm fill-gray-700 dark:fill-white whitespace-pre text-center"
            />
          </Pie>
          <Tooltip formatter={(value: number) => `${value}점`}/>
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>

      <p className="mt-2 text-sm text-center font-medium text-gray-700 dark:text-gray-300">
        {evaluation}
      </p>
    </div>
  );
};

export default DonutChart;
