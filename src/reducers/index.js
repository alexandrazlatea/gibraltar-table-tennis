import { combineReducers } from 'redux';
import UsersData from '../reducers/reducers_users_data';
import Results from '../reducers/reducers_results';
import Challenges from '../reducers/reducer_fetch_chalenge';
import RenderView from '../reducers/reducer_render_view';
import GamesPlayed from '../reducers/reducer_played_games';
import Players from '../reducers/reducers_players';

const rootReducer = combineReducers({
    usersData: UsersData,
    results: Results,
    challenges: Challenges,
    renderView: RenderView,
    playedGames: GamesPlayed,
    players: Players
});

export default rootReducer;