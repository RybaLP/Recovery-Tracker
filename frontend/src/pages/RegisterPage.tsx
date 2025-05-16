import { RegisterUser } from "@/api/userApi"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { IRegisterUser } from "@/interfaces/registerUser"
import { useState } from "react"
import * as EmailValidator from 'email-validator';
import toast from 'react-hot-toast';



const RegisterPage = () => {

    const notifySuccessful = () => toast('Register successful!');
    const notifyNegative = () => toast("Couldn't register - Error");

    const [registerData, setRegisterData] = useState<IRegisterUser>({
        login : "",
        password : "",
        email : "",
        firstName : "",
        lastName : ""
    })

    const handleChanges = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRegisterData(prevState => ({...prevState, [e.target.name] : e.target.value}))
    }

    const handleSubmit = async (e : React.FormEvent) =>{

        e.preventDefault()

        const { login, password, email, firstName, lastName} = registerData;
        if (!login || !password || !email) {
            alert("Please fill in all fields.");
            return;
        }

        if(login.length < 3 && login.length > 20){
            alert("Wrong login")
            throw new Error("Wrong email");
        }

        if(password.length < 3 && password.length > 20){
            alert("Wrong password")
            throw new Error("Wrong password");
        }

        if(!EmailValidator.validate(email)){
            alert("Wrong email")
            throw new Error("Wrong email! ");
        }

        try {
            await RegisterUser(registerData);
        } 
        catch (error) {
            notifyNegative();
            throw new Error("Error with registering! ");
        }
        notifySuccessful();
        setRegisterData({
            login : "",
            password : "",
            email : "",
            firstName : "",
            lastName : ""
        })

        alert("Successfuly Registered : ) ");
    }

  return (
    <Card className="p-10">

      <CardHeader>
        <CardTitle>Recovery Tracker</CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
        <form onSubmit={handleSubmit}>
            <Input placeholder="login" name="login" value={registerData.login} onChange={handleChanges}></Input>
            <Input placeholder="password" name="password" value={registerData.password} onChange={handleChanges}></Input>
            <Input placeholder="email" name="email" value={registerData.email} onChange={handleChanges}></Input>
            <Input placeholder="firstName" name="firstName" value={registerData.firstName} onChange={handleChanges}></Input>
            <Input placeholder="lastName" name="lastName" value={registerData.lastName} onChange={handleChanges}></Input>
        
            <Button className="p-10" type="submit">
                Submit
            </Button>
        </form>
  </Card>
  )
}

export default RegisterPage