import projectImg from "../img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";

export default function Project() {
    return (
        <main className="project">
            <div className="project__images">
                <div className="project__mask">
                    <img className="project__img" src={projectImg} alt=""/>
                </div>
            </div>
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
                <ul className="project__skills">
                    <li>Skill</li>-
                    <li>Skill</li>-
                    <li>Skill</li>-
                    <li>Skill</li>-
                    <li>Skill</li>-
                    <li>Skill</li>-
                    <li>Skill</li>-
                    <li>Skill</li>-
                    <li>Skill</li>
                </ul>
                <ul className="project__links">
                    <li><a href="#">Link</a></li>-
                    <li><a href="#">Link</a></li>-
                    <li><a href="#">Link</a></li>-
                    <li><a href="#">Link</a></li>
                </ul>
            </div>
        </main>
    );
}