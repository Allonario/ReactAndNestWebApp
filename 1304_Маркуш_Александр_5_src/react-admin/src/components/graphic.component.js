import React from "react";
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

export function GraphicComponent(params){
    return (
        <Line
            data={
                params.value
            }
            options={
                {
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            }
            style={{backgroundColor:"white"}}
        />
    );
}