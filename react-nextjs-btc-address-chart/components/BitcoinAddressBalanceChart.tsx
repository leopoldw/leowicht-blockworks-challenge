import LineChart from './LineChart'

const HEADER_LEGEND_MAP = {
    'Time': 'Time',
    '>1k': 'BTC / Addr Cnt of Bal e $1K',
    '>10k': "BTC / Val in Addrs w/ Bal e $10K USD",
    '>100k': "BTC / Val in Addrs w/ Bal e $100K USD",
    '>1m': "BTC / Val in Addrs w/ Bal e $1M USD",
    '>10m': "BTC / Val in Addrs w/ Bal e $10M USD",
};

const FORMAT_ORDER = ['>1k', '>10k', '>100k', '>1m', '>10m']

const formatBodyForChart = ({ header, body }) => {
    const timeIndex = header.indexOf(HEADER_LEGEND_MAP['Time'])

    const labels = body.map(row => row[timeIndex])

    const datasets = FORMAT_ORDER.map((label, index) => {
        const columnIndex = header.indexOf(HEADER_LEGEND_MAP[label])
        console.log('col', columnIndex)
        return {
            label,
            data: body.map(row => Number(row[columnIndex])),
        }
    })
    

    return {
        labels,
        datasets,
    }
}

const BitcoinAddressBalanceChart = ({ header, body }) => {
    const result = formatBodyForChart({ header, body })

    result.datasets.forEach(result => {
        console.log('x', result.label, Math.max(...result.data))
    })

    return (
        <div style={{ width: '1000px', height: '500px', margin: '0 auto'}}>
            <LineChart data={result} />
        </div>
    )
    
}

export default BitcoinAddressBalanceChart