import * as React from "react"


import { Progress } from "@/components/ui/progress"

export function ProgressDemo({data }: {data: number}) {
    const [progress, setProgress] = React.useState<number>(0)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(data), 500)
        return () => clearTimeout(timer)
    }, [data])

return (
    <div className="flex flex-col justify-center items-center">
        <Progress value={progress} className="w-[60%]" />
        <span className="text-sm">
            Please wait while the image is being processed...
        </span>

    </div>
)
}