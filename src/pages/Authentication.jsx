
export default function Authentication(){
    return(
        <div className="flex">
            <div className="w-1/2">
                <h2 className="text-3xl font-semibold mb-8">Registra&apos;t</h2>
                <form className="px-5">
                    <label htmlFor="name" className="block text-left font-bold ml-2 mb-1 text-lg">Nom <span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="Nom..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="lastName" className="block text-left font-bold ml-2 mb-2 text-lg">Cognoms <span className="text-red-500">*</span></label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Cognoms..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="email" className="block text-left font-bold ml-2 mb-2 text-lg">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="Email..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="phone" className="block text-left font-bold ml-2 mb-2 text-lg">Teléfon <span className="text-red-500">*</span></label>
                    <input type="tel" id="phone" name="phone" required placeholder="Teléfon..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="password" className="block text-left font-bold ml-2 mb-2 text-lg">Contrassenya <span className="text-red-500">*</span></label>
                    <input type="password" id="password" name="password" required placeholder="contrassenya..." className="block p-3 rounded-xl border border-gray-300  w-full "/>


                    <button className="my-5 py-4 px-32 bg-slate-300 rounded-full" type="submit">REGISTRA&apos;T</button>
                </form>
            </div>

            <div className="w-1/2">
                <form>
                    <label htmlFor="email" className="block">Email</label>
                    <input type="email" id="email" name="email" required className="block"/>

                    <label htmlFor="password" className="block">Contrasenya</label>
                    <input type="password" id="password" name="password" required className="block"/>
                </form>
            </div>
        </div>
    )
}