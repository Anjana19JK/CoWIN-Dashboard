import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {graphDetails} = props
  const {vaccineDate, dose1, dose2} = graphDetails

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <BarChart
      width={1000}
      height={300}
      margin={{
        top: 5,
      }}
    >
      <XAxis
        dataKey={vaccineDate}
        tick={{
          stroke: 'gray',
          strokeWidth: 1,
        }}
      />
      <YAxis
        tickFormatter={DataFormatter}
        tick={{
          stroke: 'gray',
          strokeWidth: 0,
        }}
      />
      <Legend
        wrapperStyle={{
          padding: 30,
        }}
      />
      <Bar dataKey={dose1} name="Dose 1" fill="#1f77b4" barSize="20%" />
      <Bar dataKey={dose2} name="Dose 2" fill="#fd7f0e" barSize="20%" />
    </BarChart>
  )
}

export default VaccinationCoverage


