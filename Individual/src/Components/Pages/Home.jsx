import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const Home = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const idliVadaCombo = [
      {
        dishName: "Suggested Intake", // This will only be used in the graph
        items: [
          { meal: "Breakfast", calories: 750 },
          { meal: "Lunch", calories: 900 },
          { meal: "Dinner", calories: 900 },
          { meal: "Snacks", calories: 450 },
        ],
      },
      {
        dishName: "Idli Vada Combo",
        items: [
          { name: "Idli", quantity: 2, calories: 100 },
          { name: "Vada", quantity: 1, calories: 200 },
          { name: "Sambhar", quantity: 1, calories: 120 },
          { name: "Chutney", quantity: 1, calories: 80 },
        ],
      },
      {
        dishName: "Dosa Platter",
        items: [
          { name: "Dosa", quantity: 1, calories: 100 },
          { name: "Vada", quantity: 1, calories: 200 },
          { name: "Sambhar", quantity: 11, calories: 120 },
          { name: "Chutney", quantity: 1, calories: 80 },
        ],
      },
      {
        dishName: "Dosa Platter",
        items: [
          { name: "Dosa", quantity: 1, calories: 100 },
          { name: "Vada", quantity: 1, calories: 200 },
          { name: "Sambhar", quantity: 1, calories: 120 },
          { name: "Chutney", quantity: 1, calories: 80 },
        ],
      },
    ];

    setFoodItems(
      idliVadaCombo.filter((dish) => dish.dishName !== "Suggested Intake")
    );

    // Transform data for stacked bar chart
    const processedChartData = idliVadaCombo.map((dish) => {
      const result = { dishName: dish.dishName };
      // Adding the "Suggestable" data for the graph
      if (dish.dishName === "Suggested Intake") {
        dish.items.forEach((item) => {
          result[item.meal] = item.calories;
        });
      } else {
        dish.items.forEach((item, i) => {
          result[item.name] = item.quantity * item.calories;
        });
      }
      return result;
    });

    setChartData(processedChartData);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const totalCalories = payload.reduce(
        (sum, entry) => sum + entry.value,
        0
      );

      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: "0", fontWeight: "bold" }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: "5px 0", color: entry.color }}>
              {entry.name}: {entry.value} cal
            </p>
          ))}
          <p style={{ margin: "5px 0", fontWeight: "bold" }}>
            Total: {totalCalories} cal
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: "20px" }} className="border-4 border-red-600">
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left side - Food Items List */}
        <div
          style={{
            flex: "1",
            backgroundColor: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2 className="text-2xl font-bold text-green-600">Dish Details </h2>
          {foodItems.map((dish, index) => (
            <div key={index}>
              <h3>{dish.dishName}</h3>
              {dish.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex justify-around items-center"
                >
                  <span>{item.name}</span>
                  <span> {item.quantity}</span>
                  <span>{item.calories * item.quantity} cal</span>
                </div>
              ))}
              <div
                className="border-2 border-black px-5 mx-20"
                style={{
                  borderTop: "1px solid #ddd",
                  marginTop: "5px",
                  paddingTop: "10px",
                  display: "flex",
                  fontWeight: "bold",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>Total</span>
                <span>
                  {dish.items.reduce(
                    (sum, item) => sum + item.calories * item.quantity,
                    0
                  )}{" "}
                  cal
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Enhanced Chart */}
        <div style={{ flex: "1" }}>
          <div style={{ height: "600px", padding: "20px" }}>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="dishName"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis
                  ticks={[
                    0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550,
                    600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100,
                    1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1600,
                    1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100,
                    2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600,
                    2650, 2700, 2750, 2800, 2850, 2900, 2950, 3000,
                  ]}
                  label={{
                    value: "Calories",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle" },
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="bottom" height={40} />
                <ReferenceLine
                  y={300}
                  stroke="#ff0000"
                  strokeDasharray="3 3"
                  label={{
                    value: "Recommended per meal",
                    position: "right",
                    fill: "#ff0000",
                  }}
                />
                <Bar dataKey="Breakfast" stackId="b" fill="#a83232" />
                <Bar dataKey="Lunch" stackId="b" fill="#c93030" />
                <Bar dataKey="Dinner" stackId="b" fill="#f0ad4e" />
                <Bar dataKey="Snacks" stackId="b" fill="#d9534f" /> <br />
                {/* Additional meal data from the "Suggestable" dish */}
                <Bar dataKey="Idli" stackId="a" fill="#8884d8" />
                <Bar dataKey="Vada" stackId="a" fill="#82ca9d" />
                <Bar dataKey="Sambhar" stackId="a" fill="#ffc658" />
                <Bar dataKey="Chutney" stackId="a" fill="#ff8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// const recommendedCalorieIntake = [
//   {
//     group: "Women",
//     intakeByActivity: [
//       { activity: "Sedentary", caloriesPerDay: 1800 },
//       { activity: "Moderately Active", caloriesPerDay: 2000 },
//       { activity: "Active", caloriesPerDay: 2200 },
//     ],
//   },
//   {
//     group: "Men",
//     intakeByActivity: [
//       { activity: "Sedentary", caloriesPerDay: 2200 },
//       { activity: "Moderately Active", caloriesPerDay: 2400 },
//       { activity: "Active", caloriesPerDay: 2600 },
//     ],
//   },
//   {
//     group: "Children (6-12 years)",
//     intakeByActivity: [
//       { activity: "Sedentary", caloriesPerDay: 1400 },
//       { activity: "Active", caloriesPerDay: 1800 },
//     ],
//   },
// ];

// console.log(recommendedCalorieIntake);

//-------> Sedentary:
// Definition: Minimal physical activity, primarily associated with activities of daily living such as light household chores, sitting, or standing.
// Examples:
// Office work with long periods of sitting
// Minimal exercise or no regular physical activity
// Watching TV or reading

//-------> Moderately Active:
// Definition: A moderate amount of physical activity in addition to daily living activities. This includes exercise or sports 3-5 times a week.
// Examples:
// Brisk walking, cycling, or jogging for 30-60 minutes most days
// Light gardening or yard work
// Recreational sports like tennis or swimming

//-------> Active:
// Definition: High levels of physical activity, involving exercise or sports nearly every day.
// Examples:
// Vigorous workouts or competitive sports for more than an hour most days
// Physical jobs such as construction or farming
// High-intensity activities like running, cycling, or swimming for extended periods
