
const Newlines = ({ text }) => {
    return text.split('\n').map((line, index) => (
        <p key={index}>
            {line}
            <br />
        </p>
    ));
};

export default Newlines 