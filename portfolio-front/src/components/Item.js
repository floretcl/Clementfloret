import projectImg from "../img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";

export default function Item({imgSrc}) {
    return (
        <div className="item">
            <div className="item__content">
                <div className="item__mask">
                    <img className="item__img" src={imgSrc} alt="project image"/>
                </div>
            </div>
        </div>
    );
}