"use client"
import React, { useEffect, useState } from 'react';
import Source from './Source';
import Destination from './Destination';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alertproceed } from './Alert-proceed';
import { handleClientScriptLoad } from 'next/script';
import toast from 'react-hot-toast';

interface searchprop {
    username: string | undefined;
    email: string | undefined;
}

const Search = ({username,email}:searchprop) => {
    
    const [selectedItem, setSelectedItem] = useState("");
    const [destSelectedItem, setDestSelectedItem] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [srcDistance, setSrcDistance] = useState<number>(0);
    const [destDistance, setDestDistance] = useState<number>(0);
    const [numberofpassenger,setNumberOfPassenger] = useState<number>(0);


    const handleSourceSelected = (item:any) => {
        setSelectedItem(item.place);
        setSrcDistance(item.distance);
    };

    const handleDestinationSelected = (item:any) => {
        setDestSelectedItem(item.place);
        setDestDistance(item.distance);
    };
    
    const calculatePrice = () => {
        const distance = Math.abs(destDistance - srcDistance);
        if (distance >= 35) {
            setPrice(55);
        } else if (distance >= 25) {
            setPrice(25);
        } else if (distance >= 20) {
            setPrice(20);
        } else if (distance >= 10) {
            setPrice(12);
        } else {
            setPrice(6);
        }
    };

    React.useEffect(() => {
        if (srcDistance !== 0 && destDistance !== 0) {
            calculatePrice();
        }
    }, [srcDistance, destDistance]);

    
    const handleFieldValue = (value: any) => {
    // const parsedObject = JSON.parse(value); // *parse the object here

    setNumberOfPassenger(value);
  };


  

    return (
        <div className="flex  justify-center items-center h-[calc(100vh-4rem)] pb-[64px] bg-emerald-600">
            <div className="flex flex-col md:flex-row p-5  md:p-10 lg:p-20 rounded-3xl bg-slate-100">

            <div className="flex flex-col md:flex-row">
                
                <Source  sourceselected={handleSourceSelected} removeSelected={destSelectedItem} />
                <Destination removeSelected={selectedItem} destinationSelected={handleDestinationSelected} />
            </div>
            <div className="flex flex-col md:flex-row">
                <Select onValueChange={handleFieldValue}>
                    <SelectTrigger className="lg:w-[13.5rem] md:w-[11rem] focus-visible:ring-transparent focus:none h-12 md:h-16">
                        <SelectValue placeholder="No. of passengers" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1" >1</SelectItem>
                            <SelectItem value="2" >2</SelectItem>
                            <SelectItem value="3" >3</SelectItem>
                            <SelectItem value="4" >4</SelectItem>
                            <SelectItem value="5" >5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            
            
            {/* Display the selected fruit in the button */}
            {numberofpassenger!= 0 && destSelectedItem!=""&&  selectedItem!== ""  ? 
            <div>

                <Alertproceed numberofpassenger={numberofpassenger} destDistance={destDistance} srcDistance={srcDistance} price={price} destSelectedItem={destSelectedItem} selectedItem={selectedItem} email={email} username={username}/> 
            </div>
                : <Button className="md:h-16 rounded-none md:rounded-none h-12 rounded-b-2xl md:rounded-r-3xl" onClick={()=>toast.error("Please make sure to complete all of the fields.")}>Buy Tickets</Button>}
        
        </div>
                </div>
    );
};

export default Search;
