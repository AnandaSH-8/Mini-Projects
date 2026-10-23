
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from 'recharts';
  
  import '../styles/overall-data.css';
  
  const COLORS = ['#4caf50', '#2196f3'];
  
  function OverallData({ records }) {
    const totalCaloriesIntake = records.reduce(
      (total, record) =>
        total + (Number(record.caloriesIntake) || 0),
      0
    );
  
    const totalCaloriesBurned = records.reduce(
      (total, record) =>
        total + (Number(record.caloriesBurned) || 0),
      0
    );
  
    const hasData = totalCaloriesIntake + totalCaloriesBurned > 0;
  
    const chartData = hasData
      ? [
          { name: 'Calories Intake', value: totalCaloriesIntake },
          { name: 'Calories Burned', value: totalCaloriesBurned },
        ].filter((item) => item.value > 0)
      : [{ name: 'No Data', value: 1 }];
  
    return (
      <section className="overall-section">
        <h2 className="overall-title">Overall Data</h2>
  
        <div className="overall-chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={48}
                outerRadius={78}
                paddingAngle={hasData ? 3 : 0}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={
                      hasData
                        ? COLORS[index]
                        : '#777'
                    }
                  />
                ))}
              </Pie>
  
              {hasData && (
                <Tooltip
                  formatter={(value) => [
                    `${value.toLocaleString()} kcal`,
                    'Total',
                  ]}
                />
              )}
  
              <Legend
                verticalAlign="bottom"
                formatter={(value) =>
                  value === 'No Data'
                    ? 'No Data Available'
                    : value
                }
              />
            </PieChart>
          </ResponsiveContainer>
  
          {hasData && (
            <div className="overall-chart-center">
              <span>Total Calories</span>
              <strong>
                {(totalCaloriesIntake + totalCaloriesBurned)
                  .toLocaleString()}
              </strong>
              <span>kcal</span>
            </div>
          )}
        </div>
  
        <div className="overall-summary">
          <p>
            <span className="summary-dot intake-dot" />
            Calories Intake
            <strong>{totalCaloriesIntake.toLocaleString()} kcal</strong>
          </p>
  
          <p>
            <span className="summary-dot burned-dot" />
            Calories Burned
            <strong>{totalCaloriesBurned.toLocaleString()} kcal</strong>
          </p>
        </div>
      </section>
    );
  }
  
  export default OverallData;
  