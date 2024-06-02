import Faq from "react-faq-component";
import { Link } from 'react-router-dom';

const data = {
  title: "Întrebări frecvente",
  rows: [
    {
      title: "Cum pot să caut un container de reciclare potrivit pentru mine?",
      content: (
        <p>
          Pentru a găsi un container de reciclare potrivit pentru tipul de deșeu
          pe care doriți să-l reciclați puteți accesa pagina de{" "}
          <Link to={"/navigare"}>
            <span className="text-green-700 font-semibold">navigare</span>
          </Link>{" "}
          unde puteți completa un formular iar aplicația vă va oferi cea mai
          rapidă rută până la acesta.
        </p>
      ),
    },
    {
      title:
        "Pot adăuga un container de închiriere dacă sunt o persoană fizică?",
      content: (
        <p>
          Din păcate, nu. În acest moment,{" "}
          <span className="text-gray-600 font-semibold">doar</span> persoanele
          juridice pot adăuga containere de închiriere pe această platformă.
        </p>
      ),
    },
    {
      title:
        "Sunt o persoană juridică dar nu pot adăuga un container spre închiriere. De ce se întâmplă acest lucru?",
      content: (
        <p>
          Deoarece ne dorim să oferim o experiență sigură și plăcută
          utilizatorilor noștri,{" "}
          <span className="text-gray-600 font-semibold">doar</span> persoanele
          juridice care sunt aprobate pot posta anunțuri de închiriere pe
          această platformă. Acest lucru durează, în medie, între 24-48 de ore
          de la crearea contului după ce un administrator a verificat datele
          firmei. Înțelegem că nu este ideal, dar este important pentru noi să
          oferim o experiență cât mai plăcută și să excludem orice fel de
          abuzuri asupra platformei și a utilizatorilor care o folosesc.
        </p>
      ),
    },
  ],
};

const styles = {
  containerPadding: "16px",
  bgColor: "#f8f9fa",
  titleTextColor: "#374151",
  titlePaddingLeft: "16px",
  rowTitleColor: "#4b5563",
  rowTitlePaddingLeft: "16px",
  rowContentColor: "grey",
  rowContentPaddingTop: "8px",
  rowContentPaddingRight: "16px",
  rowContentPaddingBottom: "8px",
};

const config = {
  animate: true,
  tabFocus: true,
};

const IntrebariFrecvente = () => {
  return <Faq data={data} styles={styles} config={config} />;
}

export default IntrebariFrecvente