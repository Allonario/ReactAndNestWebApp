import React, {useEffect, useState} from "react";
import './brokers.component.css';


const GET_BROKERS = 'http://localhost:8080/brokers';
const ADD_BROKER = 'http://localhost:8080/brokers';
const CHANGE_BROKER = 'http://localhost:8080/brokers/';
const DELETE_BROKER = 'http://localhost:8080/brokers/';
export function BrokersComponent(){
    const [brokers, setBrokers] = useState([]);
    const [isLoaded, Load] = useState(false);

    useEffect(() => {
        if(!isLoaded){
            (async () => {
                const data = await fetch(GET_BROKERS).then(res => res.json());
                setBrokers(data);
                Load(true);
            })();
        }
    })
    if (brokers?.length) {
        return (
            <div id='mainContainer'>
                <AddBroker></AddBroker>
                <div className='scrollable'>
                    {brokers.map(broker => {
                        return <Broker key={broker.id} value={broker}></Broker>;
                    })}
                </div>
            </div>
        );
    } else {
        return(
            <div id='mainContainer'>
                <AddBroker></AddBroker>
                <h1>No brokers</h1>
            </div>
        );
    }
}

function Broker(params){
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedBalance, setEditedBalance] = useState('');
    const openDialog = () => {
        setEditedName(params.value.name);
        setEditedBalance(String(params.value.balance));
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
    };

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleBalanceChange = (event) => {
        setEditedBalance(event.target.value);
    };

    const handleSaveChanges = async () => {
        if(editedBalance >= 0 && editedName !== '') {
            const updatedBroker = {
                id: params.value.id,
                name: editedName,
                balance: Number(editedBalance),
                stocks: params.value.stocks
            };

            await fetch(CHANGE_BROKER + `${params.value.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBroker),
            });
            window.location.reload();
        }
    };

    const handleDeleteBroker = async () => {
        await fetch(DELETE_BROKER + `${params.value.id}`, {
            method: 'DELETE',
        });
        window.location.reload();
    };

    return (
        <div className='brokerContainer'>
            <div className='infoContainer'>
                <p className='brokerName'>{params.value.name}</p>
                <p className='brokerBalance'>{params.value.balance}</p>
            </div>
            {!isDialogOpen && (
                <div>
                    <button onClick={openDialog}>Изменить</button>
                    <button onClick={handleDeleteBroker}>Удалить</button>
                </div>
            )}

            {isDialogOpen && (
                <div className='dialog'>
                    <label>
                        Имя:
                        <input type='text' value={editedName} onChange={handleNameChange} />
                    </label>
                    <label>
                        Баланс:
                        <input
                            type='number'
                            value={editedBalance}
                            onChange={handleBalanceChange}
                        />
                    </label>
                    <button onClick={handleSaveChanges}>Сохранить</button>
                    <button onClick={closeDialog}>Отмена</button>
                </div>
            )}
        </div>
    );
}

function AddBroker(){
    const [isAddBrokerDialogOpen, setAddBrokerDialogOpen] = useState(false);
    const [newBrokerName, setNewBrokerName] = useState('');
    const [newBrokerBalance, setNewBrokerBalance] = useState('');
    const openAddBrokerDialog = () => {
        setAddBrokerDialogOpen(true);
    };

    const closeAddBrokerDialog = () => {
        setAddBrokerDialogOpen(false);
        setNewBrokerName('');
        setNewBrokerBalance('');
    };

    const handleNewBrokerNameChange = (event) => {
        setNewBrokerName(event.target.value);
    };

    const handleNewBrokerBalanceChange = (event) => {
        setNewBrokerBalance(event.target.value);
    };

    const handleAddBroker = async () => {
        if(newBrokerBalance >= 0 && newBrokerName !== '') {
            const newBroker = {
                name: newBrokerName,
                balance: Number(newBrokerBalance),
                stocks: {}
            };

            const response = await fetch(ADD_BROKER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBroker),
            });

            if (response.ok) {
                window.location.reload();
            } else {
                console.error('Failed to add broker:', response.statusText);
            }
        }
    };

    return (
        <div id='addContainer'>
            <button onClick={openAddBrokerDialog}>Добавить нового брокера</button>

            {isAddBrokerDialogOpen && (
                <div className='dialog'>
                    <label>
                        Имя:
                        <input type='text' value={newBrokerName} onChange={handleNewBrokerNameChange} />
                    </label>
                    <label>
                        Баланс:
                        <input type='number' value={newBrokerBalance} onChange={handleNewBrokerBalanceChange} />
                    </label>
                    <button onClick={handleAddBroker}>Сохранить</button>
                    <button onClick={closeAddBrokerDialog}>Отмена</button>
                </div>
            )}
        </div>
    );
}