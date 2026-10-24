// テーマ付属のサンプル（アニメ画像つき）は外した。ページは featurePages.anime = false。
// TODO: 自分の視聴記録に差し替えてからページを開く。表紙は手元のファイルを置く。
export type AnimeItem = {
	title: string;
	status: "watching" | "completed" | "planned";
	rating: number;
	cover: string;
	description: string;
	episodes: string;
	year: string;
	genre: string[];
	studio: string;
	link: string;
	progress: number;
	totalEpisodes: number;
	startDate: string;
	endDate: string;
};

const localAnimeList: AnimeItem[] = [];

export default localAnimeList;
