export default function Item({index, id, imgSrc}) {
    return (
        <li
            className={`item ${id === index ? "item--active" : ""} ${id === index - 1 ? "item--prev" : ""} ${id === index + 1 ? "item--next" : ""}`}
            key={id}>
            <div className="item__content">
                <img className="item__img" src={imgSrc} alt="project image"/>
            </div>
        </li>
    );
}