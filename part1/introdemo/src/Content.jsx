const Content = ({ parts, exercises }) => {
  return parts.map((part, index) => (
    <p key={index}>
      {part} {exercises[index]}
    </p>
  ));
};

export default Content;
