import { Card } from '@mui/material'

const InfoAcelasiProprietar = () => {
  return (
    <Card className='w-full p-5 flex flex-col items-center gap-3' variant='outlined'>
        <img className='w-2/3' src="/proprietar_container.svg" alt="" />
        <section>
            <h1 className='text-red-400 font-bold text-center'>Nu puteți închiria acest container deoarece sunteți proprietarul acestuia!</h1>
        </section>
    </Card>
  )
}

export default InfoAcelasiProprietar