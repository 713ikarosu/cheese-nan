<script lang="ts">
import { onMount } from "svelte";

import I18nKey from "../i18n/i18nKey";
import { i18n } from "../i18n/translation";

export let tags: string[];
export let categories: string[];
export let sortedPosts: Post[] = [];

interface Post {
	id: string;
	url?: string; // 预计算的文章 URL
	data: {
		title: string;
		tags: string[];
		category?: string;
		published: Date;
		alias?: string;
		permalink?: string; // 自定义固定链接
	};
}

interface Group {
	year: number;
	posts: Post[];
}

function asDate(value: Date | string) {
	return value instanceof Date ? value : new Date(value);
}

function formatDate(value: Date | string) {
	const date = asDate(value);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${month}-${day}`;
}

function formatTag(tagList: string[]) {
	return tagList.map((t) => `#${t}`).join(" ");
}

function buildGroups(posts: Post[]): Group[] {
	const sorted = posts
		.slice()
		.sort(
			(a, b) =>
				asDate(b.data.published).getTime() -
				asDate(a.data.published).getTime(),
		);

	const grouped = sorted.reduce(
		(acc, post) => {
			const year = asDate(post.data.published).getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(post);
			return acc;
		},
		{} as Record<number, Post[]>,
	);

	return Object.keys(grouped)
		.map((yearStr) => ({
			year: Number.parseInt(yearStr, 10),
			posts: grouped[Number.parseInt(yearStr, 10)],
		}))
		.sort((a, b) => b.year - a.year);
}

let groups: Group[] = buildGroups(sortedPosts);

onMount(() => {
	// 全件リストは親から渡る。絞り込みは URL のクエリだけで行う。
	void tags;
	void categories;
	const params = new URLSearchParams(window.location.search);
	const selectedTags = params.has("tag") ? params.getAll("tag") : [];
	const selectedCategories = params.has("category")
		? params.getAll("category")
		: [];
	const uncategorized = params.get("uncategorized");

	let filteredPosts: Post[] = sortedPosts;

	if (selectedTags.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) =>
				Array.isArray(post.data.tags) &&
				post.data.tags.some((tag) => selectedTags.includes(tag)),
		);
	}

	if (selectedCategories.length > 0) {
		filteredPosts = filteredPosts.filter(
			(post) =>
				post.data.category &&
				selectedCategories.includes(post.data.category),
		);
	}

	if (uncategorized) {
		filteredPosts = filteredPosts.filter((post) => !post.data.category);
	}

	groups = buildGroups(filteredPosts);
});
</script>

<div class="card-base px-4 py-4 md:px-8 md:py-6">
    {#each groups as group}
        <div>
            <div class="flex flex-row w-full items-center min-h-12">
                <h2 class="m-0 w-16 shrink-0 transition text-lg md:text-xl font-bold text-right text-75">
                    {group.year}
                </h2>
                <div class="w-8 shrink-0">
                    <div
                            class="h-3 w-3 bg-none rounded-full outline outline-(--primary) mx-auto
                  -outline-offset-2 z-50 outline-3"
                    ></div>
                </div>
                <div class="min-w-0 flex-1 transition text-left text-50">
                    {group.posts.length} {i18n(group.posts.length === 1 ? I18nKey.postCount : I18nKey.postsCount)}
                </div>
            </div>

            {#each group.posts as post}
                <a
                        href={post.url || `/posts/${post.id}/`}
                        aria-label={post.data.title}
                        class="group btn-plain block! w-full rounded-lg hover:text-[initial] py-1.5"
                >
                    <div class="flex flex-row justify-start items-start">
                        <div class="mono w-16 shrink-0 pt-0.5 transition text-xs text-right text-50">
                            {formatDate(post.data.published)}
                        </div>

                        <div class="w-8 shrink-0 relative dash-line self-stretch flex items-start justify-center pt-2">
                            <div
                                    class="transition-all w-1 h-1 rounded group-hover:h-5
                       bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-(--primary)
                       outline outline-4 z-50
                       outline-(--card-bg)
                       group-hover:outline-(--btn-plain-bg-hover)
                       group-active:outline-(--btn-plain-bg-active)"
                            ></div>
                        </div>

                        <h3
                                class="m-0 min-w-0 flex-1 text-left font-bold leading-snug
                     transition-colors group-hover:text-(--primary)
                     text-75 pr-2"
                        >
                            {post.data.title}
                        </h3>

                        <div class="hidden md:block w-36 shrink-0 text-left text-sm transition text-30 pt-0.5">
                            {formatTag(post.data.tags)}
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    {/each}
</div>
