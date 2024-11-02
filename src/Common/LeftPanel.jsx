import Group from '../images/Group.png';

const LeftPanel = () => {
    return (
        <div className="left-panel">
            <img
                src={Group} // Replace with actual image source
                alt="Robot Welcoming"
                className="robot-image"
            />
            <h1>Welcome aboard my friend</h1>
            <p>Just a couple of clicks and we start</p>
        </div>
    )
}
export default LeftPanel;