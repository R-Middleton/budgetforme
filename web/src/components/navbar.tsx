export const Navbar = () => {
  return (
    <nav className="container relative mx-auto bg-mycream-500 p-6">
      <div className="flex items-center justify-end">
        <div className="flex space-x-6">
          <a href="#" className="">
            Login
          </a>
          <a href="#">Register</a>
        </div>
      </div>
    </nav>
  )
}
