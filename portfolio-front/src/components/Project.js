import Carousel from "./Carousel/Carousel";

export default function Project() {
    const skills = [{
        id: 0,
        name: "HTML5"
    }, {
        id: 1,
        name: "CSS3"
    }, {
        id: 2,
        name: "Javascript"
    }, {
        id: 3,
        name: "Python"
    }, {
        id: 4,
        name: "Django"
    }, {
        id: 5,
        name: "Git"
    }, {
        id: 6,
        name: "GitHub"
    }, {
        id: 7,
        name: "PyCharm"
    }, {
        id: 8,
        name: "MacOS"
    }];

    const links = [{
        id: 0,
        name: "GitHub",
        url: "#"
    }, {
        id: 1,
        name: "Figma",
        url: "#"
    }, {
        id: 2,
        name: "Website",
        url: "#"
    }]

    const listSkills = skills.map((skill) =>
        <li key={skill.id}>{skill.name}</li>
    );

    const listLinks = links.map((link) =>
        <li key={link.id}><a className="hoverable" href={link.url}>{link.name}</a></li>
    );

    return (
        <main className="project">
            <Carousel/>
            <div className="project__content">
                <h1 className="project__title">Project name</h1>
                <p className="project__text">
                    Lorem ipsum dolor sit amet consectetur. Sed tellus at penatibus mattis blandit adipiscing. Tempus
                    malesuada tempus ut eu. Ullamcorper id sollicitudin pharetra in aliquam
                    ut in orci aenean. Et ullamcorper congue justo ut tortor. Blandit ante id egestas diam cursus
                    nascetur.
                    Mauris nec nulla integer vitae dui rhoncus scelerisque. Condimentum massa egestas euismod orci urna.
                    Non amet faucibus purus posuere venenatis. Curabitur porta convallis dignissim suspendisse a felis
                    lorem id phasellus. Sem viverra felis sit adipiscing nibh vestibulum.
                </p>
                <ol className="project__skills">
                    {listSkills}
                </ol>
                <ol className="project__links">
                    {listLinks}
                </ol>
            </div>
        </main>
    );
}