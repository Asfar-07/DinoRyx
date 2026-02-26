import React from 'react'
import "./styles/dashboard-programs.css"
    import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

export default function DashboardPrograms() {

const studentGrowthData = [
  { month: "Jan", students: 18 },
  { month: "Feb", students: 22 },
  { month: "Mar", students: 26 },
  { month: "Apr", students: 30 },
  { month: "May", students: 35 },
  { month: "Jun", students: 42 }
];

const sessionData = [
  { month: "Jan", sessions: 120 },
  { month: "Feb", sessions: 150 },
  { month: "Mar", sessions: 180 },
  { month: "Apr", sessions: 160 },
  { month: "May", sessions: 210 },
  { month: "Jun", sessions: 240 }
];

  return (
       <section className="trainer-graphs">
      <h2>Trainer Performance Analysis</h2>

      <div className="graphs-grid">

        <div className="graph-card">
          <h3>Student Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={studentGrowthData}>
              <XAxis dataKey="month" stroke="#9fb3c8" />
              <YAxis stroke="#9fb3c8" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#56B2BB"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="graph-card">
          <h3>Monthly Training Sessions</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={sessionData}>
              <XAxis dataKey="month" stroke="#9fb3c8" />
              <YAxis stroke="#9fb3c8" />
              <Tooltip />
              <Bar dataKey="sessions" fill="#56B2BB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>

  )
}
