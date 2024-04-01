import React, {useState} from 'react';


interface NotificationContextProps {
    message: string | null;
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const initialNotificationContext: NotificationContextProps = {
    message: null,
    setMessage: () => {} // Initial empty function
};

const NotificationContext = React.createContext<NotificationContextProps>(initialNotificationContext);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState<string | null>(null);

    return (
        <NotificationContext.Provider value = {{message, setMessage}}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;

export const useNotification = () => React.useContext(NotificationContext);