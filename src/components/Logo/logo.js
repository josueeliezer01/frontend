export default function Logo({ width = 200, height = 60, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 200 60"
      role="img"
      aria-labelledby="logoTitle"
      className={className}>
      <title id="logoTitle">Be-Strong Logo</title>
      <text
        x="50%"
        y="50%"
        fill="#007cf7"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="28"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        alignmentBaseline="central">
        BE-STRONG
      </text>
    </svg>
  );
}
