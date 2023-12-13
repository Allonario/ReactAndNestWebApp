import './table.component.css'

export function TableComponent(params){
    const reversedLabels = [...params.value.labels].reverse();
    const cost = params.value.datasets[0].data;

    return (
        <div className="table-container">
            <table>
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Цена</th>
                </tr>
                </thead>
                <tbody>
                {reversedLabels.map((label, index) => (
                    <tr key={index}>
                        <td>{label}</td>
                        <td>{cost[params.value.labels.length - 1 - index]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}