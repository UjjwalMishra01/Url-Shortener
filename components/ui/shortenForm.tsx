"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

interface ShortenFormProps{
      handleShortened: () => void;
}
    export default function ShortenForm({handleShortened}:ShortenFormProps){
    
    const [url, setUrl]  = useState<string>('');

    const handleSubmit  = async (e:  React.FormEvent) => {
        e.preventDefault();

       try{
            const response = await fetch('/api/shorten',{
                 method: 'POST',
                 headers:{'Content-Type': 'application/json'},
                 body: JSON.stringify({url}),
            });
            await response.json();
            setUrl('');
            handleShortened();
       }catch(error){
         console.error("Error shortening URL: ", error);
       }
       finally{

       }

        console.log("handleSubmit Function called!!!");
    }

    return(
    <form onSubmit={handleSubmit}  className="mb-4">
        <div className="space-y-4">
            <Input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-12 " type="url" placeholder="Enter the url here" required/>
            <Button className=" p-2 " type="submit">Shorten</Button>
        </div>
    </form>
    );
}