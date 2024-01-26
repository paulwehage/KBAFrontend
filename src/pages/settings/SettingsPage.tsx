import Tile from '../../components/tiles/Tile.tsx';
import BackButton from '../../components/buttons/BackButton.tsx';
import './SettingsPage.css';

const SettingsPage = () => {
  return (
    <>
      <BackButton />
      <div className="settings-page">
        <h1>Settings</h1>
        <div className="tiles-container">
          <Tile iconType="user" text="Player" link="/settings/user" />
          <Tile iconType="list" text="Listen" link="/settings/lists" />
          <Tile iconType="database" text="Datenbank" link="/settings/database" />
          <Tile iconType="duel" text="Duel" link="/settings/duel" />
        </div>
      </div>
    </>

  );
};

export default SettingsPage;
