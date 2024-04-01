import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import './App.css'
import CustomWebcam from './components/custom/CustomWebCam';
import InputWebCam from './components/custom/InputWebCam';
import { useSocket } from './context/socketContext';
import { ProgressDemo } from './components/custom/ProgressBar';

function App() {

  //@ts-ignore
  const {socket} = useSocket();
  const progressRef = useRef(null);

  const [data, setData] = useState<number>(0);

  const [loader, setloader] = useState<boolean>(false);
  
  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');
    });

    return () => {
      socket.off("connect", () => {
        console.log("socket disconnected");
      });
    }
  }, []);
  const handleLoaderData = useCallback(({counter}: {counter: string}) => {

    setData(Number(counter));
    if(Number(counter) === 100) {
      setloader(false);
      setData(0);
    }
  }, []);

  useEffect(() => {
    socket.on("loader:data", handleLoaderData);

    return () => {
      socket.off("loader:data", handleLoaderData);
    }
  }, [handleLoaderData]);

  useEffect(() => {
    if(progressRef.current) 
      if(loader){
        //@ts-ignore
        progressRef.current.classList.remove("hide");
      }else {
        //@ts-ignore
        progressRef.current.classList.add("hide");
      }
  }, [loader])

  return (
    <div className='flex flex-col justify-center items-center mt-16'>
      <div ref={progressRef} className='mb-4 '>
          <ProgressDemo data = {data}/>
      </div>
      <Tabs defaultValue="register" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login By Face Id</CardTitle>
            <CardDescription>
              You can login through your face id
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <InputWebCam setLoader = {setloader}/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register by Face Id</CardTitle>
            <CardDescription>
              Capture your face here to register into the website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <CustomWebcam setLoader = {setloader}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
      
    </div>
  )
}

export default App
