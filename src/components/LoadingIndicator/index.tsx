import "./index.css";

type LoadingProps = {
  size?: number;
};

export default function LoadingIndicator({ size = 10 }: LoadingProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner" style={{ width: size, height: size }} />
    </div>
  );
}