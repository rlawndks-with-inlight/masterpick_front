import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { zRoute } from '../routes/route';
const MetaTag = props => {
    const [title, setTitle] = useState("");
    const { pathname } = useLocation();
    useEffect(() => {
        for (var i = 0; i < zRoute.length; i++) {
            if (pathname.includes(zRoute[i].link.replace(":pk", "")) && zRoute[i].link != "/") {
                console.log(zRoute[i])
                setTitle("masterpick - " + zRoute[i].title)
            }
        }
        if (pathname == "/") {
            setTitle("masterpick - 홈")
        }
    }, [pathname])
    return (
        <Helmet>
            <title>{props.title ? props.title : title}</title>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={props.title ? props.title : title} />
            <meta property="og:site_name" content={props.title ? props.title : title} />
            <meta property="og:url" content={"https://masterpick.co.kr"} />
            <meta name="twitter:title" content={props.title ? props.title : title} />
            <link rel="canonical" href={"https://masterpick.co.kr"} />
        </Helmet>
    );
};

export default MetaTag;