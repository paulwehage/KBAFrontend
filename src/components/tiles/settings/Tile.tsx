import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faList, faDatabase, faChessKnight } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import './Tile.css';

const Tile = ({ iconType, text, link }) => {
  const navigate = useNavigate();

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'user':
        return <FontAwesomeIcon icon={faUser} />;
      case 'list':
        return <FontAwesomeIcon icon={faList} />;
      case 'database':
        return <FontAwesomeIcon icon={faDatabase} />;
      case 'duel':
        return <FontAwesomeIcon icon={faChessKnight} />;
      default:
        return null;
    }
  };

  return (
    <div className="tile" onClick={() => navigate(link)}>
      <div className="tile-icon">{getIcon(iconType)}</div>
      <span className="tile-text">{text}</span>
    </div>
  );
};

export default Tile;
