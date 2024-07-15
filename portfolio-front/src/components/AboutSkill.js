export default function AboutSkill({id, name, icon}) {
    return (
        <li className="hoverable" key={id}>
            <img src={icon} alt={`${name} icon`}/>
            <div>{name}</div>
        </li>
    );
}