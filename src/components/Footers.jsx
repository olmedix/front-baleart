export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Nombre y descripción */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold ml-5">Baleart</h2>
            <p className="text-sm ml-5">Explora els espais únics de les Illes Balears.</p>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm mr-5">
              &copy; {new Date().getFullYear()} Baleart. Fet per tu ❤️
            </p>
          </div>
        </div>
      </footer>
    );
  }
  