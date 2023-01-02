import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teams: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTheDetailsOfIpl()
  }

  getTheDetailsOfIpl = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatingData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))
    this.setState({teams: updatingData, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div testid="loader" className="home-bg-cont-2">
            <Loader type="Oval" color="pink" height={50} width={50} />
          </div>
        ) : (
          <div className="home-bg-cont">
            <div className="img-head-cont">
              <img
                src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
                alt="ipl logo"
                className="ipl-logo"
              />
              <h1 className="heading">IPL DashBoard</h1>
            </div>

            <ul className="teams-cont">
              {teams.map(each => (
                <TeamCard key={each.id} eachTeam={each} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
