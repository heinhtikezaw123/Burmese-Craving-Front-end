import FoodAnalytics from "./FoodAnalytics"
import FoodAnalyticsPie from "./FoodAnalyticsPie"

interface Props {
    title: string
}

const AnalyticsSection: React.FC<Props> = ({ title }) => {
    return (
        <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-1">
                <FoodAnalytics title={title} />
            </div>
            <div className="w-full lg:w-1/2 p-1">
                <FoodAnalyticsPie title={title} />
            </div>
        </div>
    )
}

export default AnalyticsSection
