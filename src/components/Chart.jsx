import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
    '1 to 25',
    '26 to 50',
    '51 to 75',
    '76 to 100',
    '101 to 125',
    '126 to 150',
    '151 to 175',
    '176 to 200',
    '201 to 225',
    '226 to 250'
  ]


const Chart = () => {
    const [data, setData] = useState({
        labels,
        datasets: [
          {
            label: 'Projects Converted to Deal',
            data: [],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      });
    
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Projects Deal Bar Chart',
          },
        },
      };
      
      
      
      

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`http://erp.seopage1.net/api/leads`);
            console.log(res.data.data);

            function chunkArray(array, chunkSize) {
                const result = [];
                for (let i = 0; i < array.length; i += chunkSize) {
                  result.push(array.slice(i, i + chunkSize));
                }
                return result;
              }
              
            const originalArray =res.data.data;
            const chunkSize = 25;
            
            const arrayOfChunks = chunkArray(originalArray, chunkSize);

            
            
            const deal = arrayOfChunks.map(arr => {
                return arr.filter(item => item.deal_status == 1).length;
             });

             setData(
                {
                    labels,
                    datasets: [
                      {
                        label: 'Projects Converted to Deal',
                        data: deal,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                      },
                    ],
                  }
             )
        }
        getData();
    }, [])


    return(
        <Bar options={options} data={data} />
    )
}

export default Chart;
