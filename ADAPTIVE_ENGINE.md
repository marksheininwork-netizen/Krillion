Adaptive answers setup

The game checks curated answers, aliases, ISO country names, and optional Cloudflare AI classification.

For semantic classification, add a Cloudflare Workers AI binding named AI. The Worker uses the Llama 3.1 8B Instruct model when available. For persistent reviewed answers, create a Workers KV namespace and bind it as LEARNING. The suggestion endpoint stores pending submissions for review. Do not automatically approve user suggestions. After review, an approved key has the format approved:category:answer and JSON value with approved true, canonical text and rarity score.

Without AI or KV bindings, the local dictionary and country recognition continue to work.

GitHub Actions currently deploys GitHub Pages, not the Cloudflare Workers address. Deploy the updated Worker to Cloudflare separately.
