import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import TakeoutDiningSharpIcon from "@mui/icons-material/TakeoutDiningSharp";
import AccessTimeFilledSharpIcon from "@mui/icons-material/AccessTimeFilledSharp";
import Faq from "react-faq-component";

const data = {
  title: "Întrebări frecvente",
  rows: [
    {
      title: "Cum pot să caut un container de reciclare potrivit pentru mine?",
      content: (
        <p className="indent-3">
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
        <p className="indent-3">
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
        <p className="indent-3">
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

export default function Home() {
  return (
    <main className="min-w-screen min-h-screen flex justify-center">
      <div className="w-4/5 bg-[#f8f9fa] flex-col justify-start items-start gap-12 xs:flex-col md:flex-row overflow-hidden">
        <section className="flex justify-center items-center gap-10 relative mb-10 p-32">
          <div className="flex-col w-2/3 gap-10 h-full z-10">
            <h1 className="text-6xl font-bold mb-5 text-gray-800">
              Asigură un viitor mai bun prin reciclare
            </h1>
            <div className="flex-col w-full p-2">
              <h2 className="text-gray-600 text-lg mb-10">
                Descoperă cum poți contribui la protejarea mediului
                înconjurător, la crearea unui mediu sustenabil și curat pentru
                generațiile viitoare. Aplicația această vă oferă posibilitatea
                să găsiți punctele de reciclare specifice nevoilor
                dumneavoastră.
              </h2>
            </div>
            <Link to={"/navigare"}>
              <Button
                sx={{
                  borderRadius: 28,
                  width: "230px",
                  height: "50px",
                  fontWeight: 600,
                }}
                variant="contained"
                color="success"
                size="large">
                VREAU SĂ RECICLEZ
              </Button>
            </Link>
          </div>
          <div className="w-1/2">
            <img className="relative z-10" src="/nature2.svg" alt="" />
          </div>
          <img
            className="absolute w-5/6 mt-16 ml-36 z-0"
            src="/blob.svg"
            alt=""
          />
        </section>
        <section className="w-full flex-col p-32">
          <div className="flex justify-center mb-10">
            <h2 className="text-4xl font-bold text-gray-700">
              Care sunt avantajele acestei aplicații?
            </h2>
          </div>
          <div className="w-full flex gap-5">
            <div className="flex-col items-center justify-center w-1/3 p-7 border rounded-md">
              <div className="flex gap-2 mb-4">
                <FmdGoodSharpIcon color="success" fontSize="large" />
                <h3 className="text-gray-700 text-xl font-semibold self-center">
                  Localizare puncte reciclare
                </h3>
              </div>
              <p className="text-lg text-gray-500">
                Această platformă vă oferă posibilitatea să localizați punctele
                de reciclare potrivite nevoilor dumneavoastră.
              </p>
            </div>
            <div className="flex-col items-center justify-center w-1/3 p-7 border rounded-md">
              <div className="flex gap-2 mb-4">
                <TakeoutDiningSharpIcon color="success" fontSize="large" />
                <h3 className="text-gray-700 text-xl font-semibold self-center">
                  Închiriere containere
                </h3>
              </div>
              <p className="text-lg text-gray-500">
                Această platformă pune la dispoziție diferite tipuri de
                containere spre închiriere.
              </p>
            </div>
            <div className="flex-col items-center justify-center w-1/3 p-7 border rounded-md">
              <div className="flex gap-2 mb-4">
                <AccessTimeFilledSharpIcon color="success" fontSize="large" />
                <h3 className="text-gray-700 text-xl font-semibold self-center">
                  Comoditate
                </h3>
              </div>
              <p className="text-lg text-gray-500">
                Această platformă vă va oferi o experiență plăcută și intuitivă
                deoarece a fost proiectată cu gândul la utilizator.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full flex-col p-32 mb-32 bg-gray-100">
          <div className="w-full flex gap-20 mb-32">
            <div className="w-1/2 flex-col">
              <h1 className="text-gray-700 text-5xl font-bold mb-5">
                Localizare puncte de reciclare
              </h1>
              <p className="text-lg text-gray-600">
                Funcționalitatea principală a acestei aplicații este găsirea
                celui mai apropiat container de reciclare specific nevoilor
                utilizatorilor. Acest lucru este gratuit pentru orice tip de
                utilizator în cadrul platformei.
              </p>
              <ul className="ml-10 mt-10 text-lg list-disc">
                <li className="marker:text-green-600 marker:text-2xl text-gray-700 font-bold">
                  Containerele sunt oferite de partenerii noștrii.
                </li>
                <li className="marker:text-green-600 marker:text-2xl text-gray-700 font-bold">
                  Acest serviciu este{" "}
                  <span className="text-green-600">gratuit</span>.
                </li>
                <li className="marker:text-green-600 marker:text-2xl text-gray-700 font-bold">
                  Construim un mediu durabil împreună.
                </li>
              </ul>
            </div>
            <div className="w-1/2">
              <img src="/map.svg" alt="" />
            </div>
          </div>
          <div className="w-full flex gap-20">
            <div className="w-1/2">
              <img src="/rent.svg" alt="" />
            </div>
            <div className="w-1/2 flex-col">
              <h1 className="text-gray-700 text-5xl font-bold mb-5">
                Închiriere containere
              </h1>
              <p className="text-lg text-gray-600">
                Această platformă pune la dispoziție spre închiriere diferite
                tipuri de containere:
              </p>
              <ul className="ml-10 mt-10 text-lg list-disc">
                <li className="marker:text-green-600 marker:text-2xl text-gray-700 font-bold">
                  Containere de reciclare{" "}
                  <span className="text-gray-600 font-normal text-base">
                    - sunt oferite spre închiriere
                    <span className="font-semibold"> doar</span> persoanelor
                    juridice care le pun la dispoziție utilizatorilor în mod
                    gratuit.
                  </span>
                </li>
                <li className="marker:text-green-600 marker:text-2xl text-gray-700 font-bold">
                  Containere de depozitare fixe{" "}
                  <span className="text-gray-600 font-normal text-base">
                    - sunt oferite spre închiriere utilizatorilor care doresc să
                    depoziteze diferite bunuri materiale.
                  </span>
                </li>
                <li className="marker:text-green-600 marker:text-2xl text-gray-700 font-bold">
                  Containere de depozitare mobile{" "}
                  <span className="text-gray-600 font-normal text-base">
                    - sunt oferite spre închiriere utilizatorilor care doresc să
                    depoziteze materiale de construcții.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="p-10 mb-32">
          <Faq data={data} styles={styles} config={config} />
        </section>
      </div>
    </main>
  );
}
