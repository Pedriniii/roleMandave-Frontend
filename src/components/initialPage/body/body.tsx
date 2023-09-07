import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import './body.css'



function Body() {

  const data = {
    labels: [`Transporte`, `Aluguel`, `Alimentação`, `Outros`],
    datasets: [
      {
        data: [25, 30, 35, 10],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };


  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="graph">
      <Doughnut data={data} updateMode={"active"}/>
    </div>
  );
}

export default Body;
