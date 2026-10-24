// 作品一覧。
// カードを足すときは、下のオブジェクトをコピーして projectsData に追加する。
// example: true のカードは画面に「記入例」と出る。本番の作品では example を外すか false にする。
//
// TODO: 記入例を、公開してよい実在の作品に差し替える。
// 公開リポジトリの候補（READMEを確認してからカードにする）:
// - https://github.com/713ikarosu/mlb-portal （MLB portal site for Japanese）
// - https://github.com/713ikarosu/ani-doko
// - https://github.com/713ikarosu/Brains_IT （landing page of brains_it）
// - https://github.com/713ikarosu/cheese-nan

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	visitUrl?: string;
	/** true のあいだは画面上で記入例だと分かる */
	example?: boolean;
}

export const projectsData: Project[] = [
	{
		id: "example-web",
		title: "記入例: Webサイト",
		description:
			"何を作ったか、誰向けかを一文で書く。このカードは見本で、実在の作品ではない。",
		image: "",
		category: "web",
		techStack: ["TypeScript", "Astro"],
		status: "completed",
		liveDemo: "https://example.com",
		sourceCode: "https://github.com/example/example-web",
		visitUrl: "https://example.com",
		startDate: "2026-01-01",
		endDate: "2026-03-01",
		featured: false,
		tags: ["記入例"],
		example: true,
	},
	{
		id: "example-in-progress",
		title: "記入例: 制作中のもの",
		description:
			"まだ公開前でも、状態を「進行中」にして置ける。URLが無い場合はリンクを書かなくてよい。",
		image: "",
		category: "web",
		techStack: ["React"],
		status: "in-progress",
		startDate: "2026-07-01",
		featured: false,
		tags: ["記入例"],
		example: true,
	},
];

// Get project statistics
export const getProjectStats = () => {
	const listed = projectsData.filter((project) => !project.example);
	const total = listed.length;
	const completed = listed.filter((p) => p.status === "completed").length;
	const inProgress = listed.filter((p) => p.status === "in-progress").length;
	const planned = listed.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured && !p.example);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData
		.filter((project) => !project.example)
		.forEach((project) => {
			project.techStack.forEach((tech) => {
				techSet.add(tech);
			});
		});
	return Array.from(techSet).sort();
};
