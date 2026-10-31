# ScottRatchford.com

This is my personal website, made to showcase me and further my development experience.

## Homepage featured story

Edit `featured_story` in `_config.yml` to choose the story below the homepage subtitle:

```yaml
featured_story:
  post: /blog/2026/10/20/tuna-mp3-player/
  title: Turning a Game Boy Advance into an MP3 player
  description: How I built Tuna to send music from a Wii to a Game Boy Advance.
```

Use the published URL path (including the trailing slash) as `post`, such as
`/blog/YYYY/MM/DD/slug/`.
The link comes from that post's generated URL. `title` overrides its title for the
homepage; omit it to use the post title. `description` is an optional short teaser.
Remove the entire `featured_story` block to hide the preview. A missing or unmatched
post also hides it. Restart `jekyll serve` after changing `_config.yml`, or run
`bundle exec jekyll build` to rebuild the site.

## License

See [license.md](/license.md) for all relevant licenses.
