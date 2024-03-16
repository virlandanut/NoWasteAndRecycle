import { mesajEroareInterfata } from '../../../../interfaces';

const MesajEroare: React.FC<mesajEroareInterfata> = ({ mesaj }) => {
  return <p className='text-red-600 font-bold'>{mesaj}</p>;
};

export default MesajEroare;
