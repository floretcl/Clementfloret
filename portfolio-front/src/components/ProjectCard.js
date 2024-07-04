export default function ProjectCard({name, imgSrc, type}) {
    return (
        <div className="project-card">
            <div className="project-card__thumbnail">
                <div className="project-card__mask">
                    <img className="project-card__img" src={imgSrc} alt={name + " thumbnail"}/>
                </div>
            </div>
            <div className="project-card__text">
                <p className="project-card__name">{name}</p>
                <p className="project-card__type">{type}</p>
            </div>
        </div>
    );
}