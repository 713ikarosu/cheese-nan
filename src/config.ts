import type {
	AnnouncementConfig,
	CommentConfig,
	ExpressiveCodeConfig,
	FooterConfig,
	FullscreenWallpaperConfig,
	LicenseConfig,
	MusicPlayerConfig,
	NavBarConfig,
	PermalinkConfig,
	ProfileConfig,
	SakuraConfig,
	ShareConfig,
	SidebarLayoutConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

// 移除i18n导入以避免循环依赖

// 公開名。タイトル、OGP、RSS、ナビゲーションの文字は siteConfig.title だけを表示する。
// 名前を変えるときは、この文字列だけを書き換える。ロゴ画像には文字を焼いていない。
const SITE_TITLE = "チーズナンの裏";

// 定义站点语言
const SITE_LANG = "ja"; // 语言代码，例如：'en', 'zh_CN', 'ja' 等。
const SITE_TIMEZONE = 9; // 日本時間（UTC+9）

export const siteConfig: SiteConfig = {
	title: SITE_TITLE,
	subtitle: "タフな日々",
	description:
		"都内在住限界オタクフロントエンドエンジニア hirekatsu の個人メモブログです。",
	// カスタムドメインは使わない。公開先は Cloudflare Pages のこのURL。
	siteURL: "https://cheese-nan.pages.dev",
	keywords: [
		SITE_TITLE,
		"チーズナン",
		"hirekatsu",
		"備忘録",
		"フロントエンド",
		"東京",
	],
	// Search Console の「HTMLタグ」方式。content の値だけを入れる。空ならタグは出さない。
	googleSiteVerification: "",
	// TODO: このサイトを公開した日に合わせて変える。サイドバーの稼働日数に使う。
	siteStartDate: "2026-10-23",

	timeZone: SITE_TIMEZONE,

	lang: SITE_LANG,

	themeColor: {
		hue: 42, // 焦げ目に近い、鈍い茶色を一つだけ
		fixed: true,
	},

	// テーマ付属のページ。中身がサンプルのものは閉じている。
	// 実在のデータを入れてから true にし、navBarConfig にもリンクを足す。
	featurePages: {
		anime: false,
		diary: false,
		friends: false,
		projects: true,
		skills: false, // src/data/skills.ts はテーマの記入例。公開しない。
		timeline: false, // src/data/timeline.ts は別人の経歴。公開しない。
		albums: false,
		devices: false,
	},

	// 顶栏标题配置
	navbarTitle: {
		// 表示される文字は siteConfig.title。text は型のため同じ定数を置く。
		mode: "text-icon",
		text: SITE_TITLE,
		icon: "/assets/sample/mark.svg",
		logo: "/assets/sample/mark.svg",
	},

	// 页面自动缩放配置
	pageScaling: {
		enable: false,
		targetWidth: 2000,
	},

	bangumi: {
		// TODO: 自分の Bangumi ID。空のあいだは取得しない。
		userId: "",
		fetchOnDev: false, // 是否在开发环境下获取 Bangumi 数据（默认 false），获取前先执行 pnpm build 构建 json 文件
	},

	bilibili: {
		// TODO: 自分の Bilibili uid。空のあいだは取得しない。
		vmid: "",
		fetchOnDev: false, // 是否在开发环境下获取 Bilibili 数据（默认 false）
		coverMirror: "", // 封面图片镜像源（可选，如果需要使用镜像源，例如 "https://images.weserv.nl/?url="）
		useWebp: true, // 是否使用WebP格式（默认 true）

		// bilibili 观看进度配置说明(可选，如需配置仔细阅读):
		// 1. 本地开发：请在 .env 文件中填写 BILI_SESSDATA=your_SESSDATA
		// 2. 远程构建：请在 GitHub 仓库 Settings -> Secrets 中添加 BILI_SESSDATA
		// 注意：SESSDATA 为账号凭证，为防止泄露，切记不可使用硬编码。
		// 安全提示：如 SESSDATA 已泄露，请打开 B站手机端 —— 我的 —— 设置 —— 安全隐私 —— 登陆设备管理 —— 一键退登，销毁已泄露的账号凭证
	},

	anime: {
		mode: "local", // 番剧页面模式："bangumi" 使用Bangumi API，"local" 使用本地配置，"bilibili" 使用Bilibili API
	},

	// 文章列表布局配置
	postListLayout: {
		// 默认布局模式："list" 列表模式（单列布局），"grid" 网格模式（双列布局）
		// 注意：如果侧边栏配置启用了"both"双侧边栏，则无法使用文章列表"grid"网格（双列）布局
		defaultMode: "list",
		allowSwitch: false,
	},

	// 标签样式配置
	tagStyle: {
		// 是否使用新样式（悬停高亮样式）还是旧样式（外框常亮样式）
		useNewStyle: false,
	},

	// 壁纸模式配置
	wallpaperMode: {
		// バナーも全画面壁紙も出さない。localStorage に古い値があっても none に固定する。
		defaultMode: "none",
		showModeSwitchOnMobile: "off",
	},

	banner: {
		// 写真バナーは使わない。空にして、CC画像をページに出さない。
		src: "",

		position: "center",

		carousel: {
			enable: false,
			interval: 6,
		},

		waves: {
			enable: false,
			performanceMode: true,
			mobileDisable: true,
		},

		// PicFlow API支持(智能图片API)
		imageApi: {
			enable: false,
			// 使うときは、自分で管理している https のエンドポイントだけを入れる。
			url: "",
		},
		// 这里需要使用PicFlow API的Text返回类型,所以我们需要format=text参数
		// 项目地址:https://github.com/matsuzaka-yuki/PicFlow-API
		// 请自行搭建API

		homeText: {
			enable: false,
			title: SITE_TITLE,
			subtitle: ["タフな日々"],
			typewriter: {
				enable: false,
				speed: 100,
				deleteSpeed: 50,
				pauseTime: 2000,
			},
		},

		credit: {
			enable: false,
			text: "",
			url: "/assets/sample/CREDITS.md",
		},

		navbar: {
			transparentMode: "semi",
		},
	},
	toc: {
		enable: true, // 启用目录功能
		mode: "sidebar", // 目录显示模式："float" 悬浮按钮模式，"sidebar" 侧边栏模式
		depth: 2, // 目录深度，1-6，1 表示只显示 h1 标题，2 表示显示 h1 和 h2 标题，依此类推
		useJapaneseBadge: true, // 使用日语假名标记（あいうえお...）代替数字，开启后会将 1、2、3... 改为 あ、い、う...
	},
	showCoverInContent: true, // 在文章内容页显示文章封面
	generateOgImages: false, // 启用生成OpenGraph图片功能,注意开启后要渲染很长时间，不建议本地调试的时候开启
	favicon: [
		{
			src: "/favicon/icon.png",
			theme: "light",
			sizes: "64x64",
		},
		{
			src: "/favicon/icon.png",
			theme: "dark",
			sizes: "64x64",
		},
	],

	// Zen Kaku Gothic New（OFL）。源ファイルは assets/font/。ビルド時にサイトで使う文字だけ woff2 にする。
	// 開発サーバーでは woff2 がまだ無いので、ブラウザの標準フォントで表示される。
	font: {
		asciiFont: {
			fontFamily: "Zen Kaku Gothic New",
			fontWeight: "500",
			localFonts: [],
			enableCompress: false,
		},
		cjkFont: {
			fontFamily: "Zen Kaku Gothic New",
			fontWeight: "500",
			localFonts: [
				"ZenKakuGothicNew-Medium.ttf",
				"ZenKakuGothicNew-Bold.ttf",
			],
			enableCompress: true,
		},
	},
	showLastModified: true, // 控制“上次编辑”卡片显示的开关
};
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
	src: { desktop: [], mobile: [] },
	position: "center", // 壁纸位置，等同于 object-position
	carousel: {
		enable: true, // 启用轮播
		interval: 5, // 轮播间隔时间（秒）
	},
	zIndex: -1, // 层级，确保壁纸在背景层
	opacity: 0.8, // 壁纸透明度
	blur: 1, // 背景模糊程度
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.Projects,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/713ikarosu",
			external: true,
			icon: "fa7-brands:github",
		},
		// TODO: X（Twitter）のURLが分かったら足す
		// {
		// 	name: "X",
		// 	url: "https://x.com/TODO",
		// 	external: true,
		// 	icon: "fa7-brands:x-twitter",
		// },
	],
};

export const profileConfig: ProfileConfig = {
	// TODO: 自分の写真に差し替える。いまは自作の頭文字。出典は public/assets/sample/CREDITS.md
	avatar: "/assets/sample/avatar.webp",
	name: "hirekatsu",
	bio: "都内在住限界オタクフロントエンドエンジニアです。",
	typewriter: {
		enable: false,
		speed: 80,
	},
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/713ikarosu",
		},
		// TODO: メールが決まったら追加する
		// { name: "Email", icon: "material-symbols:mail", url: "mailto:TODO" },
		// TODO: X（Twitter）のURLが決まったら追加する
		// { name: "X", icon: "fa7-brands:x-twitter", url: "https://x.com/TODO" },
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

// Permalink 固定链接配置
export const permalinkConfig: PermalinkConfig = {
	enable: false, // 是否启用全局 permalink 功能，关闭时使用默认的文件名作为链接
	/**
	 * permalink 格式模板
	 * 支持的占位符：
	 * - %year% : 4位年份 (2024)
	 * - %monthnum% : 2位月份 (01-12)
	 * - %day% : 2位日期 (01-31)
	 * - %hour% : 2位小时 (00-23)
	 * - %minute% : 2位分钟 (00-59)
	 * - %second% : 2位秒数 (00-59)
	 * - %post_id% : 文章序号（按发布时间升序排列，最早的文章为1）
	 * - %postname% : 文章文件名（slug）
	 * - %category% : 分类名（无分类时为 "uncategorized"）
	 *
	 * 示例：
	 * - "%year%-%monthnum%-%postname%" => "/2024-12-my-post/"
	 * - "%post_id%-%postname%" => "/42-my-post/"
	 * - "%category%-%postname%" => "/tech-my-post/"
	 *
	 * 注意：不支持斜杠 "/"，所有生成的链接都在根目录下
	 */
	format: "%postname%", // 默认使用文件名
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：某些样式（如背景颜色）已被覆盖，请参阅 astro.config.mjs 文件。
	// 请选择深色主题，因为此博客主题目前仅支持深色背景
	theme: "github-dark",
	// 是否在主题切换时隐藏代码块以避免卡顿问题
	hideDuringThemeTransition: true,
};

export const commentConfig: CommentConfig = {
	enable: false, // 启用评论功能。当设置为 false 时，评论组件将不会显示在文章区域。
	twikoo: {
		// TODO: 自分の Twikoo 環境。テーマのデモURLは外した。
		envId: "",
		lang: SITE_LANG,
	},
};

export const shareConfig: ShareConfig = {
	enable: true, // 启用分享功能
};

export const announcementConfig: AnnouncementConfig = {
	title: "お知らせ",
	content: "2026年7月に開業しました。仕事と調べたことをここに書いています。",
	closable: true,
	link: {
		enable: false,
		text: "",
		url: "/about/",
		external: false,
	},
};

export const musicPlayerConfig: MusicPlayerConfig = {
	enable: false, // プレイリストが未定なので閉じている。自分のIDが決まったら true にする
	mode: "meting", // 音乐播放器模式，可选 "local" 或 "meting"
	meting_api:
		"https://meting.mysqil.com/api?server=:server&type=:type&id=:id&auth=:auth&r=:r", // テーマ既定のAPI。使う前に自分のエンドポイントか確認する
	// TODO: 自分のプレイリストID。空のあいだは再生しない。
	id: "",
	server: "netease", // 音乐源服务器。有的meting的api源支持更多平台,一般来说,netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
	type: "playlist", // 播单类型
};

export const footerConfig: FooterConfig = {
	enable: false, // 是否启用Footer HTML注入功能
	customHtml: "", // HTML格式的自定义页脚信息，例如备案号等，默认留空
	// 也可以直接编辑 FooterConfig.html 文件来添加备案号等自定义内容
	// 注意：若 customHtml 不为空，则使用 customHtml 中的内容；若 customHtml 留空，则使用 FooterConfig.html 文件中的内容
	// FooterConfig.html 可能会在未来的某个版本弃用
};

/**
 * 侧边栏布局配置
 * 用于控制侧边栏组件的显示、排序、动画和响应式行为
 * sidebar: 控制组件所在的侧边栏（left 或 right）。注意：移动端通常不显示右侧栏内容。若组件设置在 right，请确保 layout.position 为 "both"。
 */
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	// 侧边栏组件属性配置列表
	properties: [
		{
			// 组件类型：用户资料组件
			type: "profile",
			// 组件位置："top" 表示固定在顶部
			position: "top",
			// CSS 类名，用于应用样式和动画
			class: "onload-animation",
			// 动画延迟时间（毫秒），用于错开动画效果
			animationDelay: 0,
		},
		{
			// 组件类型：分类组件
			type: "categories",
			// 组件位置："sticky" 表示粘性定位，可滚动
			position: "sticky",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 150,
			// 响应式配置
			responsive: {
				// 折叠阈值：当分类数量超过5个时自动折叠
				collapseThreshold: 5,
			},
		},
		{
			// 组件类型：标签组件
			type: "tags",
			// 组件位置："sticky" 表示粘性定位
			position: "top",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 250,
			// 响应式配置
			responsive: {
				// 折叠阈值：当标签数量超过20个时自动折叠
				collapseThreshold: 20,
			},
		},
		{
			// 组件类型：站点统计组件
			type: "site-stats",
			// 组件位置
			position: "top",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 200,
		},
		{
			// 组件类型：日历组件(移动端不显示)
			type: "calendar",
			// 组件位置
			position: "top",
			// CSS 类名
			class: "onload-animation",
			// 动画延迟时间
			animationDelay: 250,
		},
	],

	// 侧栏组件布局配置
	components: {
		left: ["profile", "categories", "tags"],
		right: ["site-stats", "calendar"],
		drawer: ["profile", "categories", "tags"],
	},

	// 默认动画配置
	defaultAnimation: {
		// 是否启用默认动画
		enable: true,
		// 基础延迟时间（毫秒）
		baseDelay: 0,
		// 递增延迟时间（毫秒），每个组件依次增加的延迟
		increment: 50,
	},

	// 响应式布局配置
	responsive: {
		// 断点配置（像素值）
		breakpoints: {
			// 移动端断点：屏幕宽度小于768px
			mobile: 768,
			// 平板端断点：屏幕宽度小于1280px
			tablet: 1280,
			// 桌面端断点：屏幕宽度大于等于1280px
			desktop: 1280,
		},
	},
};

export const sakuraConfig: SakuraConfig = {
	enable: false, // 默认关闭樱花特效
	sakuraNum: 21, // 樱花数量
	limitTimes: -1, // 樱花越界限制次数，-1为无限循环
	size: {
		min: 0.5, // 樱花最小尺寸倍数
		max: 1.1, // 樱花最大尺寸倍数
	},
	opacity: {
		min: 0.3, // 樱花最小不透明度
		max: 0.9, // 樱花最大不透明度
	},
	speed: {
		horizontal: {
			min: -1.7, // 水平移动速度最小值
			max: -1.2, // 水平移动速度最大值
		},
		vertical: {
			min: 1.5, // 垂直移动速度最小值
			max: 2.2, // 垂直移动速度最大值
		},
		rotation: 0.03, // 旋转速度
		fadeSpeed: 0.03, // 消失速度，不应大于最小不透明度
	},
	zIndex: 100, // 层级，确保樱花在合适的层级显示
};

// Pio 看板娘配置
export const pioConfig: import("./types/config").PioConfig = {
	enable: false, // テーマ付属の Live2D は削除した。戻すときはモデルを置いてから true
	models: [],
	position: "left", // 模型位置
	width: 280, // 默认宽度
	height: 250, // 默认高度
	mode: "draggable", // 默认为可拖拽模式
	hiddenOnMobile: true, // 默认在移动设备上隐藏
	dialog: {
		welcome: `${SITE_TITLE}です。`,
		touch: ["そこは触らないでください。"],
		home: "ホームに戻る",
		skin: ["着替えはありません。", "このままです。"],
		close: "また来てください。",
		link: "/about/",
	},
};

// 导出所有配置的统一接口
export const widgetConfigs = {
	profile: profileConfig,
	announcement: announcementConfig,
	music: musicPlayerConfig,
	layout: sidebarLayoutConfig,
	sakura: sakuraConfig,
	fullscreenWallpaper: fullscreenWallpaperConfig,
	pio: pioConfig,
	share: shareConfig,
} as const;

// umamiConfig相关配置已移动至astro.config.mjs中,统计脚本请自行在Layout.astro文件的<head>中插入
