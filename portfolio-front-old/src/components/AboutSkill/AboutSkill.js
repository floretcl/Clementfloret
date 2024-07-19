export default function AboutSkill({name, icon}) {
    return (
        <li className="hoverable">
            <img src={icon} alt={`${name} icon`}/>
            <div>{name}</div>
        </li>
    );
}