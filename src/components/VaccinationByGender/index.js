import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {graphDetails} = props
  const {count, gender} = graphDetails

  return (
    <PieChart width={1000} height={300}>
      <Pie
        cx="70%"
        cy="40%"
        data={gender}
        startAngle={0}
        endAngle={360}
        innerRadius="40%"
        outerRadius="70%"
        dataKey={count}
      >
        <Cell name="Male" fill="#fecba6" />
        <Cell name="Female" fill="#b3d23f" />
        <Cell name="Others" fill="#a44c9e" />
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

export default VaccinationByGender

