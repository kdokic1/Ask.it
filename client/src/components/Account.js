import { useEffect, useState } from 'react';
import '../style/account.css';
import { getAccountDetails } from '../helpers/userHelper';
import { editAccountDetails } from '../helpers/userHelper';
import Swal from 'sweetalert2';

const Account = () => {
    const [selectEdit, setSelectEdit] = useState({firstName: false, lastName: false, email: false, password: false});
    const [account, setAccount] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [emailError, setEmailError] = useState('');

    useEffect(async () => {
        const accountDetails = await getAccountDetails();
        setFirstName(accountDetails.firstName);
        setLastName(accountDetails.lastName);
        setEmail(accountDetails.email);
        setAccount({firstName: accountDetails.firstName, lastName: accountDetails.lastName, email: accountDetails.email});
    }, []);

    const editHandler = (part) => {
        setSelectEdit({...selectEdit, [part]: true});
    };

    const onCancelClick = (part) => {
        setSelectEdit({...selectEdit, [part]: false})
        setEmailError('');
    };

    const onSaveClick = async (part) => {
        var data = {
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        const response = await editAccountDetails(data);

        if(response.ok) {
            const editedAcc = await response.json();
            setAccount({firstName: firstName, lastName: lastName, email: email});
            onCancelClick(part);
            Swal.fire({
                icon: 'success',
                title: 'Your changes have been saved.',
                showConfirmButton: false,
                timer: 1500
              })
        }
        else if (response.status === 401) {
            const err = await response.json();
            setEmailError(err);
        }
    };

    return ( 
        <div className="accountContainer">
            <h2>General Account Settings</h2>
            <hr/>
            <div>
                <p>First Name</p>
                <p>{account.firstName}</p>
                <button onClick={() => editHandler("firstName")} >Edit</button>
            </div>
            { selectEdit.firstName && <div className="editContainer" >
                <input
                    type="text"
                    placeholder="enter your first name"
                    required
                    value={firstName}
                    onChange = {(e) => setFirstName(e.target.value)}
                />
                <button onClick={() => onSaveClick("firstName")} >Save</button>
                <button onClick={() => onCancelClick("firstName")} >Cancel</button>
            </div> }
            <hr />
            <div>
                <p>Last Name</p>
                <p>{account.lastName}</p>
                <button onClick={() => editHandler("lastName")} >Edit</button>
            </div>
            { selectEdit.lastName && <div className="editContainer" >
                <input
                    type="text"
                    placeholder="enter your last name"
                    required
                    value={lastName}
                    onChange = {(e) => setLastName(e.target.value)}
                />
                <button onClick={() => onSaveClick("lastName")} >Save</button>
                <button onClick={()=> onCancelClick("lastName")} >Cancel</button>
            </div> }
            <hr />
            <div>
                <p>Email</p>
                <p>{account.email}</p>
                <button onClick={() => editHandler("email")} >Edit</button>
            </div>
            { selectEdit.email && <div className="editContainer" >
                <input
                    type="text"
                    placeholder="enter your email address"
                    required
                    value={email}
                    onChange = {(e) => setEmail(e.target.value)}
                />
                <button onClick={() => onSaveClick("email")} >Save</button>
                <button onClick={()=> onCancelClick("email")} >Cancel</button>
            </div> }
            <p className="emailError">{emailError}</p>
            <hr />
            <div>
                <p>Password</p>
                <p>Set strong password that you're not using elsewhere</p>
                <button onClick={() => editHandler("password")} >Edit</button>
            </div>
            { selectEdit.password && 
                <div className="editContainer" >
                    <p>Current password</p>
                    <input
                        type="password"
                        placeholder="enter your current password"
                        required
                        value={currentPassword}
                        onChange = {(e) => setCurrentPassword(e.target.value)}
                    />
                </div> 
            }
            { selectEdit.password && 
                <div className="editContainer" >
                    <p>New password</p>
                    <input
                        type="password"
                        placeholder="enter your new password"
                        required
                        value={newPassword}
                        onChange = {(e) => setNewPassword(e.target.value)}
                    />
                    <button>Save</button>
                    <button onClick={()=> onCancelClick("password")} >Cancel</button>
                </div> 
            }
            <hr/>
        </div>
     );
}
 
export default Account;