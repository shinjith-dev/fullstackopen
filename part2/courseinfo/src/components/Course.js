const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        return (
          <>
            <Header course={course.name} />
            <Content key={course.id} parts={course.parts} />
            <Total course={course} />
          </>
        );
      })}
    </div>
  );
};

const Header = ({ course }) => <h2>{course}</h2>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Total = ({ course }) => {
  const total = course.parts.reduce((prev, curr) => prev + curr.exercises, 0);
  return <h4>total of {total} exercises</h4>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};
export default Course;
