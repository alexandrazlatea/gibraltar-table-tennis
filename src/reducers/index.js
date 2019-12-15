import { combineReducers } from 'redux';
import UsersData from '../reducers/reducers_users_data';
import Results from '../reducers/reducers_results';
import Challenges from '../reducers/reducer_fetch_chalenge';
import RenderView from '../reducers/reducer_render_view';
import GamesPlayed from '../reducers/reducer_played_games';
import Players from '../reducers/reducers_players';
import TeamsData from '../reducers/reducers_teams';

const rootReducer = combineReducers({
    usersData: UsersData,
    results: Results,
    challenges: Challenges,
    renderView: RenderView,
    playedGames: GamesPlayed,
    players: Players,
    teamsData: TeamsData
});

export default rootReducer;