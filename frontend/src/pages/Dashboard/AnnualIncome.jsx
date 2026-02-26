import "./styles/AnnualIncome.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const incomeData = [
  { month: "Jan", income: 12000 },
  { month: "Feb", income: 12800 },
  { month: "Mar", income: 14500 },
  { month: "Apr", income: 13500 },
  { month: "May", income: 15000 },
  { month: "Jun", income: 15800 },
  { month: "Jul", income: 16800 },
  { month: "Aug", income: 16200 },
  { month: "Sep", income: 17500 },
  { month: "Oct", income: 18800 },
  { month: "Nov", income: 18200 },
  { month: "Dec", income: 19800 }
];

const AnnualIncome = () => {
  return (
    <section className="annual-income">
     
      <div className="income-header">
        <h2>Annual Gym Income</h2>
        <span className="growth-badge">+24% growth</span>
      </div>

      
      <div className="total-income-card">
        <div className="icon">$</div>
        <div>
          <p>Total Yearly Income</p>
          <h3>$215,800</h3>
        </div>
      </div>


      <div className="income-graph">
        <h4>Monthly Income Trend</h4>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={incomeData}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#56b2bb" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#56b2bb" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" stroke="#bac7cc" />
            <YAxis
              stroke="#bac7cc"
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#56b2bb"
              strokeWidth={2}
              fill="url(#incomeFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    
      <div className="income-breakdown">
        <div className="income-card teal">
          <p>Personal Training</p>
          <h4>$125,000</h4>
          <span />
        </div>

        <div className="income-card blue">
          <p>Group Sessions</p>
          <h4>$58,000</h4>
          <span />
        </div>

        <div className="income-card purple">
          <p>Online Coaching</p>
          <h4>$32,800</h4>
          <span />
        </div>
      </div>
    </section>
  );
};

export default AnnualIncome;
