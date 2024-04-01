import axios from '@/fakebackend'


const handleLogin = async ({
    image, 
    setMessage,
    setLoading
    }: {
    image: string,
    setMessage:  React.Dispatch<React.SetStateAction<string | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,

    }) => {
    try {
        setLoading(true);
        const formData = new FormData();
        formData.append("checkImg", image);

        const {data} = await axios.post("/api/fetch-face", formData);
        console.log(data);
        setMessage(`hello, ${data.result[0]._label}`)

    } catch (error) {
        console.log("error in handleLogin", error);
        setMessage("authentication failed, please try again");
    } finally {
        setLoading(false);
    }
}



interface registerDataProps {
    message: string;
    result: boolean;
}

const handleRegister = async ({
    label,
    file1,
    file2,
    file3,
    setMessage,
    setLoading
    }: {
    label: string;
    file1: string;
    file2: string;
    file3: string;
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
    try {
        setLoading(true);
        const formData = new FormData();
        let name = label.trim().toLocaleLowerCase();
        formData.append('label', name);

         //@ts-ignore
        formData.append('File1', file1);
         //@ts-ignore
        formData.append('File2', file2);
         //@ts-ignore
        formData.append('File3', file3);

        const {data}: {data: registerDataProps} = await axios.post("/api/create-face", formData);
        if(data.message) setMessage(data.message);
    
    } catch (error) {

        setMessage("Registeration failed, Please try again.")
    } finally {
        setLoading(false);
    }
}

export {handleLogin, handleRegister};