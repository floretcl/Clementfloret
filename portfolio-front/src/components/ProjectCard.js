export default function ProjectCard({name, imgSrc, type}) {
    return (
        <a className="project-card hoverable" href="#">
            <div className="project-card__thumbnail">
                <img className="project-card__img" src={imgSrc} alt={name + " thumbnail"}/>
            </div>
            <div className="project-card__text">
                <p className="project-card__name">{name}</p>
                <p className="project-card__type">{type}</p>
            </div>
        </a>
    );
}