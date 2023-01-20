import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    dataItems: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = `https://apis.ccbp.in/covid-vaccination-data`

    const response = await fetch(apiUrl)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.map(eachData => ({
        last7DaysVaccination: eachData.last_7_days_vaccination,
        vaccineDate: eachData.vaccine_date,
        dose1: eachData.dose_1,
        dose2: eachData.dose_2,
        vaccinationByAge: eachData.vaccination_by_age,
        vaccinationByGender: eachData.vaccination_by_gender,
      }))
      this.setState({
        dataItems: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderChartView = () => {
    const {dataItems} = this.state
    return (
      <div>
        <div>
          <h1>Vaccination Coverage</h1>
          {dataItems.last7DaysVaccination.map(eachItem => (
            <VaccinationCoverage dataDetails={eachItem} />
          ))}
        </div>
        <div>
          <h1>Vaccination by gender</h1>
          {dataItems.vaccinationByGender.map(eachItem => (
            <VaccinationByGender dataDetails={eachItem} />
          ))}
        </div>
        <div>
          <h1>Vaccination by Age</h1>
          {dataItems.vaccinationByAge.map(eachItem => (
            <VaccinationByAge dataDetails={eachItem} />
          ))}
        </div>
      </div>
    )
  }

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderChartView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        {this.renderViews()}
      </div>
    )
  }
}

export default CowinDashboard
