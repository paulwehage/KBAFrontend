import BackButton from '../../../components/buttons/BackButton.tsx';
import './DatabaseManagementPage.css';

//@TODO: Implement Database Management Page functionality
const DatabaseManagementPage = () => {
    return (
        <>
          <BackButton />
          <div className="database-management-container">
            <h1>Database Management</h1>
            <button>⚠️ Clear Database ⚠️</button>
            <button>Load lists initially</button>

          </div>
        </>
    )
}

export default DatabaseManagementPage;