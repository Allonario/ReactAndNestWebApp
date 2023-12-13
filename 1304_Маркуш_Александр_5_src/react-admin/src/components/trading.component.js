import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {SocketIo, useConnectSocket} from "../socket-io.js";
import './trading.component.css'


export function TradingComponent(){
    const listTradings = useSelector(state => state.tradingList);
    const [stocks, setStocks] = useState([])
    const [trading, setTrading] = useState([])
    const [speed, setSpeed] = useState(0)
    const [date, setDate] = useState('')
    const [change, setChange] = useState(0)

    useConnectSocket();

    const setSpeedChange = (event) => {
        setSpeed(event.target.value)
    }

    const setDateChange = (event) => {
        setDate(event.target.value);
    }

    useEffect(() => {
        SocketIo.socket.on("trading", (data) => {
            setChange(JSON.parse(data));
            console.log(change);
        })
    }, []);

    useEffect(() => {
        stopTrading();
        (async () => {
            const data = await fetch('http://localhost:8080/stocks').then(res => res.json());
            setStocks(data);

            let tr = []
            listTradings.forEach((elem) => {
                const index = data.map((dataElem) => {
                    return dataElem.id;
                }).indexOf(elem);
                if (index > -1) {
                    tr.push({id: data[index].id, name: data[index].name, prices: data[index].data.reverse()})
                }
            })
            console.log(tr)
            setTrading(tr);
        })()
    }, [])

    const stopTrading = () => {
        SocketIo.socket.emit("stopTrading")
    }

    const startTrading = () => {
        if (speed > 0 && date && trading){
            SocketIo.socket.emit("tradingDone", {listTradings})

            let index = -1;
            for (let i = 0; i < trading[0].prices.length; i++){
                if (new Date(trading[0].prices[i].Date).toDateString() === new Date(date).toDateString()){
                    console.log(new Date(trading[0].prices[i].Date).toDateString(), new Date(date).toDateString())
                    index = i;
                    break;
                }
            }
            console.log(index, speed)
            SocketIo.socket.emit("startTrading", {index, speed})
        } else {
            console.log('Invalid params:', 'speed =', speed, ',', 'date =', date ? date : 'undefined');
        }
    }




    if (stocks?.length) {
        if (!trading[0]?.prices[change]) {
            stopTrading();
            window.location  = 'http://localhost:3000/stocks'
        }
        return (
            <div>
                <div className="mainInfo">
                    <div className="settingsDate">
                        <div className="date">
                            <label className="label">Дата начала</label>
                            <input className="input" type="date" onChange={setDateChange} value={date}/>


                            <label className="label">Скорость</label>
                            <input className="input" type="number" onChange={setSpeedChange} value={speed}/>

                            <button  id="startButton" onClick={startTrading}>Старт</button>
                            <button  id="stopButton" onClick={stopTrading}>Стоп</button>
                        </div>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Название компании</th>
                                <th>Стоимость акции</th>
                                <th>Дата</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(change > 0 && date && speed) ? (
                                trading.map(trad => (
                                    <tr key={trad.id}>
                                        <td>{trad.name}</td>
                                        <td>{trad.prices[change]?.Open}</td>
                                        <td>{trad.prices[change]?.Date}</td>
                                    </tr>
                                ))
                            ) : (null)
                            }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        );
    }
}