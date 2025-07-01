import LoadingSpinner from "@/components/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <LoadingSpinner size="lg" text="Loading your progress tracker..." />
    </div>
  )
}
