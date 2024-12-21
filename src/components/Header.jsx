import Navigation from "./Navigation"

export default function Header(){
    return(
        <header className="flex ">
            <h1 className="font-bold mr-6">
                Baleart
            </h1>

            <Navigation/>
        </header>
    )
}