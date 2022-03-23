import logo from './logo.png';

function Header() {
  return (
    <header className="App-header">  
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className='title'>Tic Tac Toe</h1>       
    </header>
  )
}

export default Header