'use client'

import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/user.actions";

const SignOutButton = ({className=""}:{className?:string}) => {
  return ( 
  <form action={signOutUser} className="w-full">
  <Button onClick={()=>{
    signOutUser()
  }} className={`${className} w-full py-4 px-2 h-4 justify-start`} type="button" variant='ghost'>
    Sign out
  </Button> 
  </form>
  );
}
 
export default SignOutButton;