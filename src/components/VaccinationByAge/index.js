import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {dataDetails} = props
  const {count, age} = dataDetails

  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="70%"
        cy="40%"
        data={age}
        startAngle={0}
        endAngle={360}
        outerRadius="100%"
        dataKey={count}
      >
        <Cell name="18-44" fill="#fecba6" />
        <Cell name="44-60" fill="#b3d23f" />
        <Cell name="Above 60" fill="#a44c9e" />
      </Pie>
      <Legend
        iconType="circle"
        layout="vertical"
        verticalAlign="middle"
        align="right"
      />
    </PieChart>
  )
}

export default VaccinationByAge

