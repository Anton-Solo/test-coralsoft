import { useState, useEffect } from "react";
import { CatModel } from "../interfaces/index.ts";

const useSortedFilteredCats = (cats: CatModel[] | undefined) => {
    const [filteredCats, setFilteredCats] = useState<CatModel[]>([]);
    const [sortOption, setSortOption] = useState<string>("name");
    const [originFilter, setOriginFilter] = useState<string>("");

    useEffect(() => {
        if (!cats) return;

        let updatedCats = [...cats];

        // Sorting logic
        updatedCats.sort((a, b) => {
            if (sortOption === "name") {
                return a.name.localeCompare(b.name);
            } else if (sortOption === "adaptability") {
                return b.adaptability - a.adaptability;
            } else if (sortOption === "affection_level") {
                return b.affection_level - a.affection_level;
            }
            return 0;
        });

        // Filtering logic
        if (originFilter) {
            updatedCats = updatedCats.filter(cat => cat.origin === originFilter);
        }

        setFilteredCats(updatedCats);
    }, [cats, sortOption, originFilter]);

    const uniqueOrigins = Array.from(new Set(cats?.map(cat => cat.origin)));

    return { filteredCats, sortOption, setSortOption, originFilter, setOriginFilter, uniqueOrigins };
};

export default useSortedFilteredCats;