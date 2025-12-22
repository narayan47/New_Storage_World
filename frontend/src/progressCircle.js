function ProgressCircle({ percent }) {
  return (
    <div className="progress-wrapper">
      <div
        className="progress-circle"
        style={{ "--progress": `${percent}%` }}
      >
        <span>{percent}%</span>
      </div>
    </div>
  );
}

export default ProgressCircle;
