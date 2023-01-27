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
    dataItems1: [],
    dataItems2: [],
    dataItems3: [],
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
      const updatedDataLast = data.last_7_days_vaccination.map(eachData => ({
        vaccineDate: eachData.vaccine_date,
        dose1: eachData.dose_1,
        dose2: eachData.dose_2,
      }))
      const updatedDataAge = data.vaccination_by_age.map(eachData => ({
        age: eachData.age,
        count: eachData.count,
      }))
      const updatedDataGender = data.vaccination_by_gender.map(eachData => ({
        count: eachData.count,
        gender: eachData.gender,
      }))
      this.setState({
        dataItems1: updatedDataLast,
        dataItems2: updatedDataAge,
        dataItems3: updatedDataGender,
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
    const {dataItems1, dataItems2, dataItems3} = this.state
    return (
      <div>
        <div>
          <h1>Vaccination Coverage</h1>
          <VaccinationCoverage dataDetails1={dataItems1} />
        </div>
        <div>
          <h1>Vaccination by gender</h1>
          <VaccinationByGender dataDetails3={dataItems3} />
        </div>
        <div>
          <h1>Vaccination by Age</h1>
          <VaccinationByAge dataDetails2={dataItems2} />
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
