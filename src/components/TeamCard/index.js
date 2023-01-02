import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {name, id, teamImageUrl} = eachTeam

  return (
    <Link to={`team-matches/${id}`} className="link-items">
      <li className="teamCard-cont">
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="para">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
