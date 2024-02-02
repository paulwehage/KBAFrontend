import BackButton from '../../../components/buttons/BackButton.tsx';
import './DatabaseManagementPage.css';
import {loadInitialListData} from '../../../services/listService.ts';
import {useState} from 'react';
import StatePopUp from '../../../components/pop-ups/StatePopUp.tsx';
import {useNavigate} from 'react-router-dom';
import {clearDatabase} from '../../../services/databaseService.ts';

//@TODO: Implement Database Management Page functionality
const DatabaseManagementPage = () => {
  const [showSuccessPopupList, setShowSuccessPopupList] = useState(false); // Neuer State für das Popup
  const [showSuccessPopupDatabase, setShowSuccessPopupDatabase] = useState(false);
  const {navigate} = useNavigate();

  const handleInitialLoading = async () => {
    try {
      await loadInitialListData();
      setShowSuccessPopupList(true);
    } catch (error) {
      console.error('Failed to load initial list data:', error);
    }
  }

  const handleClearDatabase = async () => {
    try {
      await clearDatabase();
      setTimeout(() => {
        setShowSuccessPopupDatabase(true);
        navigate('/login');
      } , 3000);
    } catch (error) {
      console.error('Failed to clear database:', error);
    }
  }

  return (
        <>
          <BackButton />
          <div className="database-management-container">
            <h1>Database Management</h1>
            <button onClick={handleClearDatabase}>⚠️ Clear Database ⚠️</button>
            <button onClick={handleInitialLoading}>Load lists initially</button>
          </div>
          {showSuccessPopupList && (
            <StatePopUp
              message="Successfully loaded initial list data"
              type="success"
              onClose={() => setShowSuccessPopupList(false)}
            />
          )}
          {showSuccessPopupDatabase && (
            <StatePopUp
              message="Successfully loaded initial list data"
              type="success"
              onClose={() => setShowSuccessPopupDatabase(false)}
            />
          )}
        </>
    )
}

export default DatabaseManagementPage;