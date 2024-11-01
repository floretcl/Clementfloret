import SocialLink from "./SocialLink.jsx";
import '../../styles/Social.scss'
import {useEffect, useState} from "react";

export default function Social() {
    const [portfolioLinks, setPortfolioLinks] = useState([]);
    const listLinks = portfolioLinks.map((link) =>
        <SocialLink key={link.id} name={link.name} imgSrc={link.icon} url={link.url}/>
    );

    useEffect(() => {
        function fetchRequest() {
            const pathName = window.location.pathname;
            const langPrefix = pathName.startsWith('/fr/') ? '/fr' : pathName.startsWith('/en/') ? '/en' : '';
            const url = `${langPrefix}/api/portfolio_links`;

            const init = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'same-origin',
                cache: 'default',
            };

            fetch(url, init)
                .then(response => response.json())
                .then(data => {
                    setPortfolioLinks(data);
                })
                .catch(error => {
                    console.log(`Error getting portfolio links data: ${error}`);
                });
        }
        fetchRequest();
    }, [portfolioLinks]);

    return (
        <ol className="social">
            {listLinks}
        </ol>
    );
}