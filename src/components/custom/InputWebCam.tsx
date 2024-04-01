import React, {useEffect, useRef, useState} from 'react'
import Webcam from "react-webcam";
import { Button } from '../ui/button';
import { handleLogin } from '@/fakebackend/auth';
import { useNotification } from '@/context/notificationContext';
import { useToast } from '../ui/use-toast';



const InputWebCam = ({setLoader} : {setLoader:  React.Dispatch<React.SetStateAction<boolean>>}) => {
    const webCamRef = useRef<Webcam>(null);
    const {message, setMessage} = useNotification();
    const {toast} = useToast();

    const [loading, setLoading] = useState<boolean>(false);

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const captureImage = () => {
        if(webCamRef.current) {
            const image = webCamRef.current.getScreenshot();
            if(image) handleLogin({image: image, setMessage, setLoading});
            setLoader(true);
        }
    };

    useEffect(() => {
        if(message) {
            toast({
                title: message,
                duration: 5000,
            });
            setMessage(null);
        }
    }, [message])

    return (
    <div className='flex flex-col justify-center space-y-4'>
        <Webcam
            ref={webCamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            height={1000} 
            width={1000}
        />
        <div>
            <Button
                variant = {'default'}
                onClick = {captureImage}
                disabled = {loading}
            >
                Login
            </Button>
        </div>
    </div>
    )
}

export default InputWebCam