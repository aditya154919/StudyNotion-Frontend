const Badge = ({ difficulty }) => {
  const styles = {
    Easy: "bg-green-500/15 text-green-400",
    Medium: "bg-yellow-500/15 text-yellow-400",
    Hard: "bg-red-500/15 text-red-400",
  };

  return (
    <div
      className={`
      px-4
      py-1.5
      rounded-full
      text-sm
      font-semibold
      ${styles[difficulty]}
      `}
    >
      {difficulty}
    </div>
  );
};

export default Badge;