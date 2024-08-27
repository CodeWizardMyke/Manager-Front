import "./style/AppPrivate.css"
import { SiNginxproxymanager } from "react-icons/si";

function AppPrivate() {
  return (
    <div className="container">
      <header className="auth-header">
        <SiNginxproxymanager/>
        <h4>Manager io</h4>
      </header>
      <section className="auth-section">

        <div className="wrapper-auth">
          <div className="bx-left"></div>
          <div className="bx-rigth">
            <div className="logo-page">
              <SiNginxproxymanager/>
              <h4>LOGIN</h4>
            </div>
            <form>
              <div className="auth-inputs-group">
                <label htmlFor="email">Login</label>
                <input type="email" name="email" id="email"/>
                <span className="error errors-email"></span>
              </div>
              <div className="auth-inputs-group">
                <label htmlFor="password">Senha</label>
                <input type="password" name="password" id="password"/>
                <span className="error errors-password"></span>
              </div>
              <div className="keeplogin">
                <label htmlFor="keeplogin">Manter logado</label>
                <input type="checkbox" name="keeplogin" id="keeplogin" />
              </div>
              <div className="wrapper-button">
                <button className="bt bt-orange">Entrar</button>
              </div>
            </form>
          </div>
        </div>

      </section>
    </div>
  );
}

export default AppPrivate;
