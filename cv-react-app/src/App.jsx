import GeneralInfo from "./Components/GeneralInfo";
import EducationInfo from "./components/EducationInfo";
import PracticalExprience from "./Components/PracticalExprience";
import "./Styles/form.css";

function App() {
   return (
    <div className="container">
      <h1 style={{color:"#003049"}}>CV Application</h1>

      <GeneralInfo />
      <EducationInfo />
      <PracticalExprience />
      <button type="submit">Submit</button>
    </div>
  );
}

export default App
