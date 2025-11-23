"use client";

import React from "react";
import UrlList from "./urlList";
import ShortenForm from "./shortenForm";
export default function UrlShortenerContainer(){

    const [refreshKey, setRefreshKey] = React.useState(0);

    const handleShortened = () => {
        setRefreshKey((prevKey) => prevKey + 1);
    }
    
    return(
     <div>
          <ShortenForm handleShortened={handleShortened} />
          <UrlList key={refreshKey}></UrlList>

    </div>);
}