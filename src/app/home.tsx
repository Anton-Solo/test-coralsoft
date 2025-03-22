import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/store.tsx";
import { AdaptabilityChart } from "../components/AdaptabilityChart/index.tsx";
import { AffectionLevels } from "../components/AffectionLevels/index.tsx";
import { TopOrigins } from "../components/TopOrigins.tsx/index.tsx";
import { IndoorChart } from "../components/IndoorChart/index.tsx";
import { LapCat } from "../components/LapCat/index.tsx";
import { LifeSpan } from "../components/LifeSpan/index.tsx";
import { useGetBreedsQuery } from "../services/catsService.ts";
import { CatsGrid } from "../components/CatsGrid/index.tsx";
import ThemeToggle from "../components/UI/ThemeToggle.tsx";
import LogoutButton from "../components/UI/LogoutButton.tsx";
import { CatModel } from "../interfaces/index.ts";

const HomePage: React.FC = () => {
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
	const { data: cats, error, isLoading } = useGetBreedsQuery();

	const [adaptabilityData, setAdaptabilityData] = useState<{ name: string; value: number }[]>([]);
	const [affectionData, setAffectionData] = useState<{ name: string; value: number }[]>([]);
	const [originData, setOriginData] = useState<{ name: string; value: number }[]>([]);
	const [indoorData, setIndoorData] = useState<{ name: string; value: number }[]>([]);
	const [lapData, setLapData] = useState<{ name: string; value: number }[]>([]);
	const [lifeSpanData, setLifeSpanData] = useState<{ name: string; years: number }[]>([]);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/sign-in");
		}
	}, [isAuthenticated, navigate]);

	const processBreedData = (cats: CatModel[]) => {
		const adaptability = cats.map((cat) => ({
			name: cat.name,
			value: cat.adaptability || 0, 
		}));
		const affection = cats.map((cat) => ({
			name: cat.name,
			value: cat.affection_level || 0, 
		}));

		const origins = cats.reduce<{ name: string; value: number }[]>((acc, cat) => {
			const existing = acc.find((item) => item.name === cat.origin);
			if (existing) {
				existing.value += 1;
			} else {
				acc.push({ name: cat.origin, value: 1 });
			}
			return acc;
		}, []);

		const indoorCount = cats.reduce<{ indoor: number; outdoor: number }>(
			(acc, cat) => {
				if (cat.indoor === 1) {
					acc.indoor += 1;
				} else {
					acc.outdoor += 1;
				}
				return acc;
			},
			{ indoor: 0, outdoor: 0 }
		);

		const lapCount = cats.reduce<{ lap: number; notLap: number }>(
			(acc, cat) => {
				if (cat.lap === 1) {
					acc.lap += 1;
				} else {
					acc.notLap += 1;
				}
				return acc;
			},
			{ lap: 0, notLap: 0 }
		);

		const lifespan = cats.map((cat) => {
			const range = cat.life_span.split("-").map(Number);
			const average = range.length === 2 ? (range[0] + range[1]) / 2 : range[0];
			return {
				name: cat.name,
				years: Number(average.toFixed(1)),
			};
		});

		return {
			adaptability,
			affection,
			origins,
			indoor: [
				{ name: "Indoor", value: indoorCount.indoor },
				{ name: "Outdoor", value: indoorCount.outdoor },
			],
			lap: [
				{ name: "Lap Cat", value: lapCount.lap },
				{ name: "Not Lap Cat", value: lapCount.notLap },
			],
			lifeSpan: lifespan,
		};
	};

	useEffect(() => {
		if (!cats || cats.length === 0) return;

		const {
			adaptability,
			affection,
			origins,
			indoor,
			lap,
			lifeSpan
		} = processBreedData(cats);

		setAdaptabilityData(adaptability);
		setAffectionData(affection);
		setOriginData(origins);
		setIndoorData(indoor);
		setLapData(lap);
		setLifeSpanData(lifeSpan);
	}, [cats]);

	if (isLoading || error) {
		return (
			<div className="flex items-center justify-center h-screen">
				{isLoading ? (
					<div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" />
				) : (
					<div className="text-red-500">Error loading cats data</div>
				)}
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex items-center justify-between mb-8">
				<h1 className="text-4xl font-bold dark:text-white">Cat Breeds Statistics</h1>
				<div className="flex items-center gap-4">
					<LogoutButton />
					<ThemeToggle />
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<AdaptabilityChart adaptabilityData={adaptabilityData} />
				<AffectionLevels affectionData={affectionData} />
				<TopOrigins originData={originData} />
				<IndoorChart indoorData={indoorData} />
				<LapCat lapData={lapData} />
				<LifeSpan lifeSpanData={lifeSpanData} />
			</div>

			<div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<CatsGrid cats={cats || []}/>
			</div>
		</div>
	);
};

export default HomePage;


