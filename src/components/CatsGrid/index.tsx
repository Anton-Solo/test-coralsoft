import { CatModel } from "../../interfaces"

export const CatsGrid = ({ cats }: { cats: CatModel[] }) => {

    if (cats.length === 0) {
        return <p>No Data</p>
    }

    return  (
        cats.map((cat: CatModel) => (
            <div
                key={cat.id}
                className="group flex flex-col h-full bg-white dark:bg-black border border-gray-200 shadow-sm rounded-xl">
                <div className="p-4 md:p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        {cat.name}
                    </h3>
                    <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
                        Origin: {cat.origin || "Unknown"}
                    </span>
                    <p className="mt-3 text-gray-500 dark:text-white line-clamp-3">
                        {cat.description || "No description available"}
                    </p>
                    <div className="mt-4 space-y-2 dark:text-white">
                        <div className="flex justify-between">
                            <span>Adaptability:</span>
                            <span>{cat.adaptability}/5</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Affection Level:</span>
                            <span>{cat.affection_level}/5</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Life Span:</span>
                            <span>{cat.life_span} years</span>
                        </div>
                    </div>
                </div>
            </div>
        ))
    )
}