
import Register from '../components/Register';
import Login from '../components/Login';

export default function Authentication({user,setUser}){

    return(
        <div className="flex mt-12">
          <Register/>

          <Login user={user} setUser={setUser}/>  
        </div>
    )
}
