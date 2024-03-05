import "./App.css";
import { Utilizator } from "../server/interfaces";
import { useEffect, useState } from "react";
import Autentificare from "./components/Autentificare/Autentificare";
import { getUtilizatori } from "./utils/Utilizatori";
import InregistrarePersoana from "./components/Inregistrare/InregistrarePersoana";
function App() {
  const [users, setUsers] = useState<Utilizator[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUtilizatori();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    // <div className="App">
    //   {users.map((user) => (
    //     <p key={user.idUtilizator}>{user.username}</p>
    //   ))}
    // </div>
    <InregistrarePersoana />
  );
}

export default App;
