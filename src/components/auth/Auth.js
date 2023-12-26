import React from 'react'
import AuthForm from './AuthForm'
import {UserAuth} from '../../api-helpers/api-helpers.js'
import { useDispatch } from 'react-redux';
import { useractions } from '../../store/index.js';

const Auth = () => {
  const dispatch = useDispatch();

  const getData = (data) => {
    console.log("Auth",data)
    UserAuth(data.inputs,data.signup).then((res)=>{
      console.log(res);
    })
    .then(()=>dispatch(useractions.login()))
    .catch((err)=>{
      console.log(err);
    })
  }
  return (

    <div className="container" style={{width:"30%", marginTop:"60px"}}>
        <AuthForm onSubmit={getData}/>
    </div>
    
  )
}

export default Auth