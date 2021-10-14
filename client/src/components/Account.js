import '../style/account.css';

const Account = () => {
    return ( 
        <div className="accountContainer">
            <h2>General Account Settings</h2>
            <hr/>
            <div>
                <p>First Name</p>
                <p>Kanita</p>
                <button>Edit</button>
            </div>
            <hr />
            <div>
                <p>Last Name</p>
                <p>Dokic</p>
                <button>Edit</button>
            </div>
            <hr />
            <div>
                <p>Email</p>
                <p>kdokic1@etf.unsa.ba</p>
                <button>Edit</button>
            </div>
            <hr />
            <div>
                <p>Password</p>
                <p>Set strong password that you're not using elsewhere</p>
                <button>Edit</button>
            </div>
            <hr/>
        </div>
     );
}
 
export default Account;