const Total = ({ parts }) => {
  return (
    <p style={{fontWeight: 'bold'}}>Total of {parts.reduce((a, b) => a + b.exercises, 0)} exercises</p>
  );
};

export default Total;
