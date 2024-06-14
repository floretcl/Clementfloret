import Social from "./Social";
import ResumeButton from "./ResumeButton";

export default function Home() {
    return (
        <main className="home">
            <h1 className="home__title">Hello I'm <strong>Clément Floret</strong></h1>
            <p className="home__subtitle">Web / Mobile Developer</p>
            <div className="home__social">
                <Social/>
            </div>
            <div className="home__resume">
                <ResumeButton />
            </div>
        </main>
    );
}