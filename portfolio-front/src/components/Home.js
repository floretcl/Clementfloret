import Social from "./Social";

export default function Home() {
    return (
        <main className="home">
            <h1 className="home__title">Hello I'm Clément Floret</h1>
            <p className="home__subtitle">Web / Mobile App Developer</p>
            <Social />
            <a href="#">
                <svg width="512" height="490" viewBox="0 0 512 490" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M53.2975 133.488L256 21.6979L458.703 133.488V355.587L256 467.377L53.2975 355.587V133.488Z"
                          stroke="currentColor" stroke-width="38"/>
                </svg>
                Resume Pdf
            </a>
        </main>
    );
}