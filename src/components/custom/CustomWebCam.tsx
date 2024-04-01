import React, {useCallback, useEffect, useRef, useState} from 'react';
import Webcam from "react-webcam";

//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { handleRegister } from '@/fakebackend/auth';
import { useSocket } from '@/context/socketContext';
import { useToast } from '@/components/ui/use-toast';
import { useNotification } from '@/context/notificationContext';



const CustomWebcam = ({setLoader} : {setLoader:  React.Dispatch<React.SetStateAction<boolean>>}) => {
    //@ts-ignore
    const { socket} =  useSocket();

    const {message, setMessage} = useNotification();

    const {toast} = useToast();

    const webCamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [label, setLabel] = useState<string>("");
    const [file1, setFile1] = useState<string>("");
    const [file2, setFile2] = useState<string>("");
    const [file3, setFile3] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);


    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };

    const capture = useCallback(() => {
        if(label === "") {
            setMessage("Please enter your name.");
            return;
        }
        
        socket.emit("subscribe", uuidv4());
        if(webCamRef.current){
            // const formData = new FormData();
            let file1 = webCamRef.current.getScreenshot();
            let file2 = webCamRef.current.getScreenshot();
            let file3 = webCamRef.current.getScreenshot();
            if(file1 && file2 && file3) {
                setFile1(file1);
                setFile2(file2);
                setFile3(file3);
                handleRegister({label, file1, file2, file3, setMessage, setLoading});
                setLoader(true);
            }
        }
    }, [webCamRef, label, file1, file2, file3]);


    useEffect(() => {
        if(message) {
            toast({
                title: message,
                description: "",
                duration: 5000,
            });
            setMessage(null);
        }
    }, [message])

    const retakeImage = () => {
        setImgSrc(null);
    };

    return (
    <div className="container">
        {
            imgSrc 
            ? <img src={imgSrc} className="w-full h-auto" />
            : (
                

                <div className='flex flex-col justify-center space-y-4'>
                    <div>
                        <Input onChange={e => setLabel(e.target.value)} placeholder='Enter your name..'/>
                    </div>
                    <Webcam
                        ref={webCamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                        height={1000} 
                        width={1000}
                    />
                </div>
                
            )
        }
        <div className='mt-4'>
            {
                imgSrc
                ? <Button onClick={retakeImage}>Retake</Button>
                : (
                <Button 
                variant={"default"}
                onClick={capture}
                disabled = {loading}
                >
                    Capture
                </Button>
                )
            }
        </div>
    </div>
    );
};

export default CustomWebcam;
