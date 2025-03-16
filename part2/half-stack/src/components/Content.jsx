import Part from "./Part.jsx";

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.name} />
      ))}
    </div>
  );
};

export default Content;
