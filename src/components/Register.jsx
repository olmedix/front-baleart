import { useState } from 'react';
import { register } from '../services/api';

export default function Register(){

    const [registerPassword, setRegisterPassword] = useState(false); 
    const [isSubmitting,setIsSubmitting]= useState(false);
    const [message, setMessage] = useState('');
    const [passwordError,setPasswordError]=useState('');
    const [formData,setFormData] = useState({
        name:'',
        lastName:'',
        email:'',
        phone:'',
        password:''
    });

    const handleInputChange = (e) =>{
        const {name , value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'password' || name === 'confirmPassword') {
            setPasswordError('');
        }
    }

    const handleSubmit= async (e) =>{
        e.preventDefault();
        setMessage('');
        setPasswordError('');

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Les contrasenyes no coincideixen');
            return;
        }

        setIsSubmitting(true);

        try {
            await register(formData); // Usamos la función del servicio.
            setMessage('¡Registre amb èxit! Ara pots iniciar sessió.');
            setFormData({ name: '', lastName: '', email: '', phone: '', password: '', confirmPassword:'' });
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    
    };

    const registerPasswordVisibility = () => { 
        setRegisterPassword(!registerPassword); 
    }

    return(

        <div className="w-1/2 mr-5">
                <h2 className="text-3xl font-semibold mb-8">Registra&apos;t</h2>
                <form className="px-5 bg-gray-300 p-4 rounded-xl mb-5" onSubmit={handleSubmit}>
                    <label htmlFor="name" className="block text-left font-bold ml-2 mb-1 text-lg">Nom <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required placeholder="Nom..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="lastName" className="block text-left font-bold ml-2 mb-2 text-lg">Cognoms <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName} 
                        onChange={handleInputChange}
                        required placeholder="Cognoms..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="email" className="block text-left font-bold ml-2 mb-2 text-lg">Email <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email} 
                        onChange={handleInputChange}
                        required placeholder="Email..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="phone" className="block text-left font-bold ml-2 mb-2 text-lg">Telèfon <span className="text-red-500">*</span></label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required placeholder="Telèfon..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="password" className="block text-left font-bold ml-2 mb-2 text-lg">Contrasenya <span className="text-red-500">*</span></label>
                    <div className="relative w-full">
                        <input 
                            type={registerPassword ? 'text' : 'password'} 
                            id="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange} 
                            required 
                            placeholder="contrasenya..." 
                            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
                        />
                        <span 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                            onClick={registerPasswordVisibility} > {registerPassword ? '🙈' : '🙉'}
                        </span>
                    </div>

                    <label htmlFor="password" className="block text-left font-bold ml-2 mb-2 text-lg">Confirma contrasenya <span className="text-red-500">*</span></label>
                    <div className="relative w-full">
                        <input 
                            type={registerPassword ? 'text' : 'password'} 
                            id="confirmPassword" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange} 
                            required 
                            placeholder="Confirma contrasenya..." 
                            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
                        />
                        <span 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                            onClick={registerPasswordVisibility} > {registerPassword ? '🙈' : '🙉'}
                        </span>
                    </div>
                    {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}


                    <button
                     className="my-5 py-4 px-32 font-semibold bg-slate-600 rounded-full" 
                     type="submit">
                     {isSubmitting ? "Enviant" : "REGISTRA'T"}
                    </button>
                    {message && <p className="mt-4 text-center">{message}</p>}
                </form>
        </div>
    )

}