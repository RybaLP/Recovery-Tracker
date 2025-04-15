import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-dropdown-menu"


const LandingPage = () => {
  return (
    <div className="flex items-center justify-center">
    <Card className="p-10">

      <CardHeader>
        <CardTitle>RecoveryTracker</CardTitle>
        <CardDescription>Please Sign In</CardDescription>
      </CardHeader>
      <Input placeholder="login"></Input>
      <Input placeholder="password"></Input>
      
      <Button className="bg-green-400">
        Submit
      </Button>
  
  </Card>
    </div>
  )
}

export default LandingPage