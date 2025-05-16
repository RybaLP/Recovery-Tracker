import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ILoginUser } from "@/interfaces/loginUser"
import { useState } from "react"
import { LoginUser } from "@/api/userApi"
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/authStore"



const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login)

  const errorNotify = () => toast('Login error');
  const successfulNotify = () => toast("Login success! ");

  let [loginData, setLoginData] = useState<ILoginUser>({
    login: "",
    password: ""
  })

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loginData.login.length < 3 && loginData.login.length > 25) {
      errorNotify();
      throw new Error("Wrong login");
    }

    if (loginData.password.length < 5 && loginData.password.length > 50) {
      errorNotify();
      throw new Error("Wrong password");
    }

    try {
      const succes = await login(loginData.login, loginData.password);
      if (succes) {
        successfulNotify()
        navigate('/main')
      }

    } catch (error) {
      throw new Error("Couldn't signed in");
    }

  }


  return (
    <div>
      <div className="flex items-center justify-center">
        <Card className="p-10">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>RecoveryTracker</CardTitle>
              <CardDescription>Please Sign In</CardDescription>
            </CardHeader>
            <Input placeholder="login" value={loginData.login} onChange={handleChanges} name="login"></Input>
            <Input placeholder="password" value={loginData.password} onChange={handleChanges} name="password"></Input>

            <Button type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage