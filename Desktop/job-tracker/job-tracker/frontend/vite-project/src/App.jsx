import JobForm from './components/JobForm';
import JobList from './components/JobList';

function App() {
  return (
    <div className="container">
      <h1>Job Application Tracker</h1>
      <JobForm />
      <JobList />
    </div>
  );
}

export default App;
