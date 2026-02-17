---
layout: post
title: "My Favorite Web Analytics Solution, Umami"
date: 2026-02-17
categories: [blog]
tags: [website, analytics]
---

When I launched my previous web project, [Pygskin](https://pygskin.com/), I wanted to set up analytics, but my paltry monthly budget was entirely allocated to hosting. Being privacy-conscious, I didn't like the idea of handing over all my vistors' data to advertising companies that offer intensive web analytics services. There's no need to collect personally identifiable information on my visitors. I just want simple metrics like pages viewed, time spent on the site, and what country they connected from.

One of my goals with Pygskin was to configure every single component myself. It was a deeply involved and often frustrating experience, but it taught me more than any other project I'd taken on up to that point. It was important to me that I understand every single part of the project, from containerization to database design. This gave me total control over the even the smallest components of the code.

I explored several options and eventually found [Umami](https://umami.is/). It had everything I needed. Umami is open-source (anyone can read the code), simple to configure, and free for small-scale usage like mine. The script it runs is tiny and has next to no impact on page responsiveness. It even complies with the [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation), a European Union privacy regulation, out of the box.

Because Umami supports self-hosting, I could not only serve the script myself, but I could also manage the database and dashboard on the same server. It was the perfect tool for the job.

You may have noticed that I didn't mention this website yet. That's because I initially only set up Umami on Pygskin. After I realized how easy it was to use, I even configured it on this site.

If you're familiar with GitHub Pages, which hosts this website, you might be aware that I'm using static hosting. That means that I can't run any code on the webserver, but I can run code on the client side, your browser. That means that I can set up Umami to run in your browser but send data to Pygskin, storing the analytics with Pygskin. It's a great option for even inexperienced web developers.
