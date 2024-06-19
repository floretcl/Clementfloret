export default function ProjectCard({name, imgSrc}) {
    return (
        <div className="project-card">
            <div>
                <img className="project-card__img" src={imgSrc} alt="{name} thumbnail"/>
            </div>
            <p className="project-card__name">{name}</p>
        </div>
    );
}