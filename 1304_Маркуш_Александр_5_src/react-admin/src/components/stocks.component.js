import {useEffect,useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GraphicComponent} from "./graphic.component.js";
import {TableComponent} from "./table.component.js";
import './stocks.component.css';

const GET_STOCKS = "http://localhost:8080/stocks";


export function StocksComponent(){
    const [stocks, setStocks] = useState([]);
    const [isLoaded, Load] = useState(false);

    useEffect(() => {
        if(!isLoaded){
            (async () => {
                const data = await fetch(GET_STOCKS).then(res => res.json());
                setStocks(data);
                Load(true);
            })();
        }
    })
    if(stocks){
        return(
            <div className='stocks_container'>
                <div className='scrollable'>
                    {stocks.map(stock => {
                        return <Stock key={stock.id} value={stock}></Stock>
                    })}
                </div>
            </div>
        )
    } else{
        return(
            <p>No stocks!</p>
        )
    }
}

export function Stock(params) {
    const [graphicOpen, setGraphicOpen] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);
    const [isChecked, setCheckState] = useState(false);
    const dispatch = useDispatch();
    const listTradings = useSelector((state) => state.tradingList);

    useEffect(() => {
        setCheckState(listTradings.includes(params.value.id));
    }, [listTradings, params.value.id]);

    const toggleChart = () => {
        setGraphicOpen(!graphicOpen);
    }

    const toggleTable = () => {
        setTableOpen(!tableOpen);
    }

    const [chartData, setChartData] = useState({
        labels: params.value.data.map((data) => data.Date).reverse(),
        datasets: [
            {
                label: "Users Gained ",
                data: params.value.data.map((data) => data.Open.match(/(\d+)/)[0]).reverse(),
                borderColor: "black",
                borderWidth: 2
            }
        ]
    });
    const changeListTrading = (e) =>{
        setCheckState(!isChecked);
        if(e.target.checked){
            listTradings.push(e.target.value)
        } else {
            let index = listTradings.indexOf(e.target.value);
            listTradings.splice(index, 1);
        }
        dispatch({ type: "SAVE", tradingList: listTradings });
        console.log(listTradings)
    }

    return (
        <div>
            <div className='stock'>
                <p className='stock_info'> {params.value.name}</p>
                <input className='trading_target_button' type="checkbox" value={params.value.id} onChange={changeListTrading} checked={isChecked}/>
            </div>
            { graphicOpen ? <button className='showGraphic' onClick={toggleChart}>Скрыть график</button> :
                <button className='showGraphic' onClick={toggleChart}>Показать график</button>}
            { graphicOpen ? <div className='graphicContainer'><GraphicComponent key={params.value.id} value={chartData}/></div> : null }
            { tableOpen ? <button className='showGraphic' onClick={toggleTable}>Скрыть таблицу</button> :
                <button className='showGraphic' onClick={toggleTable}>Показать таблицу</button>}
            { tableOpen ? <div><TableComponent key={params.value.id} value={chartData}/></div> : null }
        </div>
    );
}

