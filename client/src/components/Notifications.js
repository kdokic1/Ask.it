import { useEffect, useState } from 'react';
import { getUserNotifications } from '../helpers/notificationHelper';
import '../style/notifications.css';

const Notifications = () => {
    const [numberOfNewNotif, setNumberOfNewNotif] = useState(0);
    const [notifications, setNotifications] = useState([]);


    useEffect(async () => {
        const response = await getUserNotifications();
        const notif = await response.json();
        setNotifications(notif);

    }, []);

    return ( 
        <div className="notifications">
            <h3>What AskIt community think about your questions?</h3>
            {notifications.map((notif) => (
                <div key={notif.id}>
                    <p>{notif.event}</p>
                    <hr/>
                </div>
            ))}
        </div>
     );
}
 
export default Notifications;