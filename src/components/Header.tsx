import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

function Header() {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <header className="Header">
      { user ? <div>
          Welcome {user.displayName}!
          { !!user.photoURL && <img src={user.photoURL} alt="" />}
          <button onClick={signOut} >Sign out</button>
        </div> :
        <button onClick={signInWithGoogle} >Sign in with Google</button>
      }
    </header>
  );
}

export default Header;