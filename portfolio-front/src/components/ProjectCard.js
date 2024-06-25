export default function ProjectCard({name, imgSrc}) {
    return (
        <div className="project-card">
            <div className="project-card__thumbnail">
                <div className="project-card__mask">
                    <img className="project-card__img" src={imgSrc} alt={name + " thumbnail"}/>
                </div>
            </div>
            <p className="project-card__name">{name}</p>
        </div>
    );
}