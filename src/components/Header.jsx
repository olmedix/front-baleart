import Navigation from "./Navigation"

export default function Header({setUser}){
    return(
        <header className="flex ">
            <h1 className="font-bold mr-6">
                Baleart
            </h1>

            <Navigation setUser={setUser}/>
        </header>
    )
}