interface CardProps {
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export default function Card({
  children,
  className = "",
  loading = false,
}: CardProps) {
  if (loading) {
    return (
      <div className={`card animate-pulse ${className}`}>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return <div className={`card ${className}`}>{children}</div>;
}
