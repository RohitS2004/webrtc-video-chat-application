import { IconProps } from "./Call";

const Back = (props: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width}
            height={props.height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={props.strokeColor}
            strokeWidth={props.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-step-back"
        >
            <line x1="18" x2="18" y1="20" y2="4" />
            <polygon points="14,20 4,12 14,4" />
        </svg>
    );
};


export default Back;