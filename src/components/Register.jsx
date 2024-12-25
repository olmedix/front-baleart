import { useState } from 'react';

export default function Register(){

    const [registerPassword, setRegisterPassword] = useState(false); 

    const registerPasswordVisibility = () => { 
        setRegisterPassword(!registerPassword); 
    }

    return(

        <div className="w-1/2 mr-5">
                <h2 className="text-3xl font-semibold mb-8">Registra&apos;t</h2>
                <form className="px-5 bg-gray-300 p-4 rounded-xl mb-5">
                    <label htmlFor="name" className="block text-left font-bold ml-2 mb-1 text-lg">Nom <span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="Nom..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="lastName" className="block text-left font-bold ml-2 mb-2 text-lg">Cognoms <span className="text-red-500">*</span></label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Cognoms..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="email" className="block text-left font-bold ml-2 mb-2 text-lg">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="Email..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="phone" className="block text-left font-bold ml-2 mb-2 text-lg">Telèfon <span className="text-red-500">*</span></label>
                    <input type="tel" id="phone" name="phone" required placeholder="Telèfon..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="password" className="block text-left font-bold ml-2 mb-2 text-lg">Contrassenya <span className="text-red-500">*</span></label>
                    <div className="relative w-full">
                        <input 
                            type={registerPassword ? 'text' : 'password'} 
                            id="password" 
                            name="password" 
                            required 
                            placeholder="contrassenya..." 
                            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
                        />
                        <span 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                            onClick={registerPasswordVisibility} > {registerPassword ? '🙈' : '🙉'}
                        </span>
                    </div>

                    <button className="my-5 py-4 px-32 font-semibold bg-slate-600 rounded-full" type="submit">REGISTRA&apos;T</button>
                </form>
        </div>
    )

}