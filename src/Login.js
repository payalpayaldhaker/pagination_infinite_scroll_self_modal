import React from 'react'
import {useState} from 'react'
import axios from 'axios';
import swal from 'sweetalert';

//react functionl components

export default function Login() {
    //state
        const [identifier, setIdentifier] = useState('');
        const [password, setPassword] = useState('');
    //function defination
        let myFunction =()=>{ 
            console.log(identifier);
            console.log(password);

           console.log('okokokoko');

           try {
            axios.post('http://localhost:1337/api/auth/local',{ 
                identifier: identifier,
                password: password,

            })
            
            .then(response =>{
                console.log('well done miss payal ');
                localStorage.setItem('token',response.data.jwt);
                localStorage.setItem('userinformation',JSON.stringify(response.data.user));
                swal("done",JSON.stringify(response.data.user),"success");
                console.log('work donw',response.data.jwt);
                console.log('work donw',response.data.user);
            })
            .catch((error)=>{
             console.log('error',error.response);
             swal("oppps",JSON.stringify(error.response),"error");
            })
            .finally(()=>{
 
            })
               
           } catch (err) {
               console.log(err);
           }
          
           
        }
    //return statement

  return (
            <> 
                <form className="w-50 offset-3">
                    <h1 className="text-center"> Login Form</h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"> Enter your Email address</label>
                        <input type="email"  name="email" value={identifier} onChange={(e)=>{setIdentifier(e.target.value)}} className="form-control" id="email" aria-describedby="emailHelp"/>
                        
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter your Password</label>
                        <input type="password"  name="password"value={password} onChange={(e)=>{ setPassword(e.target.value)}} className="form-control" id="password" aria-describedby="emailHelp"/>
                        
                    </div>
                    <button type="button" onClick={()=>{myFunction()}}> submit Button</button>
                </form>

            </>

  );
}
