/* This is a script to create a new post markdown file with front-matter */

import fs from "fs";
import path from "path";

function getTokyoDate() {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).formatToParts(new Date());
	const pick = (type) => parts.find((part) => part.type === type).value;
	return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

function yamlString(value) {
	return JSON.stringify(value);
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No slug provided
Usage: pnpm new-post <slug> [title]`);
	process.exit(1);
}

let slug = args[0];
if (slug.endsWith(".md") || slug.endsWith(".mdx")) {
	slug = slug.replace(/\.(md|mdx)$/i, "");
}

if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
	console.error(
		"Error: slug must be lowercase letters, numbers, and hyphens (example: my-post)",
	);
	process.exit(1);
}

const title = args.slice(1).join(" ").trim() || slug;
const fileName = `${slug}.md`;
const targetDir = "./src/content/posts/";
const fullPath = path.join(targetDir, fileName);

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists`);
	process.exit(1);
}

if (!fs.existsSync(targetDir)) {
	fs.mkdirSync(targetDir, { recursive: true });
}

const content = `---
title: ${yamlString(title)}
published: ${getTokyoDate()}
description: ""
image: ""
tags: []
category: ""
draft: true
pinned: false
comment: true
---
`;

fs.writeFileSync(fullPath, content);

console.log(`Post ${fullPath} created`);
console.log(`Draft preview: pnpm dev → http://localhost:4321/posts/${slug}/`);
