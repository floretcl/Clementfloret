import Carousel from "./Carousel";
import Item from "./Item";
import project1Img from "../img/ales-nesetril-Im7lZjxeLhg-unsplash.webp";
import project2Img from "../img/campaign-creators-OGOWDVLbMSc-unsplash.webp";
import project3Img from "../img/christopher-gower-m_HRfLhgABo-unsplash.webp";
import project4Img from "../img/domenico-loia-EhTcC9sYXsw-unsplash.webp";

export default function Project() {
    const items = [
        <Item key="1" imgSrc={project1Img} />,
        <Item key="2" imgSrc={project2Img} />,
        <Item key="3" imgSrc={project3Img} />,
        <Item key="4" imgSrc={project4Img} />,
    ];

    return (
        <main className="project">
            <Carousel items={items} />
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