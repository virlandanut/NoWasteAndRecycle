import "./App.css";
import { Utilizator } from "../../interfaces";
import { useEffect, useState } from "react";
import Autentificare from "./pages/Autentificare/Autentificare";
import { getUtilizatori } from "./utils/Utilizatori";
import InregistrarePersoana from "./pages/Inregistrare/InregistrarePersoana";
function App() {
  const [users, setUsers] = useState<Utilizator[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getUtilizatori();
  //     setUsers(data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <h1>Home page</h1>
    // <div className="App">
    //   {users.map((user) => (
    //     <p key={user.idUtilizator}>{user.username}</p>
    //   ))}
    // </div>
    // <InregistrarePersoana />
  );
}

export default App;
