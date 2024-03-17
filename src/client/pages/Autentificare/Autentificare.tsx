import { Button, Paper, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginValues } from "../../types";
import { verificareLogin } from "../../utils/Validari";
import { useState } from "react";
import Header from "../../componente/Titluri/Header";

export default function Autentificare() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>();

  const [afisareEroare, setAfisareEroare] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginValues> = async data => {
    try {
      const raspuns = await fetch(process.env.API_BASE + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      if (raspuns.ok) {
        navigate("/");
      } else {
        setAfisareEroare(true);
        throw new Error(`Eroare HTTP! Status: ${raspuns.status}`);
      }
    } catch (eroare) {
      console.log("Probleme la autentificare: ", eroare);
      setAfisareEroare(true);
    }
  };

  return (
    <div className='flex justify-center items-center xs:w-80 md:w-96 lg:min-w-[750px]'>
      <Paper
        className='flex xs:flex-col xs:justify-center xs:items-center lg:flex-row lg:justify-center lg:items-center xl:flex-row '
        variant='elevation'
        elevation={3}
      >
        <div className='w-full h-1/2 flex justify-center items-center bg-[#a0e4b0] p-6'>
          <img className='w-2/3' src='/login.svg' alt='' />
        </div>
        <div className='w-full h-1/2 flex justify-center items-center p-3'>
          <form
            className='w-full h-1/2 flex flex-col justify-center items-center xs:pt-2 xs:pb-2 xs:pl-2 xs:pr-2 xs:gap-2 md:gap-3'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Header mesaj='Autentificare' marime='lg' />
            <TextField
              className='w-full xs:mb-10'
              {...register("username", verificareLogin.username)}
              error={afisareEroare || !!errors.username}
              label='Nume de utilizator'
              color='success'
              type='text'
              variant='outlined'
              size='small'
              name='username'
              helperText={errors && errors.username?.message}
            />
            <TextField
              className='w-full'
              {...register("parola", verificareLogin.parola)}
              error={afisareEroare || !!errors.parola}
              label='Parolă'
              color='success'
              variant='outlined'
              type='password'
              size='small'
              name='parola'
              helperText={
                (afisareEroare && "Datele sunt incorecte") || (errors && errors.username?.message)
              }
            />
            <div className='flex xs:flex-col xs:w-full xs:gap-2 md:gap-3 lg:flex-row lg:items-center lg:justify-center'>
              <Button className='lg:w-1/2' type='submit' variant='contained' color='success'>
                Autentificare
              </Button>
              <Link className='lg:w-1/2' to='/register'>
                <Button className='w-full' variant='outlined' color='success'>
                  Înregistrare
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}
