import Tile from '../../components/tiles/settings/Tile.tsx';
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
          <Tile iconType="list" text="Lists" link="/settings/lists" />
          <Tile iconType="database" text="Database" link="/settings/database" />
          <Tile iconType="duel" text="Duel" link="/settings/duel" />
        </div>
      </div>
    </>

  );
};

export default SettingsPage;
