
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  import { getLastSevenDays } from '../utils/dateUtils';
  import '../styles/weekly-trends.css';
  
  function WeeklyHealthTrends({ records }) {
    const lastSevenDays = getLastSevenDays();
  
    const recordsByDate = records.reduce((result, record) => {
      if (!result[record.date]) {
        result[record.date] = {
          caloriesIntake: 0,
          caloriesBurned: 0,
        };
      }
  
      result[record.date].caloriesIntake += Number(
        record.caloriesIntake
      ) || 0;
  
      result[record.date].caloriesBurned += Number(
        record.caloriesBurned
      ) || 0;
  
      return result;
    }, {});
  
    const chartData = lastSevenDays.map(({ date, label }) => ({
      date,
      day: label,
      caloriesIntake: recordsByDate[date]?.caloriesIntake || 0,
      caloriesBurned: recordsByDate[date]?.caloriesBurned || 0,
    }));
  
    const hasWeeklyData = records.some((record) =>
      lastSevenDays.some((day) => day.date === record.date)
    );
  
    if (!hasWeeklyData) {
      return null;
    }
  
    return (
      <section className="weekly-section">
        <h2 className="weekly-title">Weekly Health Trends</h2>
  
        <div className="weekly-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#777"
                vertical={false}
              />
  
              <XAxis
                dataKey="day"
                tick={{ fill: '#eee', fontSize: 11 }}
                axisLine={{ stroke: '#999' }}
                tickLine={false}
              />
  
              <YAxis
                allowDecimals={false}
                width={48}
                tick={{ fill: '#eee', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
  
              <Tooltip
                formatter={(value, name) => [
                  `${value} kcal`,
                  name === 'caloriesIntake'
                    ? 'Calories Intake'
                    : 'Calories Burned',
                ]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  color: '#333',
                }}
              />
  
              <Legend
                formatter={(value) =>
                  value === 'caloriesIntake'
                    ? 'Calories Intake'
                    : 'Calories Burned'
                }
              />
  
              <Bar
                dataKey="caloriesIntake"
                fill="#4caf50"
                radius={[3, 3, 0, 0]}
              />
  
              <Bar
                dataKey="caloriesBurned"
                fill="#2196f3"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    );
  }
  
  export default WeeklyHealthTrends;
  