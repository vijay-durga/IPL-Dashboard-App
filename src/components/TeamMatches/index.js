import {Component} from 'react'
import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard/index'
import LatestMatch from '../LatestMatch/index'

import './index.css'

const url = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoader: true,
    details: [],
  }

  componentDidMount() {
    this.getDetailsOfTeam()
  }

  getDetailsOfTeam = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const result = await fetch(`${url}${id}`)
    const answer = await result.json()

    const updatingValue = {
      teamBannerUrl: answer.team_banner_url,

      latestMatchDetails: {
        id: answer.latest_match_details.id,
        competingTeam: answer.latest_match_details.competing_team,
        competingTeamLogo: answer.latest_match_details.competing_team_logo,
        date: answer.latest_match_details.date,
        firstInnings: answer.latest_match_details.first_innings,
        manOfTheMatch: answer.latest_match_details.man_of_the_match,
        matchStatus: answer.latest_match_details.match_status,
        result: answer.latest_match_details.result,
        secondInnings: answer.latest_match_details.second_innings,
        umpires: answer.latest_match_details.umpires,
        venue: answer.latest_match_details.venue,
      },

      recentMatches: answer.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }
    this.setState({details: updatingValue, isLoader: false})
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  )

  renderTeamMatches = () => {
    const {details} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = details
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={`team-matches-bg-container ${id}`}>
        <div>
          <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        </div>
        <div>
          <LatestMatch latestMatch={latestMatchDetails} />
        </div>
        <ul className="recent-matches-list">
          {recentMatches.map(each => (
            <MatchCard key={each.id} matchData={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoader} = this.state

    // console.log({teamBannerUrl})

    return (
      <div>{isLoader ? this.renderLoader() : this.renderTeamMatches()}</div>
    )
  }
}

export default TeamMatches
